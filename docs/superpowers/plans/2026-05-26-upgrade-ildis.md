# ILDIS Upgrade Documentation Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add page index upgrade (`/v4/upgrade/`) dan detail page upgrade (v3→v4, v4→v5 placeholder, patch upgrade v4) ke dokumentasi ILDIS.

**Architecture:** 4 file MDX Starlight dalam folder `src/content/docs/v4/upgrade/` + update sidebar `astro.config.mjs`. Tidak ada komponen Astro custom, hanya konten MDX dengan komponen Starlight bawaan (`Card`, `CardGrid`, `Aside`, `Steps`, `Tabs`, `TabItem`, `Code`).

**Tech Stack:** Astro + Starlight, MDX, pnpm.

---

### Task 1: Create `/v4/upgrade/` Index Page

**Files:**
- Create: `src/content/docs/v4/upgrade/index.mdx`

Content: Overview dengan `CardGrid` berisi 3 card:
- v3 → v4 (link `/v4/upgrade/v3-ke-v4`)
- v4 → v5 (link `/v4/upgrade/v4-ke-v5`)
- Patch Upgrade v4 (link `/v4/upgrade/upgrade-patch`)

Gunakan komponen `Card` dan `CardGrid` dari `@astrojs/starlight/components`.

- [ ] **Step 1: Write frontmatter dan intro**

```mdx
---
title: Upgrade ILDIS
description: Panduan upgrade dan migrasi ILDIS ke versi yang lebih baru.
---

import { Card, CardGrid } from '@astrojs/starlight/components';

Halaman ini berisi panduan upgrade untuk berbagai jalur versi ILDIS. Sebelum melakukan upgrade, **pastikan Anda telah melakukan backup database dan folder aplikasi**.

<CardGrid>
  <Card title="v3 ke v4" icon="rocket">
    Upgrade dari ILDIS versi lama (v3) ke versi stabil terbaru (v4).
    Estimasi waktu: 30-60 menit.
    [Lihat panduan →](/v4/upgrade/v3-ke-v4)
  </Card>
  <Card title="v4 ke v5" icon="warning">
    ILDIS v5 sedang dalam perencanaan dan belum tersedia.
    [Lihat status →](/v4/upgrade/v4-ke-v5)
  </Card>
  <Card title="Patch Upgrade v4" icon="setting">
    Upgrade patch (minor release) dalam jalur versi 4 (contoh: 4.1 → 4.2).
    Estimasi waktu: 10-20 menit.
    [Lihat panduan →](/v4/upgrade/upgrade-patch)
  </Card>
</CardGrid>
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/upgrade/index.mdx
git commit -m "docs: add upgrade overview index page"
```

---

### Task 2: Create `v3-ke-v4.mdx` Detail Page

**Files:**
- Create: `src/content/docs/v4/upgrade/v3-ke-v4.mdx`

Content: Instruksi upgrade manual v3 ke v4. Menggunakan `Steps`, `Aside`, `Tabs`, `TabItem`, `Code`.

- [ ] **Step 1: Write content**

