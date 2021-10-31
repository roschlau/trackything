import React from 'react'
import { globalCss, styled } from './stitches.config'
import { SearchBar } from './SearchBar'
import { BarChartIcon, GearIcon } from '@radix-ui/react-icons'
import * as Stitches from '@stitches/react'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'

const inputStyle: Stitches.CSS = {
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

const globalStyles = globalCss({
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

const App = () => {
  globalStyles()
  return (
    <ScreenLayout>
      <PageTitle>trackything</PageTitle>
      <ActionBar>
        <SearchBar/>
        <ActionBarIconButton>
          <AccessibleIcon label={'Analytics'}>
            <BarChartIcon/>
          </AccessibleIcon>
        </ActionBarIconButton>
        <ActionBarIconButton>
          <AccessibleIcon label={'Settings'}>
            <GearIcon/>
          </AccessibleIcon>
        </ActionBarIconButton>
      </ActionBar>
    </ScreenLayout>
  )
}

const ActionBar = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gap: 12,
  paddingX: 16,
})

const ActionBarIconButton = styled('button', {
  ...inputStyle,
    display: 'grid',
    placeContent: 'center',
    paddingX: 10,
  }
)

const ScreenLayout = styled('main', {
  display: 'flex',
  flexDirection: 'column',
})

const PageTitle = styled('h1', {
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

export default App
