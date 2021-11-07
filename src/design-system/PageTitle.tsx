import { styled } from '../stitches.config'


export const PageTitle = styled('h1', {
  width: '100%',
  fontFamily: '$heading',
  fontWeight: 700,
  fontSize: 36,
  lineHeight: 1.2,
  letterSpacing: '0.07em',
  padding: 24,
  margin: 0,
  display: 'grid',
  placeItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  color: '$primary11',
  background: '$appBackground',
})
