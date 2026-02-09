import { readFileSync } from 'node:fs'

const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')

const checks = [
  ['belt modes exist', app.includes('Standing By') && app.includes('Faiz Mode') && app.includes('Axel Form')],
  ['belt code display exists', app.includes('FAIZ GEAR') && app.includes('Insert Mission Code')],
  ['transformed class toggled', app.includes("const transformed = modeIndex > 0")],
  ['faiz dark theme styles exist', css.includes('radial-gradient') && css.includes('.transformed .hero')],
  ['focus styles preserved', css.includes('button:focus-visible') && css.includes('outline: 3px solid')],
]

const failed = checks.filter(([, ok]) => !ok)

if (failed.length) {
  console.error('Theme verification failed:')
  failed.forEach(([name]) => console.error(`- ${name}`))
  process.exit(1)
}

console.log('Theme verification passed')
