<AddForm items={items} />
{#each days as day}
    <div class="dayname">
        <h2>{day.label}</h2>
        <hr/>
    </div>
    <ul>
        {#each day.items as item}
            <li>
                <LogLine {...item}/>
                <button class="btn btn-xs" on:click={removeItem(item)}>x</button>
            </li>
        {/each}
    </ul>
{/each}


<script>
import LogLine from "../components/LogLine.svelte";
import dayjs from "../libs/dayjs.js";
import {writable} from 'svelte/store';
import {uuid} from "../libs/uuid.js";
import DateTimeInput from "../components/DateTimeInput.svelte";
import CurrentTimeCountDown from "../components/CurrentTimeCountDown.svelte";
import AddForm from "../components/AddForm.svelte";
/** @type {import('./$types').PageData} */
export let data;

const items = writable([...data.items]);

let days = [];

const groupDays = (items) => {
    days = Object.values(items.reduce((all, item) => {
        const day = all[dayjs(item.date).format('YYYY-MM-DD')] || {
            label: dayjs(item.date).format('dddd DD MMMM'),
            date: dayjs(item.date).format('YYYY-MM-DD'),
            items: []
        };
        all[dayjs(item.date).format('YYYY-MM-DD')] = {
            ...day,
            items: [...day.items, item]
        };
        return all;
    }, []));
}

groupDays($items)

items.subscribe(val => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('logs', JSON.stringify(val))
    }
    groupDays(val);
});



const removeItem = (item) => {
    const index = $items.findIndex(i => i.uuid === item.uuid);
    console.log(`removing item ${item.uuid} at index ${index}`)
    if (index !== -1) {
        $items.splice(index, 1);
        items.set($items)
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
