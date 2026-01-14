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
        id: 'coding-root-cause-001',
        title: 'The Root Cause Investigator',
        category: 'coding',
        preview: 'Identify difficult bugs by brainstorming 5 distinct root causes with confidence scores. Includes specific investigation steps for each hypothesis.',
        fullPrompt: `Act as a Principal Software Engineer and Systems Detective. I am facing a complex issue in my codebase and I need a deep root cause analysis.

**The Symptom/Bug:**
[INSERT SYMPTOM HERE - e.g., "Login page times out only on mobile devices"]

**Relevant Code Snippets/Context:**
[INSERT RELEVANT CODE OR ERROR LOGS HERE]

**Task:**
1. Analyze the provided context and "read between the lines" of the code.
2. Brainstorm the **Top 5 Potential Causes** for this issue (consider race conditions, dependency conflicts, environment variables, logic errors, etc.).
3. Assign a **Confidence Score (0-100%)** to each hypothesis based on the evidence.
4. For each cause, provide a specific **"Investigation Step"** (how I can verify if this is the cause) and a **"Fix Strategy"**.

Output format:
Please present the 5 causes in a Markdown table, followed by a detailed explanation for the #1 most likely cause.`,
        whyItWorks: 'Probabilistic Thinking: Confidence Scores force expert weighing of evidence. Divergent Thinking: Demanding "5 causes" breaks pattern-matching to obvious answers. Action-Oriented: Investigation Steps ensure a verifyable plan, not just theory.',
        tags: ['debugging', 'root-cause', 'analysis'],
        tokensUsed: 150,
        successRate: 98,
        saves: 4521,
    },
    {
        id: 'coding-architect-002',
        title: 'The Code Cleaner',
        category: 'coding',
        preview: 'Refactor working but messy code into production-grade software using SOLID principles, strict typing, and Big O optimization.',
        fullPrompt: `Act as a Senior Software Architect with 15+ years of experience in [INSERT LANGUAGE, e.g., Python/TypeScript].

I have a piece of code that functions but needs refactoring for scalability, readability, and performance.

My Code:
[INSERT CODE HERE]

Please refactor this code applying the following standards:
1. **SOLID Principles:** Ensure classes/functions have single responsibilities.
2. **Type Safety:** Add strict typing where applicable.
3. **Error Handling:** Replace generic errors with specific try/catch blocks.
4. **Optimization:** Reduce time complexity (Big O) where possible.

Output the refactored code first, followed by a bulleted list of exactly what you changed and why.`,
        whyItWorks: 'Assigning the "Senior Architect" persona activates higher-level reasoning. Explicit constraints (SOLID, Big O) push the model beyond simple syntax cleanup into actual engineering work.',
        tags: ['refactoring', 'clean-code', 'optimization'],
        tokensUsed: 110,
        successRate: 95,
        saves: 3820,
    },
    {
        id: 'coding-spec-003',
        title: 'The Idea Blueprint',
        category: 'coding',
        preview: 'Transform casual feature ideas into precise technical specifications (PRDs) that AI coding agents can execute without confusion.',
        fullPrompt: `Act as a Senior Product Manager. I have a feature idea, but I need a technical specification file to give to my Coding Agent so it builds it correctly the first time.

My Idea: "[INSERT YOUR IDEA HERE - e.g., Add a dark mode toggle to the navbar]"

Output a "Feature Specification" in Markdown that I can paste into my Code Agent. It must include:
1. **User Story:** How it works from the user's perspective.
2. **Technical Requirements:** (e.g., use LocalStorage for persistence, specific Tailwind colors, icon library).
3. **Edge Cases:** (e.g., What happens if the user has a system preference for dark mode?).
4. **Step-by-Step Implementation Plan:** A checklist for the Agent to follow.

Write this specifically for an AI Agent to read and execute without confusion.`,
        whyItWorks: 'AI agents fail significantly less when given a spec vs. a vague idea. This prompt forces you to define edge cases and tech requirements before code is written.',
        tags: ['product-management', 'specs', 'requirements'],
        tokensUsed: 130,
        successRate: 96,
        saves: 4901,
    },
    {
        id: 'coding-safe-004',
        title: 'The Safe Update',
        category: 'coding',
        preview: 'Request code changes while prioritizing stability. Analyzes file dependencies and potential impacts before making any modifications.',
        fullPrompt: `I need to make a change to the codebase, but you must prioritize STABILITY. Do not break existing functionality.

The Request: "[INSERT REQUEST - e.g., Move the signup button to the left]"

Before writing any code, perform a "Impact Analysis":
1. **Identify Files:** List which files you need to touch.
2. **Check Dependencies:** List what *other* parts of the app rely on these files (e.g., specific CSS classes or functions).
3. **The Plan:** Explain how you will apply the change *without* affecting those dependencies.
4. **Verification:** Add a check to ensure the rest of the app still loads correctly.

Execute only after you have confirmed the plan is safe.`,
        whyItWorks: 'Forcing the AI to analyze impact before coding prevents the "break everything to fix one thing" problem. The verification step catches regressions before they happen.',
        tags: ['stability', 'safe-updates', 'impact-analysis'],
        tokensUsed: 105,
        successRate: 97,
        saves: 3654,
    },

    {
        id: 'prompt-optimizer-001',
        title: 'The Prompt Optimizer',
        category: 'general',
        preview: 'Transform raw ideas into expert-level prompts using System 2 reasoning, CoT, and persona adoption. Outputs the optimized prompt plus an explanation.',
        fullPrompt: `Act as a Master Prompt Engineer and AI Logic Specialist. Your goal is to take raw, often vague user prompts and transform them into "Gold Standard" prompts optimized for Large Language Models (LLMs).

My Goal/Raw Prompt: [INSERT YOUR GOAL/ROUGH IDEA HERE]
Target Audience: [INSERT AUDIENCE, e.g., Beginner Coders, CEOs]

**Analyze and Optimize:**
Analyze my raw prompt for weaknesses (vague intent, lack of constraints, potential for hallucination). Apply the following advanced techniques:
1. **Persona Adoption:** Assign a specific, expert role relevant to the task.
2. **Chain-of-Thought (CoT):** Add instructions to "think step-by-step" or outline the logic before answering.
3. **System 2 Attention:** Rewrite the core request to strip bias and irrelevant noise.
4. **Few-Shot Templating:** If the task involves a pattern, insert placeholders for examples (e.g., "[Insert Example 1 here]").
5. **Chain-of-Verification:** Add a final step asking the model to verify its own output before finalizing.
6. **Delimiters & Formatting:** Use clear markdown structures to separate instructions from data.

**Output two distinct sections:**
SECTION 1: The Improved Prompt - A ready-to-copy, highly optimized version in a code block.
SECTION 2: The "Under the Hood" Explanation - Bullet points explaining exactly which techniques you applied and why.`,
        whyItWorks: 'System 2 Attention forces deliberate thinking. Dual-output educates users on improvements. Layers multiple safety nets (CoT, Verification, Formatting) to prevent hallucinations.',
        tags: ['meta-prompting', 'system-2', 'optimization'],
        tokensUsed: 210,
        successRate: 97,
        saves: 9755,
    },
    {
        id: 'logic-injector-001',
        title: 'The Logic Injector',
        category: 'general',
        preview: 'Upgrade any existing prompt by injecting chain-of-thought reasoning, self-verification steps, and clear delimiter filtering.',
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
        id: 'silver-bullet-001',
        title: 'The Silver Bullet',
        category: 'general',
        preview: 'Universal wrapper that silently upgrades any request into expert-level execution. Inject persona, logic, and action-bias without asking permission.',
        fullPrompt: `### SYSTEM INSTRUCTION: SILENT OPTIMIZATION & EXECUTION ###

**Your Goal:**
I am providing a raw request below. Do NOT rewrite the prompt for me.
Instead, act as a "Universal Expert." You must silently upgrade the raw request into a "God-Tier" prompt in your internal processing, and **IMMEDIATELY EXECUTE** the optimized task.

**Your Internal Process (Silent):**
1. **Persona Injection:** Instantly adopt the highest-level expert persona relevant to the specific task (e.g., "Senior Security Engineer" for code, "Direct Response Copywriter" for text).
2. **Logic Upgrade:** Apply step-by-step reasoning (Chain-of-Thought) and remove ambiguity *before* generating output.
3. **Signal-to-Noise Enforcement:** Output ONLY the high-quality result. Do not include preambles like "Here is your improved version." Remove all fluff.
4. **Action Bias:** Ensure the result is actionable, specific, and dense with value (Operator-Grade).

---
**MY RAW REQUEST:**
[INSERT YOUR RAW REQUEST HERE]`,
        whyItWorks: 'The "Silent Optimization" instruction prevents the AI from explaining what it will do and forces immediate execution. Signal-to-Noise enforcement eliminates bloated responses.',
        tags: ['universal', 'wrapper', 'silent-execution'],
        tokensUsed: 165,
        successRate: 98,
        saves: 6123,
    },
];

export const CATEGORY_METADATA: Record<string, { label: string; icon: string; color: string }> = {
    'general': { label: 'Prompt Engineering', icon: 'mingcute:tool-line', color: '#EAB308' },
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
