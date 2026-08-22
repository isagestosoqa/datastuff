<script lang="ts">
	import { axisBottom, type AxisScale } from 'd3-axis';
	import { select } from 'd3-selection';

	let {
		height,
		margin,
		tick_number = 10,
		xScale,
		format
	}: {
		height: number;
		margin: {
			bottom: number;
		};
		tick_number?: number;
		xScale: AxisScale<Date>;
		format?: (d: Date) => string | number;
	} = $props();

	let axis: SVGGElement;

	$effect(() => {
		if (!axis || !xScale) return;

		const xAxis = axisBottom(xScale).ticks(tick_number);

		if (format) {
			xAxis.tickFormat((d) => format(d as Date) as string);
		}

		select(axis).call(xAxis);
	});
</script>

<g bind:this={axis} transform={`translate(0, ${height - margin.bottom})`}></g>
