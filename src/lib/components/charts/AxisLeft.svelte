<script lang="ts">
	import { axisLeft, type AxisDomain, type AxisScale } from 'd3-axis';
	import { select } from 'd3-selection';

	let {
		yScale,
		margin
	}: {
		yScale: AxisScale<AxisDomain>;
		margin: { left: number };
	} = $props();

	let axis: SVGGElement;

	$effect(() => {
		if (!axis || !yScale) return;

		const yAxis = axisLeft(yScale);

		select(axis).call(yAxis);
	});
</script>

<g bind:this={axis} transform={`translate(${margin.left}, 0)`}></g>

<g bind:this={axis} transform={`translate(${margin.left}, 0)`}></g>
