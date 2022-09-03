<script>
    import dayjs from "../libs/dayjs.js";
    import {uuid} from "../libs/uuid.js";
    import {logs} from "../libs/stores.js";

    export let defaultTag = '';
    export let summary = '';
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
<form class="add container mx-auto" on:submit|preventDefault={addItem}>
    <div class="w-1/2 mx-auto">
        <input bind:value={summary} class="input input-bordered input-md w-full" placeholder="Summary" />

    </div>
</form>
