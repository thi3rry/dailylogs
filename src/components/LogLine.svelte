<button class="btn btn-xs btn-warning" on:click|preventDefault={debug}>debug</button>
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
<script>
import dayjs from '../libs/dayjs.js';
export let date = null;
export let summary = '';
export let details;
export let type;
export let endDate = undefined;

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
</script>
<style>
    .time { display: inline-block; min-width: 6rem;}
    details{ display: inline}
    details[open] {
        display: block;
    }
</style>
