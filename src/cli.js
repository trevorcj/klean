const fs = require('node:fs/promises')
const path = require('node:path')
const { spawn } = require('node:child_process')
const inquirer = require('inquirer')

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
      choices: ['JavaScript', 'TypeScript'],
      default: 'TypeScript'
    },
    {
      type: 'confirm',
      name: 'tailwind',
      message: 'Install Tailwind CSS?',
      default: true
    }
  )

  const answers = await inquirer.prompt(questions)

  return {
    projectName: providedProjectName || answers.projectName,
    language: answers.language,
    tailwind: answers.tailwind
  }
}

function appTemplate(extension) {
  return `function App() {
  return <div>Hello world</div>
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

  await fs.writeFile(path.join(srcDir, `App.${extension}`), appTemplate(extension), 'utf8')
  await fs.writeFile(path.join(srcDir, `main.${extension}`), mainTemplate(extension), 'utf8')
}

async function ensureFolderStructure(projectDir) {
  const srcDir = path.join(projectDir, 'src')
  const folders = ['assets', 'features', 'ui', 'services', 'utils', 'hooks', 'types']

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
  const content = withTailwind ? '@import "tailwindcss";\n' : ''
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

async function validateProject(projectDir) {
  await runCommand('npm', ['run', 'build'], { cwd: projectDir })
}

async function run() {
  console.log('🧼 Klean — opinionated React project initializer\n')

  const { projectName, language, tailwind } = await getProjectConfig()
  const projectDir = path.resolve(process.cwd(), projectName)

  if (await pathExists(projectDir)) {
    throw new Error(`Directory already exists: ${projectName}`)
  }

  const extension = getExtension(language)
  const template = getTemplate(language)

  await scaffoldProject(projectName, template)
  await installDependencies(projectDir)
  await cleanViteDefaults(projectDir, extension)
  await ensureFolderStructure(projectDir)

  if (tailwind) {
    await setupTailwind(projectDir)
  }

  await setupStyling(projectDir, tailwind)
  await updateHtml(projectDir, projectName)
  await validateProject(projectDir)

  console.log('\n✅ Project created successfully! Klean architecture applied. Ready to build.')
  console.log(`\nNext steps:\n  cd ${projectName}\n  npm run dev`)
}

module.exports = {
  run
}
