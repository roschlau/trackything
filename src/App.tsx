import React from 'react'
import { useAsync } from 'react-async'
import { loadState } from './data/idb'
import { TrackingScreen } from './TrackingScreen'
import { globalStyles } from './design-system/global-styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const App = () => {
  globalStyles()
  const { data } = useAsync(loadState)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/settings">
          Settings
        </Route>
        <Route path="/">
          <TrackingScreen trackers={data?.trackers ?? []}/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
