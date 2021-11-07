import * as Stitches from '@stitches/react'
import { createStitches } from '@stitches/react'
import React from 'react'

export type CSS = Stitches.CSS<typeof config>;

export type StyledComponent = React.FC<{ css?: CSS }>

const crimsonDark: Palette<'crimsonDark'> = {
  crimsonDark1: 'hsl(335, 20.0%, 9.6%)',
  crimsonDark2: 'hsl(335, 32.2%, 11.6%)',
  crimsonDark3: 'hsl(335, 42.5%, 16.5%)',
  crimsonDark4: 'hsl(335, 47.2%, 19.3%)',
  crimsonDark5: 'hsl(335, 50.9%, 21.8%)',
  crimsonDark6: 'hsl(335, 55.7%, 25.3%)',
  crimsonDark7: 'hsl(336, 62.9%, 30.8%)',
  crimsonDark8: 'hsl(336, 74.9%, 39.0%)',
  crimsonDark9: 'hsl(336, 80.0%, 57.8%)',
  crimsonDark10: 'hsl(339, 84.1%, 62.6%)',
  crimsonDark11: 'hsl(341, 90.0%, 67.3%)',
  crimsonDark12: 'hsl(332, 87.0%, 96.0%)',
}

const tomatoDark = {
  tomatoDark1: 'hsl(10, 23.0%, 9.4%)',
  tomatoDark2: 'hsl(9, 44.8%, 11.4%)',
  tomatoDark3: 'hsl(8, 52.0%, 15.3%)',
  tomatoDark4: 'hsl(7, 56.3%, 18.0%)',
  tomatoDark5: 'hsl(7, 60.1%, 20.6%)',
  tomatoDark6: 'hsl(8, 64.8%, 24.0%)',
  tomatoDark7: 'hsl(8, 71.2%, 29.1%)',
  tomatoDark8: 'hsl(10, 80.2%, 35.7%)',
  tomatoDark9: 'hsl(10, 78.0%, 54.0%)',
  tomatoDark10: 'hsl(10, 81.7%, 59.0%)',
  tomatoDark11: 'hsl(10, 85.0%, 62.8%)',
  tomatoDark12: 'hsl(10, 89.0%, 96.0%)',
}

const grayDark: Palette<'grayDark'> = {
  grayDark1: 'hsl(0, 0%, 8.5%)',
  grayDark2: 'hsl(0, 0%, 11.0%)',
  grayDark3: 'hsl(0, 0%, 13.6%)',
  grayDark4: 'hsl(0, 0%, 15.8%)',
  grayDark5: 'hsl(0, 0%, 17.9%)',
  grayDark6: 'hsl(0, 0%, 20.5%)',
  grayDark7: 'hsl(0, 0%, 24.3%)',
  grayDark8: 'hsl(0, 0%, 31.2%)',
  grayDark9: 'hsl(0, 0%, 43.9%)',
  grayDark10: 'hsl(0, 0%, 49.4%)',
  grayDark11: 'hsl(0, 0%, 62.8%)',
  grayDark12: 'hsl(0, 0%, 93.0%)',
}

type Palette<T extends string> = {
  [K in `${T}${PalettePosition}`]: string
}

type PalettePosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

const alias = <T extends string>(alias: T, palette: Palette<any>): Palette<T> => {
  return Object.keys(palette)
    .reduce((acc, key) => {
      const aliasedKey = key.replace(/^[^\d]+/, alias)
      return (
        {
          ...acc,
          [aliasedKey]: '$' + key,
        }
      )
    }, {}) as Palette<T>
}

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...crimsonDark,
      ...tomatoDark,
      ...grayDark,
      ...alias('primary', crimsonDark),
      ...alias('error', tomatoDark),
      textPrimary: 'hsla(0, 0%, 100%, .9)',
      textSecondary: 'hsla(0, 0%, 100%, .6)',
      textTertiary: 'hsla(0, 0%, 100%, .38)',
      appBackground: '$grayDark1',
      inputBackground: '$grayDark3',
    },
    fonts: {
      heading: 'Comfortaa, sans-serif',
      body: 'Assistant, sans-serif',
    },
  },
  media: {
    bp1: '(min-width: 480px)',
  },
  utils: {
    paddingX: (value: any) => ({ paddingLeft: value, paddingRight: value }),
  },
})

export const fontStyle = (weight: 'regular' | 'semibold', font: 'body' | 'heading' = 'body') => {
  console.log(weight, font)
  return {
    fontFamily: '$' + font,
    fontWeight: font === 'body'
      ? (weight === 'regular' ? 300 : 500)
      : (weight === 'regular' ? 400 : 700),
  }
}
