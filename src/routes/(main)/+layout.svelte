<script>
	import '$lib/css/main.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import IconMenu from '$lib/icons/IconMenu.svelte';
	import Menu from './Menu.svelte';

	let items = [
		{
			name: 'menu',
			label: 'Menu',
			icon: IconMenu,
			content: Menu,
			props: {}
		}
	];
</script>

<div id="workspace">
	<Sidebar {items}>
		<main><slot /></main>
	</Sidebar>
</div>

<style>
	#workspace {
		position: fixed;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: stretch;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}

	main {
		flex: 1 0 calc(100vh - 40px);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: stretch;
		overflow-y: auto;
	}
</style>
