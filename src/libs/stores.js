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
export const parseTags = (text) => {
    return [...new Set([...text.matchAll(/#([a-zA-Z0-9\-–]*)/g)].map(t => t[1]))]
}

export const groupTags = (items) => {
    return Object.values(items.reduce((all, item) => {
        const itemTags = parseTags(item.summary);
        return {...all, ...Object.fromEntries(itemTags.map(t => [t, {
            ...all[t],
            label: t,
            items: [...(all[t]?.items ?? []), item].sort((a, b) => b.date < a.date ? -1 : 1)
        }]))};
    }, []));
}


const storageLogs = [...JSON.parse(browser ? window.localStorage.getItem('logs') ?? "[]" : "[]")];
export const logs = writable(storageLogs);

logs.subscribe(val => {
    if (browser) {
        window.localStorage.setItem('logs', JSON.stringify(val))
    }
});
