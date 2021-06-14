<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { Link } from 'svelte-navigator'

    /**
     * If set, will be rendered as an `a` element instead of a `button`, to be used for proper navigation.
     */
    export let linkTo: string | undefined = undefined

    const dispatch = createEventDispatcher()

    function dispatchClick() {
        dispatch('click')
    }
</script>

<style lang="scss">
  @mixin buttonStyle {
    height: 48px;
    border-radius: 8px;
    border: 2px solid transparent;
    background: var(--color-surface04dp);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 300;
    color: var(--color-text-secondary);
  }

  .button {
    @include buttonStyle;

    &:focus-within {
      border: 2px solid var(--color-text-disabled-hint);
    }
  }

  .encapsulate {
    display: flex;
    align-items: stretch;
    justify-content: stretch;

    > :global(.link) {
      flex-grow: 1;
      @include buttonStyle;
    }

    > :global(.link:focus-within) {
      border: 2px solid var(--color-text-disabled-hint);
    }
  }
</style>

{#if linkTo}
    <span class="encapsulate">
        <Link to="{linkTo}" class="link">
            <slot/>
        </Link>
    </span>
{:else}
    <button
        class="button"
        on:click={dispatchClick}
    >
        <slot/>
    </button>
{/if}
