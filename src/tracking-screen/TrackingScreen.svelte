<script lang="ts">
    import TrackerTile from './TrackerTile.svelte'
    import { trackersStore } from '../data/stores'
    import { Link } from 'svelte-navigator'
    import { addDefaultTrackers } from '../data/default-trackers'
    import { persistentStorageGranted } from '../data/idb'
</script>

<style lang="scss">
  @import "src/style-helpers/square";
  @import "src/style-helpers/focus";

  $singleColumnMaxWidth: 220px;

  .actions {
    padding: 0 16px;
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    place-items: center;
    width: 100%;

    &.single {
      grid-template-columns: 1fr;

      > :global(.action) {
        max-width: $singleColumnMaxWidth;
      }
    }

    > :global(.action) {
      width: 100%;
      height: 48px;
      border-radius: 8px;
      background: var(--color-surface04dp);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: var(--color-text-secondary);
    }

    > :global(.action.alert) {
      color: var(--color-error);
    }

    > :global(.action .icon) {
      margin-right: 12px;
    }
  }

  .square {
    width: 100%;
    @include responsiveSquare;
  }

  .trackers-list {
    padding: 0 16px 16px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

    &.empty {
      grid-template-columns: 1fr;
      justify-content: center;
      justify-items: center;

      > * {
        max-width: $singleColumnMaxWidth;
      }
    }
  }

  .trackers-list :global(.new-tracker-button) {
    width: 100%;
    height: 100%;
    border: 2px dashed var(--color-divider);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--color-text-disabled-hint);
  }

  .trackers-list :global(.new-tracker-button:focus) {
    border: 2px solid var(--color-text-disabled-hint);
  }

  .trackers-list :global(.new-tracker-button .button-text) {
    display: block;
    margin: 12px;
    font-size: 18px;
  }

  .trackers-list :global(.new-tracker-button .plus-sign) {
    display: block;
    position: absolute;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    font-size: 42px;
    color: var(--color-text-disabled-hint);
  }
</style>

<h1>trackything</h1>

<div class="actions" class:single={$trackersStore.length === 0}>
    {#if $trackersStore.length > 0}
        <Link to="/analyze" class="action">
            <img class="icon" src="/icons/analyze_default.svg" alt="Analyze Icon" width="24" height="24"/>
            Analyze
        </Link>
    {/if}
    <Link to="/settings" class="action">
        <svg class="icon" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
                <path d="M12.75 15.5C11.8217 15.5 10.9315 15.1313 10.2751 14.4749C9.61875 13.8185 9.25 12.9283 9.25 12C9.25 11.0717 9.61875 10.1815 10.2751 9.52513C10.9315 8.86875 11.8217 8.5 12.75 8.5C13.6783 8.5 14.5685 8.86875 15.2249 9.52513C15.8813 10.1815 16.25 11.0717 16.25 12C16.25 12.9283 15.8813 13.8185 15.2249 14.4749C14.5685 15.1313 13.6783 15.5 12.75 15.5ZM20.18 12.97C20.22 12.65 20.25 12.33 20.25 12C20.25 11.67 20.22 11.34 20.18 11L22.29 9.37C22.48 9.22 22.53 8.95 22.41 8.73L20.41 5.27C20.29 5.05 20.02 4.96 19.8 5.05L17.31 6.05C16.79 5.66 16.25 5.32 15.62 5.07L15.25 2.42C15.21 2.18 15 2 14.75 2H10.75C10.5 2 10.29 2.18 10.25 2.42L9.88 5.07C9.25 5.32 8.71 5.66 8.19 6.05L5.7 5.05C5.48 4.96 5.21 5.05 5.09 5.27L3.09 8.73C2.96 8.95 3.02 9.22 3.21 9.37L5.32 11C5.28 11.34 5.25 11.67 5.25 12C5.25 12.33 5.28 12.65 5.32 12.97L3.21 14.63C3.02 14.78 2.96 15.05 3.09 15.27L5.09 18.73C5.21 18.95 5.48 19.03 5.7 18.95L8.19 17.94C8.71 18.34 9.25 18.68 9.88 18.93L10.25 21.58C10.29 21.82 10.5 22 10.75 22H14.75C15 22 15.21 21.82 15.25 21.58L15.62 18.93C16.25 18.67 16.79 18.34 17.31 17.94L19.8 18.95C20.02 19.03 20.29 18.95 20.41 18.73L22.41 15.27C22.53 15.05 22.48 14.78 22.29 14.63L20.18 12.97Z" fill="white" fill-opacity="0.87"/>
            </g>
        </svg>
        Settings
    </Link>
</div>

<ul class="trackers-list" class:empty={$trackersStore.length === 0}>
    {#each $trackersStore as tracker (tracker.trackerId)}
        <li class="square">
            <TrackerTile {tracker}/>
        </li>
    {/each}
    {#if $trackersStore.length === 0}
        <li class="square">
            <button on:click={addDefaultTrackers} class="new-tracker-button">
                <span class="button-text font-body-bold">Add Default Trackers</span>
                <span class="plus-sign">+</span>
            </button>
        </li>
    {/if}
    <li class="square">
        <Link to="/tracker/new" class="new-tracker-button">
            <span class="button-text font-body-bold">New Tracker</span>
            <span class="plus-sign">+</span>
        </Link>
    </li>
</ul>
