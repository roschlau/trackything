import React from 'react'
import { Tracker } from './data/trackers'
import { relativeTime } from './util/time'
import { styled } from './stitches.config'

export const TrackerTile: React.FC<{ tracker: Tracker }> = ({ tracker }) => {
  const lastEntry = tracker.entries[0]
  return (
    <TrackerTileContainer>
      <TrackerName>{tracker.meta.name}</TrackerName>
      <DirectAddButton>+</DirectAddButton>
      { lastEntry
        ? <LastEntryInfo>Last Entry: <span className="time">{relativeTime(lastEntry.time)}</span></LastEntryInfo>
        : <LastEntryInfo>No Entries</LastEntryInfo>
      }
    </TrackerTileContainer>
  )
}

const TrackerName = styled('div', {
  fontSize: 18,
  fontWeight: 500,
  color: '$primary11',
})

const DirectAddButton = styled('a', {
  position: 'absolute',
  bottom: '50%',
  right: '50%',
  transform: 'translate(50%, 50%)',
  width: 48,
  height: 48,
  border: '1px solid $primary7',
  borderRadius: 24,
  display: 'grid',
  placeContent: 'center',
  color: '$primary11',
  fontSize: 24,
  textDecoration: 'none',
  overflow: 'hidden',

  '&:focus': {
    borderWidth: 2,
    fontWeight: 500,
  },

  '&::after': {
    content: '',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: '$primary9',
    opacity: '.12',
  },
})

const LastEntryInfo = styled('div', {
  color: '$textSecondary',
  '> .time': {
    color: '$textPrimary'
  },
})

const TrackerTileContainer = styled('li', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 12,
  background: '$grayDark3',
  // background: '$crimsonDark3',
  padding: 12,
  paddingBottom: 8,
  [`& > ${LastEntryInfo}`]: {
    alignSelf: 'flex-end',
  }
})
