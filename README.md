# Avneesh Jadhav — Personal Portfolio

A high-performance personal portfolio built with modern web technologies, featuring smooth scroll animations, vivid gradients, and a Swiss minimalist design system.

**Live Site:** *(add your deployed URL here)*

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP (ScrollTrigger, timelines) + Framer Motion
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React + Custom SVGs

---

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
├── components/          # React components (sections + UI)
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Certifications.tsx
│   ├── Achievements.tsx
│   ├── Contact.tsx
│   ├── Collaboration.tsx
│   ├── Philosophy.tsx
│   ├── Protocol.tsx
│   ├── Features.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Preloader.tsx
│   ├── SmoothScroll.tsx
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useSmoothScroll.ts
│   └── useScrollVelocity.ts
├── index.css            # Tailwind theme + design system utilities
├── App.tsx              # Root layout
└── main.tsx             # Entry point
```

---

## Design System

The site uses a custom Swiss Minimalist + Vivid Gradients palette defined in `src/index.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#FAFAFA` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, panels |
| `--color-text-primary` | `#0A0A0A` | Headings, body |
| `--color-text-secondary` | `#555555` | Captions, labels |
| `--color-accent` | `#FF3366` | Primary accent (pink) |
| `--color-accent-teal` | `#00D4AA` | Secondary accent |
| `--color-accent-indigo` | `#6366F1` | Tertiary accent |

---

## Deployment

This project builds to a static site in the `dist/` folder. Recommended platforms:

- **Vercel** — `vercel --prod`
- **Netlify** — Drag & drop `dist/` folder
- **GitHub Pages** — Use GitHub Actions or `gh-pages` branch

> **Note:** Do not commit the `dist/` folder to version control. It is generated at build time.

---

## License

© 2026 Avneesh Jadhav. All rights reserved.
