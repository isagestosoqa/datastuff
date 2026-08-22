<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import type { AxisDomain, AxisScale } from 'd3-axis';
	import { extent, max } from 'd3-array';
	import { line, curveBasis } from 'd3-shape';
	import { draw, fade } from 'svelte/transition';

	import AxisLeft from './AxisLeft.svelte';
	import AxisBottom from './AxisBottom.svelte';
	import Labels from './Labels.svelte';

	type DataPoint = Record<string, unknown>;

	type Series = {
		data: DataPoint[];
		color: string;
		label?: string;
	};

	let {
		series,
		xAccessor = (d: DataPoint) => new Date(String(d.date)),
		yAccessor = (d: DataPoint) => Number(d.value),
		yLabel = '',
		height = 350
	}: {
		series: Series[];
		xAccessor?: (d: DataPoint) => Date;
		yAccessor?: (d: DataPoint) => number;
		yLabel?: string;
		height?: number;
	} = $props();

	let width = $state(0);

	const margin = {
		top: 10,
		right: 90,
		bottom: 30,
		left: 50
	};

	let allPoints = $derived(series.flatMap((s) => s.data));

	let xScale = $derived(
		allPoints.length && width
			? scaleTime()
					.domain(extent(allPoints, xAccessor) as [Date, Date])
					.range([margin.left, width - margin.right])
			: null
	);

	let yScale = $derived(
		allPoints.length && width
			? scaleLinear()
					.domain([0, (max(allPoints, yAccessor) ?? 0) * 1.1])
					.nice()
					.range([height - margin.bottom, margin.top])
			: null
	);

	let lineGenerator = $derived(
		xScale && yScale
			? line<DataPoint>()
					.x((d) => xScale!(xAccessor(d)))
					.y((d) => yScale!(yAccessor(d)))
					.curve(curveBasis)
			: null
	);

	// Punto final de cada serie: ahí va la etiqueta con el nombre del país.
	let endLabels = $derived(
		xScale && yScale
			? series
					.filter((s) => s.data.length > 0)
					.map((s) => {
						const last = s.data[s.data.length - 1];
						return {
							label: s.label ?? '',
							color: s.color,
							x: xScale!(xAccessor(last)),
							y: yScale!(yAccessor(last))
						};
					})
			: []
	);
</script>

<div class="wrapper" bind:clientWidth={width}>
	{#if allPoints.length && width && xScale && yScale && lineGenerator}
		<svg {width} {height}>
			<!-- EJE X -->
			<AxisBottom
				{height}
				{margin}
				{xScale}
				tick_number={width > 380 ? 10 : 4}
				format={(d: Date) => d.getFullYear()}
			/>

			<!-- EJE Y -->
			<AxisLeft {margin} yScale={yScale as unknown as AxisScale<AxisDomain>} />

			<!-- LABEL DEL EJE Y -->
			<Labels {height} {margin} label={yLabel} />

			<!-- UNA LÍNEA POR SERIE -->
			{#each series as s (s.label ?? s.color)}
				<path
					in:draw={{ duration: 1500 }}
					d={lineGenerator(s.data)}
					stroke={s.color}
					stroke-width={2}
					stroke-linecap="round"
					fill="none"
				/>
			{/each}

			<!-- ETIQUETA CON EL NOMBRE, PEGADA A LA PUNTA DE CADA LÍNEA -->
			{#each endLabels as l (l.label)}
				<g in:fade={{ duration: 400, delay: 1200 }}>
					<circle cx={l.x} cy={l.y} r="3" fill={l.color} />
					<text
						x={l.x + 8}
						y={l.y}
						dy="0.32em"
						fill={l.color}
						font-size="12"
						font-family="sans-serif"
						font-weight="600"
					>
						{l.label}
					</text>
				</g>
			{/each}
		</svg>
	{/if}
</div>

<style>
	.wrapper {
		width: 100%;
	}
</style>
