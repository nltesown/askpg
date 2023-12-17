<script lang="ts">
  import { onMount } from "svelte";
  import _ from "lodash";
  let OpenSeadragon: Object;

  const img = "spiaggia-2x";

  const pointsInitial = [
    [0.008, 0.46975],
    [0.013, 0.4295],
    [0.0145, 0.386],
    [0.02625, 0.4065],
    [0.033, 0.34075],
    [0.0445, 0.4445],
    [0.04675, 0.3905],
    [0.05625, 0.35425],
    [0.077, 0.53625],
    [0.079, 0.363],
    [0.1105, 0.45875],
    [0.11675, 0.43125],
    [0.14, 0.5815],
    [0.15425, 0.3855],
    [0.1555, 0.6365],
    [0.15925, 0.532],
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
    [0.36275, 0.4445],
    [0.3835, 0.33425],
    [0.39775, 0.599],
    [0.42225, 0.53175],
    [0.45375, 0.42075],
    [0.484, 0.44375],
    [0.49725, 0.467],
    [0.51175, 0.337],
    [0.51475, 0.60875],
    [0.53075, 0.5455],
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
    [0.9085, 0.5745],
    [0.91625, 0.41425],
    [0.94925, 0.693],
    [0.9605, 0.6275],
    [0.97475, 0.5515]
  ];

  function distance(p1, p2) {
    return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
  }

  let zoomLevel = 1;
  let prevPoint;
  let point;
  let points = [];

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
      showNavigationControl: false,
      showNavigator: false,
      mouseNavEnabled: true,
      visibilityRatio: 1,
      zoomPerClick: 2,
      zoomPerScroll: 2,
      animationTime: 15,
      // animationTime: 2,
      useCanvas: true,
      autoResize: true,
      springStiffness: 0.00000001
    });

    function getNextPoint() {
      if (points.length === 0) points = pointsInitial;

      if (prevPoint) {
        let pointsByDistance = _(points)
          .map((p) => [p, distance(p, prevPoint)])
          .orderBy((v) => v[1])
          .value();

        point = pointsByDistance[0][0];
        // point = pointsByDistance[_.random(1, 2, false)][0];
      } else {
        point = _.sample(points);
      }

      // Enlève le point du tableau `points`.
      let index = _.findIndex(points, (p) => _.isEqual(p, point));
      if (index !== -1) {
        points.splice(index, 1);
        points = points;
      }

      prevPoint = point;

      return point;
    }

    setTimeout(run, 2000);

    const animationHandler = viewer.addHandler("animation-finish", () => {
      setTimeout(run, 2000);
    });

    function run() {
      let [x, y] = getNextPoint();
      let osdPoint = new OpenSeadragon.Point(x, y);

      zoomLevel =
        y > 0.47
          ? _.random(9, 12, false)
          : y > 0.4
          ? _.random(11, 15, false)
          : _.random(14, 20, false);

      // TODO: définir la durée selon la distance à parcourir.
      // viewer.viewport.centerSpringX.animationTime = 0.5;
      // viewer.viewport.centerSpringY.animationTime = 0.5;
      // viewer.viewport.zoomSpring.animationTime = 0.5;

      viewer.viewport.zoomTo(zoomLevel);
      viewer.viewport.panTo(osdPoint);
    }
  });
</script>

<div id="viewer" />

<div id="info">{zoomLevel} {points.length}</div>

<style>
  #info {
    position: absolute;
  }

  #viewer {
    position: absolute;
    inset: 0;
  }
</style>
