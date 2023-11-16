import { color } from '../tokens/color/core/palette'

type PaletteColors = keyof typeof color

type BaseColorObj = {
  [key in PaletteColors]?: ColorConfig
}

// Core values
export interface ColorConfig extends BaseColorObj {
  value?: string
}

export { PaletteColors }
