<script>
    import {onMount} from "svelte";

    export const ssr = false;
    let items = []
    let newKey = '';
    let newValue = '';

    const addItem = () => {
        if (newKey === '' || newValue === '') return;
        if (localStorage.getItem(newKey) && !confirm('This key already exist, do yout want to overwrite it ?')) {
            return;
        }
        localStorage.setItem(newKey, newValue);
        loadItems();
    }
    const loadItems = () => {
        items = [];
        for (var i = 0; i < localStorage.length; i++) {
            items = [...items, {
                index: i,
                key: localStorage.key(i),
                value: localStorage.getItem(localStorage.key(i))
            }]
        }
    };

    const removeItem = (key) => {
        localStorage.removeItem(key);
        loadItems();
    }

    export function refresh() {
        loadItems();
    }
    onMount(loadItems)

</script>
<h2>
    LocalStorage
    <button class="btn btn-xs" on:click={() => loadItems()}>Refresh</button>
</h2>
<div class="overflow-x-auto">
    <table class="table w-full">
        <!-- head -->
        <thead>
        <tr>
            <th>#</th>
            <th>Key</th>
            <th>Value</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {#each items as item}
            <tr>
                <th>{item.index}</th>
                <td>{item.key}</td>
                <td>{item.value}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn">Edit</button>
                        <button class="btn" on:click={() => removeItem(item.key)}>Remove</button>
                    </div>
                </td>
            </tr>
        {/each}
        <tr>
            <th>New {items.length}</th>
            <td><input class="input w-full max-w-xs" bind:value={newKey} /></td>
            <td><input class="input w-full max-w-xs" bind:value={newValue} /></td>
            <td>
                <button class="btn" on:click={() => addItem()}>Add</button>
            </td>
        </tr>
        </tbody>
    </table>
</div>
