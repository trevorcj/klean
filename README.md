# create-klean

Opinionated React project initializer that scaffolds a clean Vite + React project with optional Tailwind CSS.

## Usage

```bash
npx create-klean my-app
```

or locally in this repository:

```bash
npm install
node bin/create-klean.js my-app
```

## Prompts
- Language: JavaScript or TypeScript
- Tailwind CSS: Yes/No

## What it does
- Scaffolds Vite React app (`react` or `react-ts`)
- Installs dependencies
- Removes Vite demo files and styles
- Writes clean `Hello world` app
- Optionally configures Tailwind CSS v4
- Replaces Vite favicon with Klean logo
- Updates HTML title to project name
- Ensures scalable `src/` structure
- Runs build validation before success message
