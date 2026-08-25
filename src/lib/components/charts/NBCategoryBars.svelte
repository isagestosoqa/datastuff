<script lang="ts">
	import * as d3 from 'd3';

	type CategoryData = {
		category: string;
		total_winners: number;
		female_winners: number;
		female_proportion: number;
	};

	let {
		data = []
	}: {
		data?: CategoryData[];
	} = $props();

	let chartContainer: HTMLDivElement;

	$effect(() => {
		if (!chartContainer || !data.length) return;

		const width = 900;
		const height = 500;

		const margin = {
			top: 30,
			right: 30,
			bottom: 70,
			left: 60
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
			.scaleBand()
			.domain(data.map((d) => d.category))
			.range([0, innerWidth])
			.padding(0.35);

		// Escala Y
		const y = d3
			.scaleLinear()
			.domain([0, 1])
			.range([innerHeight, 0]);

		// Grid
		chart
			.append('g')
			.attr('class', 'grid')
			.call(
				d3
					.axisLeft(y)
					.tickSize(-innerWidth)
					.tickFormat(() => '')
					.ticks(5)
			)
			.selectAll('line')
			.attr('stroke', '#e5e7eb');

		// Eje X
		chart
			.append('g')
			.attr('transform', `translate(0,${innerHeight})`)
			.call(d3.axisBottom(x))
			.selectAll('text')
			.attr('font-size', '12px')
			.attr('transform', 'rotate(-25)')
			.attr('text-anchor', 'end');

		// Eje Y
		chart
			.append('g')
			.call(
				d3
					.axisLeft(y)
					.ticks(5)
					.tickFormat((d) => `${(Number(d) * 100).toFixed(0)}%`)
			)
			.selectAll('text')
			.attr('font-size', '12px');

		// Barras
		chart
			.selectAll('.bar')
			.data(data)
			.join('rect')
			.attr('class', 'bar')
			.attr('x', (d) => x(d.category) ?? 0)
			.attr('y', (d) => y(d.female_proportion))
			.attr('width', x.bandwidth())
			.attr('height', (d) => innerHeight - y(d.female_proportion))
			.attr('fill', '#f97316');

		// Porcentaje sobre cada barra
		chart
			.selectAll('.label')
			.data(data)
			.join('text')
			.attr('class', 'label')
			.attr('x', (d) => (x(d.category) ?? 0) + x.bandwidth() / 2)
			.attr('y', (d) => y(d.female_proportion) - 8)
			.attr('text-anchor', 'middle')
			.attr('font-size', '13px')
			.attr('font-weight', '600')
			.text((d) => `${(d.female_proportion * 100).toFixed(1)}%`);
	});
</script>

<div bind:this={chartContainer} class="w-full"></div>