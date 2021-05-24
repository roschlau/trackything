<script lang="ts">
    export let segment: string
</script>

<style>
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

    a {
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
    }

    a > img {
        margin-bottom: 4px;
    }

    [aria-current] {
        color: var(--color-primary);
    }

    a:not([aria-current]) {
        transform: scale(.9);
    }
</style>

<nav>
    <a aria-current="{segment === undefined ? 'page' : undefined}" href=".">
        <img src="{segment === undefined ? '/icons/edit_primary.svg' : '/icons/edit_default.svg'}" alt="Track"/>
        Track
    </a>
    <a aria-current="{segment === 'analyze' ? 'page' : undefined}" href="analyze">
        <img src="{segment === 'analyze' ? '/icons/analyze_primary.svg' : '/icons/analyze_default.svg'}" alt="Analyze"/>
        Analyze
    </a>
</nav>
