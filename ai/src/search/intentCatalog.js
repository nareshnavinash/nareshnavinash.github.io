export const NAV_INTENTS = [
    {
        id: 'nav.about',
        type: 'navigate',
        target: '#about',
        keywords: ['about', 'who are you', 'introduce', 'yourself', 'tell me about yourself', 'bio', 'background'],
        examples: ['tell me about yourself', 'who are you', 'about section', 'your background']
    },
    {
        id: 'nav.career',
        type: 'navigate',
        target: '#career',
        keywords: ['career', 'experience', 'work history', 'resume', 'jobs', 'positions', 'roles'],
        examples: ['show your experience', 'career history', 'work history', 'your jobs', 'go to experience']
    },
    {
        id: 'nav.skills',
        type: 'navigate',
        target: '#skills',
        keywords: ['skills', 'tech stack', 'technologies', 'stack', 'tools', 'languages'],
        examples: ["what's your tech stack", 'skills section', 'technologies you use', 'programming languages']
    },
    {
        id: 'nav.leadership',
        type: 'navigate',
        target: '#leadership',
        keywords: ['leadership', 'management style', 'lead', 'principles'],
        examples: ['leadership style', 'management principles', 'how do you lead']
    },
    {
        id: 'nav.repos',
        type: 'navigate',
        target: '#repos',
        keywords: ['repos', 'repositories', 'open source', 'github', 'projects', 'oss', 'code'],
        examples: ['open source projects', 'github repos', 'your projects', 'show repos']
    },
    {
        id: 'nav.writing',
        type: 'navigate',
        target: '#writing',
        keywords: ['articles', 'blog', 'medium', 'writing', 'posts', 'publications', 'book'],
        examples: ['your articles', 'blog posts', 'medium articles', 'what have you written']
    },
    {
        id: 'nav.certs',
        type: 'navigate',
        target: '#certs',
        keywords: ['certifications', 'certificates', 'certified', 'credentials'],
        examples: ['certifications', 'your certificates', 'are you certified']
    },
    {
        id: 'nav.contact',
        type: 'navigate',
        target: '#contact',
        keywords: ['contact', 'email', 'reach', 'connect', 'hire', 'linkedin', 'social', 'say hello'],
        examples: ['how to contact you', 'your email', 'linkedin', 'reach out', 'say hello']
    },
    {
        id: 'nav.3d',
        type: 'navigate',
        target: '/world.html',
        keywords: ['3d', 'world', 'game', 'explore', 'interactive', 'drive'],
        examples: ['3d portfolio', 'explore the world', 'interactive version', 'play the game']
    }
]

export const QUERY_INTENTS = [
    {
        id: 'qa.career_detail',
        type: 'query',
        keywords: [
            'testgorilla',
            'hopin',
            'vue.ai',
            'weinvest',
            'freshworks',
            'cognizant',
            'what did you do at',
            'role at',
            'work at'
        ],
        examples: [
            'what did you do at TestGorilla',
            'tell me about your Hopin role',
            'describe your work at Freshworks',
            'TestGorilla experience'
        ]
    },
    {
        id: 'qa.skills_fit',
        type: 'query',
        keywords: [
            'do you know',
            'experience with',
            'proficient',
            'familiar with',
            'python',
            'typescript',
            'aws',
            'kubernetes',
            'docker',
            'playwright',
            'cypress',
            'ai',
            'claude',
            'llm',
            'rag'
        ],
        examples: [
            'do you know Python',
            "what's your AI experience",
            'are you familiar with Kubernetes',
            'have you used Playwright'
        ]
    },
    {
        id: 'qa.leadership',
        type: 'query',
        keywords: [
            'how do you lead',
            'team building',
            'management approach',
            'mentorship',
            'scale teams',
            'team size',
            'culture'
        ],
        examples: [
            'how do you scale teams',
            'your management approach',
            'mentorship philosophy',
            'how do you build engineering culture'
        ]
    },
    {
        id: 'qa.recruiter',
        type: 'query',
        keywords: [
            'fit for',
            'good candidate',
            'hire',
            'vp engineering',
            'director',
            'startup experience',
            'remote',
            'team size',
            'years of experience',
            'why should we'
        ],
        examples: [
            'is Naresh a good fit for VP Engineering',
            'how large are his teams',
            'startup vs scale-up experience',
            'why should we hire you'
        ]
    },
    {
        id: 'qa.general',
        type: 'query',
        keywords: [],
        examples: ['summarize your experience', 'tell me about yourself', 'what makes you unique']
    }
]

export const META_INTENT = {
    id: 'meta.about_ai',
    type: 'meta',
    keywords: ['how does this work', 'what model', 'are you ai', 'who are you', 'naresh.ai', 'what powers you'],
    response:
        "I'm naresh.ai — a lightweight AI assistant built into this portfolio. I use Fuse.js to search through Naresh's resume data and LLM providers (Groq and Gemini as fallback) to generate natural language answers. Everything runs client-side except the API calls. You get 10 AI queries per day. Try asking about his career, skills, or leadership philosophy!"
}

export const ALL_INTENTS = [...NAV_INTENTS, ...QUERY_INTENTS, META_INTENT]
