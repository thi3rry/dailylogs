<script>
    import LocalStorageExplorator from "./LocalStorageExplorator.svelte";
    export let id;
    export let opened = false;
    let localStorageExplorator;
    $: if (opened) localStorageExplorator?.refresh();
</script>

<slot>
    <label for={id} class={$$props.class}>debug</label>
</slot>
<input type="checkbox" id={id} class="modal-toggle" bind:checked={opened} />
<label for={id} class="modal cursor-pointer">
    <label class="modal-box relative" for="">
        <h3 class="text-lg font-bold">Devel modal</h3>
        <hr>
        <LocalStorageExplorator bind:this={localStorageExplorator}/>
    </label>
</label>
