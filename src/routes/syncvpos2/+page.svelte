<script>
	import _ from 'lodash';

	let days = [
		['Lundi', '#639'],
		['Mardi', '#693'],
		['Mercredi', '#369'],
		['Jeudi', '#396'],
		['Vendredi', '#936'],
		['Samedi', '#963'],
		['Dimanche', '#fc0']
	];

	let current;
	let day;

	let primary;
	let secondary;

	function align() {
		let secondaryH = 0;
		for (let secondaryDay of secondary.childNodes) {
			if (secondaryDay.dataset.day === day) break;
			secondaryH = secondaryH + secondaryDay.offsetHeight; // Position verticale du haut de la boîte du jour correspondant.
		}
		secondary.scrollTo(0, secondaryH - current.offsetTop + primary.scrollTop);
	}

	function inter(root) {
		// NB: root est identique à primary, car c'est le paramètre passé à l'appel de la directive use:
		// TODO: Comme on a besoin de primary par ailleurs, on peut se passer de l'appel de use:. Appeler cette fonction dans onMount.
		let elems = root.childNodes;

		const observer = new IntersectionObserver(
			(entries) => {
				const scrollY = root.scrollTop;
				let h = 0;
				for (let elem of elems) {
					if (h >= scrollY) {
						current = elem;
						day = current.dataset.day;
						break;
					}
					h = h + elem.offsetHeight;
				}
			},
			{ root, rootMargin: '0px', threshold: 1 }
		);

		for (let elem of elems) {
			observer.observe(elem);
		}
	}
</script>

<div class="container menu">
	<div>{day}</div>
	<div><button on:click={align}>Align</button></div>
</div>

<div class="container">
	<div class="week overflow" use:inter bind:this={primary}>
		{#each days as day}
			<div class="day" data-day={day[0]} style="background-color:{day[1]};">{day[0]}</div>
		{/each}
	</div>

	<div class="week secondary" bind:this={secondary}>
		{#each days as day}
			<div class="day" data-day={day[0]} style="background-color:{day[1]};">{day[0]}</div>
		{/each}
	</div>
</div>

<div />

<style>
	:global(body) {
		margin: 0;
		height: 80vh;
	}

	.container {
		display: flex;
		flex-direction: row;
		max-width: 700px;
		width: 95%;
		margin: 24px auto;
	}

	.menu > * {
		font-size: 1.125rem;
		font-weight: 600;
		flex: 0 0 4rem;
		padding: 0 4px;
		/* text-align: center; */
	}

	.week {
		flex: 1 1 auto;
		position: relative;
		height: 80vh;
		scrollbar-width: thin;
		overflow: hidden;
	}

	.overflow {
		overflow: auto;
	}

	.day {
		height: 180px;
		padding: 6px;
		font-weight: 500;
	}

	.secondary > .day {
		height: 240px;
	}
</style>
