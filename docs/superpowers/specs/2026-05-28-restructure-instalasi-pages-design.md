# Design: Restructure Halaman Instalasi ILDIS v4

**Date:** 2026-05-28  
**Status:** Approved  
**Scope:** Restructure single `v4/instalasi.mdx` (481 lines) into multiple focused pages with card-based method selection.

---

## 1. Problem Statement

The current `v4/instalasi.mdx` is a single 481-line page that covers all installation methods (One-Click, Docker, Vagrant, Manual Linux/macOS, Manual Windows/XAMPP) plus post-install configuration (Cookie Key, reCAPTCHA, default user). This monolithic structure creates several issues:

- **Information overload:** Users must scroll through unrelated methods to find their specific setup.
- **Duplication:** Post-install steps (Cookie Validation Key, reCAPTCHA) are referenced repeatedly across manual sections.
- **Discovery friction:** There is no visual way to quickly choose the right installation method.
- **Maintenance burden:** Adding or updating one method requires editing a massive file, increasing risk of merge conflicts.

## 2. Goals

1. **Improve discoverability:** A landing page with card-based method selection lets users pick their path in under 5 seconds.
2. **Reduce duplication:** Post-install steps (security keys, database, user creation) live in a single shared page.
3. **Enable focused documentation:** Each installation method gets its own page, scoped to a single concern.
4. **Maintain existing content:** No information should be lost; existing code blocks, config files, and instructions are preserved and moved.

## 3. Proposed Structure

### 3.1 URL & File Layout (Flat)

```
/v4/instalasi/                    → Index: 3-card landing (no technical steps)
/v4/instalasi/pasang-cepat        → One-Click Install (recommended, covers Docker/Podman)
/v4/instalasi/vagrant            → Vagrant development environment
/v4/instalasi/manual-linux       → Linux/macOS manual (LAMP/LEMP stack)
/v4/instalasi/manual-windows      → Windows manual (XAMPP)
/v4/instalasi/setelah-instalasi  → Post-install: .env, DB, keys, user, reCAPTCHA
```

**Files to create:**
- `src/content/docs/v4/instalasi/index.mdx`
- `src/content/docs/v4/instalasi/pasang-cepat.mdx`
- `src/content/docs/v4/instalasi/vagrant.mdx`
- `src/content/docs/v4/instalasi/manual-linux.mdx`
- `src/content/docs/v4/instalasi/manual-windows.mdx`
- `src/content/docs/v4/instalasi/setelah-instalasi.mdx`

**Files to delete:**
- `src/content/docs/v4/instalasi.mdx` — Content fully migrated to the 6 files above.

### 3.2 Rationale for Removed Docker Page

The "Instalasi dengan Docker" section is removed as a standalone page because the "Pasang Cepat" (One-Click) method already runs ILDIS inside a Docker/Podman container. The One-Click page will explicitly mention that it uses Docker under the hood, so a separate Docker page would create confusion and duplication. Users who want Docker specifically are directed to the One-Click page.

## 4. Page Specifications

### 4.1 Index Page: `/v4/instalasi/index.mdx`

**Purpose:** Landing page with zero technical detail. Guides users to choose their installation method via visual cards.

**Components:**
- `<Aside type="tip">` pointing to `/v4/persyaratan-sistem` (Git, PHP, Composer prerequisites).
- `<CardGrid>` with 3 `<Card>` items (Starlight built-in components).

**Card content:**

| # | Icon | Badge | Title | Description | Link |
|---|------|-------|-------|-------------|------|
| 1 | `rocket` | `Direkomendasikan` (green) | Pasang Cepat | Script otomatis dengan Docker/Podman. Termasuk update dan mode non-interactive. | `/v4/instalasi/pasang-cepat` |
| 2 | `laptop` | `Development` (orange) | Vagrant | Virtual machine terkonfigurasi lengkap untuk development. Tidak untuk production. | `/v4/instalasi/vagrant` |
| 3 | `gear` | `Linux / macOS / Windows` (blue) | Manual | Konfigurasi lengkap pada server sendiri. Pilih Linux/macOS atau Windows. | Link utama: `/v4/instalasi/manual-linux` — dengan link sekunder ke `/v4/instalasi/manual-windows` |

