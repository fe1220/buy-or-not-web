import { style } from '@vanilla-extract/css'
import { fontTheme, vars } from '../theme.css'

export const toastContainer = style({
  width: 'calc(100% - 28px)',
  maxWidth: 740,
  height: 48,
  position: 'fixed',
  bottom: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: vars.color.gray[800],
  borderRadius: '6px',
  fontFamily: fontTheme.pretendard,
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  letterSpacing: '-0.3px',
  color: '#fff',
  transition: 'bottom 0.3s ease',
})

export const toastContainerHidden = style([
  toastContainer,
  {
    bottom: -100,
  },
])
