# Full Documentation Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish all v4 documentation pages to professional Laravel-quality standard — fill stubs, fix language inconsistencies, remove duplicates, and normalize style.

**Architecture:** Content-only changes to MDX files. No new Astro components, no sidebar restructuring beyond label renames. Each task is self-contained and can be verified by reading the file.

**Tech Stack:** Astro, Starlight, MDX, pnpm

---

## File Structure

```
src/content/docs/v4/
├── tentang-ildis.mdx          # MODIFY: remove emojis, fix description
├── persyaratan-sistem.mdx     # MODIFY: fix description
├── struktur-direktori.mdx     # MODIFY: translate English to Indonesian
├── konfigurasi.mdx            # MODIFY: fill Coming Soon sections
├── kustomisasi.mdx            # REWRITE: full content
├── faq.mdx                    # REWRITE: full content
├── kontribusi.mdx             # REWRITE: full content
├── deployment.mdx              # REWRITE: full content
├── dukungan-komunitas.mdx     # MODIFY: remove duplicate, fix links
├── alternative.mdx             # MODIFY: fix title/spelling + links
├── integrasi/jdihn.mdx        # MODIFY: remove emojis
astro.config.mjs               # MODIFY: rename sidebar label
```

---

### Task 1: Fix `tentang-ildis.mdx` — Remove Emojis & Fix Description

**Files:**
- Modify: `src/content/docs/v4/tentang-ildis.mdx`

- [ ] **Step 1: Read current file**

```bash
cat src/content/docs/v4/tentang-ildis.mdx
```

- [ ] **Step 2: Fix frontmatter description and remove emojis from list items**

Change `description: 'Instalasi ILDIS'` (or whatever it currently says) to `description: 'Pengenalan ILDIS — Sistem Informasi Dokumentasi Hukum Indonesia'`. Remove any emojis (🚀, 📋, etc.) from list items or headings. Keep the content professional and text-only.

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/v4/tentang-ildis.mdx
git commit -m "docs: polish tentang-ildis page — fix description, remove emojis"
```

---

### Task 2: Fix `persyaratan-sistem.mdx` — Update Description

**Files:**
- Modify: `src/content/docs/v4/persyaratan-sistem.mdx`

- [ ] **Step 1: Update frontmatter description**

Change `description: 'Persyaratan Sistem'` to `description: 'Kebutuhan sistem untuk menjalankan ILDIS (PHP 8.3+, MySQL, Docker/Podman)'`.

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/persyaratan-sistem.mdx
git commit -m "docs: improve persyaratan-sistem description"
```

---

### Task 3: Fix `struktur-direktori.mdx` — Translate English to Indonesian

**Files:**
- Modify: `src/content/docs/v4/struktur-direktori.mdx`

- [ ] **Step 1: Read current file and identify English lines**

Read the file. Find lines 29-34 (the `backend` subtree) where descriptions are in English. Translate them to Indonesian.

English descriptions to translate:
- "contains backend configurations" → "berisi konfigurasi backend"
- "contains Web controller classes" → "berisi kelas controller web"
- "contains models" → "berisi model"
- "contains views" → "berisi view"
- "contains assets" → "berisi aset"
- etc. (read the actual file and translate all English backend descriptions)

Also update frontmatter description to something descriptive like `description: 'Penjelasan struktur direktori dan organisasi file pada proyek ILDIS'`.

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/struktur-direktori.mdx
git commit -m "docs: translate English backend descriptions to Indonesian in struktur-direktori"
```

---

### Task 4: Fix `dukungan-komunitas.mdx` — Remove Duplicate & Fix Links

**Files:**
- Modify: `src/content/docs/v4/dukungan-komunitas.mdx`

- [ ] **Step 1: Read current file**

```bash
cat src/content/docs/v4/dukungan-komunitas.mdx
```

- [ ] **Step 2: Fix issues**

1. Remove the duplicate paragraph (the sentence starting "Kami sangat mendorong..." appears twice — remove the second instance near the end)
2. Replace all raw HTML `<a href="..." target="_blank">text</a>` with Markdown links `[text](url)`
3. Fix frontmatter description to `description: 'Forum diskusi, grup komunitas, dan dukungan teknis ILDIS'`
4. Fix any trailing colons with nothing following

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/v4/dukungan-komunitas.mdx
git commit -m "docs: fix dukungan-komunitas — remove duplicate, use markdown links"
```

