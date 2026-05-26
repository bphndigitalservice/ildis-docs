# Dokumentasi Upgrade ILDIS — Design Spec

**Date:** 2026-05-26
**Status:** Approved

---

## 1. Tujuan

Menyediakan satu halaman index panduan upgrade (`/v4/upgrade/`) yang menampilkan **daftar semua jalur upgrade** beserta link ke **halaman detail masing-masing**, yaitu:
- Upgrade dari v3 ke v4
- Upgrade dari v4 ke v5 (placeholder)
- Upgrade patch dalam v4 (contoh: 4.0 → 4.1 → 4.2.0)

---

## 2. Architecture & File Structure

Semua file berada di bawah `src/content/docs/v4/upgrade/`:

```
src/content/docs/v4/upgrade/
├── index.mdx          # /v4/upgrade/        → Overview & daftar jalur upgrade
├── v3-ke-v4.mdx       # /v4/upgrade/v3-ke-v4/ → Panduan upgrade v3 → v4
├── v4-ke-v5.mdx       # /v4/upgrade/v4-ke-v5/ → Placeholder v5 (belum didevelop)
└── upgrade-patch.mdx  # /v4/upgrade/upgrade-patch/ → Panduan upgrade patch v4
```

Technik: halaman static MDX Starlight standar, tanpa komponen Astro custom baru.

---

## 3. Sidebar & Navigation

Tambahan group di `astro.config.mjs` dalam array `sidebar` (diletakkan setelah group "Instalasi & Konfigurasi"):

```javascript
{
  label: 'Upgrade',
  items: [
    { label: 'Overview',            link: '/v4/upgrade' },
    { label: 'Dari v3 ke v4',       link: '/v4/upgrade/v3-ke-v4' },
    { label: 'Dari v4 ke v5',       link: '/v4/upgrade/v4-ke-v5' },
    { label: 'Patch Upgrade v4',    link: '/v4/upgrade/upgrade-patch' },
  ],
},
```

---

## 4. Content Design

### 4.1 `index.mdx` — Overview

**Frontmatter** minimal: `title: Upgrade ILDIS`, `description` singkat.

**Konten:**
- Paragraf pendahuluan: kapan harus upgrade, prerequisites (backup!).
- `<CardGrid>` dengan 3 card, masing-masing:
  - **v3 → v4**: estimated time ~30-60 menit, link ke `/v4/upgrade/v3-ke-v4`
  - **v4 → v5**: label "Segera Hadir", link ke `/v4/upgrade/v4-ke-v5`
  - **Patch Upgrade v4**: estimated time ~10-20 menit, link ke `/v4/upgrade/upgrade-patch`
- Di tiap card, tunjukkan difficulty (misal: "Beginner", "Intermediate", "N/A").

### 4.2 `v3-ke-v4.mdx` — Upgrade v3 ke v4

Struktur instruksi (ditulis manual, bukan generated):
1. **Prerequisites & Backup** (`Aside type="caution"`): backup database + folder aplikasi.
2. **Unduh Kode versi 4** — git clone / pull, composer install.
3. **Inisialisasi** — `php init`.
4. **Konfigurasi `.env`** — copy dari `.env.example`, sesuaikan DB dan key.
5. **Migrasi Database** — import dump v4 atau jalankan Yii2 migration.
6. **Verifikasi** — cek halaman frontend & backend.

Gunakan komponen Starlight: `Steps`, `Tabs` (Linux/macOS/Windows), `Code`, `Aside`.

### 4.3 `v4-ke-v5.mdx` — Upgrade v4 ke v5

**Status: Placeholder.**

