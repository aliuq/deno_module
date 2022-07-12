import { assertEquals, assertExists } from 'https://deno.land/std@0.147.0/testing/asserts.ts'
import { exec, execr } from '../lib/exec.ts'

Deno.test('Function - exec', async () => {
  const res = await exec('echo hello exec')
  assertEquals(res.code, 0)
})

Deno.test('Function - execr', async () => {
  assertEquals(await execr('echo hello'), 'hello')
})

Deno.test('Function - exec and execr', async () => {
  await exec('echo hello execr > 1.txt')
  assertExists(await Deno.stat('1.txt'))
  const content = await execr('cat 1.txt')
  assertEquals(content, 'hello execr')
  await exec('rm 1.txt')
})