---

### Task 5: Fix `alternative.mdx` — Spelling & Links

**Files:**
- Modify: `src/content/docs/v4/alternative.mdx`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Fix alternative.mdx**

1. Change frontmatter title from "Alternative" to "Alternatif" and description to `description: 'Aplikasi alternatif untuk dokumentasi hukum'`
2. Replace all raw HTML `<a href="..." target="_blank">text</a>` with Markdown links `[text](url)`
3. Fix any "Alternative" references in body to "Alternatif"

- [ ] **Step 2: Fix sidebar label in astro.config.mjs**

In `astro.config.mjs`, find `{ label: 'Aplikasi Alternative', link: '/v4/alternative' }` and change to `{ label: 'Aplikasi Alternatif', link: '/v4/alternative' }`.

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/v4/alternative.mdx astro.config.mjs
git commit -m "docs: fix alternative → alternatif spelling and use markdown links"
```

---

### Task 6: Fix `integrasi/jdihn.mdx` — Remove Emojis

**Files:**
- Modify: `src/content/docs/v4/integrasi/jdihn.mdx`

- [ ] **Step 1: Read file and remove emojis**

Read the file. Remove any emojis from headings or list items to match the professional tone of other pages.

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/integrasi/jdihn.mdx
git commit -m "docs: remove emojis from jdihn integration page"
```

---

### Task 7: Fill `konfigurasi.mdx` — Replace Coming Soon Sections

**Files:**
- Modify: `src/content/docs/v4/konfigurasi.mdx`

- [ ] **Step 1: Read current file**

```bash
cat src/content/docs/v4/konfigurasi.mdx
```

- [ ] **Step 2: Replace Coming Soon sections**

Replace the two "Coming Soon" sections with real content:

**Cookie Validation Key section:** Add content explaining what `COOKIE_VALIDATION_KEY_BE` and `COOKIE_VALIDATION_KEY_FE` are, why they're needed, and link to the detailed generation steps at `/v4/instalasi/setelah-instalasi#cookie-validation-key`.

**Google reCAPTCHA section:** Add content explaining what reCAPTCHA is for in ILDIS, the env variables `RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY`, and link to `/v4/instalasi/setelah-instalasi#google-recaptcha-key` for the full setup guide.

Also update the frontmatter description if it's just "Konfigurasi" to something more descriptive like `description: 'Penjelasan lengkap konfigurasi environment variable dan pengaturan ILDIS v4'`.

- [ ] **Step 3: Commit**

```bash
git add src/content/docs/v4/konfigurasi.mdx
git commit -m "docs: fill konfigurasi Coming Soon sections with real content"
```

---

### Task 8: Rewrite `deployment.mdx` — Production Deployment Guide

**Files:**
- Modify: `src/content/docs/v4/deployment.mdx`

- [ ] **Step 1: Write new deployment.mdx**

Replace the entire file with a proper production deployment guide. Use Starlight components (`Aside`, `Code`, `Tabs`, `TabItem`) for consistency. The new content should cover:

