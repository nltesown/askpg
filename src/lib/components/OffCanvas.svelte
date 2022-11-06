<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let open = false;

	function toggle() {
		open = !open;
		dispatch('change', { open });
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
		use:clickOutside
		on:clickOutside={() => {
			if (open) toggle();
		}}
	>
		<slot name="offcanvas" />
	</div>
	<div class="content">
		<slot name="content" />
	</div>
</div>

<style>
	.oc-container {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		height: 100%;
		overflow: hidden;
	}

	.oc {
		position: absolute;
		height: 100%;
		flex: 0 1 auto;
		width: auto;
		transform: translateX(-100%);
		overflow: auto;

		/* Customizable styling */
		background-color: var(--bg-color, #ccc);
		min-width: var(--min-width, 30%);
		max-width: var(--max-width, 90%);
		scrollbar-width: var(--scrollbar, thin);
		transition: var(--transition, 0.2s ease-in-out);
	}

	.oc.open {
		transform: translateX(0);
	}

	.content {
		flex: 1 1 auto;
		overflow: auto;
	}
</style>
