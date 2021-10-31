import { styled, StyledComponent } from './stitches.config'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import React from 'react'


export const SearchBar: StyledComponent = ({ css }) => (
  <SearchBarContainer css={css}>
    <MagnifyingGlassIcon style={{ pointerEvents: 'none' }} aria-hidden/>
    <input type="search" name='search' aria-label='Search'/>
  </SearchBarContainer>
)

const SearchBarContainer = styled('div', {
  position: 'relative',
  zIndex: 0,
  '& svg': {
    position: 'absolute',
    left: 15,
    bottom: '50%',
    transform: 'translateY(50%)',
  },
  '& input': {
    width: '100%',
    height: '100%',
    paddingLeft: 41,
  },
})
