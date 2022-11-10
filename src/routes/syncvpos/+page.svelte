<script>
	import { onMount } from 'svelte';
	import _ from 'lodash';

	let content = [
		[300, 350, 400, 200, 350, 450, 200, 550],
		[200, 50, 80, 120, 200, 180, 220, 150],
		[350, 200, 150, 240, 500, 100, 150, 60]
	];

	let elCol0;
	let scrollableColRows = [];
	let rowsOffset;
	let currentRow = 0;

	onMount(() => {
		rowsOffset = Array.from(elCol0.querySelectorAll('.row')).map((r, i) => r.offsetTop); // offsetTop de chacune des rows de la colonne 0.
	});

	function scroll(e) {
		let scrollY = elCol0.scrollTop;
		currentRow = _(rowsOffset).findIndex((y) => y >= scrollY);
	}
</script>

<div class="container">
	<div class="col overflow" on:scroll={scroll} bind:this={elCol0}>
		{#each content[0] as row, j}
			<div style="height:{row}px;" class="row">{j}</div>
		{/each}
	</div>
	<div class="col">
		{#each content[1] as row, j}
			<div style="height:{row}px;" class="row">{j}</div>
		{/each}
	</div>
	<div class="col">
		{#each content[2] as row, j}
			<div style="height:{row}px;" class="row">{j}</div>
		{/each}
	</div>
</div>

<div>Se caler sur la hauteur de la première ligne dont l'intitulé est visible : {currentRow}</div>

<style>
	:global(body) {
		margin: 0;
		height: 80vh;
	}

	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: stretch;
		margin: 48px auto;
		width: 1000px;
		height: 50vh;
		outline: solid 2px red;
		overflow: auto;
	}

	.col {
		position: relative;
		flex: 1 1 auto;
		outline: solid 2px blue;
		overflow: hidden;
	}

	.overflow {
		overflow: auto;
	}

	.row {
		outline: solid 2px #0f0;
		height: 36px;
	}
</style>
