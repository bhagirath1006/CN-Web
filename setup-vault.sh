#!/bin/bash

# HashiCorp Vault Setup Script
# This configures Vault to store AWS credentials and integrate with GitHub Actions

set -e

# Configuration
VAULT_ADDR="${VAULT_ADDR:-http://localhost:8200}"
VAULT_TOKEN="${VAULT_TOKEN}"
AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}"
AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}"
GITHUB_TOKEN="${GITHUB_TOKEN}"

echo "=========================================="
echo "HashiCorp Vault Setup"
echo "=========================================="
echo "Vault Address: $VAULT_ADDR"
echo ""

# Check if Vault is accessible
if ! curl -s "$VAULT_ADDR/v1/sys/health" > /dev/null; then
  echo "❌ Error: Cannot reach Vault at $VAULT_ADDR"
  echo "Make sure Vault is running and VAULT_ADDR is correct"
  exit 1
fi

echo "✅ Connected to Vault"
echo ""

# Enable KV v2 secrets engine if not already enabled
echo "1️⃣ Enabling KV Secrets Engine..."
curl -s -X POST \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -d '{"type":"kv","version":2}' \
  "$VAULT_ADDR/v1/sys/mounts/secret" 2>/dev/null || echo "   (KV engine already enabled)"

echo ""
echo "2️⃣ Storing AWS Credentials in Vault..."
curl -s -X POST \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -d "{
    \"data\": {
      \"aws_access_key_id\": \"$AWS_ACCESS_KEY_ID\",
      \"aws_secret_access_key\": \"$AWS_SECRET_ACCESS_KEY\"
    }
  }" \
  "$VAULT_ADDR/v1/secret/data/aws/credentials" | jq .

echo ""
echo "✅ AWS credentials stored in Vault at: secret/aws/credentials"

# Create AppRole for GitHub Actions
echo ""
echo "3️⃣ Setting up AppRole for GitHub Actions..."

# Enable AppRole auth method
curl -s -X POST \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -d '{"type":"approle"}' \
  "$VAULT_ADDR/v1/sys/auth/approle" 2>/dev/null || echo "   (AppRole already enabled)"

echo ""
echo "4️⃣ Creating AppRole policy..."
cat > /tmp/github-actions-policy.hcl <<'EOF'
path "secret/data/aws/*" {
  capabilities = ["read", "list"]
}

path "secret/metadata/aws/*" {
  capabilities = ["read", "list"]
}
EOF

curl -s -X PUT \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -d @/tmp/github-actions-policy.hcl \
  "$VAULT_ADDR/v1/sys/policy/github-actions" 2>&1 | head -1

echo "✅ Policy created"

echo ""
echo "5️⃣ Creating AppRole..."
APPROLE_NAME="github-actions"

curl -s -X POST \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -d "{
    \"token_num_uses\": 0,
    \"token_ttl\": \"24h\",
    \"token_max_ttl\": \"72h\",
    \"policies\": [\"github-actions\"]
  }" \
  "$VAULT_ADDR/v1/auth/approle/role/$APPROLE_NAME"

echo ""
echo "✅ AppRole created: $APPROLE_NAME"

# Get Role ID
echo ""
echo "6️⃣ Getting AppRole credentials..."
ROLE_ID=$(curl -s \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  "$VAULT_ADDR/v1/auth/approle/role/$APPROLE_NAME/role-id" | jq -r '.data.role_id')

echo "Role ID: $ROLE_ID"

# Generate Secret ID
SECRET_ID=$(curl -s -X POST \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  "$VAULT_ADDR/v1/auth/approle/role/$APPROLE_NAME/secret-id" | jq -r '.data.secret_id')

echo "Secret ID: $SECRET_ID"

echo ""
echo "=========================================="
echo "✅ Vault Setup Complete!"
echo "=========================================="
echo ""
echo "📋 Add these to GitHub Secrets:"
echo "   VAULT_ADDR: $VAULT_ADDR"
echo "   VAULT_ROLE_ID: $ROLE_ID"
echo "   VAULT_SECRET_ID: $SECRET_ID"
echo ""
echo "AWS credentials are stored securely in Vault:"
echo "   Path: secret/aws/credentials"
echo ""
echo "Next: Update your GitHub workflows to fetch credentials from Vault"
echo ""

# Cleanup
rm /tmp/github-actions-policy.hcl
