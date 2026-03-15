# Release Banner Feature Design

## Overview

Add a persistent top banner on the ILDIS documentation site that fetches and displays the latest release from the main `bphndigitalservice/ildis` GitHub repository.

## Goals

- Inform users of the latest ILDIS release
- Drive traffic to the releases/changelog page
- Simple implementation using client-side fetching

## Architecture

### 1. API Endpoint

**File:** `src/pages/api/releases.json.ts`

- Astro API endpoint that fetches latest release from GitHub API
- Endpoint: `GET /api/releases.json`
- External API: `https://api.github.com/repos/bphndigitalservice/ildis/releases/latest`
- Returns: `{ tag_name, published_at, html_url, body }`

### 2. Banner Component

**File:** `src/components/ReleaseBanner.astro`

- Client-side component that fetches release data
- Displays: version tag, release date, and link to changelog
- Fixed position at top of page
- Visible on all pages

### 3. Integration

Add banner to Starlight layout via custom head or component override.

## Data Flow

```
User visits page
    ↓
Browser loads ReleaseBanner component
    ↓
Component fetches /api/releases.json
    ↓
API fetches from GitHub (cached via Vercel)
    ↓
Banner renders with release info
```

## UI Specification

- **Position:** Fixed at top of viewport, below any site navigation
- **Height:** 40px
- **Background:** Primary accent color (Starlight theme accent)
- **Content:**
  - Left: "ILDIS v{version} released" with date
  - Right: "View Changelog" link to releases page
- **Typography:** Small text, white/high-contrast color
- **Responsive:** Full width, stack content on mobile

## Edge Cases

- **GitHub API rate limit:** Show nothing or fallback message
- **Network error:** Silently fail, don't show banner
- **No releases:** Handle empty response gracefully

## Testing

- Verify banner appears on all pages
- Verify correct version displays
- Verify link works correctly
- Verify no console errors on failure