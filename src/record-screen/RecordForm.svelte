<script lang="ts">
    import type { Tracker, TrackerEntry } from '../data/trackers'
    import { showTime } from '../util/time'
    import { autoresize } from '../util/autoresize'
    import NumericValueSelector from './NumericValueSelector.svelte'
    import { navigate } from 'svelte-navigator'
    import { createEventDispatcher } from 'svelte'
    import { trackerStore } from '../data/stores'
    import { generateId } from '../data/idb'

    export let tracker: Tracker

    const dispatch = createEventDispatcher()

    let entry: TrackerEntry
    $: entry = entry && entry.trackerId === tracker.id ? entry : {
        id: generateId(),
        trackerId: tracker.id,
        time: new Date().getTime(),
        value: tracker.meta.mainField.default,
        tags: [],
        comment: '',
    }

    let changeDate = false
    function applyNewTime(humanReadableTime: string) {
        const [hours, minutes] = humanReadableTime.split(':').map(it => parseInt(it))
        if (isNaN(hours) || isNaN(minutes)) return
        entry.time = new Date(entry.time).setHours(hours, minutes)
    }

    function toggleTag(tag: string) {
        if (entry.tags.includes(tag)) {
            entry.tags = entry.tags.filter(it => it !== tag)
        } else {
            entry.tags = [...entry.tags, tag]
        }
    }

    async function addTag() {
        const tag = prompt('Enter New Tag:')
        if (!tag) {
            return
        }
        entry.tags.push(tag)
        await trackerStore(tracker.id).setMeta({
            ...tracker.meta,
            tags: [...tracker.meta.tags, tag],
        })
    }

    function discard() {
        navigate(-1)
    }

    function saveEntry() {
        dispatch('entryCreated', Object.freeze(entry))
        navigate(-1)
    }
</script>

<style lang="scss">
  @import "src/style-helpers/focus";

  .tracker-name-indicator {
    align-self: center;
    font-size: 18px;
    color: var(--color-text-secondary);

    .tracker-name {
      color: var(--color-text-primary);
    }
  }

  .field {
    padding: 0 16px;
    margin-bottom: 24px;

    .field-name {
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    .time-value {
      font-size: 24px;
      color: var(--color-text-primary);
    }

    .time-input {
      margin-top: 12px;
      font-size: 24px;
    }

    .tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      margin: -6px; // counteracting child margins
      margin-top: 6px;

      .tag {
        margin: 6px;
        border-radius: 8px;
        padding: 6px 10px;
        background: var(--color-surface04dp);
        color: var(--color-text-secondary);
        font-size: 18px;
        font-family: var(--font-body);
        font-weight: 300;

        @include focus-border();

        &.selected {
          background: var(--color-primary);
          color: var(--color-text-primary-light-background);
          font-weight: 500;
          @include focus-border(solid, transparent, var(--color-text-primary-light-background));
        }
      }

      .new-tag-button {
        margin: 6px;
        border-radius: 8px;
        padding: 6px 10px;
        color: var(--color-text-disabled-hint);
        font-size: 18px;
        font-family: var(--font-body);
        font-weight: 300;

        @include focus-border(dashed, var(--color-divider));
      }
    }

    textarea {
      margin-top: 12px;
      width: 100%;
      @include focus-border()
    }
  }

  .spacer {
    flex-grow: 1;
  }

  .actions {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    place-items: stretch;

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      letter-spacing: 0.07em;
      padding: 24px;
      text-transform: uppercase;

      @include focus-border-after(4px);

      > svg {
        margin-right: 12px;
        transform: translateY(-1px);
      }

      &.discard {
        color: var(--color-text-secondary);
      }

      &.save {
        color: var(--color-primary);

        > svg {
          fill: var(--color-primary);
        }
      }
    }
  }
</style>

<div class="tracker-name-indicator">
    Tracker: <span class="tracker-name font-body-bold">{tracker.meta.name}</span>
</div>
<div
    class="field"
    on:click={() => changeDate = true}
>
    <div class="field-name">Time</div>
    {#if !changeDate}
        <div class="time-value">{showTime(entry.time)}</div>
    {:else}
        <input
            class="time-input font-body-bold"
            type="time"
            value="{showTime(entry.time)}"
            on:change={event => applyNewTime(event.target.value)}
        />
    {/if}
</div>
<div class="field">
    <div class="field-name">{tracker.meta.mainField.name}</div>
    <NumericValueSelector
        selectedValue="{entry.value}"
        field="{tracker.meta.mainField}"
        on:valueSelected={(event) => entry.value = event.detail}
    />
</div>
<div class="field">
    <div class="field-name">Tags</div>
    <div class="tags">
        {#each tracker.meta.tags as tag (tag)}
            <button
                class="tag"
                class:selected={entry.tags.includes(tag)}
                on:click={() => toggleTag(tag)}
            >
                {tag}
            </button>
        {/each}
        <button
            class="new-tag-button"
            on:click={addTag}
        >
            + New Tag
        </button>
    </div>
</div>
<div class="field">
    <div class="field-name">Comment</div>
    <textarea
        class="comment"
        rows="1"
        use:autoresize
        on:input={(event) => entry.comment = event.target.value}
    >{entry.comment}</textarea>
</div>
<div class="spacer"></div>
<div class="actions">
    <button
        class="discard font-heading-regular"
        on:click={discard}
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="white" fill-opacity="0.6"/>
        </svg>
        Close
    </button>
    <button
        class="save font-heading-regular"
        on:click={saveEntry}
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"/>
        </svg>
        Save
    </button>
</div>
