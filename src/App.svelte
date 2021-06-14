<!--
    @component
    This is the main component with a doc comment.
-->
<script lang="ts">
    import { Route, Router } from 'svelte-navigator'
    import TrackingScreen from './tracking-screen/TrackingScreen.svelte'
    import AnalyzeScreen from './AnalyzeScreen.svelte'
    import RecordScreen from './record-screen/RecordScreen.svelte'
    import TrackerDetailScreen from './tracker-detail-screen/TrackerDetailScreen.svelte'
    import SettingsScreen from './settings/SettingsScreen.svelte'
    import CreateTrackerScreen from './create-tracker/CreateTrackerScreen.svelte'

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
        })
    }
</script>

<style lang="scss">
  main {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 56em;
    background-color: var(--color-background);
    margin: 0 auto;
    min-height: 100%;
  }
</style>

<Router>
    <main>
        <Route path="/record/:trackerId" component="{RecordScreen}"/>
        <Route path="/tracker/new" component="{CreateTrackerScreen}"/>
        <Route path="/tracker/:trackerId" component="{TrackerDetailScreen}"/>
        <Route path="/settings" component="{SettingsScreen}"/>
        <Route path="/reports" component="{AnalyzeScreen}"/>
        <Route path="/" component="{TrackingScreen}"/>
    </main>
</Router>
