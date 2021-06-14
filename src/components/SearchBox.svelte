
<script lang="ts">
  export let value: string
</script>

<style lang="scss">
  .search {
    position: relative;
    width: 100%;
    flex-grow: 1;
    height: 48px;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    color: var(--color-text-secondary);

    > input {
      width: 0;
      flex-grow: 1;
      padding-left: 48px;
      font-size: 18px;
      font-weight: 300;
    }

    > .icon {
      position: absolute;
      bottom: 50%;
      transform: translateY(50%);
      left: 12px;
      pointer-events: none;
    }
  }
</style>

<div class="search">
    <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
            fill="white" fill-opacity="0.6"/>
    </svg>
    <input
        type="text"
        placeholder="Search"
        bind:value
    />
</div>
