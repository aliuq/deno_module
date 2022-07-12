import { assertAlmostEquals } from 'https://deno.land/std@0.147.0/testing/asserts.ts'
import { sleep } from '../lib/utils.ts'

Deno.test('Function - sleep', async () => {
  const startTime = new Date().getTime()
  await sleep(2000)
  // Allow 5ms tolerance
  assertAlmostEquals(new Date().getTime() - startTime, 2000, 50)
})
