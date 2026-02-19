/**
 * All portfolio content extracted from the original HTML.
 * No content lives in the 3D code — everything renders from here.
 */

export const hero = {
  greeting: "Hey there, I'm Naresh —",
  heading: 'I build teams that ship quality software, powered by AI.',
  photo: '/assets/profile.jpg',
}

export const about = {
  title: 'About.',
  subtitle: 'Engineering leader building at the intersection of AI and quality.',
  mission:
    "I'm an Engineering Manager who bridges the gap between cutting-edge AI and reliable software delivery. With over a decade of experience across startups and scale-ups, I specialize in building high-performing teams, designing quality-first engineering cultures, and leveraging AI to accelerate product development. I believe great engineering leadership is about multiplying the impact of every person on your team.",
  cards: [
    {
      title: 'AI Product Strategy',
      description:
        'Integrating AI/ML capabilities into product workflows — from LLM-powered features to intelligent test generation and data-driven decision systems.',
    },
    {
      title: 'Team Building',
      description:
        'Scaling engineering teams from 5 to 30+, establishing career frameworks, hiring pipelines, and fostering cultures of ownership and continuous improvement.',
    },
    {
      title: 'Quality Engineering',
      description:
        'Designing end-to-end quality strategies — test automation frameworks, CI/CD pipelines, observability, and shift-left quality practices at scale.',
    },
  ],
}

export const career = {
  title: 'Experience.',
  subtitle: 'A decade of growth — from hands-on engineering to leading teams.',
  positions: [
    {
      date: 'Jan 2023 — Present',
      role: 'Engineering Manager',
      company: 'TestGorilla',
      location: 'Remote · Netherlands',
      summary:
        'Leading cross-functional engineering teams building AI-powered talent assessment products. Driving quality strategy and engineering excellence across the platform.',
      achievements: [
        'Managing multiple squads across AI assessment, platform infrastructure, and quality engineering',
        'Spearheaded AI integration initiatives including LLM-powered test generation and automated evaluation',
        'Established engineering quality metrics and observability practices, reducing production incidents by 40%',
        'Built and scaled the QA engineering team, implementing shift-left testing strategy',
        'Drove cross-team architectural decisions and technical roadmap planning',
      ],
      tags: ['Python', 'TypeScript', 'React', 'Django', 'AWS', 'LLMs', 'CI/CD', 'Datadog'],
    },
    {
      date: 'Mar 2022 — Jan 2023',
      role: 'Lead SDET',
      company: 'TestGorilla',
      location: 'Remote · Netherlands',
      summary:
        'Led the quality engineering practice end-to-end — from test strategy to automation infrastructure. Built the SDET team from the ground up.',
      achievements: [
        'Designed and implemented the end-to-end test automation framework from scratch',
        'Hired and mentored a team of SDETs across multiple geographies',
        'Achieved 80% reduction in regression testing cycle time through parallelized automation',
        'Established quality gates in CI/CD pipelines, preventing critical defects from reaching production',
      ],
      tags: ['Python', 'Playwright', 'pytest', 'GitHub Actions', 'Docker'],
    },
    {
      date: 'Jun 2021 — Mar 2022',
      role: 'Senior SDET',
      company: 'Hopin',
      location: 'Remote · London, UK',
      summary:
        "Drove quality engineering for the world's fastest-growing virtual events platform during hyper-growth phase.",
      achievements: [
        'Built robust test automation suites for real-time video streaming and event management features',
        'Collaborated with 10+ engineering squads to embed quality practices in fast-paced agile workflows',
        'Implemented performance testing framework to ensure platform scalability for 100K+ concurrent users',
      ],
      tags: ['TypeScript', 'Cypress', 'WebRTC', 'Ruby', 'AWS'],
    },
    {
      date: 'Jul 2020 — Jun 2021',
      role: 'Lead SDET',
      company: 'Vue.ai (Mad Street Den)',
      location: 'Chennai, India',
      summary:
        'Led quality engineering for an AI-powered retail automation platform, building test frameworks for computer vision and ML pipelines.',
      achievements: [
        'Designed test strategies for AI/ML models including image recognition and product recommendation engines',
        'Built automated regression suites reducing release validation from days to hours',
        'Created open-source test automation frameworks published on npm, PyPI, and RubyGems',
      ],
      tags: ['Python', 'Ruby', 'Node.js', 'Selenium', 'AI/ML Testing'],
    },
    {
      date: 'Oct 2019 — Jul 2020',
      role: 'Senior SDET',
      company: 'WeInvest',
      location: 'Chennai, India',
      summary:
        'Owned quality for a fintech robo-advisory platform, ensuring regulatory compliance and reliable financial workflows.',
      achievements: [
        'Implemented end-to-end API and UI test automation for investment portfolio management features',
        'Established quality processes for regulatory compliance testing across multiple markets',
      ],
      tags: ['Java', 'REST Assured', 'Selenium', 'Jenkins'],
    },
    {
      date: 'Feb 2018 — Oct 2019',
      role: 'Software Engineer',
      company: 'Freshworks',
      location: 'Chennai, India',
      summary:
        "Delivered quality for Freshworks' SaaS suite serving 50K+ businesses, working across Freshdesk and Freshservice products.",
      achievements: [
        'Built and maintained UI and API automation suites for customer support and ITSM products',
        'Contributed to cross-team quality standards and shared testing libraries',
        'Mentored junior engineers on test design and automation best practices',
      ],
      tags: ['Ruby', 'Selenium', 'Cucumber', 'Jenkins', 'AWS'],
    },
    {
      date: 'Sep 2015 — Feb 2018',
      role: 'Programmer Analyst',
      company: 'Cognizant Technology Solutions',
      location: 'Chennai, India',
      summary:
        'Started career in enterprise quality engineering, building test automation for large-scale telecom and banking projects.',
      achievements: [
        'Developed automation frameworks for enterprise applications using Selenium and Java',
        'Delivered regression and functional testing for telecom billing systems',
        'Earned CCNA and CCNP certifications while working on network infrastructure projects',
      ],
      tags: ['Java', 'Selenium', 'TestNG', 'SOAP UI', 'Oracle DB'],
    },
  ],
}

