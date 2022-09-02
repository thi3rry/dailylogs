<div data-theme="lofi">
    <header>
        <Navigation/>
    </header>

    <main class="content">
        <slot></slot>
    </main>

    <Footer/>

</div>

<script>
    import "../app.css";
    import Navigation from "../components/Navigation.svelte";
    import Footer from "../components/Footer.svelte";
</script>
<style>
    h1 {
        text-align: center;
    }
    main {
        max-width: 800px;
        margin: auto;
    }
</style>
