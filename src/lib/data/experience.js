export const experiences = [
  {
    id: 'bni-finance',
    company: 'BNI Finance (PT BNI Multifinance)',
    role: 'Full-Stack Developer Intern',
    location: 'Rasuna Said, Jakarta',
    period: '2024 - Present',
    startDate: '2024',
    endDate: 'Present',
    description: [
      'Built HCMS E-Learning platform from scratch using Next.js 14, Prisma, and PostgreSQL',
      'Implemented Microsoft SSO with Single Tenant enforcement for enterprise security',
      'Designed and developed RBAC (Role-Based Access Control) system with dynamic permissions',
      'Deployed applications via Docker containers and AKS (Azure Kubernetes Service)',
      'Set up CI/CD pipelines using Jenkins for automated testing and deployment',
    ],
    tech: ['Next.js 14', 'Prisma', 'Auth.js', 'Docker', 'Azure AKS', 'Jenkins', 'PostgreSQL'],
    type: 'work',
  },
  {
    id: 'web3-project',
    company: 'Web3 Initiative',
    role: 'NFT Developer',
    location: 'Remote',
    period: '2023',
    startDate: '2023',
    endDate: '2023',
    description: [
      'Designed and published Non-Fungible Tokens (NFTs) as part of Web3 project',
      'Implemented smart contracts for NFT minting and trading',
      'Collaborated with artists for digital asset creation and tokenization',
    ],
    tech: ['Web3', 'Blockchain', 'NFT', 'Solidity'],
    type: 'work',
  },
  {
    id: 'gunadarma',
    company: 'Universitas Gunadarma',
    role: 'Information Systems Graduate',
    location: 'Depok, Indonesia',
    period: '2020 - 2024',
    startDate: '2020',
    endDate: '2024',
    description: [
      "Bachelor's degree in Information Systems with 3.60 GPA",
      'Focused on full-stack web development and software engineering',
      'Completed coursework in database systems, networks, and AI fundamentals',
    ],
    tech: ['Java', 'SQL', 'UML', 'System Analysis'],
    type: 'education',
  },
];

export const workExperiences = experiences.filter(exp => exp.type === 'work');
export const educationExperiences = experiences.filter(exp => exp.type === 'education');

export const timelineOrder = ['bni-finance', 'web3-project', 'gunadarma'];
