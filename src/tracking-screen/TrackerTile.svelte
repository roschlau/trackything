<script lang="ts">
    import type { TrackerEntry} from '../data/trackers'
    import { link } from 'svelte-navigator'
    import { relativeTime } from '../util/time'
    import { primaryColor } from '../style-helpers/primary-color'
    import type { TrackerStore } from '../data/stores'

    export let tracker: TrackerStore
    let lastEntry: TrackerEntry
    $: lastEntry = $tracker?.entries[0]
</script>

<style lang="scss">
  @import "src/style-helpers/focus";

  .tracker {
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.35);
    border-radius: 8px;
    background: var(--color-surface04dp);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    @include focus-border;
  }

  .tracker-name {
    display: block;
    margin: 10px;
    font-size: 18px;
    color: var(--color-primary);
  }

  .center-plus {
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    width: 48px;
    height: 48px;
    border: 1px solid var(--color-primary);
    border-radius: 24px;
    display: grid;
    place-content: center;
    color: var(--color-primary);
    font-size: 24px;
    text-decoration: none;
    overflow: hidden;

    &:focus {
      border-width: 2px;
      font-weight: 500;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--color-primary);
      opacity: .12;
    }
  }

  .last-entry {
    display: block;
    align-self: flex-end;
    margin: 4px 6px;
    font-size: 14px;
    color: var(--color-text-disabled-hint);
  }

  .last-entry-value {
    color: var(--color-text-secondary);
  }
</style>

{#if $tracker}
    <a
        href="/tracker/{$tracker.id}"
        class="tracker"
        use:primaryColor={$tracker.meta.color}
        use:link
    >
        <span class="tracker-name font-body-bold">{$tracker.meta.name}</span>
        <a href="/record/{$tracker.id}" class="center-plus" use:link>+</a>
        <span class="last-entry">
        {#if lastEntry}
            Last Entry: <span class="last-entry-value">{ relativeTime(lastEntry.time) }</span>
        {:else}
            No Entries
        {/if}
        </span>
    </a>
{/if}
