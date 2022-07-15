import { assertAlmostEquals } from 'testing/asserts.ts'
// import { assertSpyCall, returnsNext, stub } from 'testing/mock.ts'
import { sleep } from '../lib/utils.ts'

Deno.test('Function - sleep', async () => {
  const startTime = new Date().getTime()
  await sleep(2000)
  // Allow 5ms tolerance
  assertAlmostEquals(new Date().getTime() - startTime, 2000, 50)
})

// Deno.test('Function - wrapPrompt', () => {
//   // const prompt_stub = stub(wrapPrompt, 'prompt', s => 'y')
//   // const res = wrapPrompt('prompt') // Terminal stoped here
//   // await Deno.stdout.write(new TextEncoder().encode('y\n'))
//   // assertEquals(res, 'y')

//   const prompt_stub = stub(window, 'prompt', returnsNext(['y']))

//   try {
//     assertEquals(wrapPrompt('prompt'), 'y')
//   }
//   finally {
//     prompt_stub.restore()
//   }

//   assertSpyCall(prompt_stub, 0, {
//     args: ['y'],
//     returned: 'y',
//   })
// })
