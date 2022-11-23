<script>
  import Eager from "$lib/components/Eager.svelte";
  import IconMenu from "$lib/components/icons/IconMenu.svelte";
</script>

<Eager>
  <nav>
    <h1>Hello there</h1>
  </nav>
</Eager>

<div class="icon-menu"><IconMenu /></div>

<div class="container" />

<style>
  nav {
    background-color: #69f;
    height: 60px;
    padding-left: 60px;
  }
  .container {
    height: 300vh;
    width: 700px;
    margin: 0 auto;
    background-color: #ccc;
  }

  .icon-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 36px;
    /* mix-blend-mode: difference; */
    cursor: pointer;
    border-radius: 100%;
    padding: 6px;
    margin: 4px;
    width: 36px;
    box-sizing: border-box;
    transition: 0.1s;
  }

  .icon-menu:hover {
    background-color: #eee;
  }
</style>
