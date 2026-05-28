# Design: Full Documentation Polish

**Date:** 2026-05-28  
**Status:** Approved  
**Scope:** Polish all v4 documentation pages to Laravel-quality professional standard. Fix stubs, language inconsistencies, duplicate content, broken links, and style issues.

---

## Issues by Category

### 1. Empty Stubs → Full Content

#### `kustomisasi.mdx` (Customization)
Currently: 4 lines, just frontmatter.  
→ Write a customization guide covering:
- Theme & branding customization (frontend CSS, logo, site name via `.env`)
- `.env` configuration overview (key reference with explanations)
- Adding custom modules/pages
- Link to `konfigurasi.mdx` for detailed env variable reference

#### `faq.mdx` (FAQ)
Currently: 4 lines, just frontmatter.  
→ Write Q&A format FAQ covering:
- Common installation problems (port conflicts, Docker permission errors, PHP version)
- Database connection issues
- How to reset admin password (`php yii user/create`)
- How to update/upgrade ILDIS
- How to enable/disable reCAPTCHA
- How to change port or domain

#### `kontribusi.mdx` (Contribution)
Currently: 6 lines, "Coming Soon".  
→ Write contribution guidelines covering:
- Bug reporting (link to GitHub Issues)
- Development setup (fork, branch, PR workflow)
- Code style expectations
- Contact email (it.dev@bphn.go.id)

### 2. Near-Stub → Complete Rewrite

#### `deployment.mdx` (Deployment)
Currently: 27 lines, just raw config dumps + "coming soon" for cPanel.  
→ Rewrite as a production deployment guide:
- Introduction: what deployment means vs development setup
- Production considerations (environment variables, security hardening, `YII_ENV=prod`)
- SSL/TLS setup (Traefik reverse proxy approach from install.sh, and manual nginx/apache)
- Reverse proxy configuration (explain the configs, not just dump them; link to manual-linux for full config)
- Database backup and restore (`mysqldump`, `php yii migrate/up`)
- Updating ILDIS in production (`./install.sh --update` and manual update process)
- Remove duplicate nginx/apache raw configs (already in `manual-linux.mdx`) — instead link or reference them

### 3. Partial Pages → Complete

#### `konfigurasi.mdx` (Configuration)
Currently: Has a good env variable table but 2 sections are "Coming Soon".  
→ Fill the two stub sections:
- **Cookie Validation Key**: Inline the generation steps (or link to `/v4/instalasi/setelah-instalasi#cookie-validation-key`)
- **Google reCAPTCHA**: Inline the setup steps (or link to `/v4/instalasi/setelah-instalasi#google-recaptcha-key`)
- Add proper frontmatter description

### 4. Language & Consistency Fixes

#### `struktur-direktori.mdx`
- Translate lines 29-34 English descriptions to Indonesian (backend subtree)

#### `dukungan-komunitas.mdx`
- Remove duplicate paragraph (line 26 is identical to line 7)
- Replace raw HTML `<a href>` tags with Markdown links `[text](url)`
- Fix line 8 trailing colon with nothing following

#### `alternative.mdx`
- Rename title from "Aplikasi Alternative" to "Aplikasi Alternatif" (EYD spelling)
- Update frontmatter `description` accordingly
- Replace raw HTML `<a href>` tags with Markdown links

### 5. Frontmatter Descriptions

Expand all pages that have `description: "same as title"` to proper descriptive text:

| File | Current | New |
|------|---------|-----|
| `tentang-ildis.mdx` | `Instalasi ILDIS` (wrong, copy-paste issue) | `Pengenalan ILDIS — Sistem Informasi Dokumentasi Hukum Indonesia` |
| `persyaratan-sistem.mdx` | `Persyaratan Sistem` | `Kebutuhan sistem untuk menjalankan ILDIS (PHP 8.3+, MySQL, Docker/Podman)` |
| `struktur-direktori.mdx` | `Struktur Direktori ILDIS` | `Penjelasan struktur direktori dan organisasi file pada proyek ILDIS` |
| `kustomisasi.mdx` | `Kustomisasi` | `Panduan kustomisasi tampilan dan konfigurasi ILDIS` |
| `faq.mdx` | `FAQ` | `Pertanyaan yang sering diajukan tentang ILDIS` |
| `kontribusi.mdx` | `Kontribusi` | `Panduan berkontribusi pada pengembangan ILDIS` |
| `dukungan-komunitas.mdx` | `Dukungan & Komunitas` | `Forum diskusi, grup komunitas, dan dukungan teknis ILDIS` |
| `deployment.mdx` | `Deployment` | `Panduan deployment ILDIS ke lingkungan production` |

Note: `konfigurasi.mdx`, `integrasi/jdihn.mdx`, `upgrade/index.mdx`, and all `instalasi/` pages already have proper descriptions.

### 6. Tone & Style Normalization

- Remove emojis from `tentang-ildis.mdx` and `integrasi/jdihn.mdx` to match the professional tone of the rest of the documentation
- Alternatively, add consistent emojis across all pages — but removal is simpler for consistency

### 7. Sidebar Update

In `astro.config.mjs`, rename sidebar label from "Aplikasi Alternative" to "Aplikasi Alternatif" and update the corresponding file path.

For `deployment.mdx`, the link already exists in sidebar — no change needed.

For `kustomisasi.mdx`, `faq.mdx`, `kontribusi.mdx` — the links already exist in sidebar, no change needed.

### 8. Out of Scope

- Changing the visual theme or CSS
- Adding new Astro components
- Modifying pages in `v5/`
- Rewriting upgrade guides or troubleshooting pages
- Changing the Starlight configuration beyond sidebar labels