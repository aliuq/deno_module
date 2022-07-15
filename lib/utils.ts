// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Some utility functions for Deno.

import { red, yellow } from 'fmt/colors.ts'

/**
 * Some functions
 *
 * @module
 */

/**
 * async wait for ms
 * @param ms
 */
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

interface WrapPromptOptions {
  /**
   * Prompt message
   */
  message: string
  /**
  * Optional values to accept
  * @default ['y', 'n']
  */
  values?: string[]
  /**
   * Default value to use if no input is given
   */
  defaultValue?: string | undefined
  /**
   * Maximum number of times to prompt the user
   * @default 5
   */
  count?: number
  /**
   * Internal counter
   */
  _count?: number
}
/**
 * Wrap internal prompt with max count
 *
 * *Not tested*
 * @param option
 */
export function wrapPrompt(option: WrapPromptOptions | string): string {
  if (typeof option === 'string') {
    option = {
      message: option,
      values: ['y', 'n'],
      defaultValue: undefined,
      count: 5,
      _count: 0,
    }
  }
  const { message, defaultValue } = option
  const count = option.count || 5
  const values = option.values || ['y', 'n']
  let _count = option._count || 0
  _count += 1

  if (_count > count) {
    // eslint-disable-next-line no-console
    console.log(`${red('Too many prompts, exiting...')}`)
    Deno.exit(1)
  }
  const input = prompt(message, defaultValue)
  const newMessage = _count === 1
    ? `[${count - _count}] ${message}`
    : message?.replace(/^\[\d+\]/, `[${count - _count}]`)

  if (!input) {
    // eslint-disable-next-line no-console
    console.clear()
    return wrapPrompt({ ...option, message: newMessage, _count })
  }
  else if (!values.includes(input?.toLowerCase())) {
    // eslint-disable-next-line no-console
    console.clear()
    // eslint-disable-next-line no-console
    console.log(`${yellow('Invalid input, please try again')}`)
    return wrapPrompt({ ...option, message: newMessage, _count })
  }
  return input
}
