import { readdir, mkdir, mkdtemp, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import { build } from 'esbuild'

const files = (await readdir('src', { recursive: true })).filter(file => file.endsWith('.test.ts')).map(file => join('src', file))
await mkdir('node_modules/.tmp', { recursive: true })
const outdir = await mkdtemp(resolve('node_modules/.tmp/tests-'))
try {
  await build({ entryPoints: files, outdir, outbase: 'src', bundle: true, packages: 'external', platform: 'node', format: 'esm', outExtension: { '.js': '.mjs' } })
  const outputs = (await readdir(outdir, { recursive: true })).filter(file => file.endsWith('.mjs')).map(file => join(outdir, file))
  const child = spawn(process.execPath, ['--test', ...outputs], { stdio: 'inherit' })
  process.exitCode = await new Promise((resolve, reject) => { child.on('exit', code => resolve(code ?? 1)); child.on('error', reject) })
} finally { await rm(outdir, { recursive: true, force: true }) }
