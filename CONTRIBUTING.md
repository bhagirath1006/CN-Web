# Contributing Guidelines

## Development Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/CN-Web.git
   cd CN-Web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Branch Naming Convention

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `chore/` - Maintenance tasks

Example: `feature/bhagirath`, `bugfix/login-issue`, `docs/api-guide`

## Commit Message Convention

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test changes
- `chore`: Maintenance

Example:
```
feat(auth): add OAuth2 integration

Implements OAuth2 authentication provider for social login.
Supports Google and GitHub providers.

Closes #123
```

## Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/bhagirath
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add deployment infrastructure"
   ```

3. **Push to remote**
   ```bash
   git push origin feature/bhagirath
   ```

4. **Create Pull Request**
   - Go to GitHub repository
   - Click "New pull request"
   - Select `feature/bhagirath` → `main`
   - Fill PR template
   - Request review

5. **PR Requirements**
   - ✅ All GitHub Actions checks pass
   - ✅ Code review approved
   - ✅ No conflicts with main
   - ✅ Documentation updated

## Code Quality Standards

### ESLint
```bash
npm run lint
```

### Build Check
```bash
npm run build
```

### Run Locally
```bash
npm run dev
```

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## Infrastructure Changes

For Terraform changes:

1. **Validate**
   ```bash
   cd terraform
   terraform fmt -check -recursive
   terraform validate
   ```

2. **Plan**
   ```bash
   terraform plan -out=tfplan
   ```

3. **Include in PR**
   - Comment with `terraform plan` output
   - Explain infrastructure changes
   - Verify no breaking changes

## Docker Changes

1. **Build locally**
   ```bash
   docker build -t cloudnexus:test .
   ```

2. **Test container**
   ```bash
   docker run -p 5173:5173 cloudnexus:test
   ```

3. **Document changes**
   - Update Dockerfile comments
   - Explain optimization rationale

## Documentation

- Update [DEPLOYMENT.md](./DEPLOYMENT.md) for infrastructure changes
- Update [INFRASTRUCTURE.md](./INFRASTRUCTURE.md) for architecture changes
- Add code comments for complex logic
- Update README if adding new features

## Security

- ❌ Never commit secrets (API keys, tokens)
- ❌ Never commit `.env` files
- ❌ Never commit private keys
- ✅ Use GitHub Secrets for sensitive data
- ✅ Use HashiCorp Vault for runtime secrets
- ✅ Keep dependencies updated

## Review Checklist

When reviewing PRs:

- [ ] Code follows style guide
- [ ] Tests are included and passing
- [ ] No security vulnerabilities introduced
- [ ] Documentation is updated
- [ ] No hardcoded secrets
- [ ] Terraform changes validated
- [ ] Docker changes tested

## Merge Requirements

- [ ] All checks pass
- [ ] Code review approved
- [ ] Conflicts resolved
- [ ] Commits are clean and descriptive

## Deployment

After merge to main:

1. **Automated Deployment**
   - GitHub Actions triggers deploy workflow
   - Docker image built and pushed
   - Terraform applies infrastructure changes
   - Application deployed to EC2

2. **Monitoring**
   - Check CloudWatch logs
   - Verify application health
   - Monitor error rates

3. **Rollback** (if needed)
   ```bash
   git revert <commit-hash>
   git push origin main
   # GitHub Actions will redeploy
   ```

## Release Process

1. **Create release branch**
   ```bash
   git checkout -b release/v1.0.0
   ```

2. **Update version**
   - Update `package.json` version
   - Update CHANGELOG.md

3. **Create tag**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin tag v1.0.0
   ```

4. **Create release on GitHub**
   - Go to Releases
   - Click "Create a new release"
   - Select tag
   - Add release notes

## Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Security**: Email security@example.com (don't open public issue)
- **Chat**: Join our Slack/Discord

## Code of Conduct

- Be respectful and inclusive
- Welcome diverse perspectives
- Report inappropriate behavior
- Focus on the code, not the person

## Additional Resources

- [Git Guide](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint](https://eslint.org/)
- [Terraform Best Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices.html)

---

Thank you for contributing to CloudNexus Web! 🎉
