# Restructure Instalasi Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Restructure single `v4/instalasi.mdx` into 6 focused pages (index + 5 methods + post-install) with card-based method selection, while preserving all existing content.

**Architecture:** Each installation method gets its own MDX page under `/v4/instalasi/` folder. The index page uses Starlight built-in `<Card>` and `<CardGrid>` components. Post-install steps are deduplicated into a single shared page. Sidebar in `astro.config.mjs` is updated to reflect the new group.

**Tech Stack:** Astro, Starlight (with `starlight-theme-nova`), MDX, pnpm

---

## File Structure

```
src/content/docs/v4/
├── instalasi.mdx                    # DELETED (migrated to folder below)
├── instalasi/
│   ├── index.mdx                    # Landing: 3-card method selection
│   ├── pasang-cepat.mdx             # One-click install (Docker under the hood)
│   ├── vagrant.mdx                  # Vagrant VM development setup
│   ├── manual-linux.mdx             # Linux/macOS manual (LAMP/LEMP)
│   ├── manual-windows.mdx           # Windows manual (XAMPP)
│   └── setelah-instalasi.mdx        # Shared post-install steps
├── config_example/
│   ├── env, env_cookie_validation_key, env_database
│   ├── nginx.conf, apache.conf, vagrant
│   └── (reused by new pages, no changes)
├── index.mdx                        # Splash page (link to /v4/instalasi must still work)
└── ...
astro.config.mjs                     # Sidebar update for "Instalasi" group
```

---

## Task 1: Create Folder and Delete Monolith

**Files:**
- Delete: `src/content/docs/v4/instalasi.mdx`

- [ ] **Step 1: Create directory for new pages**

```bash
mkdir -p src/content/docs/v4/instalasi
```

- [ ] **Step 2: Delete old monolithic file**

```bash
rm src/content/docs/v4/instalasi.mdx
```

> **Warning:** Do NOT delete until you have all content copied locally or in git history. The file `instalasi.mdx` (481 lines) is the source of truth for all content migration.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: prepare instalasi folder, delete monolith page"
```

---

## Task 2: Create Index Page (`src/content/docs/v4/instalasi/index.mdx`)

**Files:**
- Create: `src/content/docs/v4/instalasi/index.mdx`

**Content Requirements:**
- Frontmatter with `title: "Instalasi ILDIS"` and `description`.
- `<Aside type="tip">` linking to `/v4/persyaratan-sistem`.
- `<CardGrid>` with 3 `<Card>` elements from `@astrojs/starlight/components`.
- Card 1: "Pasang Cepat" with `icon="rocket"`, green badge "Direkomendasikan", links to `/v4/instalasi/pasang-cepat`.
- Card 2: "Vagrant" with `icon="laptop"`, orange badge "Development", links to `/v4/instalasi/vagrant`.
- Card 3: "Manual" with `icon="seti:gear"` or `"setting"`, blue badge "Linux / macOS / Windows", links to `/v4/instalasi/manual-linux` with a note about `/v4/instalasi/manual-windows`.
- No technical installation steps in body.

- [ ] **Step 1: Write index.mdx**

```mdx
---
title: Instalasi ILDIS
description: Pilih metode instalasi ILDIS yang sesuai dengan kebutuhan Anda.
---

import { Aside } from '@astrojs/starlight/components';
import { Card, CardGrid } from '@astrojs/starlight/components';

<Aside type="tip">
  Pastikan pada perangkat Anda telah terpasang Git, PHP, dan Composer.
  Lihat [Persyaratan Sistem](/v4/persyaratan-sistem) untuk detail lengkap.
</Aside>

Pilih salah satu metode instalasi di bawah ini:

