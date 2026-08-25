<script lang="ts">
	import * as d3 from 'd3';

	type PeaceData = {
		decade: number;
		female_winners: number;
	};

	let {
		data = []
	}: {
		data?: PeaceData[];
	} = $props();

	let chartContainer: HTMLDivElement;

	$effect(() => {
		if (!chartContainer || !data.length) return;

		const width = 900;
		const height = 450;

		const margin = {
			top: 30,
			right: 30,
			bottom: 60,
			left: 55
		};

		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		d3.select(chartContainer).selectAll('*').remove();

		const svg = d3
			.select(chartContainer)
			.append('svg')
			.attr('viewBox', `0 0 ${width} ${height}`)
			.attr('width', '100%')
			.attr('height', 'auto');

		const chart = svg
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Escala X
		const x = d3
			.scaleLinear()
			.domain(d3.extent(data, (d) => d.decade) as [number, number])
			.range([0, innerWidth]);

		// Escala Y
		const maxValue = d3.max(data, (d) => d.female_winners) ?? 0;

		const y = d3
			.scaleLinear()
			.domain([0, maxValue])
			.nice()
			.range([innerHeight, 0]);

		// Grid
		chart
			.append('g')
			.call(
				d3
					.axisLeft(y)
					.tickSize(-innerWidth)
					.tickFormat(() => '')
			)
			.selectAll('line')
			.attr('stroke', '#e5e7eb');

		// Eje X
		chart
			.append('g')
			.attr('transform', `translate(0,${innerHeight})`)
			.call(
				d3
					.axisBottom(x)
					.ticks(Math.min(data.length, 10))
					.tickFormat(d3.format('d'))
			);

		// Eje Y
		chart
			.append('g')
			.call(d3.axisLeft(y).ticks(5));

		// Línea
		const line = d3
			.line<PeaceData>()
			.x((d) => x(d.decade))
			.y((d) => y(d.female_winners))
			.curve(d3.curveMonotoneX);

		chart
			.append('path')
			.datum(data)
			.attr('d', line)
			.attr('fill', 'none')
			.attr('stroke', '#f97316')
			.attr('stroke-width', 3);

		// Puntos
		chart
			.selectAll('.dot')
			.data(data)
			.join('circle')
			.attr('class', 'dot')
			.attr('cx', (d) => x(d.decade))
			.attr('cy', (d) => y(d.female_winners))
			.attr('r', 5)
			.attr('fill', '#f97316');

		// Valores
		chart
			.selectAll('.value')
			.data(data)
			.join('text')
			.attr('class', 'value')
			.attr('x', (d) => x(d.decade))
			.attr('y', (d) => y(d.female_winners) - 12)
			.attr('text-anchor', 'middle')
			.attr('font-size', '13px')
			.attr('font-weight', '600')
			.text((d) => d.female_winners);
	});
</script>

<div bind:this={chartContainer} class="w-full"></div>