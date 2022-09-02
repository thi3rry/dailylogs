import {writable} from "svelte/store";
import { browser } from '$app/environment';
import dayjs from '../libs/dayjs.js';
export const groupDays = (items) => {
    return Object.values(items.reduce((all, item) => {
        const day = all[dayjs(item.date).format('YYYY-MM-DD')] || {
            label: dayjs(item.date).format('dddd DD MMMM'),
            date: dayjs(item.date).format('YYYY-MM-DD'),
            items: []
        };
        all[dayjs(item.date).format('YYYY-MM-DD')] = {
            ...day,
            items: [...day.items, item].sort((a, b) => b.date < a.date ? -1 : 1)
        };
        return all;
    }, []));
}


const storageLogs = [...JSON.parse(browser ? window.localStorage.getItem('logs') ?? "[]" : "[]")];
export const logs = writable(storageLogs);
export let logsByDays = writable(groupDays(storageLogs));

logs.subscribe(val => {
    if (browser) {
        window.localStorage.setItem('logs', JSON.stringify(val))
    }
    logsByDays.set(groupDays(val));
});
