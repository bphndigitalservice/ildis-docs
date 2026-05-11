# Fix 404 Links on ILDIS v4 Splash Page — Design Document

**Date:** 2026-05-11
**Status:** Approved

## Problem

Clicking the **"Mulai Instalasi"** and **"Tentang ILDIS"** action buttons on the ILDIS v4 splash page (`/v4/`) results in a `404 Not Found` error.

## Root Cause

The v4 splash page (`src/content/docs/v4/index.mdx`) defines its hero action `link` properties using absolute paths without the version prefix:

- `link: /instalasi` should be `link: /v4/instalasi`
- `link: /tentang-ildis` should be `link: /v4/tentang-ildis`

Because the documentation is versioned under `/v4/...`, un-prefixed absolute paths do not match any existing route.

## Audit Scope

In addition to the two broken hero buttons, we will scan **all `.mdx` files** under `src/content/docs/v4/` and `src/content/docs/v5/` for internal absolute links (starting with `/`) that are missing the correct version prefix (`/v4/` or `/v5/` respectively).

Links to external sites (e.g., `https://...`) and API endpoints (e.g., `/api/...`) must be **excluded** from the audit.

## Changes

### 1. Fix v4 Splash Page Hero Links

File: `src/content/docs/v4/index.mdx`

| Current Link | Corrected Link |
|----------------|------------------|
| `/instalasi`   | `/v4/instalasi`  |
| `/tentang-ildis` | `/v4/tentang-ildis` |

### 2. Audit & Fix All Documentation Pages

- Scan every `.mdx` file in `src/content/docs/v4/` for absolute internal links missing `/v4/`.
- Scan every `.mdx` file in `src/content/docs/v5/` for absolute internal links missing `/v5/`.
- Prefix each broken link with the version corresponding to the file's parent directory.

## Testing Plan

1. Run `pnpm build` locally to ensure the project builds successfully.
2. Manually verify the v4 splash page:
   - Click **"Mulai Instalasi"** → should navigate to `/v4/instalasi`
   - Click **"Tentang ILDIS"** → should navigate to `/v4/tentang-ildis`
3. Spot-check any additional files modified during the audit to confirm corrected links resolve correctly.

## Success Criteria

- The **"Mulai"** and **"Tentang ILDIS"** buttons on `/v4/` navigate to valid pages without 404 errors.
- No un-prefixed internal absolute links remain in `src/content/docs/v4/` or `src/content/docs/v5/`.
- `pnpm build` completes without link-related build errors.
