<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import MoodIcon from './MoodIcon.svelte'

    export let selectedValue: number
    const dispatch = createEventDispatcher()

    function moodSelected(mood: number) {
        dispatch('moodSelected', mood)
    }
</script>

<style lang="scss">
  @import "src/style-helpers/focus";
  ul {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .mood-button {
    padding: 10px;
    @include focus-border();
    border-radius: 8px;
  }
</style>

<ul>
    {#each [0, 1, 2, 3, 4] as i}
        <li>
            <button class="mood-button" on:click={() => moodSelected(i)}>
                <MoodIcon value="{i}" selected="{i === selectedValue}"/>
            </button>
        </li>
    {/each}
</ul>
