<script lang="ts">
	import Slide from '$lib/components/Slide.svelte';
	import LineChart from '$lib/components/charts/LineChart.svelte';
	import CountryPicker from '$lib/components/charts/CountryPicker.svelte';
	import type { PageData } from '../$types';

	let { data }: { data: PageData } = $props();

	let selectedCodes = $state<string[]>([]);
	let innerWidth = $state(0);

	let chartHeight = $derived(innerWidth < 700 ? 260 : 350);

	const palette = ['#34d399', '#f472b6', '#60a5fa', '#fb923c', '#a3e635', '#e879f9'];

	type ChartDatum = { date: string | Date; value: string | number };
	type ChartSeries = { data: ChartDatum[]; color: string; label: string };

	let dynamicSeries = $derived<ChartSeries[]>(
		selectedCodes.map((code, i) => {
			const country = data.paises.find((p) => p.code === code)!;
			return {
				data: country.data,
				color: palette[i % palette.length],
				label: country.name
			};
		})
	);

	let allSeries = $derived<ChartSeries[]>([
		{ data: data.natalidad.argentina, color: '#c084fc', label: 'Argentina' },
		{ data: data.natalidad.mundo, color: '#fcd34d', label: 'Mundo' },
		...dynamicSeries
	]);
</script>

<svelte:window bind:innerWidth />

<Slide>
	<div class="chart-slide w-full px-2 sm:px-6">
		<CountryPicker paises={data.paises} bind:selected={selectedCodes} />
		<LineChart
			series={allSeries}
			height={chartHeight}
			yLabel="Nacimientos por cada 1.000 habitantes ↓"
		/>
	</div>
</Slide>

<style>
	.chart-slide {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: min(100%, 1100px);
		height: 100%;
		min-height: 100%;
		margin-inline: auto;
		background: #ffffff;
	}
</style>