<CardGrid>
  <Card title="Pasang Cepat" icon="rocket">
    **Direkomendasikan.** Script otomatis dengan Docker/Podman. Termasuk update dan mode non-interactive.
    
    [Mulai Pasang Cepat](/v4/instalasi/pasang-cepat)
  </Card>
  <Card title="Vagrant" icon="laptop">
    **Development.** Virtual machine dengan semua dependensi terkonfigurasi. Tidak disarankan untuk production.
    
    [Mulai dengan Vagrant](/v4/instalasi/vagrant)
  </Card>
  <Card title="Manual" icon="setting">
    **Linux / macOS / Windows.** Konfigurasi lengkap pada server Anda sendiri.
    
    [Linux & macOS](/v4/instalasi/manual-linux) · [Windows](/v4/instalasi/manual-windows)
  </Card>
</CardGrid>
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/instalasi/index.mdx
git commit -m "docs: add instalasi index page with card-based method selection"
```

---

## Task 3: Create One-Click Page (`src/content/docs/v4/instalasi/pasang-cepat.mdx`)

**Files:**
- Create: `src/content/docs/v4/instalasi/pasang-cepat.mdx`

**Content Source:** Lines 27-39 of old `instalasi.mdx`
**Requirements:**
- Main one-liner command: `curl -fsSL ... | bash`
- Non-interactive flag: `--non-interactive`
- Update command: `./install.sh --update`
- Brief context that this uses Docker/Podman under the hood.
- "Langkah Selanjutnya" section linking to `/v4/instalasi/setelah-instalasi`.

- [ ] **Step 1: Write pasang-cepat.mdx**

```mdx
---
title: Pasang Cepat
description: Instal ILDIS dengan satu perintah menggunakan script otomatis.
---

import { Code } from '@astrojs/starlight/components';
import { Aside } from '@astrojs/starlight/components';

Metode **Pasang Cepat** adalah cara termudah dan paling direkomendasikan untuk menjalankan ILDIS. Script ini secara otomatis menggunakan Docker (atau Podman) untuk menyiapkan lingkungan yang dibutuhkan.

## Perintah Pasang Cepat

Pasang ILDIS dengan satu perintah:

<Code code={`curl -fsSL https://raw.githubusercontent.com/bphndigitalservice/ildis/main/install.sh | bash`} lang="shell" />

Untuk pemasangan non-interaktif (CI/otomatisasi):

<Code code={`curl -fsSL https://raw.githubusercontent.com/bphndigitalservice/ildis/main/install.sh | bash -s -- --non-interactive`} lang="shell" />

Untuk memperbarui instalasi yang ada:

<Code code={`./install.sh --update`} lang="shell" />

<Aside type="note">
  Script ini akan menarik image Docker yang dibutuhkan, mengkonfigurasi container, dan menjalankan ILDIS secara otomatis.
</Aside>

---

## Langkah Selanjutnya

Setelah instalasi berhasil, lanjutkan ke halaman berikut untuk konfigurasi awal:

- [Langkah Setelah Instalasi](/v4/instalasi/setelah-instalasi)
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/instalasi/pasang-cepat.mdx
git commit -m "docs: add one-click install page (pasang-cepat)"
```

---

## Task 4: Create Vagrant Page (`src/content/docs/v4/instalasi/vagrant.mdx`)

**Files:**
- Create: `src/content/docs/v4/instalasi/vagrant.mdx`
- Reuse: `src/content/docs/v4/config_example/vagrant`

**Content Source:** Lines 127-207 of old `instalasi.mdx`
**Requirements:**
- Caution: Vagrant is NOT for production.
- Prerequisites: Vagrant + VirtualBox.
- GitHub PAT generation steps (with screenshot reference).
- `vagrant up`, `vagrant ssh`.
- `composer install && php init`.
- `.env` copy and configuration (reuse `configExample`).
- MySQL database creation (`create database ...`) and import (`mysql ... < DATABASE/ildis_v4.sql`).
- Access URLs: `http://ildis-frontend.test` and `http://ildis-backend.test`.
- Screenshots references (vagrant-up.png, vagrant-ssh.png, success-ildis-frontend.png).
- "Langkah Selanjutnya" linking to `/v4/instalasi/setelah-instalasi`.

