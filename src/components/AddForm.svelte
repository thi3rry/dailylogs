<script>
    import DateTimeInput from "./DateTimeInput.svelte";
    import dayjs from "../libs/dayjs.js";
    import {uuid} from "../libs/uuid.js";
    export let newItem = '';
    export let newItemDetails = '';
    export let newItemHasEndDate = false;
    export let newItemEndDate = null;
    export let newItemDate = dayjs().format('YYYY-MM-DD HH:mm');
    export let dateInput;
    export let items;
    export let submit;
    export let addDetails;
    const addItem = () => {
        if (!addDetails) {
            newItemDate = dayjs().format('YYYY-MM-DD HH:mm');
        }
        items.set([...$items, {
            uuid: uuid(),
            summary: newItem,
            details: newItemDetails,
            date: newItemDate,
            endDate: newItemEndDate,
        }]);
        newItem = '';
        newItemDate = dayjs().format('YYYY-MM-DD');
        newItemEndDate = '';
        newItemDetails = '';
        dateInput.reset();
    }
</script>
<form class="add" on:submit|preventDefault>
    <input bind:value={newItem} class="input input-bordered input-md w-full max-w-xs" />
    <button on:click={addItem} class="btn">+ Ajouter</button>
    <details bind:open={addDetails}>
        <summary>Détails</summary>
        <div>
            <p>
                <DateTimeInput label="Date" bind:this={dateInput} bind:value={newItemDate} date={newItemDate}/>
            </p>

            <div class="">
                <label><input bind:checked={newItemHasEndDate} type="checkbox"> Date de fin</label>
                {#if newItemHasEndDate}
                    <DateTimeInput label="Date de fin" bind:value={newItemEndDate}/>

                {/if}

            </div>
            <p class="form-control w-full">
                <label for="details" class="label">
                    <span class="label-text">Détails</span>
                </label>
                <textarea bind:value={newItemDetails} class="textarea textarea-bordered" name="details" id="details" cols="30" rows="10"></textarea>
            </p>
        </div>

    </details>
</form>
