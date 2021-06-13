<script lang="ts">
    import { useNavigate } from 'svelte-navigator'
    import { deleteMainDB, persistentStorageGranted } from '../data/idb'
    import { trackersStore } from '../data/stores'
    import { exportFromStore, importFromFile } from '../data/backup'

    const navigate = useNavigate()

    function deleteData() {
        if (window.confirm('This will irrevocably delete all locally stored data.')) {
            localStorage.setItem('reset', 'yes')
            location.reload()
        }
    }

    if (localStorage.getItem('reset')) {
        localStorage.clear()
        deleteMainDB().then(() => {
            navigate('/')
        })
    }

    function exportData() {
        const exportObject = exportFromStore(trackersStore)
        const file = new Blob([JSON.stringify(exportObject)], { type: 'application/json' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(file)
        const time = new Date().getTime()
        link.download = 'trackything_export_' + time + '.json'
        link.click()
    }

    async function importData() {
        await importFromFile()
        navigate(-1)
    }
</script>

<style lang="scss">
  @import "src/style-helpers/focus";

  .settings {
    display: grid;
    padding: 16px;
    grid-gap: 16px;
  }

  .alert {
    border-radius: 8px;
    border: 1px solid var(--color-error);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    font-size: 14px;
    color: var(--color-error);

    > svg {
      margin-right: 12px;
      flex-shrink: 0;
    }
  }

  .action-row {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: 16px;
  }

  .action {
    padding: 16px;
    border-radius: 8px;
    background: var(--color-surface04dp);
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    @include focus-border;

    > svg {
      margin-right: 12px;
    }
  }

  .destructive {
    color: var(--color-error);
  }
</style>

<h1>Settings</h1>
<div class="settings">
    {#if !persistentStorageGranted}
        <div class="alert font-body-bold">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM12 2C6.47 2 2 6.5 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V2ZM12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20V20Z"
                    fill="#FB5E5E"/>
            </svg>
            Persistent storage permission not granted. Your data might not be safe from eviction.
        </div>
    {/if}
    <div class="action-row">
        <button
            class="action"
            on:click={exportData}
        >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                    <path
                        d="M12.5 3.5C8.08 3.5 4.5 5.29 4.5 7.5C4.5 9.71 8.08 11.5 12.5 11.5C13 11.5 13.5 11.47 14 11.42V10H16.89L15.89 9L19.4 5.5C18 4.3 15.44 3.5 12.5 3.5ZM19.42 7.58L18 9L20.5 11.5H15.5V13.5H20.5L18 16L19.42 17.42L24.34 12.5L19.42 7.58ZM4.5 9.5V12.5C4.5 14.71 8.08 16.5 12.5 16.5C13.67 16.5 14.76 16.35 15.75 16.13L16.88 15H14V13.42C13.5 13.47 13 13.5 12.5 13.5C8.08 13.5 4.5 11.71 4.5 9.5ZM4.5 14.5V17.5C4.5 19.71 8.08 21.5 12.5 21.5C15.44 21.5 18 20.7 19.4 19.5L17.5 17.6C16.11 18.16 14.4 18.5 12.5 18.5C8.08 18.5 4.5 16.71 4.5 14.5Z"
                        fill="white" fill-opacity="0.87"/>
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" transform="translate(0.5 0.5)"/>
                    </clipPath>
                </defs>
            </svg>
            Export
        </button>
        <button
            class="action"
            on:click={importData}
        >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                    <path
                        d="M12.5 3.5C9.09 3.5 6.19 4.57 5.04 6.07L10.29 11.32C11 11.43 11.72 11.5 12.5 11.5C16.92 11.5 20.5 9.71 20.5 7.5C20.5 5.29 16.92 3.5 12.5 3.5ZM4.42 7.58L3 9L5.5 11.5H0.5V13.5H5.5L3 16L4.42 17.42L9.34 12.5L4.42 7.58ZM20.5 9.5C20.5 11.71 16.92 13.5 12.5 13.5C11.84 13.5 11.2 13.45 10.59 13.37L8.12 15.84C9.38 16.25 10.88 16.5 12.5 16.5C16.92 16.5 20.5 14.71 20.5 12.5V9.5ZM20.5 14.5C20.5 16.71 16.92 18.5 12.5 18.5C10.22 18.5 8.17 18 6.71 17.25L5.03 18.93C6.18 20.43 9.09 21.5 12.5 21.5C16.92 21.5 20.5 19.71 20.5 17.5"
                        fill="white" fill-opacity="0.87"/>
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" transform="translate(0.5 0.5)"/>
                    </clipPath>
                </defs>
            </svg>
            Import
        </button>
    </div>
    <button
        class="action destructive"
        on:click={deleteData}
    >
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.5 19.5C6.5 20.0304 6.71071 20.5391 7.08579 20.9142C7.46086 21.2893 7.96957 21.5 8.5 21.5H16.5C17.0304 21.5 17.5391 21.2893 17.9142 20.9142C18.2893 20.5391 18.5 20.0304 18.5 19.5V7.5H6.5V19.5ZM8.96 12.38L10.37 10.97L12.5 13.09L14.62 10.97L16.03 12.38L13.91 14.5L16.03 16.62L14.62 18.03L12.5 15.91L10.38 18.03L8.97 16.62L11.09 14.5L8.96 12.38ZM16 4.5L15 3.5H10L9 4.5H5.5V6.5H19.5V4.5H16Z"
                fill="#FB5E5E"/>
        </svg>
        Delete Data
    </button>
</div>
