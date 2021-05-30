<!--
    @component
    This is the main component with a doc comment.
-->
<script lang="ts">
    import Nav from './Nav.svelte'
    import { Route, Router } from 'svelte-navigator'
    import TrackingScreen from './tracking-screen/TrackingScreen.svelte'
    import AnalyzeScreen from './AnalyzeScreen.svelte'
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
  .spacer {
    flex-grow: 1;
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
        <div aria-hidden="true" class="spacer"></div>
        <Nav/>
    </main>
</Router>
