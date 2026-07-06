# Vibe Library Agent Guide

## Identity

Vibe Library is a visual prompt library built with Next.js. It catalogs prompt engineering patterns, prompt products, and related content in a polished, high-density interface.

This repo is as much about visual direction as functionality. Keep the interface intentional, atmospheric, and distinctly styled.

## Core Rules

- Preserve the editorial, gallery-like feel.
- Keep the prompt catalog structured and browsable.
- Treat animation and 3D elements as part of the product, not decoration.
- Keep content models and UI components aligned.
- Do not collapse the design into a generic SaaS layout.

## Repo Layout

- `src/app/` - App Router pages, layout, globals, and page-specific styling.
- `src/components/` - Prompt cards, galleries, search, metrics, and motion components.
- `src/components/galaxy/` - 3D background and atmospheric visual components.
- `src/data/` - Prompt products, case studies, and supporting data.
- `src/i18n/` - Localization wiring and locale files.
- `public/` - Static assets.
- `remotion/` - Motion/export companion project.

## Important Files

- `src/app/page.tsx` - Main landing page.
- `src/app/crafter/page.tsx` - Prompt Crafter page.
- `src/app/layout.tsx` - Global layout and metadata wiring.
- `src/app/globals.css` - Global visual system and CSS variables.
- `src/components/PromptCrafter.tsx` - Prompt creation UI.
- `src/components/OmniSearch.tsx` - Search and filter surface.
- `src/components/GoldenCard.tsx` and `src/components/BlueprintCard.tsx` - Core catalog presentation components.
- `src/components/VibeOrb3D.tsx` and `src/components/galaxy/*` - Atmosphere and 3D background pieces.
- `src/data/prompt-products.ts` - Main prompt catalog data.
- `src/data/golden-standards.ts` - Reference patterns.

## Important Docs

- `README.md` - Core overview and stack.
- `README_EXPANSIVE.md` - Deeper design language and system framing.

## Typical Workflow

1. Read the expansive README before large visual changes.
2. Keep content data and component props aligned.
3. Update the relevant CSS module and component together.
4. Check desktop and mobile behavior after layout changes.
5. Verify the 3D and animated pieces still feel smooth and deliberate.

## Common Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Editing Guidance

- Favor strong typography, layered surfaces, and purposeful motion.
- Keep category filters, prompt cards, and crafter flows easy to scan.
- If you modify prompt categories or search behavior, update the supporting data model too.
- Keep `src/data/` as the source for catalog content, not hardcoded inside components.
- If you change locale content, update all locale files that rely on the same copy.

## What Not To Do

- Do not replace the design language with a generic dashboard aesthetic.
- Do not remove atmosphere just to simplify implementation.
- Do not let one-off visual tweaks drift away from the data model.
- Do not break the static build target or the app router structure.

## Validation Mindset

The app should feel like a premium prompt archive. If a change makes it feel flatter, less curated, or less intentional, it probably needs another pass.
