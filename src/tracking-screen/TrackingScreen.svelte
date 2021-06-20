<script lang="ts">
    import TrackerTile from './TrackerTile.svelte'
    import { trackersStore } from '../data/stores'
    import { Link } from 'svelte-navigator'
    import { addDefaultTrackers } from '../data/default-trackers'
    import { get } from 'svelte/store'
    import { importFromFile } from '../data/backup'
    import SearchBox from '../components/SearchBox.svelte'
    import Button from '../components/Button.svelte'

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
    place-items: stretch;
    width: 100%;

    &.first-use {
      grid-template-columns: 1fr 1fr;

      .action-icon {
        margin-right: 12px;
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
        <SearchBox bind:value={searchText}/>
        <Button linkTo="/reports">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3 14L3.5 14.07L8.07 9.5C7.89 8.85 8.06 8.11 8.59 7.59C9.37 6.8 10.63 6.8 11.41 7.59C11.94 8.11 12.11 8.85 11.93 9.5L14.5 12.07L15 12C15.18 12 15.35 12 15.5 12.07L19.07 8.5C19 8.35 19 8.18 19 8C19 7.46957 19.2107 6.96086 19.5858 6.58579C19.9609 6.21071 20.4696 6 21 6C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8C23 8.53043 22.7893 9.03914 22.4142 9.41421C22.0391 9.78929 21.5304 10 21 10C20.82 10 20.65 10 20.5 9.93L16.93 13.5C17 13.65 17 13.82 17 14C17 14.5304 16.7893 15.0391 16.4142 15.4142C16.0391 15.7893 15.5304 16 15 16C14.4696 16 13.9609 15.7893 13.5858 15.4142C13.2107 15.0391 13 14.5304 13 14L13.07 13.5L10.5 10.93C10.18 11 9.82 11 9.5 10.93L4.93 15.5L5 16C5 16.5304 4.78929 17.0391 4.41421 17.4142C4.03914 17.7893 3.53043 18 3 18C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16C1 15.4696 1.21071 14.9609 1.58579 14.5858C1.96086 14.2107 2.46957 14 3 14Z"
                    fill="white" fill-opacity="0.6"/>
            </svg>
        </Button>
        <Button linkTo="/settings">
            <svg class="action-icon" width="25" height="24" viewBox="0 0 25 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.75 15.5C11.8217 15.5 10.9315 15.1313 10.2751 14.4749C9.61875 13.8185 9.25 12.9283 9.25 12C9.25 11.0717 9.61875 10.1815 10.2751 9.52513C10.9315 8.86875 11.8217 8.5 12.75 8.5C13.6783 8.5 14.5685 8.86875 15.2249 9.52513C15.8813 10.1815 16.25 11.0717 16.25 12C16.25 12.9283 15.8813 13.8185 15.2249 14.4749C14.5685 15.1313 13.6783 15.5 12.75 15.5ZM20.18 12.97C20.22 12.65 20.25 12.33 20.25 12C20.25 11.67 20.22 11.34 20.18 11L22.29 9.37C22.48 9.22 22.53 8.95 22.41 8.73L20.41 5.27C20.29 5.05 20.02 4.96 19.8 5.05L17.31 6.05C16.79 5.66 16.25 5.32 15.62 5.07L15.25 2.42C15.21 2.18 15 2 14.75 2H10.75C10.5 2 10.29 2.18 10.25 2.42L9.88 5.07C9.25 5.32 8.71 5.66 8.19 6.05L5.7 5.05C5.48 4.96 5.21 5.05 5.09 5.27L3.09 8.73C2.96 8.95 3.02 9.22 3.21 9.37L5.32 11C5.28 11.34 5.25 11.67 5.25 12C5.25 12.33 5.28 12.65 5.32 12.97L3.21 14.63C3.02 14.78 2.96 15.05 3.09 15.27L5.09 18.73C5.21 18.95 5.48 19.03 5.7 18.95L8.19 17.94C8.71 18.34 9.25 18.68 9.88 18.93L10.25 21.58C10.29 21.82 10.5 22 10.75 22H14.75C15 22 15.21 21.82 15.25 21.58L15.62 18.93C16.25 18.67 16.79 18.34 17.31 17.94L19.8 18.95C20.02 19.03 20.29 18.95 20.41 18.73L22.41 15.27C22.53 15.05 22.48 14.78 22.29 14.63L20.18 12.97Z"
                        fill="white" fill-opacity="0.6"/>
            </svg>
        </Button>
    {:else}
        <Button on:click={importFromFile}>
            <svg class="action-icon" width="25" height="25" viewBox="0 0 25 25" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
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
        </Button>
        <Button linkTo="/settings">
            <svg class="action-icon" width="25" height="24" viewBox="0 0 25 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.75 15.5C11.8217 15.5 10.9315 15.1313 10.2751 14.4749C9.61875 13.8185 9.25 12.9283 9.25 12C9.25 11.0717 9.61875 10.1815 10.2751 9.52513C10.9315 8.86875 11.8217 8.5 12.75 8.5C13.6783 8.5 14.5685 8.86875 15.2249 9.52513C15.8813 10.1815 16.25 11.0717 16.25 12C16.25 12.9283 15.8813 13.8185 15.2249 14.4749C14.5685 15.1313 13.6783 15.5 12.75 15.5ZM20.18 12.97C20.22 12.65 20.25 12.33 20.25 12C20.25 11.67 20.22 11.34 20.18 11L22.29 9.37C22.48 9.22 22.53 8.95 22.41 8.73L20.41 5.27C20.29 5.05 20.02 4.96 19.8 5.05L17.31 6.05C16.79 5.66 16.25 5.32 15.62 5.07L15.25 2.42C15.21 2.18 15 2 14.75 2H10.75C10.5 2 10.29 2.18 10.25 2.42L9.88 5.07C9.25 5.32 8.71 5.66 8.19 6.05L5.7 5.05C5.48 4.96 5.21 5.05 5.09 5.27L3.09 8.73C2.96 8.95 3.02 9.22 3.21 9.37L5.32 11C5.28 11.34 5.25 11.67 5.25 12C5.25 12.33 5.28 12.65 5.32 12.97L3.21 14.63C3.02 14.78 2.96 15.05 3.09 15.27L5.09 18.73C5.21 18.95 5.48 19.03 5.7 18.95L8.19 17.94C8.71 18.34 9.25 18.68 9.88 18.93L10.25 21.58C10.29 21.82 10.5 22 10.75 22H14.75C15 22 15.21 21.82 15.25 21.58L15.62 18.93C16.25 18.67 16.79 18.34 17.31 17.94L19.8 18.95C20.02 19.03 20.29 18.95 20.41 18.73L22.41 15.27C22.53 15.05 22.48 14.78 22.29 14.63L20.18 12.97Z"
                    fill="white" fill-opacity="0.6"/>
            </svg>
            Settings
        </Button>
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
