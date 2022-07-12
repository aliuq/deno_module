import { assertEquals } from 'https://deno.land/std@0.147.0/testing/asserts.ts'
import { hello } from '../lib/index.ts'

Deno.test('hello', () => {
  assertEquals(hello('world'), 'hello world')
})
