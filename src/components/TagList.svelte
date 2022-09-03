<ul>
    <li class="inline-block mr-2">
        <a href="/tags">Tous</a>
    </li>
    {#each tags as tag}
        <li class="inline-block mr-2">
            <a href={'/tags/'+tag}>#{tag}</a>
        </li>
    {/each}
</ul>

<script>
    import {logs} from "../libs/stores.js";
    import {parseTags} from '../components/LogLine.svelte'
    $: tags = $logs.reduce((tags, log) => {
        return [...new Set([...tags, ...parseTags(log.summary)])];
    }, []);
</script>
