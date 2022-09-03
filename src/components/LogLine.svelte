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
export let summary = '';
export let details;
export let type;
export let endDate = undefined;
export let uuid;

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
