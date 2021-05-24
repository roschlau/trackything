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
  header {
    color: var(--color-primary);
    font-size: 36px;
    letter-spacing: 0.07em;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main {
    position: relative;
    max-width: 56em;
    background-color: var(--color-background);
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Router>
    <header class="font-heading-bold">
        trackything
    </header>
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
