<script lang="ts">
	import 'reveal.js/dist/reveal.css';
	import Reveal from 'reveal.js';
	import type { Api as RevealApi } from 'reveal.js';
	import { onMount, onDestroy } from 'svelte';
	import Presentation from './Presentation.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let reveal: HTMLDivElement;
	let deck = $state<RevealApi>();
	let mobile = $state(false);

	const initializeReveal = () => {
		if (mobile || deck || !reveal) return;
		deck = new Reveal(reveal, {
			width: window.innerWidth,
			height: reveal.clientHeight,
			margin: 0,
			hash: true,
			controls: true,
			progress: true,
			transition: 'slide',
			transitionSpeed: 'slow'
		});
		deck.initialize();
	};

	const destroyReveal = () => {
		deck?.destroy();
		deck = undefined;
	};

	const handleResize = () => {
		mobile = window.matchMedia('(max-width: 700px)').matches;
		if (mobile) {
			destroyReveal();
		} else if (deck) {
			deck.configure({ width: window.innerWidth, height: reveal.clientHeight });
			deck.layout();
		} else {
			initializeReveal();
		}
	};

	onMount(() => {
		mobile = window.matchMedia('(max-width: 700px)').matches;
		requestAnimationFrame(initializeReveal);
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		window.removeEventListener('resize', handleResize);
		deck?.destroy?.();
	});
</script>

<svelte:head>
	<title>Natalidad en Argentina</title>
	<meta
		name="description"
		content="La evolución de la tasa de natalidad en Argentina desde 1960."
	/>
</svelte:head>

<div class="reveal" bind:this={reveal}>
	<div class="slides">
		<Presentation {data} />
	</div>
</div>

<style>
	.reveal {
		height: calc(100dvh - 72px);
		min-height: 420px;
		width: 100vw;
	}

	@media (max-width: 700px) {
		:global(html),
		:global(body) {
			height: auto !important;
			min-height: 100%;
			overflow-x: hidden !important;
			overflow-y: auto !important;
		}

		.reveal {
			display: block !important;
			height: auto;
			min-height: 0;
			overflow: visible !important;
			touch-action: pan-y;
		}

		.reveal :global(.slides) {
			position: static !important;
			display: flex;
			flex-direction: column;
			gap: 0;
			width: 100% !important;
			height: auto;
			overflow: visible !important;
			transform: none !important;
		}

		.reveal :global(.slides > section) {
			position: relative;
			display: flex !important;
			visibility: visible !important;
			width: 100%;
			height: auto !important;
			min-height: 0;
			transform: none !important;
		}

		.reveal :global(.controls),
		.reveal :global(.progress) {
			display: none;
		}
	}
</style>
