<script>
  import { useMachine } from "@xstate/svelte";
  import { createMachine } from "xstate";
  let offCanvasIsOpen;

  const selectMachine = createMachine(
    {
      id: "select",
      initial: "none",
      states: {
        none: {
          type: "atomic",
          entry: ["closeOffCanvas"],
          on: {
            "SELECT.FILTER": {
              target: "selected.filter"
            },
            "SELECT.SETTINGS": "selected.settings",
            "SELECT.SEARCH": "selected.search"
          }
        },
        selected: {
          type: "compound",
          entry: ["openOffCanvas"],
          states: {
            filter: {
              type: "atomic",
              on: {
                "SELECT.SETTINGS": "settings",
                "SELECT.FILTER": "#select.none",
                "SELECT.SEARCH": "search",
                OUT: "#select.none"
              }
            },
            settings: {
              type: "atomic",
              on: {
                "SELECT.SETTINGS": "#select.none",
                "SELECT.FILTER": "filter",
                "SELECT.SEARCH": "search",
                OUT: "#select.none"
              }
            },
            search: {
              type: "atomic",
              on: {
                "SELECT.SETTINGS": "settings",
                "SELECT.FILTER": "filter",
                "SELECT.SEARCH": "#select.none",
                OUT: "#select.none"
              }
            }
          }
        }
      }
    },
    {
      actions: {
        // TODO: on peut peut-être implémenter directement ici l'ouverture/fermeture.
        // En revanche, fait appel à des variables externes, ce qui ne rend pas possible (facilement) la définition de la machine, si elle a des actions, dans un module externe.
        openOffCanvas: (context, event) => {
          offCanvasIsOpen = true;
        },
        closeOffCanvas: (context, event) => {
          offCanvasIsOpen = false;
        }
      }
    }
  );

  const { state, send } = useMachine(selectMachine);
</script>

<button class:selected={$state.value.selected === "filter"} on:click={() => send("SELECT.FILTER")}
  >Filter</button
>
<button
  class:selected={$state.value.selected === "settings"}
  on:click={() => send("SELECT.SETTINGS")}>Settings</button
>
<button class:selected={$state.value.selected === "search"} on:click={() => send("SELECT.SEARCH")}
  >Search</button
>

{#if $state.value.selected}
  <button on:click={() => send("OUT")}>(Out)</button>
{/if}

<p>{JSON.stringify($state.value, null, 2)}</p>
<p>Off-canvas: {offCanvasIsOpen ? "opened" : "closed"}</p>

<!-- {JSON.stringify($state.actions, null, 2)} -->
<style>
  button {
    background-color: #999;
    border: none;
    border-radius: 3px;
    padding: 4px;
  }
  button.selected {
    background-color: #9ff;
  }
</style>
