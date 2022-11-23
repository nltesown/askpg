<script>
  import IconAdjustments from "$lib/components/icons/IconAdjustments.svelte";
  import IconMenu from "$lib/components/icons/IconMenu.svelte";
  import IconFilter from "$lib/components/icons/IconFilter.svelte";
  import Eager from "$lib/components/Eager.svelte";
</script>

<Eager><nav /></Eager>

<div class="container">And this is where it all began.</div>

<div class="tools">
  <button><IconMenu /></button>
  <button><IconFilter /></button>
  <button><IconAdjustments /></button>
</div>

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
    height: 60px;
    background-color: #369;
  }

  .tools {
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 60px;
    outline: solid 1px red;
  }

  button {
    display: block;
    flex: 0 0 auto;
    width: 60px;
    height: 60px;
    padding: 12px;
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

  .container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    outline: solid 1px red;
    min-height: 200vh;
  }
</style>
