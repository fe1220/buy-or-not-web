import { style } from '@vanilla-extract/css'
import { caption, fontTheme, heading, subtitle, vars } from '../theme.css'

// TODO : maxWidth 체크
export const mainContainer = style({
  padding: '24px 14px',
  maxWidth: 768,
  margin: '0px auto',
})

export const userInfoContainer = style({
  display: 'flex',
  gap: 8,
})

export const userName = style([
  subtitle[2],
  {
    color: vars.color.slate[900],
  },
])

export const created = style([
  caption[3],
  {
    color: vars.color.slate[500],
  },
])

export const title = style([
  heading[5],
  {
    margin: '10px 0px',
  },
])

export const content = style({
  fontFamily: fontTheme.matter,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '-0.3px',
})

export const imageWrapper = style({
  position: 'relative',
  paddingBottom: '100%',
  marginBottom: 12,
})

export const pollItemList = style({
  display: 'flex',
  gap: 17,
  width: '100%',
  marginTop: 20,
})

export const pollItem = style({
  position: 'relative',
  flex: 1,
})

export const brand = style({
  fontSize: 12,
  fontWeight: 700,
  lineHeight: '14px',
  letterSpacing: '-0.3px',
  color: vars.color.gray[950],
  marginBottom: 4,
})

export const name = style({
  fontFamily: fontTheme.matter,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '-0.3px',
})

// TODO : font 확인
export const discountedRate = style({
  color: vars.color.primary[400],
  // fontFamily: fontTheme.matter,
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '20px',
  letterSpacing: '-0.3px',
})

export const originalPrice = style({
  fontSize: 16,
  fontFamily: fontTheme.matter,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.gray[950],
})

export const won = style({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 1.5,
  color: vars.color.gray[950],
})
