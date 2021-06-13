<script lang="ts">
    import type { TrackerMeta, TrackerMetaUpdate } from '../data/trackers'
    import { primaryColor } from '../style-helpers/primary-color'
    import { navigate } from 'svelte-navigator'
    import { trackersStore } from '../data/stores'
    import { generateId } from '../data/idb'

    let tracker: TrackerMetaUpdate = {
        trackerId: generateId(),
        name: '',
        color: 'pink',
        mainField: {
            name: '',
            unit: '',
            min: 0,
            max: 20,
            default: 10,
            step: 1,
        },
        tags: [],
    }

    const defaultValid = (tracker: TrackerMeta) =>
        tracker.mainField.default >= tracker.mainField.min
        && tracker.mainField.default <= tracker.mainField.max

    const minMaxValid = (tracker: TrackerMeta) =>
        tracker.mainField.min <= tracker.mainField.max

    const formValid = (tracker: TrackerMeta) =>
        !!tracker.name
        && !!tracker.mainField.name
        && minMaxValid(tracker)
        && defaultValid(tracker)

    function discard() {
        navigate(-1)
    }

    async function saveTracker() {
        await trackersStore.addTracker(tracker)
        navigate(-1)
    }
</script>

<style lang="scss">
  @import "src/style-helpers/focus";

  .screen {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .field {
    padding: 0 16px;
    margin-bottom: 24px;

    .field-name {
      font-size: 14px;
      color: var(--color-text-secondary);
      margin-bottom: 12px;
    }

    .color-selector {
      display: flex;
      flex-direction: row;

      .color + .color {
        margin-left: 12px;
      }

      .color {
        height: 48px;
        flex-basis: 0;
        flex-grow: 1;
        border-radius: 8px;
        color: transparent;
        opacity: .3;
        transition: opacity .2s;
        @include focus-border();

        input[type='radio'] {
          opacity: 0;
        }

        &.selected {
          opacity: 1;
        }
      }
    }

    input[type='text'], input[type='number'] {
      width: 100%;
      @include focus-border()
    }
  }

  .field-row {
    padding: 0 16px;
    display: flex;
    flex-direction: row;

    .field + .field {
      margin-left: 12px;
    }

    .field {
      padding: 0;
      flex-basis: 0;
      flex-grow: 1;
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

      &:disabled {
        opacity: .5;
      }
    }
  }
</style>

<div
    class="screen"
    use:primaryColor={tracker.color}
>
    <h1>New Tracker</h1>
    <div class="field">
        <div class="field-name">Tracker Name</div>
        <input
            type="text"
            bind:value={tracker.name}
        />
    </div>
    <div class="field">
        <div class="field-name">Color</div>
        <div class="color-selector">
            {#each ['pink', 'teal', 'peach', 'blue'] as color}
                <label
                    class="color"
                    class:selected={tracker.color === color}
                    style="background: var(--color-{color})"
                >
                    <input type="radio" bind:group="{tracker.color}" value="{color}"/>
                    {color.toUpperCase()}
                </label>
            {/each}
        </div>
    </div>
    <div class="field-row">
        <div class="field" style="flex-grow: 3">
            <div class="field-name">Main Field Name</div>
            <input type="text" bind:value={tracker.mainField.name}>
        </div>
        <div class="field" style="flex-grow: 1">
            <div class="field-name">Unit</div>
            <input
                type="text"
                placeholder="none"
                bind:value={tracker.mainField.unit}
                style="text-align: center"
            >
        </div>
    </div>
    <div class="field-row">
        <div class="field">
            <div class="field-name">Minimum Value</div>
            <input
                type="number"
                bind:value={tracker.mainField.min}
                class:validation-failed={!minMaxValid(tracker)}
            >
        </div>
        <div class="field">
            <div class="field-name">Maximum Value</div>
            <input
                type="number"
                bind:value={tracker.mainField.max}
                class:validation-failed={!minMaxValid(tracker)}
            >
        </div>
    </div>
    <div class="field-row">
        <div class="field">
            <div class="field-name">Default Value</div>
            <input
                type="number"
                bind:value={tracker.mainField.default}
                class:validation-failed={!defaultValid(tracker)}
            >
        </div>
        <div class="field">
            <div class="field-name">Step Size</div>
            <input type="number" bind:value={tracker.mainField.step}>
        </div>
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
            Discard
        </button>
        <button
            class="save font-heading-regular"
            disabled="{!formValid(tracker)}"
            on:click={saveTracker}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"/>
            </svg>
            Create
        </button>
    </div>
</div>
