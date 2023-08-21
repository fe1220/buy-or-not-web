import { style, createTheme, createThemeContract } from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
  color: {
    primary: {
      100: '#f5e8ff',
      400: '#c16efa',
      500: '#b757f5',
      700: '#8e24cc',
    },
    gray: {
      950: '#09090b',
    },
    slate: {
      200: '#f2f4f6',
      300: '#e5e8eb',
      500: '#b0b7c1',
      900: '#191e28',
    },
  },
})

export const fontTheme = createThemeContract({
  matter: null,
  pretendard: null,
})

export const heading = {
  5: style({
    fontSize: 18,
    fontWeight: '600',
    lineHeight: '24px',
    letterSpacing: '-0.3px',
  }),
}

export const subtitle = {
  1: style({
    fontSize: 14,
    fontWeight: '600',
    lineHeight: '20px',
    letterSpacing: '-0.3px',
  }),
  2: style({
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 1.5,
    letterSpacing: '-0.3px',
  }),
}

export const caption = {
  3: style({
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 1.5,
    letterSpacing: '-0.3px',
  }),
}
