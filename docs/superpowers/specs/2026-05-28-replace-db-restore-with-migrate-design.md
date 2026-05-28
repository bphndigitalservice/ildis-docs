# Design: Replace DB Restore with Yii2 Migrate & Remove Default User

**Date:** 2026-05-28  
**Status:** Approved  
**Scope:** Replace `mysql ... < DATABASE/ildis_v4.sql` commands with `php yii migrate`, and remove default user credentials from docs.

---

## Changes

### 1. `src/content/docs/v4/instalasi/vagrant.mdx`
- Replace database creation + SQL import block with `CREATE DATABASE ildis_v4;` then `php yii migrate`
- Remove `migrateDatabase` export variable, add `phpMigrate` export
- Update heading from "migrasi database" context to "Migrasi Database"

### 2. `src/content/docs/v4/instalasi/manual-linux.mdx`
- Section "4. Import Database" → rename to "4. Migrasi Database"
- Add `CREATE DATABASE ildis_v4;` step (manual install needs it)
- Replace `mysql -u root -p ildis_v4 < DATABASE/ildis_v4.sql` with `php yii migrate`

### 3. `src/content/docs/v4/instalasi/manual-windows.mdx`
- Section "5. Import Database" → rename to "5. Migrasi Database"
- Add `CREATE DATABASE ildis_v4;` step
- Replace `mysql -u root -p ildis_v4 < DATABASE/ildis_v4.sql` with `php yii migrate`

### 4. `src/content/docs/v4/instalasi/setelah-instalasi.mdx`
- Remove "User Default Backend / Admin" section entirely (the `sample` / password credentials block)
- Keep only "Membuat user dengan CLI" section
- Rename the remaining section heading to "Membuat User Admin"

### 5. `src/content/docs/v4/instalasi/pasang-cepat.mdx`
- No changes (One-Click handles DB automatically)

## Out of Scope
- Sidebar changes
- New pages or components
- Changes to `astro.config.mjs`