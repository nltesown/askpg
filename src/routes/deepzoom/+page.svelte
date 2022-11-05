<script lang="ts">
	import { onMount } from 'svelte';
	let OpenSeadragon: Object;
	let elView: HTMLElement;
	onMount(async () => {
		OpenSeadragon = await import('openseadragon');
		var viewer = new OpenSeadragon.Viewer({
			id: 'viewer',
			tileSources: 'img/deepzoom/peardice/output.dzi',
			alwaysBlend: false,
			autoHideControls: true,
			// wrapHorizontal: true,
			// wrapVertical: true,
			minZoomImageRatio: 0.5,
			maxZoomPixelRatio: 3,
			showNavigationControl: false,
			showNavigator: false,
			mouseNavEnabled: true,
			visibilityRatio: 0.5,
			zoomPerClick: 1.25,
			zoomPerScroll: 1.25,
			animationTime: 1,
			useCanvas: true,
			autoResize: true
		});
	});
</script>

<div id="viewer" />

<style>
	#viewer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		cursor: move;
		background-color: rgb(191, 255, 126);
	}
</style>
