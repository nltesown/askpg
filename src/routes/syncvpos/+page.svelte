<script>
  import { onMount } from "svelte";
  import _ from "lodash";

  let days = [
    ["Lundi", "#639"],
    ["Mardi", "#693"],
    ["Mercredi", "#369"],
    ["Jeudi", "#396"],
    ["Vendredi", "#936"],
    ["Samedi", "#963"],
    ["Dimanche", "#fc0"]
  ];
  let elCols = [];
  let elSourceCol;
  let elFocused; // Cellule de la colonne source en évidence.
  let dayFocused = ""; // Nom du jour qui sert de référence pour l'alignement.

  onMount(() => {
    elSourceCol = elCols[1];
    let obs = setObserver(elSourceCol);
    // NB : pour déconnecter l'observer : obs.disconnect();
  });

  $: {
    elFocused = elFocused;
    if (elFocused) {
      dayFocused = elFocused.dataset.day;
    }
  }

  function setObserver(elCol) {
    const elRows = elCol.children; // Cellules de la colonne source.
    // let elFocused; // Cellule de la colonne source en évidence.

    const observer = new IntersectionObserver(
      () => {
        const scrollY = elCol.scrollTop;
        let i = 0; // Pointeur
        for (let elRow of Array.from(elRows)) {
          // L'itération s'arrête dès que l'on atteint une cellule dont le sommet est visible.
          if (i >= scrollY) {
            elFocused = elRow; // La cellule en évidence est la cellule courante.
            break;
          } else {
            i = i + elRow.offsetHeight; // A chaque itération, le pointeur de position verticale `i` est augmenté de la hauteur de la cellule courante.
          }
        }
      },
      { elCol, rootMargin: "0px", threshold: 1 }
    );

    for (let elRow of Array.from(elRows)) {
      observer.observe(elRow);
    }

    return observer; // Pour pouvoir le déconnecter ultérieurement (.disconnect).
  }

  function align() {
    // On effectue l'alignement pour toutes les colonnes sauf la colonne source.
    for (let elTargetCol of elCols.filter((c) => c !== elSourceCol)) {
      let i = 0;
      for (let elTargetRow of elTargetCol.children) {
        if (elTargetRow.dataset.day === elFocused.dataset.day) break;
        i = i + elTargetRow.offsetHeight; // Position verticale du haut de la boîte du jour correspondant.
      }
      elTargetCol.scrollTo(0, i - elFocused.offsetTop + elSourceCol.scrollTop);
    }
  }
</script>

<div class="container menu">
  <div class="day-focused">{dayFocused}</div>
  <div><button on:click={align}>Align</button></div>
</div>

<div class="container">
  {#each [0, 1, 2] as _col, i}
    <div class="week" class:overflow={elCols[i] === elSourceCol} bind:this={elCols[i]}>
      {#each days as day}
        <div
          class="day"
          data-day={day[0]}
          style="background-color:{day[1]}; height: {Math.floor(Math.random() * 300) + 150}px;  "
        >
          {day[0]}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }

  .container {
    display: flex;
    flex-direction: row;
    max-width: 700px;
    width: 95%;
    margin: 24px auto;
  }

  .menu > * {
    font-size: 1.125rem;
    font-weight: 600;
    flex: 0 0 25%;
    padding: 0 4px;
    text-align: left;
  }

  .week {
    flex: 1 1 auto;
    position: relative;
    height: 80vh;
    scrollbar-width: thin;
    overflow: hidden;
    margin: 0 2px;
  }

  .overflow {
    overflow: auto;
  }

  .day {
    height: 180px;
    padding: 6px;
    font-weight: 500;
  }

  .secondary > .day {
    height: 240px;
  }
</style>
