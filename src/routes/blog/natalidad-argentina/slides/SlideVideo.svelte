<script lang="ts">
	import Slide from '$lib/components/Slide.svelte';
</script>

<Slide>
	<div class="intro-content">
		<h1 class="text-md font-bold">Este es Javier Milei en el Council de las Americas de 2026</h1>
		<video class="intro-video" src="/assets/natalidad-intro.mp4" autoplay muted loop playsinline
		></video>
	</div>
</Slide>

<style>
	.intro-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		width: min(90vw, 900px);
		text-align: center;
		font-family: var(--font-paragraph);
	}

	h1 {
		margin: 0;
		font-size: clamp(1.25rem, 2.5vw, 2rem);
		line-height: 1.2;
		font-weight: 700;
	}

	.intro-video {
		display: block;
		width: 45%;
		max-width: 420px;
		max-height: 60vh;
		object-fit: contain;
		border-radius: 8px;
	}

	@media (max-width: 700px) {
		.intro-content {
			gap: 0.75rem;
			width: min(92vw, 420px);
		}

		.intro-video {
			width: 70%;
			max-width: 280px;
			max-height: 45vh;
		}
	}
</style>
