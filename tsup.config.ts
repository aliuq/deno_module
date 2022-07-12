import type { Options } from 'tsup'

export default <Options><unknown>{
  entryPoints: {
    index: 'src/index.ts',
  },
  dts: true,
  target: 'node14',
  format: [
    'esm',
    'cjs',
  ],
  external: [],
  clean: true,
  esbuildOptions: (options: any, { format }: any) => {
    options.outExtension = { '.js': format === 'cjs' ? '.cjs' : format === 'esm' ? '.mjs' : '.js' }
  },
}