Gunakan `<Aside type="caution">` yang menjelaskan:
- ILDIS v5 sedang dalam perencanaan dan belum masuk tahap pengembangan aktif.
- Untuk update perkembangan, hubungi tim melalui [Dukungan & Komunitas](/v4/dukungan-komunitas).
- Atau pantau repository utama [GitHub Releases](https://github.com/bphndigitalservice/ildis/releases).

Tidak ada langkah teknis yang ditulis sampai v5 release notes tersedia.

### 4.4 `upgrade-patch.mdx` — Patch Upgrade dalam v4

**Instruksi umum upgrade patch** (ditulis manual, sama untuk semua patch):
1. **Backup** (`Aside type="caution"`).
2. **Pull / Download** release terbaru.
3. **Composer update**.
4. **Jalankan migration** (jika ada).
5. **Clear cache**.
6. **Verify**.

**Tabel versi** (data rilis di-generate dari GitHub):

| Versi | Tanggal Release | Link Changelog | Catatan |
|-------|-----------------|----------------|---------|
| v4.2.0 | 25 Mei 2026 | [Lihat Release](https://github.com/bphndigitalservice/ildis/releases/tag/v4.2.0) | ⚠ Breaking: butuh PHP ≥8.3, replace SwiftMailer |
| v4.1.4 | 13 Mei 2026 | [Lihat Release](https://github.com/bphndigitalservice/ildis/releases/tag/v4.1.4) | Bug fixes: filter published news |
| v4.1.3 | 13 Mei 2026 | [Lihat Release](https://github.com/bphndigitalservice/ildis/releases/tag/v4.1.3) | Bug fixes: filter published news |
| v4.1.2 | 12 Mei 2026 | [Lihat Release](https://github.com/bphndigitalservice/ildis/releases/tag/v4.1.2) | (tambahkan catatan jika ada) |
| ... | ... | ... | ... |

**Catatan tabel:**
- Baris dengan breaking changes ditandai dengan prefix `⚠`.
- Jika suatu versi lama tidak memiliki release page GitHub, kolom "Link Changelog" tetap ditampilkan kosong atau dengan strip `-`.
- Tabel dapat dimanfaatkan sebagai "quick reference" sebelum user mengklik release page GitHub.

---

## 5. Error Handling & Edge Cases

1. **v4 → v5 kosong / placeholder**: Pastikan `v4-ke-v5.mdx` jelas menjelaskan status "belum release" — jangan biarkan user bingung karena halaman kosong.
2. **Backwards compatibility warning**: Semua halaman upgrade yang menyentuh database harus memiliki banner `Aside type="caution"` di paling atas, meminta user untuk melakukan backup DB dan folder aplikasi sebelum upgrade.
3. **Version selector**: Saat user switch ke v5 via version selector dan path `/v5/upgrade/` belum ada, sebaiknya redirect ke `/v5/` (halaman splash) atau halaman tentang. Ini perlu dicek eksisting behavior v5 selector.

---

## 6. Testing Plan

1. **Build test**: `pnpm build` berhasil tanpa error.
2. **Navigation test**: Semua link dari `index.mdx` ke detail page berfungsi tanpa 404.
3. **Sidebar test**: Group "Upgrade" muncul di sidebar v4 dan item-nya bisa diklik.
4. **Version selector test**: Saat switch v4→v5 atau v5→v4 dari halaman upgrade, navigasi tetap valid atau redirect dengan benar.
5. **Mobile test**: Tabel versi di `upgrade-patch.mdx` tetap terbaca di layar kecil (scroll horizontal jika perlu).

---

## 7. Success Criteria

- Halaman `/v4/upgrade/` bisa diakses dan menampilkan 3 card jalur upgrade.
- `/v4/upgrade/v3-ke-v4/` dan `/v4/upgrade/upgrade-patch/` memiliki instruksi teknis yang benar dan mudah diikuti.
- `/v4/upgrade/v4-ke-v5/` memiliki pesan placeholder yang jelas.
- Tabel versi di `upgrade-patch.mdx` akurat (manual copy dari GitHub Releases) dan bersih.
- Sidebar di v4 menunjukkan group "Upgrade" dengan 4 item nav.
- `pnpm build` tidak gagal dan tidak ada broken link internal.
