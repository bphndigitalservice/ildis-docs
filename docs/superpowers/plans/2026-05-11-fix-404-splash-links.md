# Fix 404 Links on ILDIS v4 Splash Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all broken absolute internal links in v4 documentation pages that are missing the `/v4/` version prefix, eliminating 404 errors.

**Architecture:** Simple static-link correction across two `.mdx` files. No new components, routes, or dependencies. Verification is done via `pnpm build`.

**Tech Stack:** Astro + Starlight, MDX, pnpm

---

### File Changes

| File | Action | Lines |
|------|--------|-------|
| `src/content/docs/v4/index.mdx` | Modify | 9, 12 |
| `src/content/docs/v4/instalasi.mdx` | Modify | 18, 21, 364 |

---

### Task 1: Fix v4 Splash Page Hero Links

**Files:**
- Modify: `src/content/docs/v4/index.mdx:9`
- Modify: `src/content/docs/v4/index.mdx:12`

- [ ] **Step 1: Edit hero action "Mulai Instalasi" link**

In `src/content/docs/v4/index.mdx`, change:

```
      link: /instalasi
```
to:

```
      link: /v4/instalasi
```

- [ ] **Step 2: Edit hero action "Tentang ILDIS" link**

In `src/content/docs/v4/index.mdx`, change:

```
      link: /tentang-ildis
```
to:

```
      link: /v4/tentang-ildis
```

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/v4/index.mdx
git commit -m "fix: add /v4/ prefix to splash page hero links"
```

---

### Task 2: Fix Broken Links in v4/instalasi.mdx

**Files:**
- Modify: `src/content/docs/v4/instalasi.mdx:18`
- Modify: `src/content/docs/v4/instalasi.mdx:21`
- Modify: `src/content/docs/v4/instalasi.mdx:364`

- [ ] **Step 1: Fix "Persyaratan Sistem" link**

In `src/content/docs/v4/instalasi.mdx`, change:

```
    [Composer](https://getcomposer.org/download/). Lihat [Persyaratan Sistem](/persyaratan-sistem)
```
to:

```
    [Composer](https://getcomposer.org/download/). Lihat [Persyaratan Sistem](/v4/persyaratan-sistem)
```

- [ ] **Step 2: Fix "deployment" link**

In `src/content/docs/v4/instalasi.mdx`, change:

```
referensi konfigurasi yang direkomendasikan pada halaman [deployment](/deployment).
```
to:

```
referensi konfigurasi yang direkomendasikan pada halaman [deployment](/v4/deployment).
```

- [ ] **Step 3: Fix "konfigurasi" link**

In `src/content/docs/v4/instalasi.mdx`, change:

```
Pada halaman [konfigurasi](/konfigurasi) terdapat entry
```
to:

```
Pada halaman [konfigurasi](/v4/konfigurasi) terdapat entry
```

- [ ] **Step 4: Commit**

```bash
git add src/content/docs/v4/instalasi.mdx
git commit -m "fix: add /v4/ prefix to absolute internal links in instalasi page"
```

---

### Task 3: Verify Build

**Files:**
- None (verification only)

- [ ] **Step 1: Run build**

```bash
pnpm build
```

Expected: Build completes successfully with no link-related errors.

- [ ] **Step 2: Manual spot-check (optional, if previewing)**

If running `pnpm dev` or `pnpm preview`, verify:
- Navigate to `/v4/` → click **"Mulai Instalasi"** → lands on `/v4/instalasi` (not 404)
- Navigate to `/v4/` → click **"Tentang ILDIS"** → lands on `/v4/tentang-ildis` (not 404)
- Navigate to `/v4/instalasi` → click **"Persyaratan Sistem"** link → lands on `/v4/persyaratan-sistem`
- Navigate to `/v4/instalasi` → scroll to the "deployment" and "konfigurasi" links → both resolve correctly

---

## Self-Review Checklist

- [x] Spec coverage: All broken links identified in the audit are addressed.
- [x] Placeholder scan: No TBD, TODO, or vague steps remain.
- [x] Type consistency: N/A — no types or functions defined.
- [x] File paths: All paths are absolute and verified against the repo structure.
- [x] Commands: All commands include expected output or behavior.