- [ ] **Step 1: Write vagrant.mdx**

> Copy content from old `instalasi.mdx` lines 127-207, adjusting image paths from `../../../assets/images/docs/` to `../../../../assets/images/docs/` (one extra level deeper).

```mdx
---
title: Instalasi dengan Vagrant
description: Instal ILDIS menggunakan Vagrant untuk lingkungan development.
---

import { Aside } from '@astrojs/starlight/components';
import { Code } from '@astrojs/starlight/components';
import vagrantConfig from '../config_example/vagrant?raw';
import configExample from '../config_example/env?raw';

<Aside type="caution">
  Vagrant adalah alat yang sangat berguna untuk _development_, tetapi tidak disarankan untuk digunakan dalam _production_. Alat lain seperti Terraform dan platform cloud lebih cocok untuk lingkungan produksi yang membutuhkan skalabilitas, kontrol yang lebih ketat, dan keamanan yang lebih baik.
</Aside>

Instalasi ILDIS dengan menggunakan vagrant adalah cara yang paling mudah dan cepat untuk development. Namun sebelum itu pastikan terlebih dahulu bahwa pada perangkat Anda telah terpasang [Vagrant](https://developer.hashicorp.com/vagrant/install) dan [VirtualBox](https://www.virtualbox.org/wiki/Downloads).

export const vagrantUp = `vagrant up`;

PERHATIAN!! Sebelum itu Anda harus membuat Github Personal Token terlebih dahulu <a href="https://github.com/settings/tokens" target="_blank">di sini</a>. Pada halaman tersebut Anda dapat memilih **Generate New Token** lalu pilih **Generate new token (classic)** dan pilih _Expiration_ sesuai kebutuhan Anda. Centang **_repo_** seperti pada gambar:

![Github PAT](../../../../assets/images/docs/github-new-token.png)

Selanjutnya copy Personal Access Token Tersebut ke file `vagrant/config/vagrant-local.yml` pada bagian `github_token`:

<Code code={vagrantConfig} title="vagrant-local.yml" lang="yaml" mark={['github_token']}/>

Setelah itu Anda dapat mengeksekusi perintah berikut:

<Code code={vagrantUp} title="Terminal" lang="shell"/>

Berikut adalah contoh proses booting virtual machine dengan perintah vagrant up berhasil:

![vagrant up](../../../../assets/images/docs/vagrant-up.png)

Jika virtual machine sudah berjalan, selanjutnya adalah masuk ke virtual machine menggunakan ssh dengan perintah berikut:

export const vagrantSsh = `vagrant ssh`;

<Code code={vagrantSsh} title="Terminal" lang="shell"/>

Maka Anda akan masuk ke dalam virtual machine dengan ildisv4 seperti contoh berikut:

![vagrant ssh](../../../../assets/images/docs/vagrant-ssh.png)

Selanjutnya adalah melakukan setup project ILDIS dengan perintah berikut:

export const initializeYii2 = `cd /app && composer install && php init`;

<Code code={initializeYii2} title="vagrant@ildis4:~" lang="shell"/>

Jika semua proses sudah selesai selanjutnya Anda dapat melakukan konfigurasi ILDIS pada file `.env`. Sebelum itu copy terlebih dahulu file konfigurasi contoh dengan perintah berikut:

export const envFileCopy = `cp .env.example .env`;

<Code code={envFileCopy} title="vagrant@ildis4:~" lang="shell"/>

Setelah itu Anda dapat mengubah konfigurasi file `.env` sesuai dengan kebutuhan Anda. Berikut adalah isi dari file konfigurasi:

<Code code={configExample} lang="text" title=".env" lang="shell"/>

Jika semua konfigurasi sudah selesai, buat database dengan nama sesuai dengan yang Anda buat pada file konfigurasi. Di sini misalnya `ildis_v4`:

<Code code={`mysql -u root`} lang="shell" title="vagrant@ildis4:~"/>

Lalu buat database dengan perintah berikut:

<Code code={`create database ildis_v4; //tekan enter\\nexit;`} lang="shell" title="mysql"/>

