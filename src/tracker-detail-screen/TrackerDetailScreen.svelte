<script lang="ts">
    import { primaryColor } from '../style-helpers/primary-color'
    import TrackerTimeline from './TrackerTimeline.svelte'
    import { trackerStore } from '../data/stores'
    import type {  TrackerStore } from '../data/stores'

    export let trackerId: string

    let tracker: TrackerStore
    $: tracker = trackerStore(trackerId)
</script>

<style lang="scss">
  @import "src/style-helpers/focus";

  .screen {
    margin-bottom: 16px;
  }
</style>

<div
    class="screen"
    use:primaryColor={$tracker?.meta?.color ?? 'pink' }
>
    <h1>{$tracker?.meta?.name ?? 'Loading...'}</h1>
    {#if $tracker}
        <TrackerTimeline tracker="{$tracker}"/>
    {/if}
</div>