export const skills = {
  title: 'Skills.',
  subtitle: 'A full-stack quality & engineering toolkit honed over a decade.',
  categories: [
    {
      name: 'Languages',
      items: ['Python', 'TypeScript', 'Ruby'],
    },
    {
      name: 'AI Stack',
      items: [
        'AI Agents (Claude Code workflows)',
        'Prompt Engineering',
        'LLM Evals & RAG Architecture',
        'Anthropic APIs · n8n · Zapier',
      ],
    },
    {
      name: 'Cloud & Infrastructure',
      items: [
        'AWS (Solutions Architect)',
        'Serverless Architecture',
        'Docker & Kubernetes',
        'CI/CD (CircleCI, GitLab, GitHub)',
      ],
    },
    {
      name: 'Quality & Observability',
      items: [
        'Data Observability (Mixpanel, Holistics, Snowflake)',
        'Performance Engineering (k6, Lighthouse)',
        'Automation (Playwright, Cypress)',
        'Contract Testing (Pact)',
      ],
    },
  ],
}

export const leadership = {
  title: 'Leadership.',
  subtitle: 'How I build teams, ship products, and drive impact.',
  cards: [
    {
      title: 'AI-Augmented Engineering',
      description:
        'Embedding AI tools and workflows into every stage of the SDLC — from code generation and review to intelligent testing and deployment.',
    },
    {
      title: 'Team Growth',
      description:
        'Investing in people through mentorship, clear career ladders, and creating psychological safety that empowers engineers to take bold bets.',
    },
    {
      title: 'Strategic Planning',
      description:
        'Translating business goals into engineering roadmaps with clear milestones, measurable outcomes, and adaptive execution.',
    },
    {
      title: 'Cross-functional Collaboration',
      description:
        'Breaking silos between product, design, and engineering to align on shared outcomes. Building bridges across distributed teams and time zones.',
    },
    {
      title: 'Operational Excellence',
      description:
        'Driving reliability through SLOs, incident management, runbooks, and a culture of blameless post-mortems and continuous improvement.',
    },
    {
      title: 'Data-Driven Decisions',
      description:
        'Using engineering metrics, user data, and experimentation to prioritize ruthlessly and make confident product and technical decisions.',
    },
  ],
}

export const publications = {
  title: 'Publications.',
  subtitle: 'Sharing knowledge through writing and open source.',
  book: {
    title: 'Management In Action',
    author: 'Naresh Sekar',
    publisher: 'Amazon Kindle',
    description:
      'A hands-on guide to effective engineering management — covering team building, decision-making, stakeholder alignment, and leadership practices that drive real impact in fast-paced technology organizations.',
    amazonUrl: 'https://www.amazon.com/s?i=digital-text&rh=p_27%3ANaresh%2BSekar',
    mediumUrl: 'https://medium.com/@nareshnavinash',
  },
}

export const certifications = {
  title: 'Certifications.',
  subtitle: 'Continuous learning across engineering, cloud, and leadership.',
  items: [
    { name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services' },
    { name: 'Reforge — Engineering Management', issuer: 'Reforge' },
    { name: 'CCNA & CCNP Routing and Switching', issuer: 'Cisco Systems' },
    { name: 'Google Project Management Certificate', issuer: 'Google (Coursera)' },
    { name: 'Strategic Leadership & Management', issuer: 'University of Illinois (Coursera)' },
    { name: 'BEC Vantage (Business English)', issuer: 'Cambridge Assessment' },
  ],
}

export const education = {
  degree: 'Bachelor of Engineering — Electronics & Communication',
  school: 'Anna University',
  period: '2011 — 2015',
  location: 'Chennai, India',
}

export const contact = {
  title: "Let's connect.",
  subtitle: 'Open to conversations about engineering leadership, AI, and collaboration.',
  email: 'nareshnavinash@gmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/nareshnavinash/',
    github: 'https://github.com/nareshnavinash',
    medium: 'https://medium.com/@nareshnavinash',
  },
  extras: {
    npm: 'https://www.npmjs.com/~nareshnavinash',
    pypi: 'https://pypi.org/user/nareshnavinash/',
    rubygems: 'https://rubygems.org/profiles/nareshnavinash',
  },
}
