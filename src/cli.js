const fs = require('node:fs/promises')
const path = require('node:path')
const { spawn } = require('node:child_process')
const inquirer = require('inquirer')

const JS_YELLOW = '\x1b[33mJavaScript\x1b[0m'
const TS_BLUE = '\x1b[34mTypeScript\x1b[0m'

const KLEAN_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Klean logo">
  <rect width="128" height="128" rx="24" fill="#111827"/>
  <path d="M34 30v68h16V70l30 28h22L66 64l34-34H78L50 58V30z" fill="#22d3ee"/>
</svg>
`

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      ...options
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Command failed: ${command} ${args.join(' ')}`))
    })
  })
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

function getTemplate(language) {
  return language === 'TypeScript' ? 'react-ts' : 'react'
}

function getExtension(language) {
  return language === 'TypeScript' ? 'tsx' : 'jsx'
}

async function getProjectConfig() {
  const providedProjectName = process.argv[2]

  const questions = []

  if (!providedProjectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate(input) {
        if (!input.trim()) {
          return 'Project name is required.'
        }

        return true
      }
    })
  }

  questions.push(
    {
      type: 'list',
      name: 'language',
      message: 'Language:',
      choices: [
        { name: JS_YELLOW, value: 'JavaScript', short: 'JavaScript' },
        { name: TS_BLUE, value: 'TypeScript', short: 'TypeScript' }
      ],
      default: 'JavaScript'
    },
    {
      type: 'confirm',
      name: 'tailwind',
      message: 'Install Tailwind CSS?',
      default: true
    },
    {
      type: 'list',
      name: 'structure',
      message: 'Which folder structure do you prefer?',
      choices: [
        { name: 'Plain (minimal setup)', value: 'plain' },
        { name: 'Feature-based (recommended for larger projects)', value: 'feature' }
      ],
      default: 'plain'
    }
  )

  const answers = await inquirer.prompt(questions)

  return {
    projectName: providedProjectName || answers.projectName,
    language: answers.language,
    tailwind: answers.tailwind,
    structure: answers.structure
  }
}

function appTemplate() {
  return `const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'install', label: 'Quick Start' },
  { id: 'why-klean', label: 'Why Klean' },
  { id: 'next-steps', label: 'Next Steps' }
]

function App() {
  return (
    <div className="app-shell">
      <aside className="toc" aria-label="Table of contents">
        <p className="toc-eyebrow">Contents</p>
        <nav>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={\`#\${section.id}\`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="content">
        <section id="overview" className="hero card reveal">
          <p className="badge">Klean starter</p>
          <h1>Build sharp React products, minus the boilerplate chaos.</h1>
          <p>
            Klean gives you a focused foundation: clean files, sane defaults, and room to build what
            matters.
          </p>

          <div className="command-row" id="install">
            <code>npm create klean</code>
            <button type="button" aria-label="Copy command" onClick={() => navigator.clipboard.writeText('npm create klean')}>
              Copy
            </button>
          </div>

          <div className="hero-links">
            <a href="/docs">Read docs</a>
            <a href="#next-steps">See next steps</a>
          </div>
        </section>

        <section id="why-klean" className="card reveal">
          <h2>Why teams pick Klean</h2>
          <ul>
            <li>Beautifully minimal structure from day one.</li>
            <li>No leftover demo UI, logos, or noisy sample code.</li>
            <li>Supports JavaScript or TypeScript with optional Tailwind.</li>
          </ul>
        </section>

        <section id="next-steps" className="card reveal">
          <h2>Next steps</h2>
          <p>Start building your product, then dive into the docs whenever you need deeper guidance.</p>
        </section>
      </main>
    </div>
  )
}

export default App
`
}

function mainTemplate(extension) {
  const isTs = extension === 'tsx'

  if (isTs) {
    return `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
`
  }

  return `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
`
}

function projectReadmeTemplate({ projectName, language, tailwind, structure }) {
  const setup = `## Development\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\``
  const build = '## Build\n\n```bash\nnpm run build\n```'
  const stack = [
    '- React',
    '- Vite (scaffolding + dev server)',
    `- Language: ${language}`,
    `- Tailwind CSS: ${tailwind ? 'Enabled' : 'Not enabled'}`,
    `- Structure: ${structure === 'plain' ? 'Plain' : 'Feature-based'}`
  ].join('\n')

  return `# ${projectName}

Generated by **Klean** — a minimal, opinionated React initializer powered by Vite under the hood.

## Stack
${stack}

${setup}

${build}
`
}

async function scaffoldProject(projectName, template) {
  await runCommand('npm', ['create', 'vite@latest', projectName, '--', '--template', template, '--no-interactive'])
}

async function installDependencies(projectDir) {
  await runCommand('npm', ['install'], { cwd: projectDir })
}

async function cleanViteDefaults(projectDir, extension) {
  const srcDir = path.join(projectDir, 'src')
  const publicDir = path.join(projectDir, 'public')

  await fs.rm(path.join(srcDir, 'assets', 'react.svg'), { force: true })
  await fs.rm(path.join(srcDir, 'App.css'), { force: true })
  await fs.rm(path.join(publicDir, 'vite.svg'), { force: true })

  await fs.writeFile(path.join(srcDir, `App.${extension}`), appTemplate(), 'utf8')
  await fs.writeFile(path.join(srcDir, `main.${extension}`), mainTemplate(extension), 'utf8')
}

async function ensureFolderStructure(projectDir, structure, language) {
  const srcDir = path.join(projectDir, 'src')

  if (structure === 'plain') {
    await fs.mkdir(path.join(srcDir, 'components'), { recursive: true })
    return
  }

  const folders = ['assets', 'features', 'ui', 'services', 'utils', 'hooks']
  if (language === 'TypeScript') {
    folders.push('types')
  }

  await Promise.all(folders.map((folder) => fs.mkdir(path.join(srcDir, folder), { recursive: true })))
}

