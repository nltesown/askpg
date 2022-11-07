<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let open = false;

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

	.content {
		z-index: 1;
		flex: 1 1 auto;
		overflow: auto;
	}

	@media (max-width: 575px) {
		.oc {
			min-width: var(--min-width-small, 80%);
		}
	}
</style>
