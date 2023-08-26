import { style } from '@vanilla-extract/css'
import { fontTheme, vars } from '../theme.css'

export const pollWrapper = style({
  width: '100%',
  marginTop: 16,
})

export const pollButtonContainer = style({
  display: 'flex',
  gap: 17,
  width: '100%',
})

export const buttonContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 20,
})

export const pollButton = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  flex: 1,
  height: 46,
  border: `1px solid ${vars.color.gray[300]}`,
  background: 'transparent',
  borderRadius: 9999,
  color: vars.color.primary[500],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '20px',
  letterSpacing: '-0.3px',
  ':active': {
    backgroundColor: vars.color.gray[50],
    opacity: 0.8,
  },
  overflow: 'hidden',
  fontFamily: fontTheme.pretendard,
})

export const pollButtonUnselected = style([
  pollButton,
  {
    color: vars.color.slate[700],
    borderColor: vars.color.slate[500],
  },
])

export const pollButtonSelected = style([
  pollButton,
  {
    borderColor: vars.color.primary[400],
  },
])

export const buttonDivider = style({
  fontWeight: 600,
  lineHeight: '20px',
  letterSpacing: '-0.3px',
  color: vars.color.slate[600],
  opacity: 0.4,
})

export const buttonDividerSelected = style([
  buttonDivider,
  {
    color: vars.color.primary[500],
  },
])

export const unrecommendedButton = style({
  padding: '6px 12px',
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 6,
  backgroundColor: vars.color.slate[300],
  border: `1px solid ${vars.color.slate[300]}`,
  borderRadius: 9999,
  color: vars.color.slate[900],
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '20px',
  letterSpacing: '-0.3px',
  ':active': {
    opacity: 0.8,
  },
  fontFamily: fontTheme.pretendard,
})

export const unrecommendedButtonSelected = style([
  unrecommendedButton,
  {
    color: vars.color.primary[100],
    backgroundColor: vars.color.slate[900],
  },
])

export const shareButton = style({
  width: 83,
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 6,
  backgroundColor: vars.color.primary[100],
  border: `1px solid ${vars.color.primary[100]}`,
  borderRadius: 9999,
  color: vars.color.primary[700],
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '20px',
  letterSpacing: '-0.3px',
  ':active': {
    opacity: 0.8,
  },
  fontFamily: fontTheme.pretendard,
})
