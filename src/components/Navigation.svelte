<script>
    import MainMenu from "./MainMenu.svelte";
    import DevelModal from "./dev/DevelModal.svelte";
</script>

<div class="navbar bg-base-100">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <MainMenu tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" />
        </div>
        <a class="btn btn-ghost normal-case text-xl" href="/">DailyLogs</a>
    </div>
    <div class="navbar-center hidden lg:flex">
        <MainMenu class="menu menu-horizontal p-0"/>
    </div>
    <div class="navbar-end">
        <DevelModal id="dev-modal">
            <label for="dev-modal" class="link link-hover font-mono px-2">debug</label>
        </DevelModal>
    </div>
</div>
<style>
    ul li {
        display: inline-block;
        margin-right: 1rem;
    }
    ul li:last-child { margin-right: 0; }
</style>
