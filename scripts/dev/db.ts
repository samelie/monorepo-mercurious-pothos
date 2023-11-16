#!/usr/bin/env yarn tsx

import { $, argv } from 'zx'

if (argv.push) {
  $`yarn workspace @you/db dev:db:push`
}
if (argv.migrate) {
  $`yarn workspace @you/db dev:db:migrate`
}
if (argv.seed) {
  $`yarn workspace @you/db dev:db:seed`
}
if (argv['gen-types']) {
  $`yarn workspace @you/db dev:types-gen`
}
