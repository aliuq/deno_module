import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { input: 'src/index', name: 'index' },
  ],
  outDir: 'lib',
  clean: true,
  declaration: true,
  externals: [],
  rollup: {
    emitCJS: true,
  },
})
