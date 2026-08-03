# Book Library and Reader Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a responsive home-page library for four KKN PDF books and an in-app PDF reader with book-style navigation.

**Architecture:** Keep book metadata in one typed data module and use React Router for `/` and `/books/:bookId`. Render PDFs with react-pdf/PDF.js, switching between one-page mobile and two-page desktop presentation while keeping navigation state in the reader component. Generate static first-page thumbnails for a fast library grid.

**Tech Stack:** React 19, TypeScript, Vite, React Router, react-pdf/PDF.js, shadcn/ui Base UI components, Vitest, Testing Library, Tailwind CSS v4.

---

### Task 1: Add dependencies and test infrastructure

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`

1. Install `react-router-dom`, `react-pdf`, Vitest, jsdom, and Testing Library packages with Bun.
2. Add `test` and `test:watch` scripts.
3. Configure Vitest for jsdom and the shared setup file.
4. Run the empty suite and verify the test runner starts cleanly.

### Task 2: Define and test book metadata

**Files:**
- Create: `src/lib/books.test.ts`
- Create: `src/lib/books.ts`

1. Write failing tests for the four extracted titles, URLs, cover paths, authors, and page counts.
2. Run tests and confirm failure because the module does not exist.
3. Implement the typed book catalog and lookup helper.
4. Run tests and confirm they pass.

### Task 3: Generate cover thumbnails

**Files:**
- Create: `public/books/covers/buku-1.webp`
- Create: `public/books/covers/buku-2.webp`
- Create: `public/books/covers/buku-3.webp`
- Create: `public/books/covers/buku-4.webp`

1. Render page one of each PDF with MuPDF.
2. Convert the results to optimized WebP thumbnails.
3. Verify dimensions, format, and file sizes.

### Task 4: Build and test the library page

**Files:**
- Create: `src/pages/library-page.test.tsx`
- Create: `src/pages/library-page.tsx`
- Create: `src/components/brand-lockup.tsx`
- Add via shadcn CLI: `src/components/ui/card.tsx`
- Add via shadcn CLI: `src/components/ui/badge.tsx`

1. Write failing tests for the masthead, four books, titles, cover images, metadata, and reader links.
2. Install and inspect the required shadcn components.
3. Build the responsive masthead and book-card grid.
4. Run tests and confirm they pass.

### Task 5: Build and test reader navigation logic

**Files:**
- Create: `src/lib/reader.test.ts`
- Create: `src/lib/reader.ts`

1. Write failing tests for page clamping, next/previous spread navigation, and mobile/desktop visible page calculation.
2. Implement the minimal pure reader helpers.
3. Run tests and confirm they pass.

### Task 6: Build and test the PDF reader page

**Files:**
- Create: `src/pages/book-reader-page.test.tsx`
- Create: `src/pages/book-reader-page.tsx`
- Add via shadcn CLI: `src/components/ui/alert.tsx`
- Add via shadcn CLI: `src/components/ui/skeleton.tsx`
- Add via shadcn CLI: `src/components/ui/tooltip.tsx`

1. Write failing tests for known/unknown books, toolbar labels, navigation state, download link, loading, and error states.
2. Install and inspect required shadcn components and Hugeicons APIs.
3. Configure the PDF.js worker and implement responsive page rendering.
4. Add accessible toolbar controls for back, page navigation, zoom, fullscreen, and download.
5. Run tests and confirm they pass.

### Task 7: Wire routes and verify

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Modify: `src/index.css`

1. Write a failing route smoke test for `/` and `/books/1`.
2. Add `BrowserRouter`, routes, and global reader canvas rules.
3. Run all tests, typecheck, lint, and production build.
4. Review the generated UI at mobile and desktop widths and correct any regressions.
