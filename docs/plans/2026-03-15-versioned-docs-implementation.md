# Versioned Documentation Implementation Plan

> **For Claude:** Use executing-plans skill to implement this plan task-by-task.

**Goal:** Add multi-version documentation support with navbar dropdown and versioned sidebars

**Architecture:** Move docs to versioned directories (v4/, v5/), add version selector component, configure Starlight sidebar per version

**Tech Stack:** Astro, Starlight, TypeScript

---

### Task 1: Create v4 directory and move existing docs

**Files:**
- Create: `src/content/docs/v4/`
- Modify: Move existing docs from `src/content/docs/` to `src/content/docs/v4/`

**Step 1: Create v4 directory and move docs**

```bash
mkdir -p src/content/docs/v4
mkdir -p src/content/docs/v5

# Move all existing docs to v4
mv src/content/docs/*.mdx src/content/docs/v4/
mv src/content/docs/*.md src/content/docs/v4/
mv src/content/docs/integrasi src/content/docs/v4/
```

**Step 2: Commit**

```bash
git add src/content/docs/v4/
git commit -m "feat: move existing docs to v4 version"
```

---

### Task 2: Create v5 directory with sample docs

**Files:**
- Create: `src/content/docs/v5/`

**Step 1: Create v5 index and about page**

Create `src/content/docs/v5/index.mdx`:

```mdx
---
title: ILDIS v5
description: Dokumentasi ILDIS versi terbaru
template: splash
hero:
  tagline: Sistem Informasi Dokumentasi Hukum Indonesia v5
  image:
    file: ../../assets/houston.webp
  actions:
    - text: Mulai Membaca
      link: /v5/tentang-ildis
      icon: right-arrow
    - text: GitHub
      link: https://github.com/bphndigitalservice/ildis
      icon: external
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## What's New in v5

<CardGrid stagger>
	<Card title="Performa Lebih Cepat" icon="rocket">
		Optimasi database dan caching untuk respons lebih cepat.
	</Card>
	<Card title="UI/UX Baru" icon="pencil">
		Antarmuka baru yang lebih modern dan responsif.
	</Card>
	<Card title="API REST" icon="puzzle">
		API RESTful lengkap untuk integrasi eksternal.
	</Card>
	<Card title="Dokumentasi API" icon="open-book">
		Swagger/OpenAPI documentation terintegrasi.
	</Card>
</CardGrid>
```

Create `src/content/docs/v5/tentang-ildis.mdx`:

```mdx
---
title: Tentang ILDIS v5
description: Apa itu ILDIS dan fitur barunya di versi 5
---

# Tentang ILDIS v5

ILDIS (Indonesia Law Documentation Information System) adalah sistem informasi dokumentasi hukum Indonesia.

## Fitur Baru di v5

- **Performa Tinggi** - Optimasi query dan caching
- **REST API** - API terstruktur untuk integrasi
- **Dokumentasi Swagger** - Auto-generated API docs
- **UI Modern** - Tampilan baru yang lebih responsif

## Requirements

- PHP 8.2+
- MySQL 8.0+
- Node.js 18+
```

**Step 2: Commit**

```bash
git add src/content/docs/v5/
git commit -m "feat: add v5 sample documentation"
```

---

### Task 3: Configure Starlight sidebar for versions

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Update sidebar config**

Replace the sidebar configuration with versioned sidebars:

```javascript
// In starlight config:
sidebar: [
    {
        label: 'v5 (Latest)',
        translations: { id: 'v5 (Terbaru)' },
        autogenerate: { directory: 'v5' },
    },
    {
        label: 'v4',
        translations: { id: 'v4' },
        autogenerate: { directory: 'v4' },
    },
],
```

**Step 2: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: configure versioned sidebars in Starlight"
```

---

### Task 4: Create version selector component

**Files:**
- Create: `src/components/VersionSelect.astro`

**Step 1: Create version selector**

```astro
---
// src/components/VersionSelect.astro
---

