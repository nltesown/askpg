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
	let secondary;

	function inter(root) {
		let elems = root.childNodes;

		const observer = new IntersectionObserver(
			(entries) => {
				const scrollY = root.scrollTop;
				let h = 1;
				for (let elem of elems) {
					if (h > scrollY) {
						current = elem;
						// TODO: position en utilisant current.getBoundingClientRect pour obtenir la position y de l'élement par rapport au viewport, et calculer le scroll à appliquer à l'élément secondaire pour arriver à la même position.
						secondary.scrollTo(0, h);
						// secondary.scrollTo(0, h - elem.offsetHeight + entries[0].boundingClientRect.top);
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

	/*
  let previousY = 0;
	let current = [];
	let dir;

	function inter(root) {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				for (let entry of entries) {
					let day = entry.target.dataset.day;
					let ratio = entry.intersectionRatio;
					let y = entry.boundingClientRect.y;

					if (ratio > 0) {
						let dir = y > previousY;
						console.log([day, ratio, y, dir]);
						if (current.indexOf(day) < 0) {
							current = current.concat([day]);
						} else {
							if (ratio < 1) current = current.filter((i) => i !== day);
						}
						previousY = y;
					}
				}
			},
			{
				root,
				rootMargin: '0px',
				threshold: 0
			}
		);

		for (let elDay of root.childNodes) {
			observer.observe(elDay);
		}
	}
*/
</script>

{current?.dataset.day}
<div class="container">
	<div class="week overflow" use:inter>
		{#each days as day}
			<div class="day" data-day={day[0]} style="background-color:{day[1]};">{day[0]}</div>
		{/each}
	</div>

	<div class="week" bind:this={secondary}>
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
</style>
