<script lang="ts">
	let {
		height,
		margin,
		label = ''
	}: {
		height: number;
		margin: {
			left: number;
		};
		label?: string;
	} = $props();
</script>

{#if label}
	<text
		x={margin.left - 35}
		y={height / 2}
		text-anchor="middle"
		transform={`rotate(-90 ${margin.left - 35} ${height / 2})`}
	>
		{label}
	</text>
{/if}
