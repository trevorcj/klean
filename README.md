# create-klean

Opinionated React project initializer that scaffolds a clean Vite + React project with optional Tailwind CSS.

## Stack

- Node.js CLI (CommonJS)
- Inquirer (interactive prompts)
- Vite scaffolding (`npm create vite@latest`)
- Optional Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/vite`)

## Do I need to publish to npm first?

No. You can fully test this locally **without** publishing.

## Local testing options

### Option A (fastest): run directly from this repo

```bash
npm install
node bin/create-klean.js my-app
```

### Option B: test the real command name via `npm link`

This simulates how users run the CLI globally.

```bash
# inside this repository
npm install
npm link

# now from any directory
create-klean my-app
```

To remove the global link later:

```bash
npm unlink -g create-klean
```

### Option C: run through npx from the local folder

```bash
npm install
npx --yes . my-app
```

## What to verify after generation

```bash
cd my-app
npm run dev
```

## Prompts

- Language: JavaScript or TypeScript
- Tailwind CSS: Yes/No
- Folder structure: Plain (default) or Feature-based

## What it does

- Scaffolds Vite React app (`react` or `react-ts`)
- Installs dependencies
- Removes Vite demo files and styles
- Writes clean `Hello world` app
- Optionally configures Tailwind CSS v4
- Replaces Vite favicon with Klean logo
- Updates HTML title to project name
- Ensures scalable `src/` structure
- Replaces generated app README with Klean-focused setup docs
