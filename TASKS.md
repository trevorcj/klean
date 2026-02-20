# Klean Implementation Tasks

This document breaks the project into concrete tasks and includes test instructions for each step.

## Stack
- Runtime: Node.js (>=18)
- CLI prompt library: Inquirer
- Scaffold engine: Vite (`npm create vite@latest`)
- Styling option: Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/vite`)


## How to test locally before npm publish
You do **not** need to publish to npm to test. Use one of these:

1. Direct run:
   ```bash
   npm install
   node bin/create-klean.js my-klean-app
   ```
2. Linked command name:
   ```bash
   npm install
   npm link
   create-klean my-klean-app
   ```
3. Local npx execution:
   ```bash
   npm install
   npx --yes . my-klean-app
   ```

---

## Task 1 — Bootstrap CLI package
**Goal:** make a runnable CLI command `create-klean`.

### Done
- Added npm package metadata and binary mapping.
- Added executable entrypoint in `bin/create-klean.js`.

### How to test
1. Install dependencies in this repo:
   ```bash
   npm install
   ```
2. Run the CLI entry point:
   ```bash
   node bin/create-klean.js --help
   ```
   (The tool is interactive, so this mainly verifies startup.)

---

## Task 2 — Prompt + Vite scaffolding
**Goal:** prompt for language/tailwind and scaffold React app using Vite template.

### Done
- Prompts for:
  - project name (if not provided as first argument)
  - language (JavaScript/TypeScript)
  - Tailwind yes/no
- Runs Vite scaffold with the proper template (`react` or `react-ts`).
- Runs `npm install` in generated project.

### How to test
```bash
node bin/create-klean.js my-klean-app
```
Pick options in the prompt and ensure the folder is generated.

---

## Task 3 — Cleanup and opinionated project reset
**Goal:** remove demo clutter and enforce clean hello-world app.

### Done
- Removes Vite demo files (`src/assets/react.svg`, `src/App.css`, `public/vite.svg`).
- Rewrites `App.jsx/App.tsx` to a clean `Hello world` component.
- Rewrites `main.jsx/main.tsx` to only import app + css.
- Clears `src/index.css` (or injects Tailwind import when enabled).

### How to test
After generation:
```bash
cd my-klean-app
cat src/App.*
cat src/index.css
```
Verify app is minimal.

---

## Task 4 — Optional Tailwind install/config
**Goal:** install latest Tailwind and wire Vite plugin when selected.

### Done
- Installs `tailwindcss` and `@tailwindcss/vite`.
- Updates `vite.config.*` with Tailwind plugin.
- Sets `@import "tailwindcss";` in `src/index.css`.

### How to test
Generate with Tailwind enabled, then:
```bash
cd my-klean-app
npm run build
```
Build should succeed.

---

## Task 5 — Branding and final structure
**Goal:** apply Klean branding + target folder architecture.

### Done
- Adds `public/klean-logo.svg` and points `index.html` icon link to it.
- Updates html `<title>` to project name.
- Ensures folder structure:
  - `src/assets`
  - `src/features`
  - `src/ui`
  - `src/services`
  - `src/utils`
  - `src/hooks`
  - `src/types`

### How to test
```bash
cd my-klean-app
find src -maxdepth 2 -type d | sort
cat index.html
```
Confirm icon and title were updated, and folders exist.

---

## Task 6 — Final validation pipeline
**Goal:** ensure generated project actually works.

### Done
- Runs `npm run build` before reporting success.
- Prints final success message and next steps.

### How to test
Generate app and confirm build check runs automatically. You can additionally run:
```bash
cd my-klean-app
npm run dev
```
