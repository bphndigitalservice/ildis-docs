# Versioned Documentation Design

## Overview

Add multi-version documentation support to the ILDIS docs site, allowing users to switch between v4 and v5 documentation via navbar dropdown and sidebar groupings.

## Goals

- Support multiple doc versions (v4, v5)
- Easy version switching via navbar dropdown
- Sidebar organized by version
- Default to latest version

## Architecture

### 1. Directory Structure

```
src/content/docs/
├── v4/                    # Version 4 docs
│   ├── tentang-ildis.mdx
│   ├── instalasi.mdx
│   ├── konfigurasi.mdx
│   ├── deployment.mdx
│   ├── struktur-direktori.mdx
│   ├── persyaratan-sistem.mdx
│   ├── kustomisasi.mdx
│   ├── kontribusi.mdx
│   ├── dukungan-komunitas.mdx
│   ├── alternative.mdx
│   ├── faq.mdx
│   ├── index.mdx
│   ├── integrasi/
│   │   └── jdihn.mdx
│   └── troubleshooting/    # if exists
├── v5/                    # Version 5 docs (new)
│   ├── tentang-ildis.mdx
│   ├── instalasi.mdx
│   ├── konfigurasi.mdx
│   └── index.mdx
└── index.mdx              # Redirect to latest (v5)
```

### 2. Version Dropdown Component

**File:** `src/components/VersionSelect.astro`

- Dropdown in navbar showing current version
- Options: v4 (current), v5 (latest)
- Stores selection in localStorage
- Links to appropriate version's index page

### 3. Starlight Configuration

- Configure sidebar for each version
- Add version selector to custom CSS/JS
- Set default version (v5 - latest)

### 4. Content Organization

- Move existing docs to `src/content/docs/v4/`
- Create `src/content/docs/v5/` with new docs
- Update sidebar config to handle versioned routes

## UI Specification

### Navbar
- Right side: version dropdown showing "v5 (latest)" or "v4"
- Dropdown shows available versions with badges

### Sidebar
- Group by version sections
- Version label header above each group's links

## Edge Cases
- Handle direct links to versioned pages
- Ensure internal links work within same version
- Handle missing docs in a version (show 404)

## Testing
- Verify version dropdown works
- Verify sidebar shows correct version's docs
- Verify version switching persists on refresh
- Verify internal links work correctly