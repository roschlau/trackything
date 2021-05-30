<script lang="ts">
    import type { TrackerEntry } from '../tracking-screen/trackers'
    import { trackers } from '../tracking-screen/trackers'
    import { navigate } from 'svelte-navigator'
    import { showTime } from '../util/time'
    import { autoresize } from '../util/autoresize'

    export let trackerId: string

    const tracker = trackers.find(it => it.id === trackerId)

    if (!tracker) {
        navigate('/')
    }

    const entry: TrackerEntry = {
        time: new Date().getTime(),
        value: tracker.meta.mainField.default,
        tags: [],
        comment: '',
    }

    function toggleTag(tag: string) {
        if (entry.tags.includes(tag)) {
            entry.tags = entry.tags.filter(it => it !== tag)
        } else {
            entry.tags = [...entry.tags, tag]
        }
    }

    function discard() {
        navigate(-1)
    }

    function saveEntry() {
        tracker.entries.unshift(entry)
        navigate(-1)
    }
</script>

<style lang="scss">
  @import "src/style-helpers/focus";
  .screen {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    > :not(:last-child) {
      margin-bottom: 24px;
    }
  }

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

    .field-name {
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    .time-value {
      font-size: 24px;
      color: var(--color-text-primary);
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
          @include focus-border(var(--color-text-disabled-hint-light-background));
        }
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

      @include focus-border();

      &.discard {
        color: var(--color-text-secondary);
      }

      &.save {
        color: var(--color-primary);
      }

      > svg {
        margin-right: 12px;
        transform: translateY(-1px);
      }
    }
  }
</style>

{#if tracker}
    <div class="screen">
        <h1>New Entry</h1>
        <div class="tracker-name-indicator">
            Tracker: <span class="tracker-name font-body-bold">{tracker.meta.name}</span>
        </div>
        <div class="field">
            <div class="field-name">Time</div>
            <div class="time-value">{showTime(entry.time)}</div>
        </div>
        <div class="field">
            <div class="field-name">{tracker.meta.mainField.name}</div>
            {#if tracker.meta.mainField.type === 'mood'}
                TODO: Mood selection
            {:else if tracker.meta.mainField.type === 'numeric' }
                TODO: numeric selection
            {/if}
        </div>
        {#if tracker.meta.tags.length > 0}
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
                </div>
            </div>
        {/if}
        <div class="field">
            <div class="field-name">Comment</div>
            <textarea
                class="comment"
                rows="1"
                use:autoresize
                bind:value={entry.comment}
            ></textarea>
        </div>
        <div class="spacer"></div>
        <div class="actions">
            <button
                class="discard font-heading-regular"
                on:click={discard}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white" fill-opacity="0.6"/>
                </svg>
                Close
            </button>
            <button
                class="save font-heading-regular"
                on:click={saveEntry}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" fill="#FF6A8E"/>
                </svg>
                Save
            </button>
        </div>
    </div>
{/if}
