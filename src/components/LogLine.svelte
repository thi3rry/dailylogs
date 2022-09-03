<div class="relative">

    <button class="btn btn-xs btn-warning" style="--btn-text-case: none;" on:click|preventDefault={debug}>#{uuid}</button>
    <span class="time">{formattedDate}</span>
    {#if details}
        <details>
            <summary><span class="summary">{summary}</span></summary>
            <p>{details}</p>
            {#if endDate}
                <p>{formattedEndDate}</p>
            {/if}
        </details>
    {:else}
        <span class="summary">{summary}</span>
    {/if}

    <input type="checkbox" id={`item-edit-line-${uuid}`} class="modal-toggle" bind:checked={editable} on:change={() => dispatch('edit', {uuid, editable: false})} />
    {#if editable}
        <label for={`item-edit-line-${uuid}`} class="modal cursor-pointer">
            <label class="modal-box relative" for="">
                <h3 class="text-lg font-bold">Edit item #{uuid}</h3>
                <hr/>
                <form on:submit|preventDefault={() => dispatch('edit', {summary: editSummary, editable: false, uuid, date: editDate})}>
                    <div class="form-group flex items-start justify-around">
                        <label for="edit-summary-{uuid}" class="label w-1/2">
                            <span class="label-text">Summary</span>
                        </label>
                        <textarea autofocus id="edit-summary-{uuid}" cols="30" rows="10" class="textarea textarea-bordered" bind:value={editSummary}></textarea>
                    </div>
                    <div class="form-group flex">
                        <label for="edit-date-{uuid}" class="label w-1/2">Date</label>
                        <input type="datetime-local" class="input input-bordered" id="edit-date-{uuid}" bind:value={editDate} />
                    </div>
                    <button class="btn">Save</button>
                </form>
            </label>
        </label>

    {/if}
    <div class="absolute inset-y-0 right-0">

        {#if tags.length > 0}
            {#each tags as tag}
            <a class="badge" href={'/tags/'+tag}>#{tag}</a>
            {/each}
        {/if}
        <slot name="lineEnd"></slot>
    </div>
</div>

<script>
import dayjs from '../libs/dayjs.js';
import {createEventDispatcher} from "svelte";
import {parseTags} from '../libs/stores.js';
export let date = null;
export let editable = false;
export let summary = '';
export let details = undefined;
export let type = undefined;
export let endDate = undefined;
export let uuid;
export let editSummary = '';
export let editDate = '';
const dispatch = createEventDispatcher();

$: if (editable && editSummary === '') {
    editSummary = summary;
    editDate = dayjs(date).format('YYYY-MM-DD HH:mm');
}

const debug = () => {
    alert(JSON.stringify($$props, null, '  '))
}

let formattedDate;
let formattedEndDate;
$: isMultiday = !dayjs(date).isSame(endDate, 'day')
$: {
    if (endDate) {
        formattedEndDate = `${dayjs(endDate).format('YYYY-MM-DD HH[h]mm:ss')}`;
        if (isMultiday) {
            formattedDate = `${dayjs(date).format('HH[h]mm')} - ${dayjs(endDate).format('YYYY-MM-DD HH[h]mm')}`;

        }
        else {
            formattedDate = `${dayjs(date).format('HH[h]mm')} - ${dayjs(endDate).format('HH[h]mm')}`;
        }
    }
    else {
        formattedDate = `${dayjs(date).format('HH[h]mm:ss')}`;
    }
}

$: tags = parseTags(summary);
</script>
<style>
    .time { display: inline-block; min-width: 6rem;}
    details{ display: inline}
    details[open] {
        display: block;
    }
</style>
