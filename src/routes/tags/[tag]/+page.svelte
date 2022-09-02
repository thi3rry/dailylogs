<AddForm defaultTag={data.tag} />
<LogList tags={[data.tag]}/>
<a href="/">Plus de tags</a>
<script context="module">
    /** @type {import('./$types').PageLoad} */
    export function load({ params }) {
        return {
            tag: params.tag ?? 'all'
        };
    }

</script>
<script>
    import LogList from "../../../components/LogList.svelte";
    import AddForm from "../../../components/AddForm.svelte";
    import { navigating } from '$app/stores';

    /** @type {import('./$types').PageData} */
    export let data;
    let tags = [];
    $: if (!$navigating) {
        tags = ['all']
    }
    else {
        tags = [data.tag]
    }

</script>
