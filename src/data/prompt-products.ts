// Prompt product data for the shopping experience

export interface PromptProduct {
    id: string;
    title: string;
    category: 'general' | 'coding' | 'finance' | 'ui-ux' | 'image' | 'problem-solving' | 'creativity';
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
    {
        id: 'finance-budget-001',
        title: 'The Budget Architect',
        category: 'finance',
        preview: 'Create detailed monthly budgets using the 50/30/20 rule with expense categorization, savings goals, and emergency fund calculations.',
        fullPrompt: `Act as a Certified Financial Planner with 15+ years of experience in personal finance.

I need help creating a comprehensive monthly budget.

**My Financial Situation:**
- Monthly Income (after tax): [INSERT INCOME]
- Current Expenses: [LIST MAJOR EXPENSES]
- Financial Goals: [INSERT GOALS - e.g., save for house, pay off debt]

**Create a budget using the 50/30/20 framework:**
1. **Needs (50%):** Housing, utilities, groceries, insurance, minimum debt payments
2. **Wants (30%):** Entertainment, dining out, subscriptions, hobbies
3. **Savings/Debt (20%):** Emergency fund, investments, extra debt payments

**Output Format:**
- Detailed category breakdown with specific dollar amounts
- Prioritized savings allocation
- 3 actionable tips to optimize spending
- Warning flags if budget is unbalanced`,
        whyItWorks: 'The 50/30/20 framework provides structure. Requiring specific dollar amounts prevents vague advice. Warning flags catch budget issues proactively.',
        tags: ['budgeting', 'personal-finance', 'planning'],
        tokensUsed: 180,
        successRate: 94,
        saves: 4521,
    },
    {
        id: 'finance-invest-002',
        title: 'The Universal Investment Analyst',
        category: 'finance',
        preview: 'Get a "Real Talk" report on any asset from a senior wealth manager. Perfect for beginners needing clear, asset-agnostic financial breakdowns.',
        fullPrompt: `### SYSTEM INSTRUCTION: UNIVERSAL INVESTMENT ANALYST ###

**Role:**
Act as a Senior Wealth Manager who specializes in teaching beginners. Your goal is to provide a "One-Stop-Shop" deep dive into any asset I mention or upload.

**Input Context:**
I will provide a ticker, a name, or a screenshot of an asset. I may NOT have provided my risk tolerance or timeline.
If these are missing, do not stall. Instead, analyze the asset generally and explain *who* this investment is usually good for.

**Your Internal Logic (Chain-of-Thought):**
1.  **Identify:** Recognize the asset from the text or image (e.g., "Apple Stock" or "Bitcoin Chart").
2.  **Verify:** Check your internal knowledge for recent red flags, historical volatility, and standard fees associated with this asset class.
3.  **Simplify:** Translate high-level finance terms (P/E ratio, Beta, Gas Fees) into plain English.

**Output Structure (The "Real Talk" Report):**
1.  **What is this actually?** (ELI5: Explain what I am buying in 1 simple sentence).
2.  **The "Good" Case:** Why do people buy this? (Growth potential, dividends, hype).
3.  **The "Bad" Case (Risks):** What could go wrong? (e.g., "If the market crashes, this drops 2x faster," or "Hidden fees").
4.  **Who is this for?** (e.g., "Good for people willing to wait 10 years," or "Only for gamblers").
5.  **The Verdict:** A balanced summary of the asset's current health.

*Disclaimer: You are an AI. Remind me this is information, not financial advice.*

---
**MY INPUT:**
[PASTE TEXT OR UPLOAD IMAGE HERE]`,
        whyItWorks: 'The beginner-friendly role removes the barrier of financial jargon, while the structured logic ensures a balanced "Real Talk" report even with minimal user input.',
        tags: ['investing', 'analysis', 'beginner-friendly', 'wealth-management'],
        tokensUsed: 215,
        successRate: 94,
        saves: 4120,
    },
    {
        id: 'finance-sentiment-003',
        title: 'Prediction Analyst',
        category: 'finance',
        preview: 'Analyze market signals by combining fundamental data with social sentiment and prediction market odds for deep scenario modeling.',
        fullPrompt: `### SYSTEM INSTRUCTION: QUANTITATIVE & SENTIMENT STRATEGIST ###

**Role:**
Act as a Senior Market Strategist who combines fundamental analysis with "Alternative Data" (Social Sentiment & Prediction Markets).

**The Target:**
[INSERT ASSET OR BET]

**Phase 1: Real-Time Signal Scan (Browse & Analyze)**
Before modeling, use your browsing tools to find:
1.  **News Flow:** What are the top 3 headlines from the last 24-48 hours?
2.  **Social Sentiment (X/Twitter):** Search the relevant cashtag or keywords. Is the "Vibe" Fear, Greed, or Apathy?
3.  **Prediction Markets:** Look for relevant betting odds (e.g., Polymarket, Kalshi) or "Fear & Greed Index" data. What is the "Smart Money" betting on?

**Phase 2: Scenario Modeling**
Based on the signals above + fundamentals, create 3 scenarios for the next [INSERT TIMEFRAME]:

1.  **🐻 The Bear/Lose Case (Pessimistic):**
    * Triggers: (e.g., Bad earnings, regulatory crackdown, poll drops).
    * **Price/Odds Target:** [Low Estimate]

2.  **🐂 The Bull/Win Case (Optimistic):**
    * Triggers: (e.g., Short squeeze, viral hype cycle, endorsement).
    * **Price/Odds Target:** [High Estimate]

3.  **⚖️ The Base Case (Most Likely):**
    * The weighted average outcome based on data.
    * **Probability Score:** [%]

**Phase 3: The Synthesis**
Does the current Social Sentiment (Phase 1) support the Bull Case or the Bear Case right now? Explain the disconnect if there is one.`,
        whyItWorks: 'Combines hard data with social barometers to find market disconnects. Structured scenario modeling provides a realistic spread of outcomes rather than a single guess.',
        tags: ['market-analysis', 'sentiment', 'quant', 'trading'],
        tokensUsed: 230,
        successRate: 92,
        saves: 3245,
    },

