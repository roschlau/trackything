import { styled } from '../stitches.config'
import { inputStyle } from './global-styles'

export const ActionBar = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: 12,
})
export const ActionBarIconButton = styled('button', {
    ...inputStyle,
    display: 'grid',
    placeContent: 'center',
    paddingX: 10,
  },
)