```mdx
---
title: Upgrade dari v3 ke v4
description: Panduan lengkap upgrade ILDIS dari versi 3 ke versi 4.
---

import { Aside, Steps, Tabs, TabItem, Code } from '@astrojs/starlight/components';

<Aside type="caution">
  **Lakukan backup database dan folder aplikasi sebelum upgrade.**
  Proses upgrade tidak dapat diurungkan.
</Aside>

## Prerequisites

- PHP 7.4 (atau lebih tinggi)
- Composer terpasang
- Git
- Akses MySQL/MariaDB
- Backup database v3 sudah tersimpan

## Langkah Upgrade

<Steps>

1. **Backup database v3**

   Export database Anda sebelum memulai:

   <Tabs>
     <TabItem label="Linux/macOS">
       ```bash
       mysqldump -u root -p nama_database_v3 > backup_v3.sql
       ```
     </TabItem>
     <TabItem label="Windows (XAMPP)">
       ```powershell
       mysqldump -u root -p nama_database_v3 > C:\backup_v3.sql
       ```
     </TabItem>
   </Tabs>

2. **Unduh kode ILDIS v4**

   Clone repository baru atau gunakan folder terpisah agar instalasi v3 tetap berjalan:

   ```bash
   git clone https://github.com/bphndigitalservice/ildis.git ildis-v4
   cd ildis-v4
   ```

3. **Pasang dependensi**

   ```bash
   composer install --no-dev --ignore-platform-reqs
   ```

4. **Inisialisasi aplikasi**

   ```bash
   php init
   ```

   Pilih environment yang sesuai (dev atau production).

5. **Konfigurasi `.env`**

   ```bash
   cp .env.example .env
   ```

   Edit file `.env` dan sesuaikan konfigurasi database, URL, serta `COOKIE_VALIDATION_KEY_*`.

6. **Import database v4**

   ```bash
   mysql -u root -p nama_database_v4 < DATABASE/ildis_v4.sql
   ```

   Selanjutnya, jalankan migrasi untuk menyelaraskan skema v4 dengan data yang ada:

   ```bash
   php yii migrate/up --interactive=0
   ```

7. **Konfigurasi virtual host**

   Sesuaikan virtual host Apache/Nginx ke folder `ildis-v4` (lihat halaman [Deployment](/v4/deployment)).

8. **Verifikasi**

   - Buka frontend: http://ildis-frontend.test
   - Buka backend: http://ildis-backend.test
   - Pastikan login admin berfungsi

</Steps>

---

## Troubleshooting

Jika mengalami masalah setelah upgrade, lihat halaman [Troubleshooting](/v4/troubleshooting/) atau hubungi [Dukungan & Komunitas](/v4/dukungan-komunitas).
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/upgrade/v3-ke-v4.mdx
git commit -m "docs: add v3 to v4 upgrade guide"
```

---

### Task 3: Create `v4-ke-v5.mdx` Placeholder Page

**Files:**
- Create: `src/content/docs/v4/upgrade/v4-ke-v5.mdx`

Content: Placeholder jelas bahwa v5 belum dalam pengembangan aktif.

- [ ] **Step 1: Write content**

```mdx
---
title: Upgrade dari v4 ke v5
description: Status upgrade ILDIS dari versi 4 ke versi 5.
---

import { Aside, Card, CardGrid } from '@astrojs/starlight/components';

<Aside type="caution">
  ILDIS v5 sedang dalam perencanaan dan **belum masuk tahap pengembangan aktif**.
  Panduan upgrade versi ini akan tersedia setelah rilis resmi diumumkan.
</Aside>

## Status Pengembangan

Tim ILDIS sedang mempersiapkan arsitektur dan perencanaan untuk versi 5. Saat ini, versi stabil yang direkomendasikan adalah **ILDIS v4**.

## Tetap Terinformasi

<CardGrid>
  <Card title="GitHub Releases" icon="github">
    Pantau rilis terbaru di [GitHub Releases](https://github.com/bphndigitalservice/ildis/releases).
  </Card>
  <Card title="Dukungan & Komunitas" icon="star">
    Hubungi tim melalui halaman [Dukungan & Komunitas](/v4/dukungan-komunitas) untuk pertanyaan roadmap.
  </Card>
</CardGrid>
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/upgrade/v4-ke-v5.mdx
git commit -m "docs: add v4 to v5 upgrade placeholder page"
```

---

### Task 4: Create `upgrade-patch.mdx` Detail Page

**Files:**
- Create: `src/content/docs/v4/upgrade/upgrade-patch.mdx`

Content: Instruksi umum patch upgrade + tabel versi rilis dari GitHub.

- [ ] **Step 1: Write content**

