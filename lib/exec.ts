// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Execute a command

/**
 * Easy to run a command in Deno.
 *
 * @module
 */
import { platform } from 'https://deno.land/std@0.147.0/node/os.ts'
import { red } from 'https://deno.land/std@0.147.0/fmt/colors.ts'

// deno-lint-ignore no-explicit-any
const { Deno } = globalThis as any

/** Shell types */
const shellMaps: Record<string, string[]> = {
  bash: ['bash', '-c'],
  sh: ['sh', '-c'],
  cmd: ['cmd', '/c'],
  powershell: ['powershell', '-nop', '-c'],
  pwsh: ['pwsh', '-nop', '-c'],
}

/**
 * Execute a command
 * @param cmd command string or command array
*/
export async function exec(cmd: string | string[], shell?: string): Promise<{ success: boolean; code: number }> {
  const p = Deno.run({ cmd: getCommand(cmd, shell) })
  const res = await p.status()
  await p.close()
  return res
}

/**
 * Execute a command, returns stdout
 * @param cmd command string or command array
*/
export async function execr(cmd: string | string[], shell?: string): Promise<string | undefined> {
  const p = Deno.run({
    cmd: getCommand(cmd, shell),
    stdout: 'piped',
    stdin: 'piped',
    stderr: 'piped',
  })
  const { code } = await p.status()
  const rawOutput = await p.output()
  const rawError = await p.stderrOutput()
  await p.stdin.close()
  await p.close()

  if (code === 0)
    return (new TextDecoder('utf-8').decode(rawOutput))?.trim()

  else
    console.error(red(new TextDecoder('utf-8').decode(rawError)))
}

/** Return command array */
function getCommand(cmd: string | string[], shell?: string): string[] {
  shell = shell || (platform() === 'win32' ? 'pwsh' : 'bash')
  const shellPoint = shellMaps[shell]
  let command = []
  if (shellPoint)
    command = typeof cmd === 'string' ? [...shellPoint, cmd] : [...shellPoint, ...cmd]

  else
    command = typeof cmd === 'string' ? cmd.split(' ') : cmd

  return command
}
