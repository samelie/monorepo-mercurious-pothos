#! /usr/bin/env -S yarn tsx
/*
yarn tsx could only exist in this package so it needs to be invoked from only this package.

Goal is to script the building of our tsc packages; these are the ones that preserve a structure and to no bundle.
This can be for reasons to keep imports exluded eg: my-pkg/react

For the moment this is hardcoded to work with a monorepo setup (hence 'pkgs')
*/
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, parse, sep } from 'path'
import { build } from 'esbuild'
import fastGlob from 'fast-glob'
import yargs from 'yargs'
import { $, cd } from 'zx'
const args = process.argv.slice(2)
const outDir = 'build'
const { argv } = yargs(args)
  .usage('$0')
  .option('sourceDir', {
    string: true,
    requiresArg: true,
    description:
      'Target path to the source files to transform, relative to cwd',
  })
  .option('cwd', {
    string: true,
    requiresArg: true,
    description:
      'current working directory where we will run commands from. sourceDir is relative to it',
  })
  .option('dts', {
    boolean: true,
    requiresArg: false,
    description: 'Output d.ts files, relative to cwd',
  })
  .option('cleanOutDir', {
    boolean: true,
    requiresArg: false,
    description: 'Clean the build directory before building',
  })
  .option('bundle', {
    boolean: true,
    requiresArg: false,
    description: 'Clean the build directory before building',
  })
  .option('platform', {
    string: true,
    requiresArg: false,
    default: 'browser',
    description: 'Clean the build directory before building',
  })
  .option('outFile', {
    string: true,
    requiresArg: false,
    default: 'main',
    description: '',
  })
  .help()
const {
  cwd,
  sourceDir,
  dts,
  cleanOutDir,
  platform,
  bundle,
  outFile,
} = argv
const pathFrom = (
  Array.isArray(argv.from) ? argv.from : [argv.from]
).filter(Boolean)
const pathTo = (Array.isArray(argv.to) ? argv.to : [argv.to]).filter(
  Boolean,
)
const { name: pkgName, dir } = parse(cwd)
if (!cwd.includes('pkgs') || dir.split(sep).at(-1) !== 'pkgs') {
  throw new Error('Only designed to work with pkgs in the monorepo')
}
if (pathFrom.length !== pathTo.length) {
  throw new Error(
    `from and to parameters must match in number for replacements`,
  )
}
// make the cwd arg this script's cwd
cd(cwd)
if (cwd && cleanOutDir) {
  try {
    await $`rm -r ${outDir}`
  } catch (e) {}
}
async function buildTypes() {
  if (!dts) {
    return
  }
  await $`tsc -p . --emitDeclarationOnly -d --outDir ${outDir}`
  if (!bundle) {
    // copy all the dts files to be alongside the files produced by esbuild.
    await $`cp  -R  -P  ./${sourceDir}/. ${outDir}/.`
    // there is other junk in there too
    await $`rm -rf ${join(outDir, sourceDir)} `
  }
}
const entry = `${sourceDir}/**/*.{ts,tsx}`
let resolvedEntryPoints = await fastGlob(entry)
if (bundle) {
  resolvedEntryPoints = [resolvedEntryPoints.at(0)]
}
await Promise.all([
  // commonjs
  build({
    absWorkingDir: cwd,
    entryPoints: resolvedEntryPoints,
    format: 'cjs',
    target: 'esnext',
    platform,
    define: {
      'import.meta.url': '_importMetaUrl',
    },
    bundle,
    packages: bundle ? 'external' : undefined,
    outdir: bundle ? undefined : join(outDir, 'cjs'),
    sourcemap: true,
    outfile: bundle
      ? join(outDir, 'cjs', `${outFile}.js`)
      : undefined,
    tsconfig: 'tsconfig.json',
    banner:
      platform === 'node'
        ? {
            js: `
            const _importMetaUrl=require('url').pathToFileURL(__filename)
        `,
          }
        : undefined,
  }),
  // esm
  build({
    absWorkingDir: cwd,
    entryPoints: resolvedEntryPoints,
    platform,
    bundle,
    packages: bundle ? 'external' : undefined,
    format: 'esm',
    outdir: bundle ? undefined : join(outDir, 'esm'),
    outfile: bundle
      ? join(outDir, 'esm', `${outFile}.js`)
      : undefined,
    sourcemap: true,
    banner:
      platform === 'node'
        ? {
            js: `
        // import path from 'path';
        // import { fileURLToPath } from 'url';
        // import m from 'module';
        // console.log(m);
        // console.log(m.createRequire)
        // import { createRequire as topLevelCreateRequire } from 'module';
        // const require = topLevelCreateRequire(import.meta.url);
        // const __filename = fileURLToPath(import.meta.url);
        // const __dirname = path.dirname(__filename);
        `,
          }
        : undefined,
    tsconfig: 'tsconfig.json',
  }),
  // d.ts
  buildTypes(),
])
// recursiveRename(join(cwd, outDir), { from: pathFrom, to: pathTo })
console.log(`📦 packaged ${pkgName}`)
//# sourceMappingURL=pkgup-esbuild.mjs.map
