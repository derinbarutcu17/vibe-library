// Prompt product data for the shopping experience

export interface PromptProduct {
    id: string;
    title: string;
    category: 'general' | 'coding' | 'ui-ux' | 'image' | 'problem-solving' | 'creativity';
    preview: string; // Short preview shown on front
    fullPrompt: string; // Full prompt to copy
    whyItWorks: string; // Explanation on back of card
    tags: string[];
    tokensUsed: number;
    successRate: number; // Percentage
    saves: number;
}

export const promptProducts: PromptProduct[] = [
    {
        id: 'code-refactor-001',
        title: 'Senior Engineer Refactor',
        category: 'coding',
        preview: 'Act as a senior software engineer with 15 years of experience...',
        fullPrompt: `Act as a senior software engineer with 15 years of experience in building scalable systems. Review this code and refactor it following SOLID principles, add comprehensive error handling, and optimize for performance. Explain each change you make and why it improves the codebase.`,
        whyItWorks: 'By establishing expertise level and specific principles (SOLID), you force the AI to think systematically. The "explain each change" clause ensures transparency and learning.',
        tags: ['refactoring', 'best-practices', 'code-review'],
        tokensUsed: 85,
        successRate: 94,
        saves: 2847,
    },
    {
        id: 'code-debug-002',
        title: 'Systematic Debugger',
        category: 'coding',
        preview: 'You are a debugging expert. Given this error, analyze it using...',
        fullPrompt: `You are a debugging expert. Given this error, analyze it using the following framework: 1) Identify the error type, 2) List all possible root causes, 3) Rank them by likelihood, 4) Provide step-by-step debugging instructions for the top 3 causes, 5) Suggest preventive measures.`,
        whyItWorks: 'The numbered framework forces structured thinking. Ranking by likelihood prevents the AI from giving you 20 random suggestions—it prioritizes.',
        tags: ['debugging', 'errors', 'systematic'],
        tokensUsed: 120,
        successRate: 89,
        saves: 1923,
    },
    {
        id: 'ui-landing-003',
        title: 'Conversion-First Landing',
        category: 'ui-ux',
        preview: 'Design a landing page that converts. Focus on...',
        fullPrompt: `Design a landing page for [PRODUCT] that converts. Structure it with: 1) A headline that addresses the core pain point, 2) A sub-headline with the transformation promise, 3) Three benefit blocks with icons, 4) Social proof section, 5) A single, high-contrast CTA. Use F-pattern eye tracking principles.`,
        whyItWorks: 'Specifying F-pattern and conversion elements grounds the AI in proven UX principles instead of generic layouts.',
        tags: ['landing-page', 'conversion', 'ux'],
        tokensUsed: 95,
        successRate: 91,
        saves: 3102,
    },
    {
        id: 'ui-mobile-004',
        title: 'Thumb-Zone Navigator',
        category: 'ui-ux',
        preview: 'Create a mobile navigation that respects thumb zones...',
        fullPrompt: `Create a mobile app navigation system that respects thumb-zone ergonomics. Place primary actions in the bottom 1/3 of the screen, use a maximum of 5 nav items, implement haptic feedback cues, and ensure touch targets are minimum 44x44px. Prioritize one-handed operation.`,
        whyItWorks: 'Citing specific measurements (44x44px, bottom 1/3) and ergonomic principles produces designs that actually work on real devices.',
        tags: ['mobile', 'navigation', 'ergonomics'],
        tokensUsed: 78,
        successRate: 88,
        saves: 1456,
    },
    {
        id: 'image-product-005',
        title: 'Studio Product Shot',
        category: 'image',
        preview: 'Professional product photography on seamless white...',
        fullPrompt: `Professional product photography of [ITEM] on a seamless white cyclorama background. Soft diffused lighting from 45-degree angle, subtle shadow underneath for grounding. Shot with 100mm macro lens, f/8 aperture for edge-to-edge sharpness. E-commerce ready, 4K resolution.`,
        whyItWorks: 'Technical photography terms (cyclorama, diffused lighting, f/8) tell the AI exactly what professionals mean by "product shot" instead of guessing.',
        tags: ['product', 'e-commerce', 'photography'],
        tokensUsed: 65,
        successRate: 92,
        saves: 4201,
    },
    {
        id: 'image-hero-006',
        title: 'Editorial Hero Image',
        category: 'image',
        preview: 'Cinematic wide-angle hero image with dramatic lighting...',
        fullPrompt: `Cinematic wide-angle hero image for a tech startup website. Dramatic rim lighting on the subject, deep depth of field, teal and orange color grade. Composition follows rule of thirds with negative space on the left for text overlay. 21:9 aspect ratio, 8K quality.`,
        whyItWorks: 'The "negative space for text" instruction is crucial for usable hero images. Color grading and aspect ratio ensure it fits modern web layouts.',
        tags: ['hero', 'cinematic', 'web-design'],
        tokensUsed: 72,
        successRate: 87,
        saves: 2890,
    },
    {
        id: 'solve-arch-007',
        title: 'System Architecture Advisor',
        category: 'problem-solving',
        preview: 'As a cloud architect, design a system that handles...',
        fullPrompt: `As a cloud architect, design a system that handles [USE CASE]. Consider: 1) Expected load (requests/second), 2) Data consistency requirements, 3) Latency budget, 4) Cost constraints. Provide architecture diagram description, technology stack recommendations, and trade-off analysis.`,
        whyItWorks: 'Forcing the AI to consider trade-offs prevents idealistic "just use microservices" answers. Real architecture is about constraints.',
        tags: ['architecture', 'cloud', 'system-design'],
        tokensUsed: 110,
        successRate: 86,
        saves: 1678,
    },
    {
        id: 'solve-decision-008',
        title: 'Decision Matrix Builder',
        category: 'problem-solving',
        preview: 'Help me decide between these options using a weighted...',
        fullPrompt: `Help me decide between [OPTION A] and [OPTION B] using a weighted decision matrix. First, ask me clarifying questions to identify my criteria. Then, assign weights to each criterion based on my priorities. Score each option 1-10 per criterion. Show the final calculation.`,
        whyItWorks: 'The "ask me clarifying questions first" clause prevents the AI from making assumptions about your priorities.',
        tags: ['decision-making', 'analysis', 'framework'],
        tokensUsed: 88,
        successRate: 93,
        saves: 2145,
    },
    {
        id: 'creative-story-009',
        title: 'Narrative Hook Generator',
        category: 'creativity',
        preview: 'Write an opening hook that creates immediate tension...',
        fullPrompt: `Write an opening hook (first 100 words) for a [GENRE] story that creates immediate tension. Use the "in medias res" technique—start in the middle of action. Include one sensory detail, one mystery element, and establish stakes within the first paragraph.`,
        whyItWorks: 'Specifying "in medias res" and requiring mystery + stakes in paragraph one produces hooks that actually grab readers.',
        tags: ['writing', 'storytelling', 'hooks'],
        tokensUsed: 55,
        successRate: 90,
        saves: 1834,
    },
    {
        id: 'creative-brand-010',
        title: 'Brand Voice Alchemist',
        category: 'creativity',
        preview: 'Transform this corporate copy into a distinctive brand voice...',
        fullPrompt: `Transform this corporate copy into a distinctive brand voice. My brand personality is [TRAIT 1], [TRAIT 2], and [TRAIT 3]. Use varied sentence lengths, include one unexpected metaphor, and write at an 8th-grade reading level. Avoid: jargon, passive voice, and clichés.`,
        whyItWorks: 'The "8th-grade reading level" instruction prevents purple prose. Banning specific elements (jargon, passive voice) is more effective than just saying "write better."',
        tags: ['copywriting', 'brand-voice', 'marketing'],
        tokensUsed: 75,
        successRate: 88,
        saves: 2567,
    },
    {
        id: 'code-api-011',
        title: 'API Design Blueprint',
        category: 'coding',
        preview: 'Design a RESTful API following OpenAPI 3.0 spec...',
        fullPrompt: `Design a RESTful API for [FEATURE] following OpenAPI 3.0 specification. Include: proper HTTP verbs, meaningful status codes, pagination for lists, rate limiting headers, and versioning strategy. Document each endpoint with request/response examples.`,
        whyItWorks: 'Mentioning OpenAPI 3.0 anchors the output to a real standard. Requiring examples prevents vague "this endpoint does X" descriptions.',
        tags: ['api', 'rest', 'documentation'],
        tokensUsed: 95,
        successRate: 91,
        saves: 1945,
    },
    {
        id: 'ui-design-012',
        title: 'Design System Atoms',
        category: 'ui-ux',
        preview: 'Create a design system starting from atomic elements...',
        fullPrompt: `Create a design system for [BRAND] starting from atomic elements. Define: 1) Color palette (primary, secondary, semantic colors), 2) Typography scale (modular scale 1.25), 3) Spacing system (8px grid), 4) Border radius tokens, 5) Shadow elevation levels. Ensure WCAG AA contrast compliance.`,
        whyItWorks: 'Specifying modular scale 1.25 and 8px grid produces mathematically harmonious systems. WCAG requirement ensures accessibility.',
        tags: ['design-system', 'tokens', 'accessibility'],
        tokensUsed: 88,
        successRate: 94,
        saves: 3456,
    },
    {
        id: 'prompt-optimizer-001',
        title: 'The Prompt Optimizer',
        category: 'general',
        preview: 'Act as a Senior Prompt Engineer to refine a raw idea into a highly optimized prompt...',
        fullPrompt: `Act as a Senior Prompt Engineer with expertise in Large Language Model logic. I need you to refine a raw idea into a highly optimized prompt.

My Goal: [INSERT YOUR GOAL/ROUGH IDEA HERE]
Target Audience for Output: [INSERT AUDIENCE, e.g., Beginner Coders, CEOs]

Please write a comprehensive prompt that I can paste into an AI. The prompt must include:
1. A distinct Persona (e.g., "Expert Copywriter").
2. Clear Context and Constraints.
3. A Step-by-Step reasoning requirement (Chain-of-Thought).
4. Output formatting rules (e.g., Markdown, specific sections).

Output ONLY the optimized prompt in a code block so I can copy it.`,
        whyItWorks: 'The "Senior Prompt Engineer" persona activates best-practice knowledge. Requiring CoT and constraints prevents generic rewrites. Turns vague ideas into structured tasks.',
        tags: ['meta-prompting', 'optimization', 'chain-of-thought'],
        tokensUsed: 145,
        successRate: 96,
        saves: 4521,
    },
    {
        id: 'logic-injector-001',
        title: 'The Logic Injector',
        category: 'general',
        preview: 'Upgrade an existing prompt with Chain-of-Thought and verification logic...',
        fullPrompt: `I have an existing prompt that needs a logic upgrade.

My Current Prompt: "[INSERT YOUR CURRENT PROMPT HERE]"

Rewrite this prompt to include the following advanced logic protocols:
1. **Chain-of-Thought (CoT):** Add instructions for the model to "think silently" or "outline logic" before generating the final answer.
2. **Chain-of-Verification:** Add a final step where the model must critique its own output for errors before finalizing.
3. **Delimiters:** Use ### or --- to clearly separate instruction sections from data.

Keep the original intent of the prompt exactly the same, but maximize its robustness and reasoning capability.`,
        whyItWorks: 'Chain-of-Verification reduces hallucinations by forcing self-review. "Silent thought" triggers System 2 deliberate reasoning. Delimiters (###) prevent instruction/data confusion.',
        tags: ['chain-of-thought', 'verification', 'anti-hallucination'],
        tokensUsed: 132,
        successRate: 93,
        saves: 3892,
    },
    {
        id: 'gold-standard-001',
        title: 'The Gold Standard Optimizer',
        category: 'general',
        preview: 'The ultimate meta-prompt using CoT, System 2, Few-Shot, and verification techniques...',
        fullPrompt: `Role:
You are a Master Prompt Engineer and AI Logic Specialist. Your goal is to take raw, often vague user prompts and transform them into "Gold Standard" prompts optimized for Large Language Models (LLMs) like Gemini and GPT-4.

Objective:
Optimize the user's input to maximize reasoning capabilities, reduce hallucinations, and ensure high-quality coding or text outputs.

Instructions:
Analyze the user's raw prompt below for weaknesses (vague intent, lack of constraints, potential for hallucination). Apply the following advanced techniques where applicable:
1. Persona Adoption: Assign a specific, expert role relevant to the task.
2. Chain-of-Thought (CoT): Add instructions to "think step-by-step" or outline the logic before answering.
3. System 2 Attention: Rewrite the core request to strip bias and irrelevant noise.
4. Few-Shot Templating: If the task involves a pattern, insert placeholders for examples (e.g., "[Insert Example 1 here]").
5. Chain-of-Verification: Add a final step asking the model to verify its own code/facts before finalizing.
6. Delimiters & Formatting: Use clear markdown structures to separate instructions from data.

Output two distinct sections:
SECTION 1: The Improved Prompt: A ready-to-copy, highly optimized version of the request.
SECTION 2: The "Under the Hood" Explanation: Bullet points explaining exactly which techniques you applied and why.

User's Raw Prompt:
"[INSERT YOUR RAW PROMPT HERE]"`,
        whyItWorks: 'System 2 Attention forces deliberate thinking over reactive responses. Dual-output educates users on prompt improvements. Layers multiple safety nets (CoT, Verification, Formatting) to prevent hallucinations.',
        tags: ['meta-prompting', 'system-2', 'few-shot', 'gold-standard'],
        tokensUsed: 285,
        successRate: 97,
        saves: 5234,
    },
];

export const CATEGORY_METADATA: Record<string, { label: string; icon: string; color: string }> = {
    'general': { label: 'Prompt Engineering', icon: 'mingcute:tool-line', color: '#64748B' },
    'coding': { label: 'Coding', icon: 'mingcute:code-line', color: '#00D4FF' },
    'ui-ux': { label: 'UI/UX', icon: 'mingcute:palette-line', color: '#A855F7' },
    'image': { label: 'Image', icon: 'mingcute:pic-line', color: '#22C55E' },
    'problem-solving': { label: 'Problem Solving', icon: 'mingcute:bulb-line', color: '#F97316' },
    'creativity': { label: 'Creativity', icon: 'mingcute:pen-line', color: '#EC4899' },
};

export const categories = [
    { id: 'all', label: 'All Prompts', icon: 'mingcute:grid-line' },
    ...Object.entries(CATEGORY_METADATA).map(([id, meta]) => ({
        id,
        label: meta.label,
        icon: meta.icon
    }))
];
