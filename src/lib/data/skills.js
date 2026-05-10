export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Immersive & responsive interfaces',
    skills: [
      { name: 'React.js', level: 'Advanced', percentage: 90 },
      { name: 'React 19', level: 'Advanced', percentage: 85 },
      { name: 'Next.js', level: 'Intermediate', percentage: 75 },
      { name: 'TypeScript', level: 'Advanced', percentage: 85 },
      { name: 'JavaScript', level: 'Advanced', percentage: 90 },
      { name: 'Tailwind CSS', level: 'Advanced', percentage: 88 },
      { name: 'Bootstrap', level: 'Advanced', percentage: 85 },
      { name: 'HTML5', level: 'Advanced', percentage: 95 },
      { name: 'CSS3', level: 'Advanced', percentage: 90 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Scalable logic & secure APIs',
    skills: [
      { name: 'Node.js', level: 'Intermediate', percentage: 75 },
      { name: 'Express.js', level: 'Intermediate', percentage: 70 },
      { name: 'Laravel', level: 'Advanced', percentage: 85 },
      { name: 'PHP', level: 'Advanced', percentage: 88 },
      { name: 'Python', level: 'Intermediate', percentage: 70 },
      { name: 'MySQL', level: 'Advanced', percentage: 85 },
      { name: 'SQL', level: 'Advanced', percentage: 80 },
      { name: 'Ruby on Rails', level: 'Beginner', percentage: 40 },
    ],
  },
  {
    id: 'ai-cv',
    title: 'AI & Computer Vision',
    description: 'Intelligent systems & vision',
    skills: [
      { name: 'Python', level: 'Intermediate', percentage: 70 },
      { name: 'YOLO', level: 'Intermediate', percentage: 65 },
      { name: 'OpenCV', level: 'Intermediate', percentage: 65 },
      { name: 'Face Detection', level: 'Intermediate', percentage: 70 },
      { name: 'Emotion Detection', level: 'Intermediate', percentage: 60 },
      { name: 'Pose Detection', level: 'Intermediate', percentage: 60 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Tech',
    description: 'DevOps, design & workflow',
    skills: [
      { name: 'Git/GitHub', level: 'Advanced', percentage: 90 },
      { name: 'VS Code', level: 'Advanced', percentage: 95 },
      { name: 'Vite', level: 'Advanced', percentage: 85 },
      { name: 'Postman', level: 'Advanced', percentage: 85 },
      { name: 'Laragon', level: 'Intermediate', percentage: 75 },
      { name: 'Blender', level: 'Beginner', percentage: 35 },
      { name: 'Adobe Illustrator', level: 'Intermediate', percentage: 60 },
    ],
  },
  {
    id: 'learning',
    title: 'Currently Learning',
    description: 'Expanding the toolkit',
    skills: [
      { name: 'Docker', level: 'Beginner', percentage: 45 },
      { name: 'Azure/Kubernetes', level: 'Beginner', percentage: 30 },
      { name: 'Prisma', level: 'Beginner', percentage: 50 },
      { name: 'Next.js 14 App Router', level: 'Intermediate', percentage: 65 },
      { name: 'Auth.js', level: 'Beginner', percentage: 40 },
    ],
  },
];

export const allSkills = skillCategories.flatMap(cat => cat.skills);
export const skillTabs = skillCategories.map(cat => cat.title);
