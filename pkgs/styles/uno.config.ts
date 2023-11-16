import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  // presetWebFonts,
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
import presetTheme from 'unocss-preset-theme'
import { gray200, gray600 } from '@you/design-tokens/tokens'
import presetMini from '@unocss/preset-mini'

// Unocss({
//   presets: [
//   ],
// })
// import type { Theme } from 'unocss/preset-uno'

export default defineConfig({
  theme: {
    colors: {
      primary: gray200,
    },
  },
  presets: [
    presetUno({
      // dark: 'media',
    }),
    presetMini(),
    presetIcons({
      scale: 1,
      warn: true,
    }),
    presetTypography(),
    // presetTheme<Theme>({
    //   theme: {
    //     // Configure dark themes
    //     dark: {
    //       colors: {
    //         'primary': gray600,
    //       },
    //     },
    //     // Configure compact themes
    //     compact: {
    //     }
    //   }
    // })
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
})
