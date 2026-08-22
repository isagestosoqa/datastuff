<script lang="ts">
	import LineChart from '$lib/components/charts/LineChart.svelte';
	import CountryPicker from '$lib/components/charts/CountryPicker.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedCodes: string[] = $state([]);

	const palette = ['#34d399', '#f472b6', '#60a5fa', '#fb923c', '#a3e635', '#e879f9'];

	let dynamicSeries = $derived(
		selectedCodes.map((code, i) => {
			const country = data.paises.find((p) => p.code === code)!;
			return {
				data: country.data,
				color: palette[i % palette.length],
				label: country.name
			};
		})
	);

	let allSeries = $derived([
		{ data: data.natalidad.argentina, color: '#c084fc', label: 'Argentina' },
		{ data: data.natalidad.mundo, color: '#fcd34d', label: 'Mundo' },
		...dynamicSeries
	]);
</script>

<svelte:head>
	<title>Natalidad en Argentina</title>
	<meta
		name="description"
		content="La evolución de la tasa de natalidad en Argentina desde 1960."
	/>
</svelte:head>

<article class="mx-auto mt-14 max-w-[70ch]">
	<p class="mb-7 font-sans text-2xl leading-8 font-black">¿Solo en Argentina cae la natalidad?</p>
	<p class="text-md mb-7 font-sans leading-8">
		De los creadores de "mata bebés" y "podría ser ingeniero", el presidente Javier Milei nos trae
		"Esa pasión por asesinar niños en el vientre de la madre también nos está costando caro en
		términos de crecimiento, y ni les cuento en términos de sistema previsional". Esta semana, Milei
		estuvo en el Council de las Américas donde volvió a vincular la caída de la natalidad con el
		aborto legal. Sin embargo, los datos del Ministerio de Salud muestran que la natalidad cae desde
		2014, mientras que la Ley de IVE se aprobó en diciembre de 2020. Pero además, la caída de la
		natalidad tiene causas multifactoriales y sucede en todo el mundo.
	</p>

	<CountryPicker paises={data.paises} bind:selected={selectedCodes} />

	<LineChart
		series={allSeries}
		xAccessor={(d) => new Date(String(d.date))}
		yAccessor={(d) => Number(d.value)}
		yLabel="Nacimientos por cada 1.000 habitantes ↓"
	/>

	<p class="mb-7 font-sans text-lg leading-8"></p>
</article>
