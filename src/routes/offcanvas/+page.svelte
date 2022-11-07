<script>
	import OffCanvas from '$lib/components/OffCanvas.svelte';
	import Menu from '$lib/components/icons/IconMenu.svelte';
	import Close from '$lib/components/icons/IconClose.svelte';

	let open = true;
	let openSecondary = true;
	let color = '#eee';

	function toggle() {
		open = !open;
	}

	function toggleSecondary() {
		openSecondary = !openSecondary;
	}
</script>

<svelte:head>
	<title>Off-canvas demo</title>
</svelte:head>

<div class="container">
	<button class="icon menu-ctrl" on:click={toggle}>
		{#if open === true}
			<Close />{:else}<Menu />{/if}
	</button>
	<OffCanvas
		on:visibilityChange={(e) => {
			open = e.detail.open;
		}}
		{open}
		opts={{ alwaysOpen: false, push: false, overlay: false }}
		--bg-color={color}
		--duration="0.15s"
	>
		<div class="offcanvas" slot="offcanvas">
			<h2>The menu</h2>
			<p>This is your menu.</p>
		</div>
		<main class="content">
			<!-- <main class="content" slot="content"> -->
			<article>
				<h1>The content</h1>
				<p>
					Il est même possible de mettre ici du code qui modifie la valeur des props passés au
					component.
				</p>
				<button data-prevent-auto-close="true" on:click={toggle}>Open/close menu</button>
				<button
					data-prevent-auto-close="true"
					on:click={() => {
						color = color === 'blue' ? 'red' : 'blue';
					}}>Change color</button
				>

				<div data-prevent-auto-close="true" class="inner-container">
					<OffCanvas
						on:visibilityChange={(e) => {
							openSecondary = e.detail.open;
						}}
						open={openSecondary}
						opts={{ alwaysOpen: false, push: false, overlay: true }}
						--bg-color="pink"
						--duration=".5s"
					>
						<div slot="offcanvas">
							<h2>What's here ?</h2>
							<p>An apple.</p>
							<p>A baby.</p>
							<p>A carrot.</p>
							<p>A deer.</p>
							<p>An eiderdown.</p>
							<p>A fag.</p>
							<p>A gun.</p>
							<p>A heart.</p>
							<p>An idea.</p>
							<p>A jug.</p>
							<p>A keg.</p>
							<p>A log.</p>
							<p>A mug.</p>
							<p>A noise.</p>
							<p>An omelette.</p>
						</div>
						<div>About us.</div>
					</OffCanvas>
				</div>

				<button data-prevent-auto-close="true" on:click={toggleSecondary}
					>Open/close secondary menu</button
				>
			</article>
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
		padding: 36px 12px;
		height: 2000px;
	}

	article {
		width: 100%;
		max-width: 700px;
		padding: 24px;
		margin: 24px auto;
		box-sizing: border-box;
	}

	.inner-container {
		margin: 24px;
		height: 300px;
		background-color: #9cf;
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

	.menu-ctrl {
		position: fixed;
		top: 4px;
		left: 4px;
		z-index: 1000;
	}
</style>
