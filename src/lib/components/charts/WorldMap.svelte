<script lang="ts">
	import type { FeatureCollection } from 'geojson';
	import { geoPath, geoNaturalEarth1 } from 'd3-geo';

	type SuffrageRecord = {
		code: string;
		entity: string;
		men: number | null;
		women: number | null;
	};

	type Props = {
		geo: FeatureCollection;
		suffrage: Map<string, SuffrageRecord>;
		year: number;
	};

	let { geo, suffrage, year }: Props = $props();

	let width = $state(0);

	let height = $derived(width * 0.55);

	let projection = $derived(geoNaturalEarth1().fitSize([width, height], geo));

	let path = $derived(geoPath().projection(projection));

	let countries = $derived(geo.features);
</script>

<div bind:clientWidth={width}>
	{#if width > 0}
		<svg
			{width}
			{height}
			viewBox={`0 0 ${width} ${height}`}
			role="img"
			aria-label={`Mapa mundial del sufragio en ${year}`}
		>
			{#each countries as country, i (i)}
				{@const code = country.id as string}
				{@const countryData = suffrage.get(code)}

				<path
					d={path(country) ?? ''}
					fill={countryData?.women != null && year >= countryData.women
						? 'pink'
						: countryData?.men != null && year >= countryData.men
							? 'lightblue'
							: '#eee'}
					stroke="white"
					stroke-width="0.5"
				/>
			{/each}
		</svg>
	{/if}
</div>