**No inline installation steps** on the index page. Only method selection.

### 4.2 One-Click Page: `/v4/instalasi/pasang-cepat.mdx`

**Purpose:** The fastest path to a running ILDIS instance.

**Content migrated from:** Lines 27-39 of current `instalasi.mdx`.

**Sections:**
1. **Perintah Pasang Cepat** — The main `curl | bash` one-liner.
2. **Pemasangan Non-Interaktif** — CI/automation flag `--non-interactive`.
3. **Pembaruan Instalasi** — `./install.sh --update`.
4. **Langkah Selanjutnya** — Bullet summary of what comes next, linking to `/v4/instalasi/setelah-instalasi`.

### 4.3 Vagrant Page: `/v4/instalasi/vagrant.mdx`

**Purpose:** Development-only VM setup.

**Content migrated from:** Lines 127-207 of current `instalasi.mdx`.

**Sections:**
1. **Prasyarat** — Vagrant + VirtualBox installation links.
2. **Github Personal Token** — PAT generation and placement in `vagrant/config/vagrant-local.yml`.
3. **Vagrant Up & SSH** — `vagrant up`, `vagrant ssh`.
4. **Setup Project** — `composer install && php init`, `.env` copy and configuration.
5. **Database Setup** — MySQL database creation and SQL import.
6. **Akses Aplikasi** — URLs for frontend and backend.
7. **Langkah Selanjutnya** — Link to `/v4/instalasi/setelah-instalasi`, with note that Docker/Podman already handles `.env` and DB for One-Click users.

### 4.4 Manual Linux/macOS: `/v4/instalasi/manual-linux.mdx`

**Purpose:** Full manual installation on Linux or macOS for production or advanced users.

**Content migrated from:** Lines 209-299 of current `instalasi.mdx`.

**Sections:**
1. **Prasyarat** — Tabs for Ubuntu (`add-apt-repository`, `apt install`) and macOS (Homebrew).
2. **Unduh dan Pasang** — Clone, `composer install`, `php init`.
3. **Konfigurasi .env** — Copy and edit `.env` (using existing `env_database` raw import).
4. **Import Database** — `mysql` command.
5. **Konfigurasi Web Server** — Tabs for Apache (`apache.conf` raw import) and Nginx (`nginx.conf` raw import), plus service restart per OS.
6. **Edit /etc/hosts** — Domain mapping.
7. **Akses Aplikasi** — URLs.
8. **Langkah Selanjutnya** — Link to `/v4/instalasi/setelah-instalasi`.

### 4.5 Manual Windows: `/v4/instalasi/manual-windows.mdx`

**Purpose:** Full manual installation on Windows using XAMPP.

**Content migrated from:** Lines 307-357 of current `instalasi.mdx`.

**Sections:**
1. **Prasyarat: XAMPP** — Download, install, start Apache + MySQL.
2. **Unduh ILDIS** — Clone to `htdocs` or extract release.
3. **Setup Proyek** — `composer install`, `php init`.
4. **Konfigurasi .env** — Copy and edit database credentials.
5. **Import Database** — `mysql` or phpMyAdmin.
6. **Virtual Host** — `httpd-vhosts.conf` edit (using existing `apache.conf` raw import) + Windows hosts file edit.
7. **Restart Apache** — Via XAMPP Control Panel.
8. **Langkah Selanjutnya** — Link to `/v4/instalasi/setelah-instalasi`.

### 4.6 Post-Install Page: `/v4/instalasi/setelah-instalasi.mdx`

**Purpose:** Shared post-installation steps required regardless of installation method.

**Content migrated from:** Lines 365-476 of current `instalasi.mdx`.

**Sections:**
1. **User Default** — Default credentials (`sample` / password) with caution note.
2. **Membuat User dengan CLI** — `php yii user/create`.
3. **Cookie Validation Key** — Why it matters, plus generation commands (tabs for Linux/macOS and Windows PowerShell), using existing `env_cookie_validation_key` raw import.
4. **Google reCAPTCHA v3** — Step-by-step registration guide, Site Key and Secret Key mapping to `.env` entries.
5. **Deployment Reference** — Link to `/v4/deployment` for production tuning.

