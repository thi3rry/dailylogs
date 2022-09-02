<script>
    import dayjs from "../libs/dayjs.js";
    import {uuid} from "../libs/uuid.js";
    import {logs} from "../libs/stores.js";

    export let defaultTag = '';
    export let summary = '';
    export let items;
    export let submit;
    const addItem = () => {
        let tag = '';
        if (summary === '') return;
        if (defaultTag !== '') {
            tag = ' #'+defaultTag
        }
        else {
            tag = '';
        }
        logs.set([...$logs, {
            uuid: uuid(),
            summary: summary + tag,
            date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }]);
        summary = '';
    }
</script>
<form class="add" on:submit|preventDefault>
    <input bind:value={summary} class="input input-bordered input-md w-full max-w-xs" />
    <button on:click={addItem} class="btn">+ Ajouter</button>
</form>
