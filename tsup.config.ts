import { defineConfig, type Options } from 'tsup'

const createConfig = (options: Options = {}) =>
  defineConfig({
    clean: true,
    entry: ['src/index.ts'],
    dts: true,
    skipNodeModulesBundle: true,
    minify: false,
    format: ['esm', 'cjs'],
    ...options,
  })

export default createConfig
