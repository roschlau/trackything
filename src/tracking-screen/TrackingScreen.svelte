<script lang="ts">
    import { trackers } from './trackers'
    import TrackerTile from './TrackerTile.svelte'
</script>

<style lang="scss">
  @import "src/style-helpers/square";

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

  .new-tracker-button {
    width: 100%;
    height: 100%;
    border: 1px solid hsla(0, 0, 100%, .12);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--color-text-secondary);

    .button-text {
      display: block;
      margin: 12px;
      font-size: 18px;
    }

    .plus-sign {
      display: block;
      position: absolute;
      bottom: 50%;
      right: 50%;
      transform: translate(50%, 50%);
      font-size: 24px;
    }
  }
</style>

<h1>
    trackything
</h1>

<ul class="trackers-list">
    {#each trackers as tracker (tracker.id)}
        <li class="square">
            <TrackerTile {tracker}/>
        </li>
    {/each}
<!--    <li class="square">-->
<!--        <button class="new-tracker-button">-->
<!--            <span class="button-text font-body-bold">New Tracker</span>-->
<!--            <span class="plus-sign">+</span>-->
<!--        </button>-->
<!--    </li>-->
</ul>