Selanjutnya Anda dapat melakukan migrasi database dengan perintah berikut:

export const migrateDatabase = `mysql -u root ildis_v4 < /app/DATABASE/ildis_v4.sql`;

<Code code={migrateDatabase} lang="shell" title="vagrant@ildis4:~"/>

Jika semua berjalan dengan baik maka Anda dapat mengakses laman ILDIS pada:
- http://ildis-frontend.test (untuk frontend)
- http://ildis-backend.test (untuk halaman admin)

Jika semua berjalan lancar maka Anda akan mendapatkan tampilan seperti ini:

![Sukses Instalasi ILDIS Frontend](../../../../assets/images/docs/success-ildis-frontend.png)

---

## Langkah Selanjutnya

Setelah instalasi berhasil, lanjutkan ke halaman berikut untuk konfigurasi awal:

- [Langkah Setelah Instalasi](/v4/instalasi/setelah-instalasi)
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/instalasi/vagrant.mdx
git commit -m "docs: add vagrant installation page"
```

---

## Task 5: Create Manual Linux/macOS Page (`src/content/docs/v4/instalasi/manual-linux.mdx`)

**Files:**
- Create: `src/content/docs/v4/instalasi/manual-linux.mdx`
- Reuse: `src/content/docs/v4/config_example/env_database`, `src/content/docs/v4/config_example/apache.conf`, `src/content/docs/v4/config_example/nginx.conf`

**Content Source:** Lines 209-299 of old `instalasi.mdx`
**Requirements:**
- Prerequisites with Tabs: Ubuntu vs macOS (Homebrew).
- Download and install: clone, `composer install`, `php init`.
- `.env` configuration (reuse `env_database` raw import).
- Database import (`mysql` command).
- Web server config with Tabs: Apache (`apache.conf` raw import) and Nginx (`nginx.conf` raw import), restart commands per OS.
- `/etc/hosts` edit.
- Access URLs.
- Notices about reCAPTCHA and Cookie Validation Key are removed from this page (they live in post-install now).
- "Langkah Selanjutnya" linking to `/v4/instalasi/setelah-instalasi`.

- [ ] **Step 1: Write manual-linux.mdx**

```mdx
---
title: Instalasi Manual — Linux & macOS
description: Instal ILDIS secara manual pada Linux atau macOS untuk lingkungan production.
---

import { Aside } from '@astrojs/starlight/components';
import { Code } from '@astrojs/starlight/components';
import { Tabs, TabItem } from '@astrojs/starlight/components';
import configExample from '../config_example/env?raw';
import databaseConfiguration from '../config_example/env_database?raw';
import nginx from '../config_example/nginx.conf?raw';
import apache from '../config_example/apache.conf?raw';

Instalasi manual ini cocok untuk lingkungan **production** pada sistem operasi Ubuntu, Linux lainnya, atau macOS. Namun perlu dipahami bahwa instalasi manual membutuhkan pemahaman dasar tentang konfigurasi server web (Apache/Nginx), virtual host, serta permission file dan folder.

---

## 1. Instalasi Prasyarat

export const installPrerequisitesUbuntu = `sudo add-apt-repository ppa:ondrej/php -y \\nsudo apt-get update\\nsudo apt install -y php7.4 php7.4-cli php7.4-common php7.4-curl php7.4-mbstring php7.4-intl php7.4-mysql php7.4-xml php7.4-fpm php7.4-gd php7.4-zip php7.4-xdebug unzip nginx mysql-server`;
export const installPrerequisitesMac = `brew tap shivammathur/php\\nbrew install php@7.4 mysql nginx git composer`;

