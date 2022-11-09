<script>
	import OffCanvas from '$lib/components/OffCanvas.svelte';
	import IconClose from '$lib/components/icons/IconClose.svelte';
	import IconMenu from '$lib/components/icons/IconMenu.svelte';
	let open = true;
</script>

<OffCanvas
	{open}
	on:visibilityChange={(e) => {
		open = e.detail.open;
	}}
	--duration="0.1s"
>
	<div class="menu" slot="offcanvas">
		<ul>
			<li><a href="exemple1" data-close-off-canvas>Example 1</a></li>
			<li><a href="exemple2">Example 2 (don't close on click)</a></li>
		</ul>
	</div>
	<slot />
</OffCanvas>

<button
	class="icon ctrl"
	on:click={() => {
		open = !open;
	}}
>
	{#if open === true}
		<IconClose />{:else}<IconMenu />{/if}
</button>

<style>
	ul {
		height: 200vh;
		margin: 48px;
	}

	a {
		display: block;
		padding: 8px;
	}

	li:hover {
		background-color: #ccf;
	}

	button.icon {
		display: block;
		width: 36px;
		height: 36px;
		border: none;
		padding: 0;
		background-color: transparent;
		cursor: pointer;
	}

	.ctrl {
		z-index: 1000;
		position: fixed;
		top: 4px;
		left: 4px;
	}
</style>
