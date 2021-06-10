<script lang="ts">
    import type { NumericField, Tracker, TrackerEntry } from '../data/trackers'
    import { showTime } from '../util/time'

    export let entry: TrackerEntry
    export let tracker: Tracker
</script>

<style lang="scss">
  .tile {
    position: relative;
    height: 64px;
    border-radius: 8px;
    background: var(--color-surface04dp);

    & + & {
      margin-top: 12px;
    }
  }
  .tile + .tile {
    margin-top: 12px;
  }
  .value {
    position: absolute;
    left: 16px;
    bottom: 50%;
    transform: translateY(50%);
    font-size: 24px;
  }
  .time {
    position: absolute;
    top: 0;
    right: 8px;
    font-size: 18px;
    color: var(--color-text-secondary);
  }
  .tags {
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
    flex-direction: row;
  }
  .tag + .tag {
    margin-left: 8px;
  }
  .tag {
    width: 26px;
    height: 12px;
    border-radius: 2px;
    background: var(--color-primary);
    opacity: .3;
    &.active {
      opacity: 1;
    }
  }
</style>

<div class="tile">
    <div class="value">{entry.value} {tracker.meta.mainField.unit}</div>
    <div class="time">{showTime(entry.time)}</div>
    <div class="tags">
        {#each tracker.meta.tags as tag (tag)}
            <div class="tag" class:active={entry.tags.includes(tag)}></div>
        {/each}
    </div>
</div>
<!-- Now, for some dark magic so that the `.tile + .tile` will be kept even though there's only one .tile needed here -->
<div class="tile" style="display: none"></div>
