import { styled } from '../stitches.config'
import { ActionBar } from './ActionBar'

export const ScreenLayout = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  paddingX: 16,
  paddingBottom: 16,
  [`& ${ActionBar}`]: {
    paddingBottom: 16,
  },
})
