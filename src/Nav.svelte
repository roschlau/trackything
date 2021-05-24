<script lang="ts">
    import { Link, useMatch } from 'svelte-navigator'

    const trackMatch = useMatch('/')
    const analyzeMatch = useMatch('/analyze')
</script>

<style lang="scss">
  nav {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid hsla(0, 0%, 100%, .12);
    background-color: var(--color-background);
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  nav > :global(.nav-link) {
    margin: 0;
    flex-grow: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: transform .2s;
    transform: scale(.9);
  }

  nav > :global(.nav-link[aria-current]) {
    color: var(--color-primary);
    transform: scale(1);
  }

  img {
    margin-bottom: 4px;
  }
</style>

<nav>
    <Link to="/" class="nav-link">
        <img src="{$trackMatch ? '/icons/edit_primary.svg' : '/icons/edit_default.svg'}" alt="Track"/>
        Track
    </Link>
    <Link to="/analyze" class="nav-link">
        <img src="{$analyzeMatch ? '/icons/analyze_primary.svg' : '/icons/analyze_default.svg'}" alt="Analyze"/>
        Analyze
    </Link>
</nav>
