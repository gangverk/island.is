import { theme } from '@island.is/island-ui/theme'
import { style } from '@vanilla-extract/css'

export const iconContainer = style({
  background: 'white',
  padding: '0.5rem',
  position: 'relative',
  marginTop: '-46px',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      marginTop: '-62px',
    },
  },
})

export const formContainer = style({
  width: '100%',
  height: 'initial',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'initial',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      maxWidth: '460px',
    },
  },
})
