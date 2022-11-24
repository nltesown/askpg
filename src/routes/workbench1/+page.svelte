<script>
  import IconAdjustments from "$lib/components/icons/IconAdjustments.svelte";
  import IconMenu from "$lib/components/icons/IconMenu.svelte";
  import IconFilter from "$lib/components/icons/IconFilter.svelte";
  // import OffCanvas from "$lib/components/OffCanvas.svelte";
  import Eager from "$lib/components/Eager.svelte";

  let open = false;

  function toggle() {
    console.log("Toggle!");
    open = !open;
  }
</script>

<!-- <nav /> -->
<Eager><nav /></Eager>

<div class="container">
  <p>And this is where it all began.</p>
  <p>Once upon a time there was.</p>
</div>

<div class="tools">
  <button on:click={toggle}><IconMenu /></button>
  <button><IconFilter /></button>
  <button><IconAdjustments /></button>
</div>

<div class="off-canvas" class:open />

<style>
  :global(body) {
    position: relative;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%),
      linear-gradient(-45deg, #eee 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #eee 75%),
      linear-gradient(-45deg, transparent 75%, #eee 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    height: 300vh;
  }

  nav {
    position: sticky;
    top: 0;
    height: 48px;
    background-color: #369;
    z-index: 2000;
  }

  .tools {
    position: fixed;
    top: 48px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 60px;
    outline: solid 1px red;
    z-index: 1000;
  }

  button {
    display: block;
    flex: 0 0 auto;
    width: 60px;
    height: 60px;
    padding: 14px;
    border: none;
    /* border-radius: 100px; */
    background-color: transparent;
    cursor: pointer;
    transition: 0.1s;
    outline: solid 1px blue;
  }

  button > :global(svg) {
    stroke: #444;
  }

  button:hover > :global(svg) {
    stroke: #000;
  }

  /* Sur Firefox mobile, un bug décrit ici : https://stackoverflow.com/questions/67161825/what-is-the-problem-about-fixed-position-in-firefox-mobile */
  .off-canvas {
    position: fixed;
    top: 0;
    height: 100vh;
    /* top: 48px;
    height: calc(100vh - 49px); */
    left: 0;
    width: 350px;
    max-width: 65%;
    background-color: greenyellow;
    transition: 0.15s;
    transition-timing-function: ease-in-out;
    transform: translateX(-100%);
    z-index: 999;
  }

  .off-canvas.open {
    transform: translateX(0);
  }

  .container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 60px;
    outline: solid 1px red;
    min-height: 200vh;
  }
</style>
