# Vibe Library

A visual prompt library built with Next.js 16. Browse curated prompt cards across categories like Prompt Engineering, Coding, Problem Solving, Learning, Image, UI/UX, and more. Includes a Prompt Crafter, full-text prompt search, and an animated landing page.

**[View Live](https://derinbarutcu17.github.io/VibeLibrary/)**

## Features

- **Prompt Catalog** — Curated cards organized by category with preview + full-prompt reveal
- **Prompt Crafter** — Build custom prompts with structured inputs
- **Full-Text Search** — Search across all prompts with instant results
- **Category Filtering** — Filter by tags: `general`, `coding`, `finance`, `ui-ux`, `image`, `problem-solving`, `creativity`, `learning`, `predicting`
- **Why It Works** — Each card explains why the prompt is effective
- **Animated UI** — 3D atmospheric background, smooth transitions, and reactive call-to-action
- **i18n Ready** — Turkish and German translations wired in

## Tech Stack

| Concern | Choice |
|---------|--------|
| Framework | Next.js 16 (App Router) |
| React | React 19 + React Compiler |
| Styling | CSS Modules + Tailwind CSS v4 |
| 3D / Atmosphere | Three.js, @react-three/fiber, @react-three/drei |
| Animation | Framer Motion, GSAP |
| Icons | Iconify |
| Deployment | GitHub Pages (static export) |
| Language | TypeScript 5 |
| Package manager | npm |

## Getting Started

```bash
git clone https://github.com/derinbarutcu17/VibeLibrary.git
cd VibeLibrary
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (static export) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
src/
├── app/           # App Router pages and layout
│   ├── layout.tsx
│   ├── page.tsx
│   └── crafter/
├── components/    # UI components
│   ├── galaxy/    # 3D atmospheric components
│   ├── GoldenCard.tsx
│   ├── BlueprintCard.tsx
│   ├── OmniSearch.tsx
│   ├── PromptCrafter.tsx
│   └── VibeOrb3D.tsx
├── data/          # Prompt catalog and content data
│   ├── prompt-products.ts
│   ├── golden-standards.ts
│   ├── case-studies.ts
│   └── types.ts
└── i18n/          # Locale files
```

## Content Model

Prompts are defined in `src/data/prompt-products.ts` with the following schema:

```typescript
interface PromptProduct {
  id: string;
  title: string;
  category: 'general' | 'coding' | 'finance' | 'ui-ux' | 'image'
          | 'problem-solving' | 'creativity' | 'learning' | 'predicting';
  preview: string;       // Short preview shown on card front
  fullPrompt: string;    // Full prompt text to copy
  whyItWorks: string;    // Explanation shown on card back
  tags: string[];
  tokensUsed: number;
  successRate: number;   // Percentage
  saves: number;
}
```

## License

MIT &mdash; see [LICENSE](./LICENSE).
