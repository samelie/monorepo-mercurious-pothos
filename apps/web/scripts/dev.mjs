#!/usr/bin/env yarn tsx

import { $ } from 'zx'

// built at top-level

// await $`yarn workspace @you/styles build`
// await $`yarn workspace @you/env build`
// await $`yarn workspace @you/publish build`
await $`yarn workspace @you/web dev:server`