<Tabs>
  <TabItem label="macOS (Homebrew)">
    <Code code={installPrerequisitesMac} lang="shell" />
    Setelah itu, tambahkan PHP 7.4 ke PATH:
    <Code code={`echo 'export PATH="/opt/homebrew/opt/php@7.4/bin:$PATH"' >> ~/.zshrc\\nsource ~/.zshrc`} lang="shell" />
  </TabItem>
  <TabItem label="Ubuntu">
    <Code code={installPrerequisitesUbuntu} lang="shell" />
    > **Catatan:** Jika `add-apt-repository` belum tersedia, jalankan `sudo apt-get install software-properties-common`.
  </TabItem>
</Tabs>

## 2. Unduh dan Pasang ILDIS

export const cloneCommandLinuxMac = `cd /var/www\\ngit clone https://github.com/bphndigitalservice/ildis.git\\ncomposer install --ignore-platform-reqs\\nphp init`;

<Code code={cloneCommandLinuxMac} lang="shell" />

## 3. Konfigurasi .env

<Code code={`cp .env.example .env`} lang="shell" />

Edit file `.env`:

<Code code={databaseConfiguration} lang="env" title=".env" />

## 4. Import Database

<Code code={`mysql -u root -p ildis_v4 < DATABASE/ildis_v4.sql`} lang="shell" />

## 5. Konfigurasi Web Server

Buat file virtual host untuk Apache:

<Code code={`sudo nano /etc/apache2/sites-available/ildis.conf`} lang="shell" />

<Code code={apache} lang="apache" />

Atau konfigurasi Nginx:

<Code code={`sudo nano /etc/nginx/sites-available/ildis`} lang="shell" />

<Code code={nginx} lang="nginx" title="nginx" />

Lalu aktifkan config-nya:

<Tabs>
  <TabItem label="macOS">
    <Code code={`sudo brew services restart nginx`} lang="shell" />
  </TabItem>
  <TabItem label="Ubuntu">
    <Code code={`sudo systemctl restart nginx`} lang="shell" />
  </TabItem>
</Tabs>

## 6. Edit /etc/hosts

<Code code={`127.0.0.1 ildis-frontend.test\\n127.0.0.1 ildis-backend.test\\n`} lang="hosts" />

## Akses Aplikasi

- http://ildis-frontend.test (untuk frontend)
- http://ildis-backend.test (untuk halaman admin)

---

## Langkah Selanjutnya

Setelah instalasi berhasil, lanjutkan ke halaman berikut untuk konfigurasi awal:

- [Langkah Setelah Instalasi](/v4/instalasi/setelah-instalasi)
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/instalasi/manual-linux.mdx
git commit -m "docs: add manual linux/macos installation page"
```

---

## Task 6: Create Manual Windows Page (`src/content/docs/v4/instalasi/manual-windows.mdx`)

**Files:**
- Create: `src/content/docs/v4/instalasi/manual-windows.mdx`
- Reuse: `src/content/docs/v4/config_example/apache.conf`

**Content Source:** Lines 307-357 of old `instalasi.mdx`
**Requirements:**
- Caution: Do not use XAMPP in production.
- Prerequisites: XAMPP download and setup.
- Clone to `htdocs` or extract release.
- `composer install`, `php init`.
- `.env` copy and edit.
- Database import via `mysql` or phpMyAdmin.
- Virtual host in `httpd-vhosts.conf` (reuse `apache.conf` raw import).
- Windows hosts file edit.
- Restart Apache via XAMPP Control Panel.
- "Langkah Selanjutnya" linking to `/v4/instalasi/setelah-instalasi`.

- [ ] **Step 1: Write manual-windows.mdx**

```mdx
---
title: Instalasi Manual — Windows (XAMPP)
description: Instal ILDIS secara manual pada Windows menggunakan XAMPP untuk lingkungan development.
---

import { Aside } from '@astrojs/starlight/components';
import { Code } from '@astrojs/starlight/components';
import apache from '../config_example/apache.conf?raw';

<Aside type="caution">
  Jangan gunakan XAMPP pada lingkungan production.
