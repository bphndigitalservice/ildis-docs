# AGENTS.md - Agent Coding Guidelines

This document provides guidelines for agentic coding agents operating in this repository.

## Project Overview

This is an **Astro + Starlight** documentation site for ILDIS (Indonesia Law Documentation Information System). The site is built with TypeScript and uses pnpm as the package manager.

## Build/Lint/Test Commands

### Package Manager
This project uses **pnpm** (not npm or yarn).

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Run Astro CLI commands
pnpm astro <command>

# Type checking
pnpm astro check

# Get help
pnpm astro -- --help
```

### Running a Single Test
This project does not have test files configured. It's a documentation site.

### Type Checking
```bash
pnpm astro check
```

## Code Style Guidelines

### General Conventions
- Use **2 spaces** for indentation
- Use **single quotes** for strings in JS/TS files
- Use **trailing commas** in multi-line objects/arrays
- Use **semicolons** at the end of statements
- Maximum line length: **100 characters** (soft guideline)
- Add **type annotations** to function parameters and return types where beneficial

### File Naming
- **Components**: PascalCase (e.g., `Footer.astro`, `CustomComponent.ts`)
- **Configuration**: camelCase with appropriate extension (e.g., `astro.config.mjs`)
- **Content docs**: kebab-case (e.g., `tentang-ildis.mdx`)

### TypeScript
- Use `astro/tsconfigs/strict` as the base TypeScript config
- Enable `@ts-check` in .mjs files that need type checking
- Define explicit return types for exported functions

### Astro Components (.astro files)
- Frontmatter uses TypeScript (`---` code fence)
- Import components at the top of the frontmatter
- Use `<style>` blocks with `@layer` for Starlight theme integration
- Keep styles scoped to the component using Starlight CSS variables

### Imports
- Sort imports logically: built-in → external → relative
- Use absolute imports from packages when available
- Relative imports for local files start with `./` or `../`

```typescript
// Example import order
import { defineConfig } from 'astro/config';     // external package
import starlight from '@astrojs/starlight';      // external package
import Footer from '../components/Footer.astro'; // relative
```

### Configuration Files
- Use JSDoc-style comments for configuration explanations (e.g., `// https://astro.build/config`)
- Keep configuration in `astro.config.mjs` well-organized with comments

### Markdown/MDX Content
- Content lives in `src/content/docs/`
- Use `.mdx` for components that need interactivity
- Follow Starlight's content schema
- Use relative paths for internal links

### Error Handling
- Use Astro's built-in error handling
- For component errors, ensure graceful degradation
- Log meaningful error messages for debugging

### VS Code Extensions
Recommended extensions (see `.vscode/extensions.json`):
- Astro
- TypeScript and JavaScript Language Features

## Project Structure

```
.
├── src/
│   ├── components/       # Astro components
│   ├── content/
│   │   └── docs/         # Documentation pages (.md/.mdx)
│   ├── styles/           # CSS files
│   └── assets/           # Images and static assets
├── public/               # Static files (favicons, etc.)
├── astro.config.mjs      # Main Astro configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Common Tasks

### Adding a new documentation page
1. Create a new `.md` or `.mdx` file in `src/content/docs/`
2. Add frontmatter with title, description, and other metadata
3. Add the page to the sidebar in `astro.config.mjs`

### Adding a new component
1. Create `.astro` file in `src/components/`
2. Import and use it in relevant pages or config

### Modifying the theme
- Custom CSS goes in `src/styles/`
- Starlight theme configuration is in `astro.config.mjs`

## Dependencies

Key packages:
- `astro` - Core framework
- `@astrojs/starlight` - Documentation theme
- `@astrojs/vercel` - Deployment adapter
- `starlight-theme-nova` - Custom theme
- `sharp` - Image processing
- `@astrojs/sitemap` - Sitemap generation