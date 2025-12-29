// Technology logo URLs mapping
// Supports both local asset paths and CDN sources

// Import local logos if available
// Add your local logo imports here:
import reactLogo from '../assets/react.svg'
// Example: import vueLogo from '../assets/vue.svg'
// Example: import angularLogo from '../assets/angular.svg'
import hadoopLogo from '../assets/hadoop.png'
import homeLogo from '../assets/home.png'
import mqttLogo from '../assets/mqtt-ver.webp'
import awsLogo from '../assets/aws.png'
import flinkLogo from '../assets/flink_squirrel_500.png'
import eventDrivenLogo from '../assets/WhatsApp Image 2025-12-09 at 17.10.10_9ca1828e.jpg'
import zwaveLogo from '../assets/WhatsApp Image 2025-12-09 at 17.10.31_269b19a6.jpg'
import zigbeelogo from '../assets/WhatsApp Image 2025-12-09 at 17.11.32_26ca5783.jpg'
import loadbalancerLogo from '../assets/WhatsApp Image 2025-12-09 at 17.10.53_74c262f7.jpg'
import tableauLogo from '../assets/tableau-software.png'
import apiGatewayLogo from '../assets/WhatsApp Image 2025-12-09 at 17.09.20_8907fbe4.jpg'
import penetrationTestingLogo from '../assets/WhatsApp Image 2025-12-09 at 18.01.06_d04162eb.jpg'
import idsIpsLogo from '../assets/WhatsApp Image 2025-12-09 at 18.01.32_563dfd54.jpg'
import SIEMlogo from '../assets/WhatsApp Image 2025-12-09 at 18.02.12_6904b259.jpg'
import encryptionLogo from '../assets/WhatsApp Image 2025-12-09 at 18.02.32_6e8cc2ed.jpg'
import vpnLogo from '../assets/WhatsApp Image 2025-12-09 at 18.02.57_c5033787.jpg'
import vulnerabilityScanningLogo from '../assets/WhatsApp Image 2025-12-09 at 18.05.00_47440c79.jpg'
import axure from '../assets/WhatsApp Image 2025-12-09 at 18.42.11_4c512e2b.jpg'
import prototypePie from '../assets/WhatsApp Image 2025-12-09 at 18.42.28_e083737a.jpg'
import framer from '../assets/WhatsApp Image 2025-12-09 at 18.42.46_d7bd4c34.jpg'
import visionLogo from '../assets/WhatsApp Image 2025-12-09 at 18.43.10_2d4fc130.jpg'
import cassandraLogo from '../assets/WhatsApp Image 2025-12-09 at 18.43.31_e4cba0f8.jpg'

export const getTechLogo = (techName) => {
  const logoMap = {
    // Frontend Frameworks
    'React': reactLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    
    // Backend
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    
    // Databases
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    
    // Cloud Services
    'AWS': awsLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    'GCP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    
    // Mobile Development
    'Swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    'Kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
    'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    
    // Data Science
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'R': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Tableau': tableauLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikit-learn/scikit-learn-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    
    // Big Data
    'Hadoop': hadoopLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
    'Spark': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
    'Kafka': 'https://i.pinimg.com/736x/12/3d/27/123d277636783ba450261641cd5d9b92.jpg',
    'Flink': flinkLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
    'HDFS': hadoopLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
    'Cassandra':  cassandraLogo ||' https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
    'Elasticsearch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg',
    
    // DevOps
    'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'Jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
    'GitHub Actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'Terraform': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
    
    // IoT
    'Arduino': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
    'Raspberry Pi': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg',
    'MQTT': mqttLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mqtt/mqtt-original.svg',
    'Node-RED': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Home Assistant': homeLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/homeassistant/homeassistant-original.svg',
    'Zigbee': zigbeelogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zigbee/zigbee-original.svg',
    'Z-Wave': zwaveLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zwave/zwave-original.svg',
    
    // System Design
    'Microservices': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'API Gateway': apiGatewayLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    'Load Balancer': loadbalancerLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    'CDN': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
    'MVC': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'REST': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    'Event-Driven': eventDrivenLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kafka/kafka-original.svg',
    
    // Cybersecurity
    'Firewall': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'SSL/TLS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    'VPN': vpnLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'Encryption': encryptionLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'SIEM': SIEMlogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg',
    'IDS/IPS': idsIpsLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'Penetration Testing': penetrationTestingLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kali/kali-original.svg',
    'Vulnerability Scanning': vulnerabilityScanningLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    
    // UI/UX
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Adobe XD': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
    'Sketch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg',
    'InVision': visionLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/invision/invision-original.svg',
    'Adobe Photoshop': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    'Adobe Illustrator': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
    'Framer': framer || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg',
    'Principle': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'ProtoPie': prototypePie || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'Axure': axure || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  }
  
  return logoMap[techName] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
}
