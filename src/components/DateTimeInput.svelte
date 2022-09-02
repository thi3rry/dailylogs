<div class="form-control w-full max-w-xs ">
    <div class="label">
        <label class="label-text" for={dateId}>{label}</label>
        <span class="label-text-alt">
            <label on:click={() => setTimeout(() => timeInput?.focus())}>
                <input type="checkbox" bind:checked={hasTime} /> Définir une heure

            </label>

        </span>
    </div>
    <div>
        <input type="date" class="input input-bordered max-w-xs" bind:value={date} on:input={inputDate} on:change={change} name={dateId} id={dateId} />

        {#if hasTime}
            <input bind:this={timeInput} type="time" class="input input-bordered max-w-xs" bind:value={time} on:input={inputTime} on:change={change} name={timeId} id={timeId} />
        {/if}

    </div>
</div>




<script>
import {createEventDispatcher} from 'svelte';
import {uuid} from '../libs/uuid.js';
import dayjs from "../libs/dayjs.js";
export let id = uuid();
let timeInput;
$: dateId = `${id}-date`;
$: timeId = `${id}-time`;
export let label = 'Date';
export let date;
export let time = null;
export let value = null;
let hasTime = false;

$: dateOnly = dayjs(date).format('YYYY-MM-DD');

const dispatch = createEventDispatcher()

const inputDate = (ev) => {
console.log('input date', ev);
    date = ev.target.value;
}
const inputTime = (ev) => {
    time = ev.target.value;
}
const change = (ev) => {
    let date$ = dayjs();
    if (hasTime) {
        date$ = dayjs(`${date} ${time}`);
    }
    else {
        date$ = dayjs(`${date}`);
    }
    if (date$.isValid()) {
        value = dayjs(`${date} ${time}:00`).format();
        console.log('change value', value, date, time);
        dispatch('change', value);
    }
}

export function reset() {
    value = null;
}

</script>