```mdx
---
title: Patch Upgrade v4
description: Panduan upgrade patch (minor release) dalam jalur ILDIS versi 4.
---

import { Aside, Steps, Code } from '@astrojs/starlight/components';

<Aside type="caution">
  **Lakukan backup database dan folder aplikasi sebelum setiap upgrade patch.**
</Aside>

## Instruksi Umum Upgrade Patch

<Steps>

1. **Backup**

   ```bash
   mysqldump -u root -p nama_database > backup_$(date +%Y%m%d).sql
   ```

2. **Pull kode terbaru**

   ```bash
   git fetch origin
   git checkout tags/v4.x.x
   ```

   Atau jika menggunakan branch:

   ```bash
   git pull origin main
   ```

3. **Update dependensi**

   ```bash
   composer install --no-dev
   ```

4. **Jalankan migrasi (jika ada)**

   ```bash
   php yii migrate/up --interactive=0
   ```

5. **Clear cache**

   ```bash
   php yii cache/flush-all
   ```

6. **Verifikasi**

   - Buka frontend dan backend
   - Pastikan fitur utama berjalan normal

</Steps>

---

## Riwayat Rilis v4

Tabel berikut menyediakan daftar rilis patch ILDIS v4 beserta catatan penting.

| Versi | Tanggal Rilis | Changelog | Catatan |
|-------|---------------|-----------|---------|
| v4.2.0 | 25 Mei 2026 | [Lihat Release](https://github.com/bphndigitalservice/ildis/releases/tag/v4.2.0) | ⚠ Breaking: butuh PHP ≥8.3, replace SwiftMailer dengan Symfony Mailer |
| v4.1.4 | 13 Mei 2026 | [Lihat Release](https://github.com/bphndigitalservice/ildis/releases/tag/v4.1.4) | Bug fixes: filter published news |
| v4.1.3 | 13 Mei 2026 | [Lihat Release](https://github.com/bphndigitalservice/ildis/releases/tag/v4.1.3) | Bug fixes: filter published news |
| v4.1.2 | 12 Mei 2026 | [Lihat Release](https://github.com/bphndigitalservice/ildis/releases/tag/v4.1.2) | Perbaikan minor |
| v4.1.0 | — | — | Penambahan dukungan Docker |

> ℹ️ Versi yang tidak memiliki link berarti rilis tersebut tidak dipublikasikan dengan GitHub Release page, atau catatan rilis tersebar dalam repository utama.

---

## Catatan Breaking Change

### v4.2.0

- **PHP Requirement**: Minimum PHP 8.3. Jika server Anda masih menggunakan PHP 7.4, upgrade PHP terlebih dahulu sebelum update ILDIS ke v4.2.0.
- **Mailer**: SwiftMailer digantikan dengan `yii2-symfonymailer`. Pastikan variabel `MAILER_DSN` telah dikonfigurasi di file `.env`.
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/upgrade/upgrade-patch.mdx
git commit -m "docs: add v4 patch upgrade guide and release table"
```

---

### Task 5: Update Sidebar in `astro.config.mjs`

**Files:**
- Modify: `astro.config.mjs`

Tambahkan group `Upgrade` setelah group `Instalasi & Konfigurasi`.

- [ ] **Step 1: Insert sidebar group**

Cari group `Instalasi & Konfigurasi` (sekitar baris 170 di `astro.config.mjs`). Setelah penutup `]` dari group tersebut (sebelum group `Integrasi`), tambahkan:

```javascript
                    {
                        label: 'Upgrade',
                        items: [
                            {label: 'Overview', link: '/v4/upgrade'},
                            {label: 'Dari v3 ke v4', link: '/v4/upgrade/v3-ke-v4'},
                            {label: 'Dari v4 ke v5', link: '/v4/upgrade/v4-ke-v5'},
                            {label: 'Patch Upgrade v4', link: '/v4/upgrade/upgrade-patch'},
                        ],
                    },
```

Pastikan ada trailing comma setelah `]` group `Instalasi & Konfigurasi` sebelum menambah group baru.

- [ ] **Step 2: Commit**

```bash
git add astro.config.mjs
git commit -m "chore: add Upgrade section to sidebar"
```

---

### Task 6: Build & Verify

**Files:**
- Verify: `astro.config.mjs`
- Verify: `src/content/docs/v4/upgrade/*.mdx`

- [ ] **Step 1: Run build**

```bash
pnpm build
```

Expected output: Build completed successfully, tanpa broken link warnings.

- [ ] **Step 2: Spot-check internal links**

Cari broken link warnings dalam output build. Jika ada link internal yang 404, perbaiki.

- [ ] **Step 3: Commit (if no issues)**

Jika build sukses dan tidak ada perubahan tambahan:

```bash
# Nothing to commit if build only generated dist/
```

---

## Spec Coverage Check

| Spec Requirement | Task |
|------------------|------|
| Halaman `/v4/upgrade/` index dengan card grid | Task 1 |
| Detail page v3 → v4 dengan instruksi manual | Task 2 |
| Detail page v4 → v5 placeholder | Task 3 |
| Detail page patch upgrade v4 dengan tabel versi | Task 4 |
| Tabel versi dengan link GitHub Releases | Task 4 |
| Sidebar group "Upgrade" di astro.config.mjs | Task 5 |
| Build sukses tanpa broken link | Task 6 |

## Placeholder Scan

- Tidak ada "TBD", "TODO", atau "implement later" dalam plan ini.
- Semua step berisi kode MDX yang lengkap dan siap copy-paste.
- Tidak ada referensi file yang belum didefinisikan.
