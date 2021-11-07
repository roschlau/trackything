import { SearchBar } from './SearchBar'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { BarChartIcon, GearIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Tracker } from './data/trackers'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { TrackerTile } from './TrackerTile'
import { styled } from './stitches.config'
import { PageTitle } from './design-system/PageTitle'
import { ScreenLayout } from './design-system/ScreenLayout'
import { ActionBar, ActionBarIconButton } from './design-system/ActionBar'

export const TrackingScreen: React.FC<{ trackers: Tracker[] }> = ({ trackers }) => (
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
    {<TrackersOverview trackers={trackers}/>}
  </ScreenLayout>
)

const TrackersOverview: React.FC<{ trackers: Tracker[] }> = ({ trackers }) => {
  const trackerTiles = trackers.map(tracker => (
    <AspectRatio key={tracker.id} ratio={1}>
      <TrackerTile tracker={tracker}/>
    </AspectRatio>
  ))
  return (
    <TrackersGrid>
      {trackerTiles}
    </TrackersGrid>
  )
}

const TrackersGrid = styled('ul', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: 16,
})
