<input type="checkbox" id="display-settings" class="modal-toggle" />
<label for="display-settings" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
        <h3 class="text-lg font-bold">Display settings</h3>
        <hr/>
        <div class="form-control">
            <label class="cursor-pointer label" for="hide-futur">
                <input type="checkbox" id="hide-futur" class="checkbox" bind:checked={hideFutur}/>
                <span class="label-text">Masquer les événements du futur</span>
            </label>
        </div>
    </label>
</label>
<div class="flex items-center">
    <div class="text-center flex-1">
        {#if futurCount > 0 && hideFutur}
            <label for="hide-futur" class="cursor-pointer">Afficher les événement futurs ({futurCount})</label>
        {:else}
            <label for="hide-futur" class="cursor-pointer">Masquer les événement futurs ({futurCount})</label>
        {/if}
    </div>
    <div class="text-right">
        <label class="btn btn-sm" for="display-settings"><Cog/></label>
    </div>
</div>
{#each groupedLogs as day}
    <div class="dayname">
        <h2>{day.label}</h2>
        <hr/>
    </div>
    <ul>
        {#each day.items as item}
            <li>
                <LogLine {...item} on:edit={ev => save(ev.detail)}>
                    <div slot="lineEnd" class="inline-flex">
                        <button class="btn btn-xs btn-primary btn-square" on:click={() => edit(item)}>
                            {#if item.editable}
                                <PencilSquare/>
                            {:else}
                                <Pencil/>
                            {/if}

                        </button>
                        <button class="btn btn-xs btn-error btn-square" on:click={() => confirm('Êtes-vous sûr ?') ? removeItem(item): null}>
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>
                    </div>
                </LogLine>
            </li>
        {/each}
    </ul>
{/each}

<script>
    import {logs, groupDays, groupTags, parseTags} from "../libs/stores.js";
    import dayjs from '../libs/dayjs.js'
    import LogLine from "./LogLine.svelte";
    import { navigating } from '$app/stores';
    import Cog from "./icons/Cog.svelte";
    import PencilSquare from "./icons/PencilSquare.svelte";
    import Pencil from "./icons/Pencil.svelte";

    export let tags = ['all'];
    export let groupBy = 'day';
    export let hideFutur = true;
    let futurCount = 0;

    const filterLogs = () => {
        let filtered = $logs;
        if (tags.length > 0 && !tags.includes('all')) {
            filtered = [...$logs].filter(l => tags.filter(t => parseTags(l.summary).includes(t)).length > 0);
        }
        futurCount = filtered.filter(l => dayjs(l.date).isAfter(dayjs(), 'day')).length;

        if (hideFutur) {
            filtered = filtered.filter(l => !dayjs(l.date).isAfter(dayjs(), 'day'))
        }
        return filtered;
    }
    let filteredLogs = filterLogs();
    let groupedLogs = [];
    $: hideFutur ? filteredLogs = filterLogs() : filteredLogs = filterLogs()
    $: {
        if (groupBy === 'tag') {
            groupedLogs = groupTags(filteredLogs);
        }
        else if (groupBy === 'day') {
            groupedLogs = groupDays(filteredLogs);
        }
        else {
            groupedLogs = groupDays(filteredLogs);
        }
    }

    $: if (!$navigating) {
        filteredLogs =  filterLogs();
        groupedLogs = groupDays(filteredLogs);
    }
    logs.subscribe(val => {
        filteredLogs =  filterLogs();
        groupedLogs = groupDays(filteredLogs);
    })

    let days = [];
    const edit = (item) => {
        const index = $logs.findIndex(i => i.uuid === item.uuid);
        if (index !== -1) {
            const item = $logs[index];
            console.log(item);
            item.editable = true;
            $logs.splice(index, 1, item);
            logs.set($logs)
        }
    }

    const save = (itemToSave) => {
        const index = $logs.findIndex(i => i.uuid === itemToSave.uuid);
        console.log(`saving item ${itemToSave.uuid} at index ${index}`)
        if (index !== -1) {
            const item = {...$logs[index], ...itemToSave};
            $logs.splice(index, 1, item);
            logs.set($logs)
        }
    }

    const removeItem = (item) => {
        const index = $logs.findIndex(i => i.uuid === item.uuid);
        console.log(`removing item ${item.uuid} at index ${index}`)
        if (index !== -1) {
            $logs.splice(index, 1);
            logs.set($logs);
        }
    }
</script>
<style>
    .dayname {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }
    .dayname hr{
        margin-left: 2rem;
        flex: auto;
    }
</style>
