import React from 'react'
import { useAsync } from 'react-async'
import { loadState } from './data/idb'
import { TrackingScreen } from './TrackingScreen'
import { globalStyles } from './design-system/global-styles'

const App = () => {
  globalStyles()
  const { data } = useAsync(loadState)
  return (<TrackingScreen trackers={data?.trackers ?? []}/>)
}

export default App
