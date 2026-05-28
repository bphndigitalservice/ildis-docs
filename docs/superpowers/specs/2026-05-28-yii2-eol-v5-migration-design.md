# Yii2 EOL Warning & v5 Migration Page — Design Spec

**Date:** 2026-05-28
**Status:** Approved

---

## 1. Tujuan

Menambahkan peringatan Yii2 End-of-Life ke halaman upgrade dan kontribusi, serta mengubah halaman placeholder v4→v5 menjadi halaman substantif yang menjelaskan:

1. Timeline EOL Yii2 (feature freeze, security end, full EOL)
2. Alasan migrasi ke stack baru (CVE berulang, kesulitan update, kebutuhan adaptasi)
3. Prinsip desain v5 (migrasi mudah, instalasi mudah, update mudah, keamanan modern)
4. Status saat ini (arsitektur masih dalam perencanaan, belum ada framework yang dipilih)

---

## 2. Files yang Diubah

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/content/docs/v4/upgrade/v4-ke-v5.mdx` | REWRITE | Dari placeholder menjadi halaman Yii2 EOL + v5 migration roadmap |
| `src/content/docs/v4/upgrade/upgrade-patch.mdx` | MODIFY | Tambah `Aside type="warning"` tentang Yii2 EOL |
| `src/content/docs/v4/upgrade/index.mdx` | MODIFY | Update deskripsi card v4→v5 |
| `src/content/docs/v4/kontribusi.mdx` | MODIFY | Tambah section berkontribusi pada v5 |

---

## 3. Content Design

### 3.1 `v4-ke-v5.mdx` — Yii2 EOL & v5 Migration Roadmap

**Frontmatter:**
```
title: Upgrade dari v4 ke v5
description: Timeline Yii2 EOL, alasan migrasi, dan roadmap ILDIS v5.
```

**Sections:**

1. **Danger Aside** — "Yii2 menerima perbaikan keamanan hanya sampai **23 November 2026**. Setelah tanggal tersebut, kerentanan keamanan tidak lagi ditambal."
2. **Yii2 End-of-Life Timeline** — Tabel dengan 4 milestone:
   - 12 Okt 2014: Rilis awal Yii 2.0
   - 30 Mei 2024: Feature freeze (hanya bug fix & keamanan)
   - 23 Nov 2026: Akhir perbaikan keamanan (tanggal kritis)
   - 23 Nov 2027: End of Life (tanpa dukungan sama sekali)
3. **Mengapa Migrasi ke v5** — 4 poin:
   - **Keamanan** — Yii2 berhenti menerima patch keamanan Nov 2026, CVE terus muncul
   - **Kesulitan Update** — dependensi lama, PHP version lock, manual migration
   - **Sistem Harus Beradaptasi** — regulasi berubah, kebutuhan meningkat, stack harus bisa mengikuti
   - **Stack Modern** — ekosistem PHP modern, tooling yang lebih baik, dependency management yang lebih aman
4. **Prinsip Desain v5** — 4 prinsip:
   - **Migrasi Lancar** — data dan konfigurasi v4 bisa dipindahkan tanpa manual export/import
   - **Instalasi Mudah** — one-click install seperti v4 saat ini (install.sh / Docker)
   - **Update Otomatis** — mekanisme update yang lebih andal, termasuk rollback
   - **Keamanan Berkelanjutan** — stack yang dipilih harus memiliki dukungan jangka panjang dan respons CVE cepat
5. **Status Saat Ini** — Info Aside type="note": arsitektur v5 masih dalam perencanaan, framework belum dipilih
6. **Yang Bisa Dilakukan Sekarang** — Steps:
   - Tetap update patch v4 untuk keamanan
   - Pantau GitHub Releases
   - Berkontribusi diskusi arsitektur v5 (link ke kontribusi page)
   - Hubungi it.dev@bphn.go.id

### 3.2 `upgrade-patch.mdx` — Tambah Warning Aside

Setelah Aside caution yang sudah ada (baris 8-10), tambahkan:

```mdx
<Aside type="warning">
  **Yii2 mendekati End-of-Life.** Perbaikan keamanan hanya tersedia hingga **November 2026**. Setelah itu, kerentanan tidak lagi ditambal. Pelajari rencana migrasi ke v5 di halaman [Upgrade v4 ke v5](/v4/upgrade/v4-ke-v5).
</Aside>
```

### 3.3 `upgrade/index.mdx` — Update Card v4→v5

Ganti deskripsi card v4→v5 dari:
> ILDIS v5 sedang dalam perencanaan dan belum tersedia.

Menjadi:
> Yii2 EOL November 2026. Pelajari timeline migrasi dan prinsip desain v5.

### 3.4 `kontribusi.mdx` — Section Baru: Berkontribusi pada v5

Tambahkan section setelah "Bantuan" (sebelum akhir file), berisi:
- Info bahwa v5 sedang dalam perencanaan arsitektur
- Link ke GitHub Discussions untuk diskusi arsitektur
- Cara berkontribusi: ikuti diskusi,Share use case, review proposal
- Email kontak

---

## 4. Self-Review

- [x] Tidak ada placeholder TBD/TODO
- [x] Semua link internal valid
- [x] Framework v5 tidak disebutkan (belum diputuskan)
- [x] Timeline Yii2 akurat berdasarkan yiiframework.com/release-cycle
- [x] Bahasa Indonesia konsisten
- [x] Menggunakan komponen Starlight bawaan (Aside, Steps, Card, CardGrid)