1. **Introduction** — What deployment means vs development, production vs development differences
2. **Production Environment** — `YII_ENV=prod`, `YII_DEBUG=false`, `.env` configuration checklist
3. **SSL/TLS Setup** — Using Traefik (from install.sh) or manual nginx/apache SSL configuration
4. **Reverse Proxy** — Explain the nginx/apache configs (reference don't duplicate from manual-linux), include them in Tabs for convenience
5. **Database Backup & Restore** — `mysqldump` commands, restore procedures
6. **Updating ILDIS** — `./install.sh --update` for Docker/Podman, manual update steps for bare-metal
7. **Security Checklist** — Cookie validation keys, reCAPTCHA, file permissions, `.env` protection, disabling debug mode

Update frontmatter description to `description: 'Panduan deployment ILDIS ke lingkungan production'`.

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/deployment.mdx
git commit -m "docs: rewrite deployment page as proper production deployment guide"
```

---

### Task 9: Write `kustomisasi.mdx` — Customization Guide

**Files:**
- Modify: `src/content/docs/v4/kustomisasi.mdx`

- [ ] **Step 1: Write content**

Write a customization guide covering:

1. **Branding & Tampilan** — Changing logo, site name, and colors via `.env` variables and CSS
2. **Konfigurasi Environment** — Overview of key `.env` variables (link to `konfigurasi.mdx` for full reference)
3. **Kustomisasi Frontend** — Modifying views, layouts, and assets
4. **Menambah Halaman Baru** — How to add custom pages/modules to the ILDIS frontend

Update frontmatter to `description: 'Panduan kustomisasi tampilan, tema, dan konfigurasi ILDIS'`.

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/kustomisasi.mdx
git commit -m "docs: write kustomisasi (customization) guide"
```

---

### Task 10: Write `faq.mdx` — Frequently Asked Questions

**Files:**
- Modify: `src/content/docs/v4/faq.mdx`

- [ ] **Step 1: Write content**

Write a Q&A FAQ covering common issues:

1. **Instalasi gagal karena port 8080 sudah digunakan** — Change port with `PORT=8081` env var or `--port` flag
2. **Docker permission denied** — Add user to docker group: `sudo usermod -aG docker $USER`
3. **Gagal mengakses backend setelah instalasi** — Check container status, check `.env` COOKIE_VALIDATION_KEY
4. **Cara reset password admin** — `docker compose exec app php yii user/create` or `php yii user/create`
5. **Cara mengupdate ILDIS ke versi terbaru** — `./install.sh --update` or manual steps
6. **Cara mengaktifkan/nonaktifkan reCAPTCHA** — Set `RECAPTCHA_ENABLED=true/false` in `.env`, then restart container
7. **Database connection refused** — Check DB credentials in `.env`, verify container is running
8. **Cara mengubah port ILDIS** — Edit `PORT` in `.env` or re-run install script with `--port`
9. **PHP version tidak kompatibel** — ILDIS requires PHP 8.3+. Check with `php -v`.

Update frontmatter to `description: 'Pertanyaan yang sering diajukan tentang ILDIS'`.

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/faq.mdx
git commit -m "docs: write FAQ page"
```

---

### Task 11: Write `kontribusi.mdx` — Contribution Guide

**Files:**
- Modify: `src/content/docs/v4/kontribusi.mdx`

- [ ] **Step 1: Write content**

Write contribution guidelines covering:

1. **Melaporkan Bug** — Link to GitHub Issues, describe what to include in a bug report
2. **Setup Development** — Fork repo, clone, `composer install`, `php init`, `.env` setup
3. **Alur Kerja** — Branch naming, commit conventions, PR process
4. **Standar Kode** — Follow existing code style, PHP PSR standards
5. **Kontak** — Email it.dev@bphn.go.id for technical questions

Update frontmatter to `description: 'Panduan berkontribusi pada pengembangan ILDIS'`.

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/kontribusi.mdx
git commit -m "docs: write kontribusi (contribution) guide"
```

---

### Task 12: Build Verification

**Files:** N/A (project-wide verification)

- [ ] **Step 1: Run build**

```bash
pnpm build
```

Expected: 25 pages built, no errors.

- [ ] **Step 2: Fix any build errors**

If build fails due to:
- MDX syntax errors → fix the specific file
- Missing imports → add Starlight component imports at the top of the file
- Sidebar label mismatches → verify `astro.config.mjs` matches file content

- [ ] **Step 3: Commit fixes if any**

```bash
git add -A
git commit -m "fix: address build errors from docs polish"
```

---

## Self-Review Checklist

- [x] Spec coverage: All 8 categories from the spec have corresponding tasks
- [x] Placeholder scan: No TBD/TODO — all tasks have actual content descriptions
- [x] Type consistency: All file paths are consistent across tasks
- [x] Sidebar: Only Task 5 modifies sidebar (`alternative` → `alternatif` label)