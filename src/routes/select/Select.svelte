<script lang="ts">
  interface SelectItem {
    display: string | undefined;
    value: string;
    selected: boolean;
  }

  export let data: Array<SelectItem> = [];
  let selectedItem: SelectItem;

  function checkSelected(item: SelectItem) {
    return item.selected === true;
  }

  function doSelect(item: SelectItem) {
    data = data.map((i) => Object.assign(i, { selected: false }));
    item.selected = true;
    selectedItem = item;
  }
</script>

<div class="select-container">
  <div class="show-selected">{selectedItem?.value || ""}</div>
  <ul role="listbox">
    {#each data as item, i}
      <li
        role="option"
        tabindex={i}
        aria-selected={checkSelected(item)}
        class:selected={checkSelected(item)}
        on:click={() => {
          doSelect(item);
        }}
        on:keypress={(e) => {
          if (e.key === "Enter") doSelect(item);
        }}
      >
        {item.value}
      </li>
    {/each}
  </ul>
</div>

<style>
  .select-container {
    width: 400px;
  }

  .show-selected {
    border: solid 1px red;
    color: red;
  }
  .selected {
    background-color: #33c;
    color: #fff;
  }
</style>
