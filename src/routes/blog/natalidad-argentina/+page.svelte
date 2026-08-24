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
	const handleResize = () => {
		requestAnimationFrame(() => {
			if (!deck || !reveal) return;
			deck.configure({ width: window.innerWidth, height: reveal.clientHeight });
			deck.layout();
		});
	};

	onMount(() => {
		const waitForSlides = () => {
			const sections = reveal?.querySelectorAll('.slides > section');
			if (sections && sections.length > 0) {
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
				window.addEventListener('resize', handleResize);
				handleResize();
			} else {
				requestAnimationFrame(waitForSlides);
			}
		};
		requestAnimationFrame(waitForSlides);
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
</style>