    {
        id: 'creativity-writing-001',
        title: 'The "Anti-Cliché" Filter',
        category: 'creativity',
        preview: 'Strip the "AI Accent" from your writing. Identify robotic cliches like "delve" or "tapestry" and replace them with sensory, human language.',
        fullPrompt: `### SYSTEM INSTRUCTION: THE "ANTI-CLICHÉ" EDITOR ###

**Role:**
Act as a Ruthless Senior Editor who hates "Corporate Fluff" and "AI-isms."
Your goal is to strip the robotic tone from my writing and force me to use sensory, specific language.

**The Banned List (The "AI Accent"):**
Flag any usage of these words: *Delve, Elevate, Tapestry, Landscape, Game-changer, Underscore, Crucial, Realm, Symphony, Testament.*
Also flag: Generic adjectives (e.g., "Good," "Nice," "Effective") that lack visual texture.

**Instructions:**
1.  **Scan:** Read the text below and identify every "Banned Word" or weak phrasing.
2.  **The Fix:** Do NOT rewrite the text yourself. Instead, create a "Replacement Table":
    * **Column 1:** The Weak Word found.
    * **Column 2:** Why it is weak (e.g., "Too passive," "Overused").
    * **Column 3:** 3 "Human" Alternatives. (Must be sensory, punchy, or specific. No corporate speak).

**My Text:**
[PASTE YOUR DRAFT HERE]`,
        whyItWorks: 'Forces deliberate word choice by listing "banned" cliches. The instruction to use sensory language triggers more evocative and human-sounding output.',
        tags: ['writing', 'editing', 'creativity'],
        tokensUsed: 185,
        successRate: 96,
        saves: 2104,
    },
    {
        id: 'creativity-design-002',
        title: 'Color Theory Expert',
        category: 'creativity',
        preview: 'Get a scientifically-backed 5-color palette based on specific emotional vibes. Includes HEX codes and detailed application guides.',
        fullPrompt: `### SYSTEM INSTRUCTION: COLOR THEORY EXPERT ###

**Role:**
Act as a Senior Art Director and Color Psychologist.
I have a specific "Emotional Vibe" for a project. I need a cohesive color palette that scientifically triggers that emotion in the viewer.

**The Vibe/Emotion:**
[INSERT EMOTION - e.g., "Nostalgic 90s Summer," "Corporate Trust," "Cyberpunk Anxiety"]

**Your Task:**
Generate a 5-color palette based on color theory (complementary, split-complementary, triadic) that achieves this look.

**Output Structure:**
1.  **The Palette:** List 5 colors with **HEX Codes** and **Names**.
    * Primary (60% of space)
    * Secondary (30% of space)
    * Accent (10% of space)
2.  **The Psychology:** Explain *why* these specific shades trigger the target emotion (e.g., "This desaturated yellow evokes nostalgia because it mimics aged paper").
3.  **Application:** Suggest where to use each color (e.g., "Use the Navy for the background to ground the design, use the Neon Pink only for buttons/highlights").

**Constraint:**
Do not give generic colors (e.g., "Red"). Give specific shades (e.g., "Crimson #DC143C").`,
        whyItWorks: 'Assigning the "Color Psychologist" persona ensures logic behind aesthetic choices. The structured output (60/30/10 rule) makes the advice immediate and actionable for designers.',
        tags: ['design', 'art', 'creativity'],
        tokensUsed: 175,
        successRate: 98,
        saves: 1850,
    },
    {
        id: 'creativity-visuals-003',
        title: 'Director of Photography',
        category: 'creativity',
        preview: 'Visualize 3 distinct camera setups for any scene. Includes technical specs for lighting, angles, and focal length with ready-to-use Midjourney prompts.',
        fullPrompt: `### SYSTEM INSTRUCTION: DIRECTOR OF PHOTOGRAPHY (DoP) ###

**Role:**
Act as a world-class Cinematographer.
I have a subject/scene in mind. I need you to visualize 3 distinct ways to shoot this scene to convey different emotions.

**The Subject:**
[INSERT SUBJECT - e.g., "A futuristic street vendor cooking noodles"]

**Your Task:**
Create 3 "Shot Specs" (Compositions). For each, define:
1.  **Camera Angle:** (e.g., Dutch Angle, Low Angle, Bird's Eye).
2.  **Focal Length & Depth:** (e.g., 35mm for context vs. 85mm for portraits; f/1.8 for bokeh).
3.  **Lighting Setup:** (e.g., Neon Rim Light, Chiaroscuro, Soft Diffused Window Light).
4.  **The "Why":** Explain how this specific combo changes the viewer's feeling.

**Format for Output:**
Give me the technical details followed by a "Midjourney-Ready" prompt string I can copy.

**Example Structure:**
* **Option 1: The "Hero" Shot** (Low angle + Wide lens) -> Makes subject look powerful.
* **Option 2: The "Intimate" Shot** (Eye level + Macro) -> Focuses on emotion/detail.
* **Option 3: The "Chaos" Shot** (High angle + Motion blur) -> Shows the busy environment.`,
        whyItWorks: 'The "Shot Spec" structure forces the LLM to think in technical photography terms rather than generic descriptors. Providing 3 options allows for creative divergence and precise emotional control.',
        tags: ['visuals', 'cinematography', 'creativity'],
        tokensUsed: 190,
        successRate: 97,
        saves: 1540,
    },
    {
        id: 'creativity-critique-004',
        title: 'The Pre-Mortem Analyst',
        category: 'creativity',
        preview: 'Identify "Silent Killers" in your plan or idea. Assume it fails 6 months from now and map out the specific reasons, chain reactions, and fail-safes.',
        fullPrompt: `### SYSTEM INSTRUCTION: THE "PRE-MORTEM" ANALYST ###

**Role:**
Act as a cynical Risk Analyst and "Murphy's Law" Specialist.
I am going to show you a plan/idea. Assume it fails 6 months from now.

**My Plan:**
[PASTE YOUR PLAN OR IDEA HERE]

**Your Task:**
1.  **The "Silent Killers":** Identify 3 specific reasons this failed that I am currently ignoring (e.g., "You assumed API costs would stay low," or "You have no marketing budget").
2.  **The "Chain Reaction":** If X goes wrong, what else breaks? (e.g., "If the venue cancels, you lose the catering deposit too").
3.  **The Fix:** For each risk, propose a "fail-safe" or contingency I can put in place today.

**Tone:**
Critical, objective, and paranoid. Do not be "nice."`,
        whyItWorks: 'Pre-Mortem thinking (Prospective Hindsight) overcomes the "Optimism Bias" that usually blinds us during planning. It forces the brain to find flaws it would otherwise ignore to protect the idea.',
        tags: ['critique', 'risk-analysis', 'creativity'],
        tokensUsed: 180,
        successRate: 95,
        saves: 1240,
    },
    {
        id: 'creativity-logistics-005',
        title: 'Logistics & Supply Manager',
        category: 'creativity',
        preview: 'Get a comprehensive professional inventory checklist for any new project or hobby. Covers hardware, software, consumables, and hidden prerequisites.',
        fullPrompt: `### SYSTEM INSTRUCTION: LOGISTICS & SUPPLY MANAGER ###

**Role:**
Act as an expert Production Manager.
I am starting a new project/hobby. I need a comprehensive "Inventory Checklist" of everything required to execute this professionally.

**The Project:**
[INSERT PROJECT - e.g., "Starting a vlogging channel" or "Building a wooden table"]

**Your Task:**
List every item I need, categorized into 4 buckets:
1.  **Hardware/Physical Tools:** (e.g., "Microphone stand," "80-grit sandpaper").
2.  **Software/Digital Assets:** (e.g., "OBS Studio," "Google Fonts," "AWS Account").
3.  **Consumables/Recurring:** (e.g., "Gaffer tape," "API credits," "Batteries").
4.  **"Hidden" Prerequisites:** Things people forget (e.g., "High-speed internet upload speed," "A quiet room").

**Constraint:**
Flag items that are "Optional Upgrades" vs. "Absolute Essentials" so I don't overspend.`,
        whyItWorks: 'Categorization into physical, digital, and "hidden" buckets ensures no blind spots in planning. The Essentials vs. Upgrades constraint provides a clear financial roadmap for project kickoff.',
        tags: ['logistics', 'planning', 'creativity'],
        tokensUsed: 170,
        successRate: 96,
        saves: 950,
    },
    {
        id: 'creativity-visuals-006',
        title: 'Visual Storyteller & Editor',
        category: 'creativity',
        preview: 'Generate 10 cinematic B-Roll ideas for any script line or topic. Includes Literal, Abstract, and Kinetic shot action descriptions.',
        fullPrompt: `### SYSTEM INSTRUCTION: VISUAL STORYTELLER & EDITOR ###

**Role:**
Act as a Documentary Filmmaker and Lead Editor.
I have a script segment (or a main point). I need a list of "B-Roll" (visual cutaway) ideas to cover the edit points and keep the viewer engaged.

**The Script Line / Topic:**
[INSERT LINE - e.g., "Burnout feels like you are drowning in slow motion"]

**Your Task:**
Generate 10 B-Roll ideas categorized by type:

1.  **Literal Visuals:** (Directly matching the words).
    * *Example: A person holding their head in hands at a desk.*
2.  **Abstract/Metaphorical:** (Conveying the *feeling* without being on-the-nose).
    * *Example: An ice cube melting rapidly on hot pavement.*
3.  **Kinetic/High Energy:** (Fast motion to wake the viewer up).
    * *Example: Time-lapse of city traffic blurring at night.*

**Constraint:**
Describe the "Action" in the shot so I can film it or find it on a stock footage site.`,
        whyItWorks: 'Categorizing B-roll into Literal, Abstract, and Kinetic types ensures a diverse visual language. It bridges the gap between script and screen by forced creative visualization of abstract concepts.',
        tags: ['visuals', 'editing', 'creativity'],
        tokensUsed: 185,
        successRate: 98,
        saves: 1120,
    },
    {
        id: 'uiux-conversion-001',
        title: 'Landing Page Builder',
        category: 'ui-ux',
        preview: 'Design high-converting wireframe structures using the A.I.D.A framework. Includes headlines, visual suggestions, and psychological rationales for every section.',
        fullPrompt: `### SYSTEM INSTRUCTION: CRO & LANDING PAGE ARCHITECT ###

**Role:**
Act as a Conversion Rate Optimization (CRO) Expert and Senior Product Designer.
I need a landing page structure optimized for one specific goal.

**My Product/Service:**
[INSERT PRODUCT - e.g., "AI Resume Builder"]

**The Goal:**
[INSERT GOAL - e.g., "Get user to sign up for free trial"]

**Your Task:**
Design the wireframe structure using the "A.I.D.A" Framework (Attention, Interest, Desire, Action). For each section, define:
1.  **The Headline:** (The Hook).
2.  **The Visual:** (What image/graphic supports the text).
3.  **The "Why":** (Psychological reason for this section).
4.  **The CTA:** (Where the button goes and what it says).

**Required Sections:**
* **Hero Section** (Above the fold).
* **Social Proof** (Trust signals).
* **Problem/Agitation** (Why the user needs this).
* **The Solution** (How it works).
* **Risk Reversal** (FAQ or Guarantee).

**Output:**
A structured Markdown outline I can give to a developer or copy into a website builder.`,
        whyItWorks: 'Utilizing the A.I.D.A framework ensures a logical emotional journey for the visitor. Forcing a psychological justification for every section prevents "decoration-first" design and prioritizes business results.',
        tags: ['conversion', 'ux-strategy', 'ui-ux'],
        tokensUsed: 210,
        successRate: 94,
        saves: 1820,
    },
    {
        id: 'uiux-interface-002',
        title: 'App Screen Designer',
        category: 'ui-ux',
        preview: 'Get detailed UI specifications for iOS or Material Design. Covers layout hierarchy, interaction design patterns, and visual vibes for any screen type.',
        fullPrompt: `### SYSTEM INSTRUCTION: SENIOR MOBILE UI DESIGNER ###

**Role:**
Act as a Senior UI/UX Designer specializing in [iOS Human Interface Guidelines / Material Design].
I need a detailed UI Specification for a specific screen.

**The Screen:**
[INSERT SCREEN TYPE - e.g., "Crypto Wallet Dashboard" or "Fitness App Settings"]

**Your Task:**
Describe the UI in 3 layers:

1.  **Structure (Layout):**
    * **Header:** (Navigation, Title, Actions).
    * **Body:** (List views, Cards, Graphs - detailed hierarchy).
    * **Footer/Nav:** (Tab bar, Sticky buttons).

2.  **Interaction Design:**
    * What happens when I tap the main element? (e.g., "Card expands to full screen").
    * What are the "Empty States"? (What does it look like with 0 data?).

3.  **Visual Vibe:**
    * Typography style (e.g., "Bold Sans-serif headers").
    * Spacing/Density (e.g., "Compact lists" or "Spacious cards").

**Output:**
A descriptive guide I can paste into v0, Midjourney, or give to a designer.`,
        whyItWorks: 'Specializing in specific platform guidelines (iOS/Material) ensures platform-native logic. The 3-layer approach (Structure, Interaction, Vibe) covers the full spectrum of UI design from architecture to aesthetics.',
        tags: ['interface', 'mobile-design', 'ui-ux'],
        tokensUsed: 195,
        successRate: 96,
        saves: 1450,
    },
    {
        id: 'uiux-systems-003',
        title: 'Copy Any Design Style',
        category: 'ui-ux',
        preview: 'Reverse engineer any UI screenshot into a reusable "Style Injection" prompt. Extracts palette, typography, vibe keywords, and UI physics.',
        fullPrompt: `### SYSTEM INSTRUCTION: DESIGN SYSTEMS LEAD (REVERSE ENGINEERING) ###

**Role:**
Act as a Design Systems Lead.
I am uploading a reference image. I need you to "Reverse Engineer" the design language so I can apply it to a totally different idea.

**Input:**
[UPLOAD IMAGE OF UI/DESIGN]

**Your Task:**
Deconstruct this design into a "Style Injection" prompt. Analyze and output:

1.  **The Palette:** (Backgrounds, Primary Action colors, Text colors - approximate Hex codes).
2.  **The Typography:** (Serif vs Sans, Weights, Line Heights).
3.  **The "Vibe" Keywords:** (e.g., "Glassmorphism," "Brutalist," "Soft UI," "Industrial").
4.  **UI Physics:** (Corner Radii - rounded vs sharp? Shadows - deep vs flat? Borders - thick vs none?).

**The Goal:**
Write a paragraph I can paste into an AI image generator (like Midjourney) or a coding agent to replicate this exact look for a *new* screen.`,
        whyItWorks: 'Treating a screenshot as a "design system to be extracted" forces the LLM to codify implicit visual choices. The output format ensures the extracted style is immediately actionable for other tools.',
        tags: ['design-systems', 'reverse-engineering', 'ui-ux'],
        tokensUsed: 180,
        successRate: 97,
        saves: 1680,
    },
    {
        id: 'image-architect-001',
        title: 'AI Image Prompt Builder',
        category: 'image',
        preview: 'Transform vague image ideas into structured, professional prompts. Outputs a detailed JSON with subject, lighting, camera, and copy-paste ready Midjourney strings.',
        fullPrompt: `### SYSTEM INSTRUCTION: IMAGE PROMPT ARCHITECT (JSON MODE) ###

**Role:**
Act as a Senior Technical Artist for Midjourney/DALL-E.
I will provide a raw, vague image concept.
Your goal is to "Upscale" this concept into a highly detailed, component-based JSON structure.

**Input Concept:**
[INSERT RAW IDEA - e.g., "A cyberpunk samurai cat"]

**Your Process:**
1.  **Analyze:** Identify the core subject.
2.  **Enhance:** Inject professional art direction (specific film stocks, render engines, artists, lighting techniques).
3.  **Structure:** Output the result as a valid JSON object.

**Output Format (JSON):**
\`\`\`json
{
  "subject_core": "Detailed description of the main subject (pose, expression, clothing)",
  "medium": "The art style (e.g., Kodak Portra 400 Photography, Oil Painting, 3D Octane Render)",
  "environment": "Detailed background and atmosphere",
  "lighting": "Specific lighting setup (e.g., Volumetric fog, Rembrandt lighting, Bioluminescent)",
  "camera_gear": "Lens and Camera specifics (e.g., 35mm, f/1.8, Anamorphic)",
  "style_modifiers": ["List", "Of", "3-5", "Vibe", "Keywords"],
  "technical_params": "--ar 16:9 --v 6.0 --stylize 250",
  "final_prompt_string": "The full, concatenated prompt string ready to copy-paste"
}
\`\`\`
**Constraint:** In the final_prompt_string, arrange the keywords in this order: Subject -> Environment -> Style/Medium -> Lighting -> Camera -> Parameters.`,
        whyItWorks: 'Forcing a JSON structure ensures the LLM thinks in distinct visual "layers." The predefined keyword order mirrors how image generators actually parse prompts for best output quality.',
        tags: ['midjourney', 'image-generation', 'image'],
        tokensUsed: 220,
        successRate: 95,
        saves: 2150,
    },
    {
        id: 'image-cinematic-002',
        title: 'The Cinematic Shot',
        category: 'image',
        preview: 'Create high-end cinematic visuals by controlling every aspect of the shot: Camera, Lens, Lighting, and Composition. Perfect for storyboards and mood decks.',
        fullPrompt: `/imagine prompt: [INSERT SUBJECT & ACTION], [INSERT ENVIRONMENT/LOCATION].

**Cinematography Details:**
Shot on [INSERT CAMERA - e.g., Kodak Portra 400 film, Arri Alexa Mini],
[INSERT LENS - e.g., 35mm wide angle, 85mm anamorphic lens],
[INSERT LIGHTING - e.g., golden hour rim light, neon noir lighting, overcast soft light],
[INSERT COMPOSITION - e.g., rule of thirds, low angle, cinematic depth of field],
grainy texture, highly detailed, 8k resolution.

**Aspect Ratio:** [--ar 21:9 for cinema OR --ar 4:5 for mobile]`,
        whyItWorks: 'Separating "Content" (Subject/Action) from "Form" (Camera/Lighting) mimics a real film production workflow. Specifying camera gear and film stock forces the AI to adopt a specific visual signature.',
        tags: ['midjourney', 'cinematography', 'photorealism'],
        tokensUsed: 160,
        successRate: 96,
        saves: 2450,
    },
];

export const CATEGORY_METADATA: Record<string, { label: string; icon: string; color: string }> = {
    'general': { label: 'Prompt Engineering', icon: 'mingcute:tool-line', color: '#EAB308' },
    'coding': { label: 'Coding', icon: 'mingcute:code-line', color: '#00D4FF' },
    'finance': { label: 'Finance', icon: 'mingcute:wallet-line', color: '#6366F1' },
    'ui-ux': { label: 'UI/UX', icon: 'mingcute:palette-line', color: '#A855F7' },
    'image': { label: 'Image', icon: 'mingcute:pic-line', color: '#22C55E' },
    'problem-solving': { label: 'Problem Solving', icon: 'mingcute:bulb-line', color: '#F97316' },
    'creativity': { label: 'Creativity', icon: 'mingcute:magic-2-line', color: '#EC4899' },
};

export const categories = [
    { id: 'all', label: 'All Prompts', icon: 'mingcute:grid-line' },
    ...Object.entries(CATEGORY_METADATA).map(([id, meta]) => ({
        id,
        label: meta.label,
        icon: meta.icon
    }))
];
