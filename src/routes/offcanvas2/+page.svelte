<script>
	import OffCanvas from '$lib/components/OffCanvas.svelte';
	import IconMenu from '$lib/components/icons/IconMenu.svelte';
	let open = true;

	function toggle() {
		open = !open;
	}
</script>

<OffCanvas {open}>
	<div slot="offcanvas" class="offcanvas">Menu</div>
	<div class="">Didi</div>
</OffCanvas>
<button class="toggle" on:click={toggle}><IconMenu /></button>

<style>
	.toggle {
		position: fixed;
		border: 0;
		background-color: transparent;
		width: 36px;
		padding: 4px;
		top: 2px;
		left: 2px;
		cursor: pointer;
		z-index: 2000;
	}

	.offcanvas {
		padding: 48px 2px 2px 2px;
	}
</style>