<div class="version-select">
  <select id="version-dropdown" onchange="switchVersion(this.value)">
    <option value="v5" selected>v5 (Latest)</option>
    <option value="v4">v4</option>
  </select>
</div>

<script>
  function switchVersion(version) {
    const currentPath = window.location.pathname;
    
    // If already on correct version, do nothing
    if (currentPath.includes(`/${version}/`) || currentPath === `/${version}`) {
      return;
    }
    
    // Remove any existing version from path
    let newPath = currentPath.replace(/^\/(v4|v5)/, '');
    if (!newPath.startsWith('/')) {
      newPath = '/' + newPath;
    }
    
    // Redirect to new version
    window.location.href = `/${version}${newPath}`;
  }
</script>

<style>
  .version-select {
    display: flex;
    align-items: center;
  }
  
  .version-select select {
    background: transparent;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.25rem;
    color: var(--sl-color-white);
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
  }
  
  .version-select select:hover {
    border-color: var(--sl-color-accent);
  }
  
  .version-select option {
    background: var(--sl-color-bg);
    color: var(--sl-color-white);
  }
</style>
```

**Step 2: Add component to Footer or create custom header**

Since Starlight doesn't easily support custom navbar components, let's add version selector to the existing Footer component instead.

Actually, let's add it via custom CSS injection in the head - simpler approach.

**Step 3: Commit**

```bash
git add src/components/VersionSelect.astro
git commit -m "feat: add version selector component"
```

---

### Task 5: Add version selector to header via custom head

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Add version selector to head**

Add this to the head array in Starlight config:

```javascript
// Add after existing head items:
{
    tag: 'style',
    content: `
        .version-select-wrapper {
            display: flex;
            align-items: center;
            margin-inline-end: 1rem;
        }
        .version-select-wrapper select {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 0.25rem;
            color: var(--sl-color-white);
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
            cursor: pointer;
        }
        .version-select-wrapper select:hover {
            background: rgba(255,255,255,0.2);
        }
    `,
},
{
    tag: 'script',
    content: `
        document.addEventListener('DOMContentLoaded', function() {
            var nav = document.querySelector('.header-bottom-nav');
            if (nav) {
                var wrapper = document.createElement('div');
                wrapper.className = 'version-select-wrapper';
                wrapper.innerHTML = '<select id="version-selector"><option value="v5">v5 (Latest)</option><option value="v4">v4</option></select>';
                nav.insertBefore(wrapper, nav.firstChild);
                
                var currentPath = window.location.pathname;
                var selector = document.getElementById('version-selector');
                
                if (currentPath.includes('/v4/')) {
                    selector.value = 'v4';
                } else if (currentPath.includes('/v5/')) {
                    selector.value = 'v5';
                } else {
                    // Default to v5
                    selector.value = 'v5';
                }
                
                selector.addEventListener('change', function(e) {
                    var version = e.target.value;
                    var currentPath = window.location.pathname;
                    
                    // Extract the doc path
                    var pathParts = currentPath.split('/').filter(Boolean);
                    
                    // Remove version if present
                    if (pathParts[0] === 'v4' || pathParts[0] === 'v5') {
                        pathParts.shift();
                    }
                    
                    var docPath = pathParts.join('/') || 'tentang-ildis';
                    window.location.href = '/' + version + '/' + docPath;
                });
            }
        });
    `,
},
```

**Step 2: Test**

Run: `pnpm dev`
Visit: `http://localhost:4321/v5/tentang-ildis`

Expected: Version selector in navbar, switching versions works

**Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: add version selector to navbar"
```

---

### Task 6: Type check and verify

**Files:**
- Verify: existing project files

**Step 1: Run type check**

Run: `pnpm astro check`

Expected: No errors

**Step 2: Verify pages**

Run: `pnpm dev` and test:
- `/v4/tentang-ildis` - shows v4 docs
- `/v5/tentang-ildis` - shows v5 docs  
- Version dropdown works

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: complete versioned documentation"
```

---

**Plan complete!**

Two execution options:

1. **Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks
2. **Parallel Session** - Open new session with executing-plans skill