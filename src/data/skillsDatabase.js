// Curated technology and skills taxonomy for ATS parsing and matching
export const SKILLS_TAXONOMY = {
  languages: [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Golang', 
    'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Dart', 'R', 'Scala', 'Perl', 'Shell', 
    'Bash', 'PowerShell', 'SQL', 'HTML', 'HTML5', 'CSS', 'CSS3', 'Sass', 'SCSS'
  ],
  frontend: [
    'React', 'React.js', 'Next.js', 'Vue', 'Vue.js', 'Nuxt.js', 'Angular', 'Svelte', 
    'SvelteKit', 'Redux', 'Redux Toolkit', 'Zustand', 'MobX', 'Tailwind CSS', 'Tailwind', 
    'Bootstrap', 'Material UI', 'MUI', 'Chakra UI', 'Ant Design', 'Styled Components', 
    'Webpack', 'Vite', 'Babel', 'ESBuild', 'Responsive Design', 'SPA', 'PWA', 'WebSockets', 
    'RESTful APIs', 'GraphQL', 'Micro-frontends', 'DOM Manipulation'
  ],
  backend: [
    'Node.js', 'Express', 'Express.js', 'NestJS', 'Koa', 'FastAPI', 'Flask', 'Django', 
    'Spring Boot', 'Spring Framework', 'ASP.NET', 'ASP.NET Core', '.NET Core', 
    'Ruby on Rails', 'Laravel', 'Gin', 'Echo', 'gRPC', 'REST API', 'API Development', 
    'Microservices', 'Serverless', 'Message Queues', 'RabbitMQ', 'Kafka', 'Apache Kafka', 
    'Webhooks', 'OAuth', 'JWT', 'Authentication', 'Authorization'
  ],
  databases: [
    'PostgreSQL', 'Postgres', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'MariaDB', 
    'Oracle Database', 'Microsoft SQL Server', 'MSSQL', 'Cassandra', 'DynamoDB', 
    'Elasticsearch', 'Firestore', 'Firebase', 'Supabase', 'Neo4j', 'CouchDB', 
    'Prisma', 'TypeORM', 'Hibernate', 'Mongoose', 'Database Indexing', 'ACID Transactions'
  ],
  cloud_devops: [
    'AWS', 'Amazon Web Services', 'Azure', 'Microsoft Azure', 'GCP', 'Google Cloud Platform', 
    'Docker', 'Containerization', 'Kubernetes', 'K8s', 'CI/CD', 'Continuous Integration', 
    'Continuous Deployment', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'Terraform', 
    'Ansible', 'Linux', 'Unix', 'Nginx', 'Apache', 'Cloudflare', 'Vercel', 'Netlify', 
    'Prometheus', 'Grafana', 'Serverless Architecture', 'IaC'
  ],
  ai_data: [
    'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'Natural Language Processing', 
    'NLP', 'Computer Vision', 'PyTorch', 'TensorFlow', 'Keras', 'Scikit-Learn', 'Pandas', 
    'NumPy', 'SciPy', 'OpenCV', 'Hugging Face', 'Transformers', 'Large Language Models', 
    'LLM', 'LangChain', 'Data Analysis', 'Data Visualization', 'Tableau', 'Power BI', 
    'Apache Spark', 'Hadoop', 'Big Data', 'Data Mining', 'ETL', 'Statistical Modeling'
  ],
  testing: [
    'Jest', 'Vitest', 'Mocha', 'Chai', 'Cypress', 'Playwright', 'Selenium', 'Puppeteer', 
    'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'E2E Testing', 'TDD', 
    'Test-Driven Development', 'BDD', 'Junit', 'PyTest', 'Mocking'
  ],
  tools_practices: [
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Agile', 'Scrum', 
    'Kanban', 'Postman', 'Swagger', 'OpenAPI', 'Figma', 'VS Code', 'DevTools', 
    'System Design', 'Design Patterns', 'Object-Oriented Programming', 'OOP', 
    'Clean Code', 'Code Review', 'Debugging', 'Performance Optimization', 'Security Best Practices'
  ],
  soft_skills: [
    'Problem Solving', 'Critical Thinking', 'Communication Skills', 'Team Collaboration', 
    'Leadership', 'Project Management', 'Time Management', 'Mentoring', 'Adaptability', 
    'Cross-functional Collaboration', 'Analytical Thinking', 'Detail-oriented'
  ]
};

// Flattened lookup set for quick matching
export const ALL_SKILLS = Object.values(SKILLS_TAXONOMY).flat();

// Action verbs that ATS and hiring managers specifically look for
export const ACTION_VERBS = [
  'developed', 'designed', 'engineered', 'implemented', 'architected', 'spearheaded',
  'optimized', 'refactored', 'orchestrated', 'automated', 'streamlined', 'deployed',
  'built', 'created', 'maintained', 'collaborated', 'managed', 'led', 'accelerated',
  'reduced', 'increased', 'improved', 'scaled', 'integrated', 'delivered', 'established',
  'mentored', 'analyzed', 'configured', 'transformed', 'formulated', 'executed'
];

// Education degree keywords
export const EDUCATION_KEYWORDS = [
  { level: 'Doctorate', terms: ['ph.d', 'phd', 'doctor of philosophy', 'doctorate'] },
  { level: 'Master', terms: ['master of science', 'ms', 'm.s.', 'm.tech', 'mtech', 'mba', 'm.sc', 'msc', 'master'] },
  { level: 'Bachelor', terms: ['bachelor', 'b.tech', 'btech', 'b.e.', 'be', 'b.s.', 'bs', 'b.sc', 'bsc', 'bca', 'undergraduate'] },
  { level: 'Associate', terms: ['associate degree', 'associate of science', 'diploma'] },
  { level: 'High School', terms: ['high school', 'secondary school', '12th standard', 'intermediate'] }
];
