<!--
    @component
    This is the main component with a doc comment.
-->
<script lang="ts">
    import Nav from './Nav.svelte'
    import { Route, Router } from 'svelte-navigator'
    import TrackingScreen from './TrackingScreen.svelte'
    import AnalyzeScreen from './AnalyzeScreen.svelte'
</script>

<style lang="scss">
  main {
    position: relative;
    max-width: 56em;
    background-color: var(--color-background);
    margin: 0 auto;
  }
</style>

<Router>
    <main>
        <Route path="/">
            <TrackingScreen/>
        </Route>
        <Route path="/analyze">
            <AnalyzeScreen/>
        </Route>
    </main>
    <Nav/>
</Router>
