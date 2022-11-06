<script>
	import OffCanvas from '$lib/components/OffCanvas.svelte';

	let open = true;
	let color = '#ccc';
</script>

<div class="container">
	<OffCanvas
		on:change={(e) => {
			open = e.detail.open;
		}}
		{open}
		--bg-color={color}
		--transition="0.5s ease-in-out"
	>
		<div class="offcanvas" slot="offcanvas">The menu</div>
		<main class="content" slot="content">
			<h1>The content</h1>
			<p>
				Il est même possible de mettre ici du code qui modifie la valeur des props passés au
				component.
			</p>
			<button
				data-prevent-auto-close="true"
				on:click={() => {
					open = !open;
				}}>Toggle</button
			>
			<button
				data-prevent-auto-close="true"
				on:click={() => {
					color = color === 'blue' ? 'red' : 'blue';
				}}>Color</button
			>
		</main>
	</OffCanvas>
</div>

<style>
	:global(body) {
		margin: 0;
	}

	/* Pour la totalité du viewport  */
	.container {
		width: 100vw;
		height: 100vh;
		outline: solid 1px red;
	}

	/* .container {
		width: 600px;
		height: 400px;
		margin: 24px auto;
		outline: solid 1px red;
	} */

	.content {
		text-align: right;
		height: 1200px;
	}

	.offcanvas {
		padding: 12px;
	}
</style>
