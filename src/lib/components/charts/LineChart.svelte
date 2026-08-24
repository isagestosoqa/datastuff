<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import type { AxisDomain, AxisScale } from 'd3-axis';
	import { extent, max } from 'd3-array';
	import { line, curveBasis } from 'd3-shape';
	import { onMount } from 'svelte';
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
	let wrapper: HTMLDivElement;

	onMount(() => {
		const updateWidth = () => {
			width = wrapper.clientWidth;
		};

		const observer = new ResizeObserver(updateWidth);
		observer.observe(wrapper);
		updateWidth();

		return () => observer.disconnect();
	});

	const margin = {
		top: 10,
		right: 90,
		bottom: 30,
		left: 50
	};
	const abortionApprovalDate = new Date(2020, 0, 1);

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

	let abortionApprovalX = $derived(xScale ? xScale(abortionApprovalDate) : null);

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

<div class="wrapper" bind:this={wrapper}>
	{#if allPoints.length && width && xScale && yScale && lineGenerator}
		<svg class="chart-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
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

			{#if abortionApprovalX !== null}
				<line
					x1={abortionApprovalX}
					x2={abortionApprovalX}
					y1={margin.top}
					y2={height - margin.bottom}
					stroke="#cbd5e1"
					stroke-width="2"
					stroke-dasharray="6 5"
				/>
				<text
					x={abortionApprovalX + 6}
					y={margin.top + 14}
					fill="#94a3b8"
					font-size="12"
					font-weight="600"
				>
					IVE 2020
				</text>
			{/if}

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

			<!-- ETIQUETA  -->
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
		min-width: 0;
		width: min(100%, 1100px);
		margin-inline: auto;
	}

	.chart-svg {
		display: block;
		width: 100%;
		height: auto;
		font-family: var(--font-paragraph);
	}
</style>
