<script>
	let ratio = 16 / 9;
	let elRatioBox;
	let allowOverflow = false;

	$: {
		ratio = ratio;
		if (elRatioBox) {
			let r = Number(ratio);
			if (isNaN(r) || r === 0) {
				r = 1;
			}
			elRatioBox.style['padding-bottom'] = ratio === 0 ? '100%' : `${(1 / ratio) * 100}%`;
		}
	}
</script>

<div class="container">
	<h1>RatioBox</h1>
	<p>
		Constuit une boîte prenant toute la largeur de son container et dont la hauteur est obtenue par
		un ratio largeur/hauteur donné en paramètre. On peut spécifier si le contenu peut déborder (par
		exemple pour un article), ou non (un player vidéo).
	</p>
	<p>TODO: en faire un component.</p>
	<label>Ratio<input type="text" bind:value={ratio} /></label>
	<label><input type="checkbox" bind:checked={allowOverflow} />Can overflow?</label>
	<div style="margin: 12px;" bind:this={elRatioBox} class="ratio-box">
		<div class="absolute-box" class:overflow={allowOverflow}>
			<div class="overflow-box">
				Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée
				!<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie
				tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh,
				jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh,
				oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br
				/>Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie
				tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh,
				jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh,
				oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br
				/>Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie
				tournée !<br />Oh, oh, oh, jolie tournée !<br />Oh, oh, oh, jolie tournée !<br />
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		width: 700px;
		margin: 0 auto;
	}

	.ratio-box {
		background-color: red;
		position: relative;
		height: 0;
		width: 100%;
		padding-top: 0 !important;
		padding-right: 0 !important;
		padding-bottom: 0;
		padding-left: 0 !important;
		margin-right: 0 !important;
		margin-left: 0 !important;
	}

	.absolute-box {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
	}

	.overflow {
		overflow: auto;
	}

	.overflow-box {
		position: relative;
	}
</style>
