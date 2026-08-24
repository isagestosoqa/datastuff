<script lang="ts">
	import SlideVideo from './slides/SlideVideo.svelte';
	import Slide1 from './slides/Slide1.svelte';
	import Slide2 from './slides/Slide2.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SlideVideo />
<Slide1 />
<Slide2 {data} />
