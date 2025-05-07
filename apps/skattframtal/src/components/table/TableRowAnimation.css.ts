import { style } from '@vanilla-extract/css'

export const rowEnter = style({
  display: 'grid',
  gridTemplateRows: '0fr',
  opacity: 0,
  transition:
    'grid-template-rows 300ms cubic-bezier(.4,0,.2,1), opacity 200ms cubic-bezier(.4,0,.2,1)',
  overflow: 'hidden',
})

export const rowEnterActive = style({
  gridTemplateRows: '1fr',
  opacity: 1,
  overflow: 'hidden',
})