</Aside>

## 1. Unduh dan Pasang XAMPP

- Unduh dari [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html)
- Install dengan pilihan default
- Aktifkan Apache dan MySQL melalui XAMPP Control Panel

## 2. Unduh ILDIS

Clone ILDIS ke dalam folder `htdocs`:

<Code code={`cd C:\\xampp\\htdocs\\ngit clone https://github.com/bphndigitalservice/ildis.git ildis`} lang="shell" />

Atau ekstrak file rilis dari [GitHub Releases](https://github.com/bphndigitalservice/ildis/releases)

## 3. Setup Proyek

<Code code={`cd C:\\xampp\\htdocs\\ildis\\ncomposer install\\nphp init`} lang="powershell" />

## 4. Buat File .env

<Code code={`copy .env.example .env`} lang="powershell" />

Edit file `.env` dan sesuaikan nilai dengan kredensial MySQL / MariaDB Anda.

## 5. Import Database

<Code code={`mysql -u root -p ildis_v4 < DATABASE/ildis_v4.sql`} lang="powershell" />

Atau gunakan phpMyAdmin untuk import manual.

## 6. Buat Virtual Host

Edit file `C:\xampp\apache\conf\extra\httpd-vhosts.conf`, tambahkan:

<Code code={apache} lang="apache" title="httpd-vhosts.conf" />

Edit file hosts:

<Code code={`C:\\Windows\\System32\\drivers\\etc\\hosts`} lang="powershell" title="hosts" />

Tambahkan baris berikut:

<Code code={`127.0.0.1 ildis-frontend.test ildis-backend.test`} lang="text" title="hosts" />

Restart Apache dari XAMPP Control Panel.

---

## Langkah Selanjutnya

Setelah instalasi berhasil, lanjutkan ke halaman berikut untuk konfigurasi awal:

- [Langkah Setelah Instalasi](/v4/instalasi/setelah-instalasi)
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/instalasi/manual-windows.mdx
git commit -m "docs: add manual windows/xampp installation page"
```

---

## Task 7: Create Post-Install Page (`src/content/docs/v4/instalasi/setelah-instalasi.mdx`)

**Files:**
- Create: `src/content/docs/v4/instalasi/setelah-instalasi.mdx`
- Reuse: `src/content/docs/v4/config_example/env_cookie_validation_key`

**Content Source:** Lines 365-476 of old `instalasi.mdx`
**Requirements:**
- "User Default" with caution note.
- "Membuat User dengan CLI" command.
- "Cookie Validation Key" with Tabs (Linux/macOS vs Windows PowerShell), reuse `env_cookie_validation_key` raw import.
- "Google reCAPTCHA v3" step-by-step guide.
- Deployment reference link to `/v4/deployment`.

- [ ] **Step 1: Write setelah-instalasi.mdx**

```mdx
---
title: Setelah Instalasi
description: Langkah-langkah konfigurasi awal setelah instalasi ILDIS selesai.
---

import { Aside } from '@astrojs/starlight/components';
import { Code } from '@astrojs/starlight/components';
import { Tabs, TabItem } from '@astrojs/starlight/components';
import configCookie from '../config_example/env_cookie_validation_key?raw';

Bagian ini menjelaskan langkah-langkah yang harus dilakukan setelah instalasi ILDIS selesai, terlepas dari metode instalasi yang Anda pilih.

---

## User Default Backend / Admin

Untuk membuat user awal Anda dapat menggunakan user:

<Code code={`username : sample\\npassword: C~;4dwqWh>(!%:e,<r`} title="User Default" lang="text" />

<Aside type="caution">
  User default ini hanya untuk mencoba aplikasi. Pada pembaharuan selanjutnya kami akan menghapus user default ini dan menggunakan pembuatan user menggunakan command line.
</Aside>

### Membuat user dengan CLI

Untuk membuat user dengan CLI Anda dapat menggunakan command berikut:

<Code code={`php yii user/create`} title="Membuat User" lang="shell" />

---

## Cookie Validation Key

Pada halaman [konfigurasi](/v4/konfigurasi) terdapat entry `COOKIE_VALIDATION_KEY_BE` dan `COOKIE_VALIDATION_KEY_FE`. Kedua entry tersebut harus diisi untuk validasi cookie agar mekanisme keamanan dapat berjalan dengan benar.

export const highlights = ['COOKIE_VALIDATION_KEY_BE', 'COOKIE_VALIDATION_KEY_FE'];

<Code code={configCookie} title=".env" lang="text" mark={highlights} />

Untuk generate `COOKIE_VALIDATION_KEY_BE` / `COOKIE_VALIDATION_KEY_FE` Anda dapat mengeksekusi perintah berikut:

export const generateKey = `bash <(curl -s https://raw.githubusercontent.com/bphndigitalservice/ildis-helper-scripts/refs/heads/main/generate_cookie_keys.sh)`;
export const generateKeyPowershell = `$phpScript = Invoke-RestMethod -Uri "https://raw.githubusercontent.com/bphndigitalservice/ildis-helper-scripts/refs/heads/main/generate_cookie_keys.php"\\nphp -r $phpScript`;

<Tabs>
  <TabItem label="Linux / macOS">
    <Code code={generateKey} title="Terminal" lang="shell" />
  </TabItem>
  <TabItem label="Windows">
    <Code code={generateKeyPowershell} title="Windows PowerShell" lang="powershell" />
  </TabItem>
</Tabs>

---

## Google Recaptcha Key

Google reCAPTCHA v3 membantu melindungi ILDIS dari bot tanpa interaksi pengguna pada halaman Login Admin (backend). Berikut ini adalah langkah-langkah untuk mendapatkan **Site Key** dan **Secret Key** dari Google reCAPTCHA v3.

### Langkah-langkah Mendapatkan reCAPTCHA v3 Key

#### 1. Kunjungi Halaman Admin Google reCAPTCHA

Buka link berikut di browser Anda:

```
https://www.google.com/recaptcha/admin/create
```

> Anda harus login menggunakan akun Google.

#### 2. Daftarkan Situs Baru

Isi form yang tersedia dengan detail sebagai berikut:

- **Label**
  Nama identifikasi untuk project Anda. Misalnya: `MyILDIS`

- **reCAPTCHA Type**
  Pilih opsi:
  ```
  reCAPTCHA v3
  ```

- **Domains**
  Masukkan domain tempat Anda akan menggunakan reCAPTCHA, tanpa `https://` dan tanpa `/`. Contoh:
  ```
  ildis-backend.test
  jdih.kemenkum.go.id
  ```

- **Owners**
  Secara default diisi dengan akun Anda. Bisa ditambahkan owner lain jika perlu.

- **Accept the reCAPTCHA Terms of Service**
  Centang checkbox ini untuk menyetujui ketentuan.

- (Optional) Centang "Send alerts to owners" jika ingin menerima notifikasi keamanan dari Google.

Klik tombol **Submit** untuk mendaftar.

#### 3. Salin Site Key dan Secret Key

Setelah submit, Anda akan melihat dua key penting:

- **Site Key**
  Copy value pada bagian ini ke entry `RECAPTCHA_SITE_KEY`.

- **Secret Key**
  Copy value pada bagian ini ke entry `RECAPTCHA_SECRET_KEY`.

Referensi:

- [Google reCAPTCHA Docs](https://developers.google.com/recaptcha/docs/v3)
- [Admin Console](https://www.google.com/recaptcha/admin)

---

## Deployment

Untuk referensi konfigurasi deployment production yang lebih lengkap, lihat halaman [Deployment](/v4/deployment).
```

- [ ] **Step 2: Commit**

```bash
git add src/content/docs/v4/instalasi/setelah-instalasi.mdx
git commit -m "docs: add shared post-installation page"
```

---

## Task 8: Update Sidebar Configuration

**Files:**
- Modify: `astro.config.mjs` line 172 (current `{label: 'Instalasi', link: '/v4/instalasi'}`)

**Change:** Replace single sidebar item with expanded group containing 6 items.

- [ ] **Step 1: Edit sidebar in astro.config.mjs**

Locate the existing entry at approximately line 172:

```js
{label: 'Instalasi', link: '/v4/instalasi'},
```

Replace with:

```js
{
  label: 'Instalasi',
  items: [
    {label: 'Pilih Metode', link: '/v4/instalasi'},
    {label: 'Pasang Cepat', link: '/v4/instalasi/pasang-cepat'},
    {label: 'Vagrant', link: '/v4/instalasi/vagrant'},
    {label: 'Manual — Linux/macOS', link: '/v4/instalasi/manual-linux'},
    {label: 'Manual — Windows', link: '/v4/instalasi/manual-windows'},
    {label: 'Setelah Instalasi', link: '/v4/instalasi/setelah-instalasi'},
  ],
},
```

- [ ] **Step 2: Verify /v4/index.mdx link still works**

Check `src/content/docs/v4/index.mdx` line 9. It should be:

```yaml
      link: /v4/instalasi
```

This IS correct — `/v4/instalasi` will now resolve to `/v4/instalasi/index.mdx`.

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "config: expand instalasi sidebar into grouped links"
```

---

## Task 9: Build Verification

**Files:** N/A (project-wide verification)

**Requirements:**
- `pnpm astro check` passes with no TypeScript errors.
- `pnpm build` completes successfully with no errors or warnings about missing files.
- All 6 new pages are reachable from sidebar.
- Old `/v4/instalasi.mdx` no longer exists (no duplicate route conflict).

- [ ] **Step 1: Run TypeScript check**

```bash
pnpm astro check
```

Expected: `typescript: ok` or no errors.

- [ ] **Step 2: Run production build**

```bash
pnpm build
```

Expected: Build completes, output shows all new routes `/v4/instalasi/...` generated.

- [ ] **Step 3: Fix any build errors**

If build fails due to:
- Missing raw imports → verify relative paths (`../config_example/...` vs `../../config_example/...`)
- Image paths → adjust `../../../assets/...` to `../../../../assets/...` for one directory deeper
- Duplicate route → ensure `instalasi.mdx` is fully deleted

- [ ] **Step 4: Commit fixes**

```bash
git add -A
git commit -m "fix: address build errors from instalasi restructure"
```

---

## Self-Review Checklist (Plan Author)

**Spec coverage:**
- [x] 3-card index page with Pasang Cepat, Vagrant, Manual → Task 2
- [x] One-Click page with `curl | bash`, `--non-interactive`, `--update` → Task 3
- [x] Vagrant page with PAT, `vagrant up`, DB setup → Task 4
- [x] Manual Linux/macOS with Tabs for Ubuntu/macOS, Apache/Nginx → Task 5
- [x] Manual Windows with XAMPP, virtual host, hosts file → Task 6
- [x] Post-Install page with default user, CLI user creation, cookie key, reCAPTCHA → Task 7
- [x] Docker removed (covered by One-Click) → explicitly not created
- [x] Post-install deduplicated into one shared page → Task 7
- [x] Sidebar updated to expanded group → Task 8
- [x] Build verification → Task 9

**Placeholder scan:**
- [x] No "TBD", "TODO", or "fill in later"
- [x] No vague "add appropriate error handling" references
- [x] No "similar to Task N" shortcuts
- [x] All code blocks contain real content copied from original `instalasi.mdx`

**Type/path consistency:**
- [x] Image paths: `../../../assets/` → `../../../../assets/` (one level deeper)
- [x] Config raw imports: `../config_example/` (relative from `instalasi/` subfolder)
- [x] Frontmatter syntax consistent across all MDX files
- [x] Starlight component imports use `@astrojs/starlight/components`
