import * as Stitches from '@stitches/react'
import { globalCss } from '../stitches.config'

export const inputStyle: Stitches.CSS = {
  borderRadius: 12,
  padding: 10,
  background: '$inputBackground',
  fontSize: 18,
  fontFamily: '$body',
  fontWeight: 300,
  color: '$textPrimary',
  resize: 'none',
  border: '2px solid transparent',
  transition: 'all .1s',
  '&:focus': {
    borderColor: '$grayDark7',
  },
  '&.validation-failed': {
    borderColor: '$error7 !important',
  },
}

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
  },
  'html, body, root': {
    width: '100%',
    height: '100%',
  },
  body: {
    backgroundColor: '$appBackground',
    fontFamily: '$body',
    margin: 0,
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 1.5,
    color: '$textPrimary',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  button: {
    cursor: 'pointer',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  '::selection': {
    color: '$textPrimary',
    backgroundColor: '$primary5',
  },
  'input, textarea': {
    ...inputStyle,
    '&[type="number"]': {
      textAlign: 'end',
    },
  },
  '@bp1': {
    body: {
      fontSize: 16,
    },
  },
})
