import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  dts: true,
  skipNodeModulesBundle: true,
  minify: false,
  format: ['esm', 'cjs'],
})
