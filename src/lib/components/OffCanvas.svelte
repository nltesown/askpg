<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let open = false; // Currrent visibility of the off-canvas element.
	export let opts = {
		alwaysOpen: false,
		push: false, // Experimental: the off-canvas pushes the content.
		overlay: false // Adds an overlay over the content (prevents interaction).
	};

	if (opts.alwaysOpen === true) open = true;

	$: {
		if (opts.alwaysOpen === true && open == false) open = true;
	}

	function toggle() {
		open = !open;
		// The value of the prop `open` has changed from within the component.
		// The new value is dispatched so it can be updated in the parent:
		// `<OffCanvas on:visibilityChange={(e) => { open = e.detail.open; }}>...</OffCanvas>`
		dispatch('visibilityChange', { open });
	}

	function clickOutside(node) {
		const parent = node.parentNode;
		const handleClick = (e) => {
			if (
				node &&
				!node.contains(e.target) &&
				!e.defaultPrevented &&
				!e.target.dataset.preventAutoClose
			) {
				node.dispatchEvent(new CustomEvent('clickOutside', node));
			}
		};
		parent.addEventListener('click', handleClick, true);
		return {
			destroy() {
				parent.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<div class="oc-container">
	<div
		class="oc"
		class:open
		aria-expanded={open}
		use:clickOutside
		on:clickOutside={() => {
			if (open) toggle();
		}}
		on:transitionstart={() => {}}
		on:transitionend={() => {}}
	>
		<slot name="offcanvas" />
	</div>
	<div class="rest" class:open class:push={opts.push} class:use-overlay={opts.overlay}>
		<div class="overlay" class:open class:use-overlay={opts.overlay} />
		<slot />
	</div>
</div>

<style>
	.oc-container {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		height: 100%;
		max-height: 100vh; /* Important pour les cas où le component n'est pas placé dans un conteneur dimensionné. */
		overflow: hidden;
	}

	.oc {
		z-index: 2;
		position: absolute;
		height: 100%;
		flex: 0 1 auto;
		width: auto;
		transform: translateX(-100%);
		transition-timing-function: ease-in-out;
		overflow: auto;
		/* Customizable styling */
		background-color: var(--bg-color, #eee);
		min-width: var(--min-width, 30%);
		max-width: var(--max-width, 80%);
		scrollbar-width: var(--scrollbar, thin);
		transition-duration: var(--duration, 0.1s);
	}

	.oc.open {
		transform: translateX(0);
	}

	.rest {
		position: relative;
		z-index: 1;
		flex: 1 1 auto;
		overflow: auto;
	}

	/* Can be moved to .rest */
	.rest.push {
		transform: translateX(0);
		transition-timing-function: ease-in-out;
		transition-duration: var(--duration, 0.1s);
	}

	/* TODO: We need to get the width of the off-canvas element */
	/*
  .rest.push.open {
		transform: translateX(452.8px);
	}
  */

	.rest.use-overlay.open {
		overflow: hidden;
	}

	/* TODO: Make customizable */
	.overlay {
		z-index: 3;
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		left: 0;
		background-color: #0006;
		display: none;
		opacity: 0;
	}

	.overlay.use-overlay.open {
		display: block;
		opacity: 1;
	}

	@media (max-width: 575px) {
		.oc {
			min-width: var(--min-width-small, 80%);
		}
	}
</style>
