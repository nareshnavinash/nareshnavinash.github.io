export default [
    {
        title: 'TestGorilla',
        titleSmall: [ 'Test', 'Gorilla' ],
        url: 'https://www.testgorilla.com',
        attributes:
        {
            role: [ 'Engineering Manager', 'Lead SDET' ],
        },
        distinctions: [],
        images: [ 'tg-em-ai', 'tg-em-devex', 'tg-em-lead', 'tg-lead-sdet' ],
        pages: [
            {
                header: 'Engineering Manager',
                subheader: 'TestGorilla  |  August 2023 — Present  |  Remote',
                section: 'AI Product Strategy & Monetization',
                points: [
                    'Designed and launched a scalable credit-based pricing engine specifically engineered to measure and bill for Generative AI usage (tokens/compute) at the feature level, enabling flexible business models for AI-heavy tools.',
                    'Led the engineering of a cutting-edge AI Video Avatar platform Tavus (integrating video/audio generation APIs) to conduct real-time candidate interviews, significantly automating the assessment process.',
                    'Established a rigorous Evaluation (Evals) framework using LangFuse to score and monitor the performance of AI models and prompts. Created feedback loops to tweak prompts and model parameters in production, ensuring consistent high-quality output for the AI interviewer.',
                ]
            },
            {
                header: 'Engineering Manager',
                subheader: 'TestGorilla  |  August 2023 — Present  |  Remote',
                section: 'AI-Augmented Engineering (DevEx)',
                points: [
                    'Integrated Claude Code sub-agents into the development workflow to automate code generation and Pull Request (PR) creation. Successfully reduced the cycle time for complex Epics to ~3 days by shifting developer focus from writing boilerplate to reviewing AI-generated architecture.',
                    'Deployed AI agents to autonomously generate unit and integration tests and conduct preliminary code reviews, ensuring strictly enforced coding standards and preventing architectural drift in AI-generated code.',
                    'Initiated a strategic refactor to treat Code-as-Documentation, optimizing the codebase structure for LLM context windows. This enabled AI agents to accurately analyze, document, and autonomously refactor legacy code with high precision.',
                ]
            },
            {
                header: 'Engineering Manager',
                subheader: 'TestGorilla  |  August 2023 — Present  |  Remote',
                section: 'Team Leadership & Core Operations',
                points: [
                    'Led and mentored a high-performing team of 5 engineers, responsible for onboarding, payments, & subscriptions, by balancing ambitious AI technology goals with pragmatic delivery targets.',
                    'Owned critical integrations like Chargebee, HubSpot, 18 ATS platforms, and Stripe, ensuring seamless data flow alongside new AI capabilities.',
                    'Defined and tracked team OKRs and DORA metrics, adapting them to account for the increased velocity provided by AI-assisted development tools.',
                    'Collaborated with Product, Design, Sales, Marketing, GTM, and Finance to scope and prioritize projects aligned with business goals and advocated for engineering needs at the leadership level.',
                ]
            },
            {
                header: 'Lead Software Development Engineer in Test',
                subheader: 'TestGorilla  |  April 2022 — August 2023  |  Remote',
                section: null,
                points: [
                    'Architected the CI/CD infrastructure that transformed release velocity from bi-weekly to 5x daily. This high-frequency deployment model established the necessary foundation for rapid A/B testing and iterative AI model tuning in production.',
                    'Developed sophisticated E2E API testing frameworks using Python (pytest). This deep Python infrastructure experience laid the technical groundwork for seamless integration with modern Python-centric AI/LLM libraries.',
                    'Led backend load testing using k6.io and frontend performance profiling with Lighthouse. Established performance baselines critical for later measuring the latency and compute impact of integrating LLM features.',
                    'Integrated Storybook with Playwright for Angular.js, enhancing CI visual and accessibility tests and implemented Playwright for UI E2E tests in the CD pipeline, ensuring rapid feedback.',
                ]
            },
        ]
    },
    {
        title: 'Hopin',
        titleSmall: [ 'Hopin' ],
        url: 'https://hopin.com',
        attributes:
        {
            role: 'Senior SDET',
        },
        distinctions: [],
        images: [ 'hopin-1' ],
        pages: [
            {
                header: 'Senior Software Development Engineer in Test',
                subheader: 'Hopin  |  February 2021 — March 2022  |  Remote',
                section: null,
                points: [
                    'Optimized release pipeline in GitLab, reducing execution time from 45 to ~15 mins, enabling ~20 daily releases.',
                    'Introduced Pact-Contract testing with self-hosted pact broker, ensuring stable pipeline and frequent deployments.',
                    'Implemented Browserstack for cross-browser testing, minimizing compatibility concerns.',
                    'Conducted interviews at Hopin and provided technical mentorship to test engineers.',
                    'Facilitated cross-functional collaboration via closed and open beta launch.',
                    'Deployed Visual Regression Tests with Testcafe and Percy in GitHub pre-merge state, empowering team autonomy.',
                ]
            },
        ]
    },
    {
        title: 'Vue.ai',
        titleSmall: [ 'Vue.ai' ],
        url: 'https://vue.ai',
        attributes:
        {
            role: 'Lead SDET',
        },
        distinctions: [],
        images: [ 'vueai-1' ],
        pages: [
            {
                header: 'Software Development Engineer in Test',
                subheader: 'Vue.ai  |  March 2020 — February 2021  |  Chennai, India',
                section: null,
                points: [
                    'Developed Python packages for REST API & UI automation, supporting ML/AI use cases organization-wide.',
                    'Managed two teams in an 8:1 Dev to SDET ratio, implementing Agile release processes.',
                    'Configured CI/CD for ML/AI microservice using Jenkins, Bitbucket, AWS, and Spotinst, reducing infrastructure costs via IaC.',
                ]
            },
        ]
    },
    {
        title: 'WeInvest',
        titleSmall: [ 'WeInvest' ],
        url: 'https://weinvest.net',
        attributes:
        {
            role: 'Senior SDET',
        },
        distinctions: [],
        images: [ 'weinvest-1' ],
        pages: [
            {
                header: 'Software Development Engineer in Test',
                subheader: 'WeInvest  |  January 2019 — February 2020  |  Chennai, India',
                section: null,
                points: [
                    'As a first SDET hire, managed internal testing servers to accelerate testing cycles.',
                    'Reduced costs by leveraging a freemium version of Postman for ETL transformation support.',
                    'Modularized and transformed UI and GraphQL automation frameworks into Ruby gems.',
                    'Spearheaded robust CI/CD integration with GitHub, Jenkins, and Docker.',
                    'Utilized Cucumber alongside RSpec for effective Behavior Driven Development (BDD).',
                ]
            },
        ]
    },
    {
        title: 'Freshworks',
        titleSmall: [ 'Fresh', 'works' ],
        url: 'https://www.freshworks.com',
        attributes:
        {
            role: 'Software Engineer',
        },
        distinctions: [],
        images: [ 'freshworks-1' ],
        pages: [
            {
                header: 'Software Engineer',
                subheader: 'Freshworks  |  June 2017 — January 2019  |  Chennai, India',
                section: null,
                points: [
                    'Been part of the launch of Freshcaller product in beta and GA phases.',
                    'Strategized manual and automation test execution in pre-development stages through collaboration with Product Owner and Tech Leads, optimizing release processes.',
                    'Upheld code quality and comprehensive unit test coverage starting from the PR stage.',
                    'Achieved 100% regression automation coverage and managed Jenkins pipelines.',
                ]
            },
        ]
    },
    {
        title: 'Cognizant',
        titleSmall: [ 'Cogni', 'zant' ],
        url: 'https://www.cognizant.com',
        attributes:
        {
            role: 'Programmer Analyst',
        },
        distinctions: [],
        images: [ 'cognizant-1' ],
        pages: [
            {
                header: 'Programmer Analyst',
                subheader: 'Cognizant  |  June 2015 — June 2017  |  Chennai, India',
                section: null,
                points: [
                    'Ensured adherence to CMMI Level 5 practices across all projects.',
                    'Spearheaded web application automation using HP\'s UFT tool. Proactively automated tasks to streamline operations and save time.',
                    'Reduced testing costs in a data server migration project with an automation script, earning recognition as Best Automation Resource for the Year 2016.',
                ]
            },
        ]
    },
    {
        title: 'Open Source',
        titleSmall: [ 'Open', 'Source' ],
        url: 'https://github.com/nareshnavinash',
        attributes:
        {
            role: [ 'npm', 'PyPI', 'RubyGems' ],
        },
        distinctions: [],
        images: [ 'oss-1' ],
        pages: [
            {
                header: 'Open Source Contributor',
                subheader: 'npm  |  PyPI  |  RubyGems  |  GitHub',
                section: 'Published Packages & Frameworks',
                points: [
                    'PyRest-Python: REST API automation framework with snap mode and image comparison.',
                    'newman-run: Run multiple Postman collections with single feed file, embedded reporting.',
                    'Cypress-PageObjectModel: Page Object Model framework for Cypress.',
                    'Selpy & SnaPyRest: Python modules for Selenium POM and REST API automation.',
                    'Teber: Multi-language test automation framework (Ruby, Java) with Allure reporting.',
                    'playwright-TS-pom: Playwright POM with GitLab CI and DataDog integration.',
                ]
            },
        ]
    },
    {
        title: 'Medium Blog',
        titleSmall: ['Medium', 'Blog'],
        url: 'https://medium.com/@nareshnavinash',
        attributes:
        {
            role: [ 'Writer', 'Author' ],
        },
        distinctions: [],
        images: [ 'blog-1' ],
        pages: [
            {
                header: 'Writer & Author',
                subheader: 'Amazon Kindle  |  Medium',
                section: 'Publications',
                points: [
                    'Management In Action: A hands-on guide to effective engineering management.',
                    'Covers team building, decision-making, stakeholder alignment, and leadership.',
                    'Regular contributor on Medium about engineering management and quality.',
                    'Topics include AI in engineering, test automation, and leadership practices.',
                ]
            },
        ]
    }
]
