<p align="center">
  <img src="public/assets/logo/logo_stealth.png" alt="Antisgam logo" width="160">
</p>

<h1 align="center">Antisgam</h1>

<p align="center">
  Find out who you follow on Instagram that doesn't follow you back — entirely in your browser.
  <br>
  <strong>Live at <a href="https://antisgam.web.app/">https://antisgam.web.app/</a></strong>
</p>

## What it does

Antisgam analyzes the zip file you get from Instagram's **"Download your information"** export
and lists the accounts you follow that don't follow you back. Everything runs **locally**: no
data ever leaves the browser. Scans are kept in the device's `localStorage` (up to 10) and can be
deleted from the Settings page.

## Commands

```bash
npm run dev            # dev server (with live typecheck/eslint/stylelint)
npm run build          # tsc -b && vite build
npm run preview        # preview the production build
npm run lint           # eslint + stylelint
npm run typecheck      # tsc -b
npm test               # vitest (run)
npm run test:watch     # vitest in watch mode
npm run test:coverage  # v8 coverage
```

Requires Node >= 22.12.

## Architecture

```
src/
  app/              bootstrap: App, router, layout (toolbar, drawer, menu, history)
  features/
    scan/           analysis domain
      model/        types (ScanInput, ScanResult, ScanRecord, raw export shapes)
      domain/       pure functions: JSON parser, unfollowers analysis, zip reading
      store/        jotai atoms (persisted history with legacy-format migration)
      hooks/        useScanUpload, useScanHistory, useScanRecord
    theme/          theme preference (auto/light/dark), ThemeManager, MUI themes
  shared/
    components/     FilePicker (+ useFilePicker), NicknameList, PageSection
    hooks/          useClipboard, useDisclosure, useRotatingIndex, useTimeout
    utils/          zip, fileAccept, formatDate
  pages/            Homepage, LoadingScreen, Results, Settings, NotFound (UI only)
  test/             vitest setup, JSON fixtures in Instagram export format, helpers
```

Principles:

- **Pure, testable domain**: `features/scan/domain` has no React dependency. Parsers accept
  `unknown` and never throw on malformed input.
- **Logic in hooks, UI in pages**: no per-page Context/Provider; each page composes feature
  hooks and shared components.
- **Flow**: Homepage (`useScanUpload`) reads the zip → `analyzeScan` → saves to history →
  `/loading/:scanId` (staged wait) → `/results/:scanId`. The history in the side menu opens
  `/results/:scanId` for any saved scan.
- `@/` alias → `src/`.

## Tests

Vitest + React Testing Library + jsdom. Fixtures in `src/test/fixtures` replicate the JSON files
of the Instagram export (`followers_N.json`, `following.json`, `pending_follow_requests.json`,
`removed_suggestions.json`) and `buildExportZip` builds an in-memory zip with that structure.

## Security

- 100% client-side processing; no requests to third parties (fonts and icons are self-hosted).
- Security headers (CSP, HSTS, nosniff, frame-ancestors, ...) configured in `firebase.json`.
- 50 MB limit per JSON file inside the zip (zip-bomb protection) and file type validation by
  MIME type **and** extension.
- Data read from `localStorage` is normalized/validated before use.
