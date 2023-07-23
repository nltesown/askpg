<script>
  export let ratio = 16 / 9;
  export let allowOverflow = false;
  let elRatioBox;

  $: {
    ratio = ratio;
    if (elRatioBox) {
      let r = Number(ratio);
      if (isNaN(r) || r === 0) {
        r = 1;
      }
      elRatioBox.style["padding-bottom"] = ratio === 0 ? "100%" : `${(1 / ratio) * 100}%`;
    }
  }
</script>

<div style="margin: 12px;" bind:this={elRatioBox} class="ratio-box">
  <div class="absolute-box" class:overflow={allowOverflow}>
    <div class="overflow-box">
      <slot />
    </div>
  </div>
</div>

<style>
  .ratio-box {
    background-color: red;
    position: relative;
    height: 0;
    width: 100%;
    padding-top: 0 !important;
    padding-right: 0 !important;
    padding-bottom: 0;
    padding-left: 0 !important;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .absolute-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  .overflow {
    overflow: auto;
  }

  .overflow-box {
    position: relative;
  }
</style>