async function setupTailwind(projectDir) {
  await runCommand('npm', ['install', '-D', 'tailwindcss', '@tailwindcss/vite'], { cwd: projectDir })

  const viteConfigTs = path.join(projectDir, 'vite.config.ts')
  const viteConfigJs = path.join(projectDir, 'vite.config.js')
  const targetPath = (await pathExists(viteConfigTs)) ? viteConfigTs : viteConfigJs
  const config = await fs.readFile(targetPath, 'utf8')

  let updated = config
  if (!updated.includes('@tailwindcss/vite')) {
    updated = `import tailwindcss from '@tailwindcss/vite'\n${updated}`
  }

  updated = updated.replace(/plugins:\s*\[react\(\)\]/, 'plugins: [react(), tailwindcss()]')

  await fs.writeFile(targetPath, updated, 'utf8')
}

async function setupStyling(projectDir, withTailwind) {
  const indexCssPath = path.join(projectDir, 'src', 'index.css')
  const content = `${withTailwind ? '@import "tailwindcss";\n\n' : ''}@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  font-family: 'Space Grotesk', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #e9ecf3;
  background: radial-gradient(circle at top, #1f2847, #0a0f1d 42%);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  min-height: 100%;
}

body {
  min-height: 100vh;
}

.app-shell {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
}

.toc {
  position: sticky;
  top: 2rem;
  align-self: start;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 1rem;
  background: rgba(16, 23, 44, 0.7);
  backdrop-filter: blur(8px);
}

.toc-eyebrow {
  margin: 0 0 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.72rem;
  color: #a5b4fc;
}

.toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.4rem;
}

.toc a {
  color: #d7def8;
  text-decoration: none;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.toc a:hover {
  color: #8be9ff;
}

.content {
  display: grid;
  gap: 1rem;
}

.card {
  border-radius: 20px;
  padding: 1.8rem;
  background: linear-gradient(160deg, rgba(20, 28, 50, 0.84), rgba(10, 14, 26, 0.88));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(2, 4, 12, 0.35);
}

.reveal {
  animation: slideFade 500ms ease both;
}

.badge {
  display: inline-flex;
  margin: 0 0 1rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(34, 211, 238, 0.15);
  color: #99f6ff;
}

h1,
h2 {
  margin: 0;
  letter-spacing: -0.02em;
}

h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.08;
  margin-bottom: 0.9rem;
}

h2 {
  font-size: clamp(1.2rem, 3.5vw, 1.65rem);
  margin-bottom: 0.8rem;
}

p,
li {
  color: #d3daef;
  line-height: 1.65;
}

.command-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin: 1.2rem 0;
}

code {
  display: inline-flex;
  align-items: center;
  padding: 0.72rem 0.9rem;
  border-radius: 12px;
  border: 1px solid rgba(139, 233, 255, 0.45);
  background: rgba(10, 18, 34, 0.95);
  color: #cbf6ff;
  font-size: 0.95rem;
}

button {
  border: 0;
  border-radius: 12px;
  padding: 0.72rem 1rem;
  background: linear-gradient(135deg, #22d3ee, #6d95ff);
  color: #00111d;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(34, 211, 238, 0.35);
}

.hero-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-links a {
  color: #b6c8ff;
  text-decoration: none;
}

.hero-links a:hover {
  color: #ffffff;
}

@keyframes slideFade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 860px) {
  .app-shell {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .toc {
    position: static;
  }
}
`
  await fs.writeFile(indexCssPath, content, 'utf8')
}

async function updateHtml(projectDir, projectName) {
  const indexHtmlPath = path.join(projectDir, 'index.html')
  const publicLogoPath = path.join(projectDir, 'public', 'klean-logo.svg')

  await fs.writeFile(publicLogoPath, KLEAN_LOGO, 'utf8')

  const html = await fs.readFile(indexHtmlPath, 'utf8')
  const updated = html
    .replace(/href="\/vite\.svg"/g, 'href="/klean-logo.svg"')
    .replace(/<title>.*<\/title>/, `<title>${projectName}</title>`)

  await fs.writeFile(indexHtmlPath, updated, 'utf8')
}

async function writeProjectReadme(projectDir, projectName, language, tailwind, structure) {
  const readmePath = path.join(projectDir, 'README.md')
  const content = projectReadmeTemplate({ projectName, language, tailwind, structure })
  await fs.writeFile(readmePath, content, 'utf8')
}

async function run() {
  console.log('🧼 Klean — opinionated React project initializer\n')

  const { projectName, language, tailwind, structure } = await getProjectConfig()
  const projectDir = path.resolve(process.cwd(), projectName)

  if (await pathExists(projectDir)) {
    throw new Error(`Directory already exists: ${projectName}`)
  }

  const extension = getExtension(language)
  const template = getTemplate(language)

  await scaffoldProject(projectName, template)

  console.log(`\n📦 Scaffolding done. Installing project dependencies for ${projectName}...`)
  await installDependencies(projectDir)

  await cleanViteDefaults(projectDir, extension)
  await ensureFolderStructure(projectDir, structure, language)

  if (tailwind) {
    console.log('🎨 Installing and configuring Tailwind CSS...')
    await setupTailwind(projectDir)
  }

  await setupStyling(projectDir, tailwind)
  await updateHtml(projectDir, projectName)
  await writeProjectReadme(projectDir, projectName, language, tailwind, structure)

  console.log('\n✅ Project created successfully! Klean architecture applied. Ready to build.')
  console.log(`\nNext steps:\n  cd ${projectName}\n  npm run dev`)
}

module.exports = {
  run
}
