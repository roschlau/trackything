<script lang="ts">
    import TrackerTile from './TrackerTile.svelte'
    import { trackersStore } from '../data/stores'
    import { Link } from 'svelte-navigator'
    import { addDefaultTrackers } from '../data/default-trackers'
    import { get } from 'svelte/store'
    import { importFromFile } from '../data/backup'

    let searchText = ''
    let trackers
    $: trackers = $trackersStore.filter(it => !searchText || get(it)?.meta.name.includes(searchText))

    async function importData() {
        await importFromFile()
    }
</script>

<style lang="scss">
  @import "src/style-helpers/square";
  @import "src/style-helpers/focus";

  $singleColumnMaxWidth: 220px;

  .actions {
    padding: 0 16px;
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: 1fr repeat(2, auto);
    grid-gap: 12px;
    place-items: center;
    width: 100%;

    &.first-use {
      grid-template-columns: 1fr 1fr;

      > :global(.action .icon) {
        margin-right: 12px;
      }
    }

    > :global(.action) {
      width: 100%;
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

    > :global(.action:focus-within) {
      border: 2px solid var(--color-text-disabled-hint);
    }

    > .search {
      display: flex;
      flex-direction: row;
      padding-left: 12px;
      padding-right: 0;

      > .icon {
        flex-shrink: 0;
      }

      > input {
        width: 0;
        flex-basis: 0;
        flex-grow: 1;
        background: none;

        &:focus {
          border-color: transparent;
        }
      }
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

<div class="actions" class:first-use={$trackersStore.length === 0}>
    {#if $trackersStore.length > 0}
        <div class="action search">
            <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
                    fill="white" fill-opacity="0.6"/>
            </svg>
            <input type="text" bind:value={searchText}/>
        </div>
        <Link to="/analyze" class="action">
            <img class="icon" src="/icons/analyze_default.svg" alt="Analyze Icon" width="24" height="24"/>
        </Link>
        <Link to="/settings" class="action">
            <svg class="icon" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                    <path
                        d="M12.75 15.5C11.8217 15.5 10.9315 15.1313 10.2751 14.4749C9.61875 13.8185 9.25 12.9283 9.25 12C9.25 11.0717 9.61875 10.1815 10.2751 9.52513C10.9315 8.86875 11.8217 8.5 12.75 8.5C13.6783 8.5 14.5685 8.86875 15.2249 9.52513C15.8813 10.1815 16.25 11.0717 16.25 12C16.25 12.9283 15.8813 13.8185 15.2249 14.4749C14.5685 15.1313 13.6783 15.5 12.75 15.5ZM20.18 12.97C20.22 12.65 20.25 12.33 20.25 12C20.25 11.67 20.22 11.34 20.18 11L22.29 9.37C22.48 9.22 22.53 8.95 22.41 8.73L20.41 5.27C20.29 5.05 20.02 4.96 19.8 5.05L17.31 6.05C16.79 5.66 16.25 5.32 15.62 5.07L15.25 2.42C15.21 2.18 15 2 14.75 2H10.75C10.5 2 10.29 2.18 10.25 2.42L9.88 5.07C9.25 5.32 8.71 5.66 8.19 6.05L5.7 5.05C5.48 4.96 5.21 5.05 5.09 5.27L3.09 8.73C2.96 8.95 3.02 9.22 3.21 9.37L5.32 11C5.28 11.34 5.25 11.67 5.25 12C5.25 12.33 5.28 12.65 5.32 12.97L3.21 14.63C3.02 14.78 2.96 15.05 3.09 15.27L5.09 18.73C5.21 18.95 5.48 19.03 5.7 18.95L8.19 17.94C8.71 18.34 9.25 18.68 9.88 18.93L10.25 21.58C10.29 21.82 10.5 22 10.75 22H14.75C15 22 15.21 21.82 15.25 21.58L15.62 18.93C16.25 18.67 16.79 18.34 17.31 17.94L19.8 18.95C20.02 19.03 20.29 18.95 20.41 18.73L22.41 15.27C22.53 15.05 22.48 14.78 22.29 14.63L20.18 12.97Z"
                        fill="white" fill-opacity="0.87"/>
                </g>
            </svg>
        </Link>
    {:else}
        <button class="action" on:click={importFromFile}>
            <svg class="icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                    <path
                        d="M12.5 3.5C9.09 3.5 6.19 4.57 5.04 6.07L10.29 11.32C11 11.43 11.72 11.5 12.5 11.5C16.92 11.5 20.5 9.71 20.5 7.5C20.5 5.29 16.92 3.5 12.5 3.5ZM4.42 7.58L3 9L5.5 11.5H0.5V13.5H5.5L3 16L4.42 17.42L9.34 12.5L4.42 7.58ZM20.5 9.5C20.5 11.71 16.92 13.5 12.5 13.5C11.84 13.5 11.2 13.45 10.59 13.37L8.12 15.84C9.38 16.25 10.88 16.5 12.5 16.5C16.92 16.5 20.5 14.71 20.5 12.5V9.5ZM20.5 14.5C20.5 16.71 16.92 18.5 12.5 18.5C10.22 18.5 8.17 18 6.71 17.25L5.03 18.93C6.18 20.43 9.09 21.5 12.5 21.5C16.92 21.5 20.5 19.71 20.5 17.5"
                        fill="white" fill-opacity="0.6"/>
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" transform="translate(0.5 0.5)"/>
                    </clipPath>
                </defs>
            </svg>
            Import
        </button>
        <Link to="/settings" class="action">
            <svg class="icon" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.75 15.5C11.8217 15.5 10.9315 15.1313 10.2751 14.4749C9.61875 13.8185 9.25 12.9283 9.25 12C9.25 11.0717 9.61875 10.1815 10.2751 9.52513C10.9315 8.86875 11.8217 8.5 12.75 8.5C13.6783 8.5 14.5685 8.86875 15.2249 9.52513C15.8813 10.1815 16.25 11.0717 16.25 12C16.25 12.9283 15.8813 13.8185 15.2249 14.4749C14.5685 15.1313 13.6783 15.5 12.75 15.5ZM20.18 12.97C20.22 12.65 20.25 12.33 20.25 12C20.25 11.67 20.22 11.34 20.18 11L22.29 9.37C22.48 9.22 22.53 8.95 22.41 8.73L20.41 5.27C20.29 5.05 20.02 4.96 19.8 5.05L17.31 6.05C16.79 5.66 16.25 5.32 15.62 5.07L15.25 2.42C15.21 2.18 15 2 14.75 2H10.75C10.5 2 10.29 2.18 10.25 2.42L9.88 5.07C9.25 5.32 8.71 5.66 8.19 6.05L5.7 5.05C5.48 4.96 5.21 5.05 5.09 5.27L3.09 8.73C2.96 8.95 3.02 9.22 3.21 9.37L5.32 11C5.28 11.34 5.25 11.67 5.25 12C5.25 12.33 5.28 12.65 5.32 12.97L3.21 14.63C3.02 14.78 2.96 15.05 3.09 15.27L5.09 18.73C5.21 18.95 5.48 19.03 5.7 18.95L8.19 17.94C8.71 18.34 9.25 18.68 9.88 18.93L10.25 21.58C10.29 21.82 10.5 22 10.75 22H14.75C15 22 15.21 21.82 15.25 21.58L15.62 18.93C16.25 18.67 16.79 18.34 17.31 17.94L19.8 18.95C20.02 19.03 20.29 18.95 20.41 18.73L22.41 15.27C22.53 15.05 22.48 14.78 22.29 14.63L20.18 12.97Z"
                    fill="white" fill-opacity="0.6"/>
            </svg>
            Settings
        </Link>
    {/if}
</div>

<ul class="trackers-list" class:empty={$trackersStore.length === 0}>
    {#each trackers as tracker (tracker.trackerId)}
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
