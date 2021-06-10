<script lang="ts">
    import type { Tracker, TrackerEntry } from '../data/trackers'
    import { areSameDay, relativeTime } from '../util/time'
    import { groupBy } from '../util/collections'
    import NumericEntrySummaryTile from './NumericEntrySummaryTile.svelte'
    import { Link } from 'svelte-navigator'

    export let tracker: Tracker

    let today: TrackerEntry[]
    $: today = tracker.entries.filter(it => areSameDay(it.time, new Date()))
    let notToday: [string, TrackerEntry[]][]
    $: notToday = flatEntriesWithoutToday(tracker.entries)

    function flatEntriesWithoutToday(entries: TrackerEntry[]): [string, TrackerEntry[]][] {
        const entriesByTime = groupBy(entries, entry => relativeTime(entry.time, 'day'))
        entriesByTime.delete('Today')
        return Array.from(entriesByTime.entries())
    }
</script>

<style lang="scss">
  .timeline {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0 16px;
  }

  .time-block-heading {
    align-self: center;
    margin-bottom: 16px;
    font-size: 18px;

    &:not(:first-child) {
      margin-top: 36px;
    }
  }

  .timeline > :global(.new-entry-button) {
    height: 64px;
    margin-bottom: 12px;
    border: 1px solid var(--color-divider);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: var(--color-text-secondary);
    text-decoration: none;
  }

  .timeline > :global(.new-entry-button:focus) {
    border: 2px solid var(--color-text-disabled-hint);
    color: var(--color-text-primary);
  }
</style>

<div class="timeline">
    <h2 class="time-block-heading">Today</h2>
    <Link to="/record/{tracker.id}" class="new-entry-button">
        Add Entry
    </Link>
    {#each today as entry (entry.time)}
        <NumericEntrySummaryTile {entry} tracker="{tracker}"/>
    {/each}
    {#each notToday as [heading, entries] (heading)}
        <h2 class="time-block-heading">{heading}</h2>
        {#each entries as entry (entry.time)}
            <NumericEntrySummaryTile {entry} tracker="{tracker}"/>
        {/each}
    {/each}
</div>
