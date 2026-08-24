<script lang="ts">
	import type { FeatureCollection } from 'geojson';
	import { SvelteMap } from 'svelte/reactivity';
	import WorldMap from '$lib/components/charts/WorldMap.svelte';
	import Timeline from '$lib/components/charts/Timeline.svelte';

	type SuffrageRow = {
		code: string;
		entity: string;
		year: number;
		women: number;
		men: number;
	};

	type SuffrageRecord = {
		code: string;
		entity: string;
		men: number | null;
		women: number | null;
	};

	type PageData = {
		worldGeo: FeatureCollection;
		suffrage: SuffrageRow[];
	};

	let { data }: { data: PageData } = $props();

	let selectedYear = $state(1850);

	let suffrageMap = $derived.by(() => {
		const map = new SvelteMap<string, SuffrageRecord>();

		for (const row of data.suffrage) {
			if (!map.has(row.code)) {
				map.set(row.code, {
					code: row.code,
					entity: row.entity,
					men: null,
					women: null
				});
			}

			const country = map.get(row.code)!;

			// Primer año en que los hombres pudieron votar
			if (row.men === 1 && country.men === null) {
				country.men = row.year;
			}

			// Primer año en que las mujeres pudieron votar
			if (row.women === 1 && country.women === null) {
				country.women = row.year;
			}
		}

		return map;
	});
</script>

<svelte:head>
	<title>¿Qué país tardó más en dar el voto a las mujeres?</title>

	<meta
		name="description"
		content="El mapa mundial del sufragio femenino, país por país, año por año."
	/>
</svelte:head>

<article class="mx-auto mt-14 max-w-[70ch]">
	<p class="mb-7 font-sans text-2xl leading-8 font-black">
		¿Qué país tardó más en darle el voto a las mujeres?
	</p>

	<p class="text-md mb-7 font-sans leading-8"></p>

	<WorldMap geo={data.worldGeo} suffrage={suffrageMap} year={selectedYear} />

	<Timeline bind:year={selectedYear} />
</article>
