# 🌌 The Vibe Library
### _A Digital Athenaeum for AI Coding Patterns & Prompt Engineering_
The Vibe Library is a premium, high-fidelity archival system designed to catalog the evolving relationship between human intent (prompts) and machine execution (code). Inspired by the "Liquid Glass" and spatial design aesthetics of VisionOS, it serves as both a functional tool for prompt engineering and a visual gallery of "Vibe Coding" masterpieces.
---
## ✨ Key Features
### 🔭 The Galaxy Engine
A high-performance 3D background powered by **Three.js** and **React Three Fiber**.
- **Procedural Starfields**: Thousands of unique stars generated with a safety void to prevent camera clipping.
- **Dynamic Nebulae**: Soft, volumetric light constructs that provide depth and atmosphere.
- **Warp Mode**: A smooth transition into "hyperspace" triggered during intensive tool usage like the Prompt Crafter.
### 🛍️ The Prompt Shop
A curated marketplace of pattern-matched prompt products.
- **Category Filtering**: Seamlessly switch between Coding, UI/UX, Image Generation, and Problem Solving.
- **Interactive Preview**: Cards with flip animations and deep glassmorphism that reveal underlying metrics and details.
### 🛠️ Prompt Crafter
An intuitive workstation for synthesizing new prompts.
- **Context-Aware Generation**: Scaffolds prompts based on goals and additional constraints.
- **Micro-Interactions**: Smooth panel transitions and persistent state management.
### 🔍 OmniSearch
A high-speed, keyboard-driven search and filter interface.
- **Faceted Search**: Filter by language, vibe, or model.
- **Substrate Lens**: A unique "targeting" UI that focuses the user's attention.
### 💎 Pattern Cards
A diverse set of data visualization components:
- **Golden Cards**: High-standard reference patterns with "Golden Standard" status.
- **Blueprint Cards**: Template-based structures with variable slots.
- **Evolution Sliders**: Visualize how a prompt matures through iterations.
- **Vibe Metrics**: Quantitative analysis of prompt efficiency and clarity.
---
## 🎨 Design Philosophy: "Liquid Glass"
The project adheres to a strict "Liquid Clarity" design system:
- **Extreme Glassmorphism**: Heavy `backdrop-filter` usage (blur + saturation) to simulate thick, optical-grade glass.
- **Inner Glows & Bevels**: Volumetric button designs with multiple inset shadows to create a 3D pill shape.
- **Tactile Feedback**: Subtle `:active` scale-downs and lighting shifts to provide a premium, hand-crafted feel.
- **Color Palette**: Centered around `var(--void-black)` with curated neon accents (`neon-blue`, `neon-green`, `neon-amber`).
---
## 🛠️ Technical Stack
- **Core**: Next.js 16 (App Router)
- **3D/Graphics**: Three.js, React Three Fiber, Drei, Postprocessing
- **Animations**: GSAP (GreenSock), ScrollTrigger, Framer Motion
- **Styles**: Vanilla CSS Modules (using the "Substrate" design system)
- **Icons**: Iconify
- **Deployment**: GitHub Pages (via automated GitHub Actions pipeline)
---
## 🚀 Getting Started
### Installation
```bash
# Clone the repository
git clone https://github.com/derin/vibe-library.git
# Install dependencies
npm install
# Run the development server
npm run dev
```
### Static Export
The project is optimized for static hosting on GitHub Pages. To generate the static output:
```bash
npm run build
```
The output will be generated in the `out/` directory.
---
## 📂 Project Structure
- `/src/components`: Atomic and compound UI components.
- `/src/components/galaxy`: Specialized 3D components for the background.
- `/src/data`: The library's core knowledge base (Prompt Products, Golden Standards, etc.).
- `/src/app`: Next.js pages and global layout/styles.
- `.github/workflows`: CI/CD pipeline for automated deployment.
---
## 📜 Metadata & SEO
The library is built with SEO best practices:
- **Semantic HTML**: Fully accessible form fields with associated labels and unique IDs.
- **Metadata**: Comprehensive OpenGraph tags and structured metadata for better indexing.
- **Performance**: Optimized asset loading and static generation.
---
Created with ❤️ by **Derin**
