# Add Demo Link to ILDIS Docs

**Date:** 2026-05-28
**Status:** Approved

## Context

ILDIS has a live demo instance at `https://demo-ildis.bphn.go.id`. Users visit the docs to learn about ILDIS and decide whether to install it. A "try before install" demo link reduces friction for undecided users.

## Goal

Add contextual demo links on three pages, framed as "try ILDIS without installing" — targeting users who haven't committed to installation yet.

## Design

### 1. Splash page (`/v4/index.mdx`)

Add a third hero action:

```yaml
- text: Coba Demo
  link: https://demo-ildis.bphn.go.id
  icon: external
  variant: minimal
```

Full hero actions after change:

```yaml
actions:
  - text: Mulai Instalasi
    link: /v4/instalasi
    icon: right-arrow
  - text: Tentang ILDIS
    link: /v4/tentang-ildis
    icon: external
    variant: minimal
  - text: Coba Demo
    link: https://demo-ildis.bphn.go.id
    icon: external
    variant: minimal
```

### 2. Tentang ILDIS (`/v4/tentang-ildis.mdx`)

Add an `<Aside type="tip">` after the first paragraph (after the "Apa itu ILDIS?" section text, before the "---" separator):

```mdx
<Aside type="tip" title="Coba tanpa instalasi">
  Ingin melihat langsung? Buka [demo ILDIS](https://demo-ildis.bphn.go.id) — tidak perlu menginstal apa pun.
</Aside>
```

### 3. Instalasi (`/v4/instalasi/index.mdx`)

Add an `<Aside type="note">` between the existing prerequisites tip and the card grid (after line 12):

```mdx
<Aside type="note" title="Belum yakin?">
  Coba [demo ILDIS](https://demo-ildis.bphn.go.id) terlebih dahulu — tanpa perlu menginstal apa pun.
</Aside>
```

Uses `type="note"` (not `tip`) to visually distinguish from the existing `type="tip"` above it.

## Pages not modified

- All other sidebar pages — no changes
- `astro.config.mjs` — no global nav/header changes

## Components used

- Starlight built-in `hero` frontmatter (splash page)
- Starlight built-in `<Aside>` component (content pages)
- No custom components or CSS needed