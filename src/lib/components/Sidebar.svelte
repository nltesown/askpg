<script>
	import { clickOutside } from '$lib/js/utils/clickOutside';
	export let items = [];
	let currentItemName = null;

	function actionItem(name) {
		if (currentItemName === name) {
			currentItemName = null;
		} else {
			currentItemName = name;
		}
	}
</script>

<div class="sidebar-container">
	<div
		class="sidebar"
		use:clickOutside
		on:click_outside={() => {
			actionItem(null);
		}}
	>
		<ul>
			{#each items as item}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<li
					class:selected={currentItemName === item.name}
					title={item.label}
					on:click={() => {
						actionItem(item.name);
					}}
				>
					<div class="icon"><svelte:component this={item.icon} /></div>
				</li>
			{/each}
		</ul>
		<div class="content" class:open={currentItemName !== null}>
			{#each items as item}
				<div class:selected={currentItemName === item.name}>
					<svelte:component this={item.content} {...item.props} />
				</div>
			{/each}
		</div>
	</div>
	<div class="rest"><slot /></div>
</div>

<style>
	.sidebar-container {
		display: grid;
		grid-template-columns: 36px auto;
		grid-template-rows: auto;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		width: 100%;
		transition: 0.15s ease-in-out;
	}

	.sidebar {
		grid-area: 1 / 1 / 2 / 2;
		background-color: #ddd;
	}

	.content {
		position: absolute;
		width: 0px;
		max-width: 90%;
		height: calc(
			100vh - 40px
		); /* TODO: améliorer, ne doit pas être dépendant de la hauteur d'un élément externe (les 40px de <nav>). */
		background-color: #eee;
		/* background-color: #4f6053; */
		/* color: #eee; */
		z-index: 1000;
		transform: translateX(36px);
		display: block;
		transition: 0.075s ease-in-out;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: #369 #fff;
		overscroll-behavior: none; /* Important : empêche le scroll des éléments scrollables situés en dessous. */
	}

	.content.open {
		width: 22rem;
	}

	ul {
		position: fixed;
		width: 36px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: stretch;
		margin-top: 8px;
	}

	li {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		text-align: center;
		flex: 0 0 36px;
		margin-bottom: 2px;
		cursor: pointer;
		line-height: 36px;
		border-left: solid 4px transparent;
	}

	li.selected {
		border-left-color: #369;
	}
	li :global(svg) {
		transform: translateX(-2px);
	}

	li.selected :global(svg) {
		stroke: #369;
	}

	li:hover :global(svg) {
		stroke: #369;
	}

	.icon {
		width: 28px;
		height: auto;
	}

	.icon :global(svg) {
		stroke: #888;
	}

	.content > div {
		display: none;
		padding: 8px;
	}

	.content > div.selected {
		display: block;
	}

	.rest {
		grid-area: 1 / 2 / 2 / 3;
	}
</style>
