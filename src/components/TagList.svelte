<ul>
    <li class="inline-block mr-2">
        <a href="/tags">Tous</a>
    </li>
    {#each data as tag}
        <li class="inline-block mr-2">
            <a href={'/tags/'+tag.urlSafeName}>#{tag.name}</a>
        </li>
    {/each}
</ul>

<script>
    import {logs, parseTags} from "../libs/stores.js";
    $: tags = $logs.reduce((tags, log) => {
        return [...new Set([...tags, ...parseTags(log.summary)])];
    }, []);
    $: data = tags.map((t) => ({name: t, urlSafeName: encodeURIComponent(t)}));
</script>
