<ul class="mt-5 text-center">
    <li class="inline-block mr-2">
        <a href="/tags">Tags</a>
    </li>
    {#each data as tag}
        <li class="inline-block mr-2">
            <a href={'/tags/'+tag.urlSafeName} class="badge badge-accent">#{tag.name}</a>
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
