<script lang="ts">
	import * as d3 from 'd3';

	type GenderData = {
		year: number;
		male: number;
		female: number;
	};

	let {
		data = []
	}: {
		data?: GenderData[];
	} = $props();

	let chartContainer: HTMLDivElement;

	$effect(() => {
		if (!chartContainer || !data.length) return;

		const width = 900;
		const height = 500;

		const margin = {
			top: 30,
			right: 30,
			bottom: 50,
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

		const x = d3
			.scaleLinear()
			.domain(d3.extent(data, (d) => d.year) as [number, number])
			.range([0, innerWidth]);

		const maxValue = d3.max(data, (d) => Math.max(d.male, d.female)) ?? 0;

		const y = d3
			.scaleLinear()
			.domain([0, maxValue])
			.nice()
			.range([innerHeight, 0]);
	
		chart
			.append('g')
			.attr('class', 'grid')
			.call(
				d3
					.axisLeft(y)
					.tickSize(-innerWidth)
					.tickFormat(() => '')
			)
			.selectAll('line')
			.attr('stroke', '#e5e7eb');

         chart
			.append('g')
			.attr('transform', `translate(0,${innerHeight})`)
			.call(
				d3
					.axisBottom(x)
					.ticks(8)
					.tickFormat(d3.format('d'))
			)
			.selectAll('text')
			.attr('font-size', '12px');

		chart
			.append('g')
			.call(d3.axisLeft(y).ticks(6))
			.selectAll('text')
			.attr('font-size', '12px');

		const maleArea = d3
			.area<GenderData>()
			.x((d) => x(d.year))
			.y0(innerHeight)
			.y1((d) => y(d.male))
			.curve(d3.curveMonotoneX);

		chart
			.append('path')
			.datum(data)
			.attr('d', maleArea)
			.attr('fill', '#dcfce7');

		const maleLine = d3
			.line<GenderData>()
			.x((d) => x(d.year))
			.y((d) => y(d.male))
			.curve(d3.curveMonotoneX);

		chart
			.append('path')
			.datum(data)
			.attr('d', maleLine)
			.attr('fill', 'none')
			.attr('stroke', '#16a34a')
			.attr('stroke-width', 2);

		const femaleArea = d3
			.area<GenderData>()
			.x((d) => x(d.year))
			.y0(innerHeight)
			.y1((d) => y(d.female))
			.curve(d3.curveMonotoneX);

		chart
			.append('path')
			.datum(data)
			.attr('d', femaleArea)
			.attr('fill', '#ffedd5');

		const femaleLine = d3
			.line<GenderData>()
			.x((d) => x(d.year))
			.y((d) => y(d.female))
			.curve(d3.curveMonotoneX);

		chart
			.append('path')
			.datum(data)
			.attr('d', femaleLine)
			.attr('fill', 'none')
			.attr('stroke', '#f97316')
			.attr('stroke-width', 2);

		chart
			.append('text')
			.attr('x', innerWidth)
			.attr('y', y(data[data.length - 1].male) - 10)
			.attr('text-anchor', 'end')
			.attr('font-size', '14px')
			.attr('font-weight', '600')
			.attr('fill', '#16a34a')
			.text('Hombres');

		chart
			.append('text')
			.attr('x', innerWidth)
			.attr('y', y(data[data.length - 1].female) - 10)
			.attr('text-anchor', 'end')
			.attr('font-size', '14px')
			.attr('font-weight', '600')
			.attr('fill', '#f97316')
			.text('Mujeres');
	});
</script>

<div bind:this={chartContainer} class="w-full"></div>