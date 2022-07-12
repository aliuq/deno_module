import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { input: 'src/index', name: 'index' },
  ],
  clean: true,
  declaration: true,
  externals: [],
  rollup: {
    emitCJS: false,
  },
})