**Note for One-Click users:** The Pasang Cepat script may already auto-generate some of these. If so, the post-install page will note which steps are "already handled" vs "manual required".

## 5. Sidebar Updates

In `astro.config.mjs`, the current sidebar item:

```js
{ label: 'Instalasi', link: '/v4/instalasi' }
```

Becomes an expanded group under **Instalasi & Konfigurasi**:

```js
{
  label: 'Instalasi',
  items: [
    { label: 'Pilih Metode', link: '/v4/instalasi' },
    { label: 'Pasang Cepat', link: '/v4/instalasi/pasang-cepat' },
    { label: 'Vagrant', link: '/v4/instalasi/vagrant' },
    { label: 'Manual — Linux/macOS', link: '/v4/instalasi/manual-linux' },
    { label: 'Manual — Windows', link: '/v4/instalasi/manual-windows' },
    { label: 'Setelah Instalasi', link: '/v4/instalasi/setelah-instalasi' },
  ]
}
```

## 6. Content Mapping Reference

To ensure no content is lost during migration, here is the exact line-number mapping from the current monolith to the new files:

| Current Section | Lines | Target File |
|-----------------|-------|-------------|
| Pasang Cepat (One-Click) | 27-39 | `pasang-cepat.mdx` |
| Unduh ILDIS (Git Clone) | 45-52 | Fragment reused in each detail page (or just `manual-linux`, `manual-windows`) |
| Ekstrak Manual | 54-55 | Fragment reused in `manual-linux`, `manual-windows` |
| Instalasi dengan Docker | 61-121 | **Removed** — covered by One-Click |
| Vagrant | 127-207 | `vagrant.mdx` |
| Manual Linux/macOS | 209-299 | `manual-linux.mdx` |
| Manual Windows/XAMPP | 307-357 | `manual-windows.mdx` |
| User Default | 365-373 | `setelah-instalasi.mdx` |
| Membuat user CLI | 375-379 | `setelah-instalasi.mdx` |
| Cookie Validation Key | 381-407 | `setelah-instalasi.mdx` |
| Google reCAPTCHA Key | 414-476 | `setelah-instalasi.mdx` |

## 7. Assets & Raw Imports

The new detail pages will continue to import raw files for code blocks, just like the current page:

- `configExample` → `.env` example
- `configCookie` → `.env` with cookie validation keys highlighted
- `databaseConfiguration` → `.env` database section
- `nginx` → `nginx.conf`
- `apache` → `apache.conf`
- `vagrantConfig` → `vagrant-local.yml`

No new raw files need to be created. Existing files in `src/content/docs/v4/config_example/` are reused.

## 8. Redirects & Backward Compatibility

The old `/v4/instalasi` (without trailing path) should redirect to `/v4/instalasi/` (index). For Vercel deployment, this is handled automatically by Astro's file-based routing. Any external bookmarks to `/v4/instalasi#pasang-cepat` etc. will break because the old anchors no longer exist. This is acceptable because:

- The project is actively maintained internal documentation.
- The improved structure outweighs the temporary bookmark breakage.

## 9. Acceptance Criteria

- [ ] `instalasi.mdx` is deleted and replaced by the 6 new files.
- [ ] Index page displays exactly 3 cards with correct icons, badges, titles, and links.
- [ ] Each detail page contains only its own installation method; no Docker duplication.
- [ ] Post-install page exists and covers: `.env` verification, database import, cookie key, CLI user creation, reCAPTCHA.
- [ ] Sidebar is updated to show the expanded "Instalasi" group.
- [ ] All existing code blocks, raw imports, and aside warnings are preserved.
- [ ] The `v4/index.mdx` splash page link to `/v4/instalasi` still works (it points to the index).

## 10. Out of Scope

- Rewriting any installation steps or commands (content migration only).
- Changing any config examples or raw imports.
- Adding new installation methods (e.g., Kubernetes, cloud providers).
- Updating `v5/` documentation.
- Creating custom Astro components beyond Starlight's built-in `<Card>` and `<CardGrid>`.
