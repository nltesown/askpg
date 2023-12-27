<script lang="ts">
  import { onMount } from "svelte";
  import _ from "lodash";
  // import type { Point } from "openseadragon";

  type Point = [number, number];

  // Coordonnées d'un point (entre 0 et 1).
  const img_src = "spiaggia-2x";
  const speed = 100; // Valeur de vitesse (utilsée pour calculer la durée de chaque animation).
  // const speed = 0.01; // Valeur de vitesse (utilsée pour calculer la durée de chaque animation).
  const pause = 2000; // Pause (ms) après chaque animation.
  const aspect_ratio = 4 / 3; // Ratio de l'image.
  // const zoom_danger_zone = 0.9;

  let zoom_level: number = 1;
  let prevPoint: Point;
  let point: Point;
  let points: Array<Point> = [];

  const points_initial: Array<Point> = [
    [0.033, 0.34075],
    [0.0445, 0.4445],
    [0.04675, 0.3905],
    [0.05625, 0.35425],
    [0.077, 0.53625],
    [0.079, 0.363],
    [0.1105, 0.45875],
    [0.11675, 0.43125],
    [0.15425, 0.3855],
    [0.1555, 0.6365],
    [0.1615, 0.3475],
    [0.16375, 0.35525],
    [0.17375, 0.47575],
    [0.17875, 0.3545],
    [0.1875, 0.3],
    [0.196, 0.355],
    [0.206, 0.458],
    [0.22, 0.545],
    [0.247, 0.48625],
    [0.2565, 0.586],
    [0.27525, 0.41925],
    [0.285, 0.38775],
    [0.33125, 0.47425],
    [0.33325, 0.4145],
    [0.33825, 0.374],
    [0.3395, 0.51],
    [0.349, 0.57025],
    [0.35725, 0.376],
    [0.3835, 0.33425],
    [0.39775, 0.599],
    [0.42225, 0.53175],
    [0.45375, 0.42075],
    [0.484, 0.44375],
    [0.49725, 0.467],
    [0.51175, 0.337],
    [0.51475, 0.60875],
    [0.54, 0.46525],
    [0.54275, 0.37875],
    [0.5895, 0.5885],
    [0.59175, 0.668],
    [0.63575, 0.3365],
    [0.65025, 0.5315],
    [0.655, 0.34275],
    [0.674, 0.47425],
    [0.70325, 0.3565],
    [0.71475, 0.62475],
    [0.75175, 0.5535],
    [0.79675, 0.5915],
    [0.80075, 0.39025],
    [0.8205, 0.475],
    [0.851, 0.43775],
    [0.91625, 0.41425],
    [0.94925, 0.693]
  ];

  /**
   * dist
   * @param {Point} p1
   * @param {Point} p2
   * @returns {number} Distance entre les 2 points.
   */
  function distance(p1: Point, p2: Point): number {
    return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
  }

  onMount(async () => {
    const OpenSeadragon = await import("openseadragon");

    // http://openseadragon.github.io/docs/OpenSeadragon.html#.Options
    // new OpenSeadragon.Viewer({

    const viewer = new OpenSeadragon.Viewer({
      id: "viewer",
      tileSources: `img/deepzoom/${img_src}/output.dzi`,
      alwaysBlend: false,
      autoHideControls: true,
      wrapHorizontal: false,
      wrapVertical: false,
      constrainDuringPan: false,
      defaultZoomLevel: 1,
      minZoomLevel: 1,
      minZoomImageRatio: 1.5,
      showNavigationControl: false,
      showNavigator: false,
      mouseNavEnabled: true,
      visibilityRatio: 1,
      zoomPerClick: 2,
      zoomPerScroll: 2,
      animationTime: 1,
      useCanvas: true,
      autoResize: true,
      springStiffness: 1
    });

    points = [...points_initial]; // Clone les points.
    // let points: Array<Point> = _.take(_.shuffle([...points_initial]), 2); // Clone les points.
    const center_point: Point = [0.5, 0.5 / aspect_ratio];
    let origin_point: Point = center_point;
    let target_point: Point; // Point cible de l'animation.

    // points = _(points)
    //   .flatMap((p) => [p, center_point])
    //   .value();

    function animate() {
      console.log("Animate");
      console.log(points.length);

      if (points.length > 0) {
        // Sélectionne le point cible.
        let [x, y]: [number, number] = (target_point = _(points)
          .orderBy((p) => distance(origin_point, p))
          .value()[Math.min(points.length - 1, _.random(0, 1, false))]);

        // Enlève le point cible du tableau `points`.
        points.splice(
          _.findIndex(points, (p) => p[0] === target_point[0] && p[1] == target_point[1]),
          1
        );
        points = points; // (Pour la réactivité).

        console.log(`origin: ${origin_point}`);
        console.log(`target: ${target_point}`);

        if (
          target_point &&
          target_point[0] === origin_point[0] &&
          target_point[1] === origin_point[1]
        ) {
          console.log("Same point");
          viewer.raiseEvent("animation-finish");
          return;
        }

        // Distance entre les deux points.
        let d: number = distance(origin_point, target_point);

        let osdPoint = new OpenSeadragon.Point(x, y);
        zoom_level =
          y > 0.47
            ? _.random(8, 11, false)
            : y > 0.4
            ? _.random(12, 15, false)
            : _.random(16, 24, false);

        viewer.viewport.centerSpringX.animationTime = d * speed;
        viewer.viewport.centerSpringY.animationTime = d * speed;
        viewer.viewport.zoomSpring.animationTime = d * speed;
        viewer.viewport.zoomTo(zoom_level);
        viewer.viewport.panTo(osdPoint);

        origin_point = target_point;
      } else {
        viewer.removeAllHandlers("animation-finish");
        console.log("End");
      }
    }

    viewer.addHandler("animation-finish", () => {
      console.log("Event animation-finish");
      setTimeout(() => {
        animate();
      }, pause);
    });

    setTimeout(animate, 3000);
  });
</script>

<div id="viewer" />

<!-- <div id="text-container">
  <div id="text">Tu chi sei?</div>
</div> -->

<div id="info">{zoom_level} {points.length}</div>

<style>
  #info {
    position: absolute;
  }

  #viewer {
    position: absolute;
    inset: 0;
  }

  #text-container {
    pointer-events: none;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0;
  }

  #text {
    flex: 0 0 auto;
    font-size: 25vh;
    color: #fff;
    opacity: 0.9;
    font-weight: 700;
  }
</style>
