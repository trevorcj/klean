# Klean — Opinionated React Project Initializer

### Overview

Klean is a Node.js CLI tool that scaffolds **clean, minimal, opinionated React projects** using Vite under the hood. It eliminates Vite demo clutter, enforces a structured folder architecture, optionally installs the latest Tailwind CSS, and replaces default branding—including the Vite favicon—with a Klean-branded favicon. Its purpose is to **save time, remove noise, and give a distraction-free starting point for React development**.

---

### Core Responsibilities

Klean must:

1. Scaffold a React project via Vite.
2. Support JavaScript and TypeScript.
3. Optionally install and configure the latest Tailwind CSS.
4. Remove default Vite demo code, logos, and styling.
5. Replace the default Vite favicon with a Klean-branded favicon.
6. Enforce a predefined scalable folder structure.
7. Leave the project in a clean “Hello world” state.
8. Ensure the project runs successfully after generation.

---

### Execution Flow

**Command:**

```bash
npx create-klean my-app
```

**Step 1 — User Prompts:**

- Project name (if not provided via CLI argument)
- Language: JavaScript or TypeScript
- Tailwind CSS: Yes / No

---

**Step 2 — Scaffold with Vite:**

- Internally runs `npm create vite@latest <project-name>`
- Select React + JS/TS variant based on user input
- Installs dependencies automatically

---

**Step 3 — Cleanup Phase:**

- Delete `src/assets/react.svg`, `src/App.css`, default logos, and demo assets
- Replace `App.jsx` / `App.tsx` with:

```jsx
function App() {
  return <div>Hello world</div>
}

export default App
```

- Clear `index.css` of default styles
- Ensure no unused imports remain

---

**Step 4 — Tailwind Setup (Optional):** If Tailwind selected:

1. Install latest Tailwind and dependencies
2. Inject Tailwind import into global CSS
3. Confirm project builds correctly

---

**Step 5 — Replace Favicon:**

- Remove default Vite favicon (`public/vite.svg`)
- Add Klean-branded favicon (`public/klean-logo.svg`)
- Update `<link rel="icon">` in `index.html`
- Update `<title>` to project name

---

**Step 6 — Folder Structure Enforcement:**

- Reorganize `src` as:

```text
src/
  assets/
  features/
  ui/
  services/
  utils/
  hooks/
  types/
  App.jsx / App.tsx
  main.jsx / main.tsx
  index.css
```

- Ensure path aliases work for cleaner imports (optional)

---

**Step 7 — Final Validation:**

- Check dependencies installed
- Run `npm run dev` (optional) to confirm project works
- Display success message: `Project created successfully! Klean architecture applied. Ready to build.`

---

### Technical Requirements

- Node.js scripting (fs, path, child\_process)
- CLI prompt library (inquirer or equivalent)
- JSON file editing
- Async handling and graceful error exit
- npm dependency installation via script

---

### Philosophy

Klean is:

- Opinionated
- Minimal
- Clean
- Structured
- Demo and branding free
- Production-ready from day one

It is a tool **built for clarity, speed, and developer sanity**.

