<script lang="ts">
	let { year = $bindable(1850), min = 1850, max = 2025 } = $props();
</script>

<div class="w-full">
	<div class="mb-3 text-center">
		<span class="font-mono text-3xl font-bold">
			{year}
		</span>
	</div>

	<div>
		<input
			type="range"
			{min}
			{max}
			step="1"
			bind:value={year}
			aria-label="Año"
			class="timeline w-full"
		/>

		<div class="mt-2 flex justify-between font-mono text-xs text-gray-500">
			<span>{min}</span>
			<span>1900</span>
			<span>1950</span>
			<span>2000</span>
			<span>{max}</span>
		</div>
	</div>
</div>

<style>
	.timeline {
		appearance: none;
		width: 100%;
		height: 2px;
		background: #222;
		cursor: pointer;
	}

	.timeline::-webkit-slider-thumb {
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: #222;
		cursor: grab;
	}

	.timeline::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border: none;
		border-radius: 50%;
		background: #222;
		cursor: grab;
	}
</style>
