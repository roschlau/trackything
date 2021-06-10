<script lang="ts">
    import { useNavigate } from 'svelte-navigator'
    import { deleteMainDB } from '../data/db-migration'

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
</script>

<style lang="scss">
  @import "src/style-helpers/focus";
  .settings {
    display: flex;
    flex-direction: column;
    padding: 16px;
    justify-content: center;
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
  }

  .destructive {
    color: var(--color-error);
  }
</style>

<h1>Settings</h1>
<div class="settings">
    <button
        class="action destructive"
        on:click={deleteData}
    >
        Delete Data
    </button>
</div>
