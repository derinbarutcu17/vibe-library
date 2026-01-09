// Build Mode Content
export interface PatternCard {
    id: string;
    title: string;
    context?: string;
    content: string;
    variant?: 'default' | 'warning';
}

export interface ContentSection {
    id: string;
    headline: string;
    concept?: string;
    cards: PatternCard[];
}

export const buildModeContent: ContentSection[] = [
    {
        id: 'visual-translator',
        headline: "Don't say 'Make it Pop'. Say this.",
        concept: 'Translating vague design terms into specific CSS/Prompt instructions.',
        cards: [
            {
                id: 'premium-glass',
                title: 'The Premium Glass Look',
                content: "Stop asking for 'clean'. Ask for: backdrop-filter: blur(16px), border: 1px solid rgba(255,255,255,0.08), and box-shadow: 0 4px 30px rgba(0,0,0,0.1).",
            },
            {
                id: 'neo-brutalist',
                title: 'Neo-Brutalist Layout',
                content: "Stop asking for 'edgy'. Ask for: 2px solid black borders, no border-radius, high contrast typography, and bold flat colors.",
            },
        ],
    },
    {
        id: 'frankenstein-sutures',
        headline: 'Merging messy code.',
        concept: "Prompts to fix the 'Frankenstein' issue when combining different AI snippets.",
        cards: [
            {
                id: 'unification-prompt',
                title: 'The Unification Prompt',
                content: "'Analyze these two components. Extract a common theme object containing color palette and spacing. Refactor both to use ONLY these shared variables. Do not change the layout, only the styling source.'",
            },
        ],
    },
    {
        id: 'thread-killers',
        headline: 'Know when to quit.',
        concept: 'Recognizing when the AI has lost the plot.',
        cards: [
            {
                id: 'panic-fix',
                title: 'The Panic Fix',
                content: "If the AI starts adding !important tags or inline styles to force elements, Kill the Thread. It has lost the cascade logic.",
                variant: 'warning',
            },
            {
                id: 'hallucination-loop',
                title: 'The Hallucination Loop',
                content: "If it suggests a library import that fails twice, do not ask for a fix. Kill the Thread and ask for a 'Vanilla JS' implementation.",
                variant: 'warning',
            },
        ],
    },
    {
        id: 'safe-stacks',
        headline: 'Verified Paths.',
        concept: 'Tech stacks that AI models are statistically best at writing.',
        cards: [
            {
                id: 'vibe-stack',
                title: 'The Vibe Stack',
                content: "React + Tailwind + Framer Motion. Why? The training data for this combination is massive. AI rarely hallucinates syntax here compared to newer libraries like Svelte or Panda CSS.",
            },
        ],
    },
];

export const dailyModeContent: ContentSection[] = [
    {
        id: 'daily-prompts',
        headline: 'Prompting for the rest of us.',
        concept: 'Life optimization patterns.',
        cards: [
            {
                id: 'salary-negotiator',
                title: 'The Salary Negotiator',
                context: "Don't just ask 'write an email'. Feed the AI the leverage.",
                content: "Act as a negotiation expert. I have an offer for [X]. Market rate is [Y]. Write a counter-offer email that prioritizes excitement for the role but firmness on the number. Use the 'sandwich method' (Positive, Ask, Positive).",
            },
            {
                id: 'jargon-destroyer',
                title: 'The Jargon Destroyer',
                context: 'Understanding complex documents.',
                content: "Explain this legal/medical text to me as if I am a 12-year-old. Use an analogy involving [User's Interest, e.g., Cooking] to explain the core concept.",
            },
        ],
    },
];
