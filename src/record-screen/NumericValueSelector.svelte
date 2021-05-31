<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import type { NumericField } from '../tracking-screen/trackers'

    export let selectedValue: number
    export let field: NumericField

    const dispatch = createEventDispatcher()
    function valueSelected(value: number) {
        if (isNaN(value)) {
            return
        }
        dispatch('valueSelected', value)
    }

    let fraction: number
    $: fraction = (selectedValue - field.min) / (field.max - field.min)

    function decrement() {
        if (selectedValue - field.step >= field.min) {
            selectedValue -= field.step
        } else {
            selectedValue = field.min
        }
    }
    function increment() {
        if (selectedValue + field.step <= field.max) {
            selectedValue += field.step
        } else {
            selectedValue = field.max
        }
    }

    let inputValue: string
    $: inputValue = selectedValue.toString()
    $: if (isValid(inputValue)) valueSelected(parseInt(inputValue))

    function isValid(input: string): boolean {
        if (!input.match(/^[-+]?[\d]+$/)) return false
        const value = parseInt(input)
        return value >= field.min && value <= field.max
    }
</script>

<style lang="scss">
  @import "src/style-helpers/focus";
  .selector {
    margin-top: 8px;
    position: relative;
    background: var(--color-surface04dp);
    border-radius: 8px;
    width: 100%;
    overflow: hidden;
  }
  .fill-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 50%;
    bottom: 0;
    background: var(--color-primary);
    opacity: .3;
  }
  .controls {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;

    input[type="text"] {
      padding: 8px;
      background: none;
      width: 80px;
      text-align: end;
      font-size: 24px;
    }
    .unit {
      font-size: 24px;
    }

    > button {
      flex-grow: 1;
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity .2s;
      font-size: 32px;
      border-radius: 8px;
      @include focus-border();

        &:last-child {
          margin-left: 12px;
        }
      &:focus, &:hover {
        opacity: 1;
      }
    }
  }
</style>

<div class="selector">
    <div class="fill-background" style="right: {(1 - fraction) * 100}%"></div>
    <div class="controls">
        <button
            on:click={decrement}
        >
            -
        </button>
        <input
            type="text"
            class="font-body-bold"
            class:validation-failed={!isValid(inputValue)}
            bind:value="{inputValue}"
        />
        <div class="unit font-body-bold">{field.unit}</div>
        <button
            on:click={increment}
        >
            +
        </button>
    </div>
</div>
