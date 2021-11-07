import { styled } from '../stitches.config'
import { inputStyle } from './global-styles'

export const ActionBar = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: 12,
  '& > a, & > button': {
    ...inputStyle,
    display: 'grid',
    placeContent: 'center',
    paddingX: 10,
  },
})
