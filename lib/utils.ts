// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Some utility functions for Deno.

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
