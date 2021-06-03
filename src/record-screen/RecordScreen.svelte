<script lang="ts">
    import RecordForm from './RecordForm.svelte'
    import { primaryColor } from '../style-helpers/primary-color'
    import { trackerStore, TrackerStore } from '../data/stores'

    export let trackerId: string

    let tracker: TrackerStore
    $: tracker = trackerStore(trackerId)
</script>

<style lang="scss">
  .screen {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>

<div
    class="screen"
    use:primaryColor={$tracker?.meta.color ?? 'pink'}
>
    <h1>New Entry</h1>
    {#if $tracker}
        <RecordForm
            tracker="{$tracker}"
            on:entryCreated={(event) => tracker.addEntry(event.detail)}
        />
    {/if}
</div>
