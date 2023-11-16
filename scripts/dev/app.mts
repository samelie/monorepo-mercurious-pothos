#!/usr/bin/env yarn tsx

import { $, argv } from 'zx'

if (!argv.fast) {
  await $`yarn workspace @you/styles build`
  await $`yarn workspace @you/env build`
  await $`yarn workspace @you/publish build`
}

await $`concurrently -n "mortar,ingest,web" \
-c "bgMagentaBright.bold,bgCyan.bold,bgYellow.bold,bgPink.bold" \
"yarn workspace @you/mortar run dev:server" \
"yarn workspace @you/ingest run dev:server" \
"yarn workspace @you/web run dev" \
`
