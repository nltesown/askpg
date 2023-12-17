<script lang="ts">
  import { onMount } from "svelte";
  let OpenSeadragon: Object;
  let displayedText = "";

  const img = "spiaggia-2x";
  //  const img = "playa";

  let i = 0;
  let j = 0; // Pointeur utilisateur. On ne peut pas remonter au-delà de 0.
  let k = 0; // Index du texte sélectionné.

  const sentences = [
    [
      "Look away Narcissus",
      "à voyage profond",
      "sommeil léger",
      "Les années",
      "leur irrépressible",
      "propension à passer",
      "Malheur est bon",
      "N'exagérons rien",
      "Libre à vous",
      "Encore heureux",
      "Il faut manier le",
      "poignard-à-tuer-le-moi",
      "je suis prêt si",
      "vous êtes prêt",
      "calcul félicifique",
      "y mettre le prix",
      "L'activité économique",
      "était intense",
      "mais sans joie",
      "le baiser",
      "de la femme-objet",
      "Veraniego",
      "No tiene arreglo",
      "Su pequeña blancura",
      "Candy stripe vs. pin stripe",
      "Is that not the question?",
      "Losing one's marbles",
      "Once and for all",
      "Les mots vidés de leur sens",
      "On appelle ça",
      "La communication",
      "Almas almacenadas"
    ],
    [
      "Un borghese piccolo, piccolo",
      "No al surrealismo",
      "No te las pierdas",
      "Las Hormigas veraniegas"
    ],
    [
      "Heureux qui comme Ulysse",
      "a fait un beau voyage",
      "ou comme celui-là",
      "qui conquit la toison",
      "et puis est retourné",
      "plein d'usage et raison",
      "vivre entre ses parents",
      "le reste de son âge"
    ]
  ];

  onMount(async () => {
    OpenSeadragon = await import("openseadragon");

    // http://openseadragon.github.io/docs/OpenSeadragon.html#.Options
    // new OpenSeadragon.Viewer({

    const viewer = new OpenSeadragon.Viewer({
      id: "viewer",
      tileSources: `img/deepzoom/${img}/output.dzi`,
      alwaysBlend: false,
      autoHideControls: true,
      wrapHorizontal: false,
      wrapVertical: false,
      constrainDuringPan: false,
      defaultZoomLevel: 1,
      minZoomLevel: 1,
      minZoomImageRatio: 1.5,
      maxZoomPixelRatio: 2.5,
      showNavigationControl: false,
      showNavigator: false,
      mouseNavEnabled: true,
      visibilityRatio: 1,
      // visibilityRatio: 0.5,
      zoomPerClick: 2,
      zoomPerScroll: 2,
      animationTime: 2,
      useCanvas: true,
      autoResize: true,
      springStiffness: 5
    });

    window.setTimeout(() => {
      const point = new OpenSeadragon.Point(0.34, 0.513);
      viewer.viewport.panTo(point);
      viewer.viewport.zoomTo(10);
    }, 1000);
  });

  function press(e) {
    if (e.key === "Backspace") {
      if (displayedText.length > 0) {
        displayedText = displayedText.substring(0, displayedText.length - 1);
      } else {
        if (i === 0) {
          if (j === 0) {
            return;
          } else {
            i = sentences[k].length - 1;
          }
        } else {
          i = i - 1;
          j = i;
        }
        displayedText = sentences[k][i];
      }
    } else {
      if (displayedText.length === sentences[k][i].length) {
        displayedText = "";
        i = i + 1;
        j = i;
        if (i === sentences[k].length) {
          i = 0;
        }
      } else {
        if (e.key.length === 1) {
          displayedText = displayedText + sentences[k][i][displayedText.length];
          e.preventDefault();
        }
      }
    }
  }
</script>

<svelte:window on:keydown={press} />

<div id="viewer" />
<div class="container">
  <div class="text" class:backslant={i % 2 === 1}>{displayedText}</div>
</div>

<style>
  #viewer {
    position: absolute;
    inset: 0;
  }

  .container {
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    inset: 0;
    pointer-events: none;
    user-select: none;
    /* background-color: #9fecff; */
    /* background-color: #f96; */
    /* background-color: rgb(197, 255, 250); */
  }

  .text {
    /* font-family: "IBM Plex Sans"; */
    font-family: "Source Serif Pro";
    font-weight: 100;
    font-size: 10vh;
    transform: scaleY(10) scaleX(1.5) skew(-50deg);
    text-transform: uppercase;
    line-height: 0;
    text-overflow: clip;
    text-align: center;
    color: #fff;
    /* color: #69f; */
    /* color: #026; */
    /* color: transparent;
    text-shadow: 0 0 6px #f0f; */
  }

  .text.backslant {
    transform: scaleY(10) scaleX(1.5) skew(50deg);
  }

  .text:after {
    display: inline;
    content: "|";
    font-weight: 100;
    animation: blink 1s linear infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    49% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
</style>
