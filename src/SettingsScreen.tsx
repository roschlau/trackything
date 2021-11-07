import { PageTitle } from './design-system/PageTitle'
import { persistentStorageGranted } from './data/idb'
import { ScreenLayout } from './design-system/ScreenLayout'
import React from 'react'
import { fontStyle, styled } from './stitches.config'

export const SettingsScreen = () => (
  <ScreenLayout>
    <PageTitle>Settings</PageTitle>
    {persistentStorageGranted ||
    <DangerCallout>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM12 2C6.47 2 2 6.5 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2ZM12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20V20Z"
          fill="#FB5E5E"/>
      </svg>
      Persistent storage permission not granted. Your data might not be safe from eviction.
    </DangerCallout>
    }
  </ScreenLayout>
)

const DangerCallout = styled('div', {
  borderRadius: '8px',
  border: '1px solid $error7',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px',
  fontSize: '14px',
  color: '$error11',
  ...fontStyle('semibold'),

  '& > svg': {
    marginRight: '12px',
    flexShrink: '0',
  },
})
