# Release Banner Implementation Plan

> **For Claude:** Use executing-plans skill to implement this plan task-by-task.

**Goal:** Add a persistent top banner that fetches and displays the latest ILDIS release from GitHub

**Architecture:** Client-side banner component fetches from an Astro API endpoint which proxies GitHub's releases API

**Tech Stack:** Astro, Starlight, TypeScript

---

### Task 1: Create API endpoint to fetch latest release

**Files:**
- Create: `src/pages/api/releases.json.ts`

**Step 1: Create API endpoint**

```typescript
// src/pages/api/releases.json.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/bphndigitalservice/ildis/releases/latest', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'ILDIS-Docs',
      },
    });

    if (!response.ok) {
      return new Response(null, { status: 500 });
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      tag_name: data.tag_name,
      published_at: data.published_at,
      html_url: data.html_url,
      body: data.body,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response(null, { status: 500 });
  }
};
```

**Step 2: Test the endpoint**

Run: `pnpm dev` and visit `http://localhost:4321/api/releases.json`

Expected: JSON response with release info

**Step 3: Commit**

```bash
git add src/pages/api/releases.json.ts
git commit -m "feat: add API endpoint for fetching latest ILDIS release"
```

---

### Task 2: Create ReleaseBanner component

**Files:**
- Create: `src/components/ReleaseBanner.astro`

**Step 1: Create the banner component**

```astro
---
// src/components/ReleaseBanner.astro
---

<div id="release-banner" class="release-banner" style="display: none;">
  <div class="banner-content">
    <span class="banner-text"></span>
    <a href="#" class="banner-link" target="_blank" rel="noopener">Lihat Changelog</a>
  </div>
</div>

<script>
  async function loadReleaseBanner() {
    try {
      const response = await fetch('/api/releases.json');
      if (!response.ok) return;

      const data = await response.json();
      const banner = document.getElementById('release-banner');
      const bannerText = banner?.querySelector('.banner-text');
      const bannerLink = banner?.querySelector('.banner-link');

      if (banner && bannerText && bannerLink) {
        const date = new Date(data.published_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        bannerText.textContent = `ILDIS ${data.tag_name} telah dirilis pada ${date}`;
        bannerLink.href = data.html_url;
        banner.style.display = 'block';
      }
    } catch (e) {
      console.error('Failed to load release banner:', e);
    }
  }

  loadReleaseBanner();
</script>

<style>
  .release-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    color: white;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .banner-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .banner-link {
    color: white;
    text-decoration: underline;
    font-weight: 600;
  }

  .banner-link:hover {
    color: #e0e7ff;
  }

  @media (max-width: 640px) {
    .banner-content {
      flex-direction: column;
      gap: 0.25rem;
    }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/ReleaseBanner.astro
git commit -m "feat: add ReleaseBanner component"
```

---

### Task 3: Add banner to Starlight layout

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Add banner to Starlight head**

In `astro.config.mjs`, add the ReleaseBanner to the Starlight `head` array:

```javascript
// In starlight config, add to head array:
{
  tag: 'script',
  attrs: {
    type: 'module',
    src: '/src/components/ReleaseBanner.astro',
  },
},
```

Wait - that won't work directly. Need a different approach. Let me modify the Footer component or create a custom layout override.

Actually, let's add it via a custom script injected in head:

```javascript
// Add to head array in starlight config:
{
  tag: 'script',
  content: `
    (function() {
      var banner = document.createElement('div');
      banner.id = 'release-banner';
      banner.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;z-index:9999;background:linear-gradient(90deg,#6366f1,#8b5cf6);color:white;padding:0.625rem 1rem;font-size:0.875rem;box-shadow:0 2px 8px rgba(0,0,0,0.15);';
      banner.innerHTML = '<div style="max-width:1200px;margin:0 auto;display:flex;justify-content:center;align-items:center;gap:1rem;"><span class="banner-text"></span><a href="#" class="banner-link" target="_blank" rel="noopener" style="color:white;text-decoration:underline;font-weight:600;">Lihat Changelog</a></div>';
      document.body.appendChild(banner);
      
      async function loadRelease() {
        try {
          var res = await fetch('/api/releases.json');
          if (!res.ok) return;
          var data = await res.json();
          banner.querySelector('.banner-text').textContent = 'ILDIS ' + data.tag_name + ' telah dirilis pada ' + new Date(data.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'long',year:'numeric'});
          banner.querySelector('.banner-link').href = data.html_url;
          banner.style.display = 'block';
          document.body.style.marginTop = '40px';
        } catch(e) { console.error('Failed to load release:', e); }
      }
      loadRelease();
    })();
  `,
},
```

**Step 2: Test**

Run: `pnpm dev`
Visit: `http://localhost:4321`

Expected: Banner appears at top with release info

**Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: add release banner to Starlight layout"
```

---

### Task 4: Type check and verify build

**Files:**
- Verify: existing project files

**Step 1: Run type check**

Run: `pnpm astro check`

Expected: No errors (may have existing module errors from missing deps - that's fine)

**Step 2: Run build**

Run: `pnpm build`

Expected: Build completes successfully

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add release banner feature"
```

---

**Plan complete!**

Run `pnpm dev` to test locally.

Two execution options:

1. **Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks
2. **Parallel Session** - Open new session with executing-plans skill