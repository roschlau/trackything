<script lang="ts">
    import TrackerTile from './TrackerTile.svelte'
    import { trackersStore } from '../data/stores'
    import { Link } from 'svelte-navigator'
</script>

<style lang="scss">
  @import "src/style-helpers/square";
  @import "src/style-helpers/focus";

  .square {
    width: 100%;
    @include responsiveSquare;
  }

  .trackers-list {
    padding: 0 16px 16px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

<Link to="settings">
    <h1>trackything</h1>
</Link>

<ul class="trackers-list">
    {#each $trackersStore as tracker (tracker.trackerId)}
        <li class="square">
            <TrackerTile {tracker}/>
        </li>
    {/each}
    <li class="square">
        <Link to="/tracker/new" class="new-tracker-button">
            <span class="button-text font-body-bold">New Tracker</span>
            <span class="plus-sign">+</span>
        </Link>
    </li>
</ul>
