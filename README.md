# create-klean

Opinionated React project initializer that scaffolds a clean Vite +
React application with optional Tailwind CSS and structured project
architecture.

[![npm version](https://img.shields.io/npm/v/create-klean.svg)](https://www.npmjs.com/package/create-klean)

## Quick Start

Create a new React project using Klean:

    npm create klean my-app

Or:

    npx create-klean my-app

Then:

    cd my-app
    npm install
    npm run dev

Your development server will start with a clean, minimal React setup.

## What Klean Does

Klean scaffolds a Vite + React project and then:

- Removes default Vite demo files and assets
- Deletes example logos and sample styles
- Replaces the default favicon with the Klean logo
- Updates the HTML title to match your project name
- Writes a minimal Hello World starter
- Optionally installs and configures Tailwind CSS
- Applies a structured src/ architecture
- Leaves you with a clean foundation ready for real development

No demo counters. No leftover branding. No clutter.

## Interactive Prompts

During setup, Klean will ask:

- Language
  - JavaScript
  - TypeScript
- Tailwind CSS
  - Yes
  - No
- Folder Structure
  - Plain
  - Feature-based

## Folder Structure Options

### Plain Structure

Best for small projects, prototypes, and simple applications.

Generated structure:

    src/
      components/
      App.jsx / App.tsx
      main.jsx / main.tsx
      index.css

`components/`: Reusable UI components such as Button, Card, Modal, Navbar.

This setup keeps everything simple and flat.

### Feature-Based Structure

Best for medium to large applications and long term projects.

Generated structure:

    src/
      features/
      ui/
      hooks/
      services/
      utils/
      assets/
      types/ (TypeScript only)
      App.jsx / App.tsx
      main.jsx / main.tsx
      index.css

features/\
Each feature owns its UI, logic, and related state.

Example:

    features/
      auth/
        AuthForm.jsx
        useAuth.js
      dashboard/
        DashboardPage.jsx
        dashboardService.js

`ui/`: Reusable global UI components.

`hooks/`: Shared custom React hooks used across features.

`services/`: API calls and external integrations.

`utils/`: Pure helper functions and shared utilities.

`types/`: Global TypeScript types and interfaces.

`assets/`: Images, fonts, and static resources.

This structure supports scalability and long term maintainability.

## Tailwind CSS Support

If Tailwind is selected:

- Latest version is installed
- Configuration is set up automatically
- Global CSS is prepared
- Utility classes are ready to use immediately

If not selected:

- A minimal CSS file is provided
- No styling framework is included
