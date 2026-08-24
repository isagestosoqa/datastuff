<script>
	let {
		caption = "And it's repeated pretty consistently throughout the story.",
		segments = [
		{ color: 'bg-violet-200' },
		{ color: 'bg-amber-100' },
		{ color: 'bg-orange-200' },
		{ color: 'bg-rose-300' }
		]
	} = $props();
</script>

<div class="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
	<p
		class="max-w-md rounded-sm bg-white/30 px-8 py-6 text-center
            font-serif text-xl text-slate-700 backdrop-blur-sm md:text-2xl"
	>
		{caption}
	</p>

	<div class="flex h-64 w-full md:h-96">
		{#each segments as segment (segment.color)}
			<div class="flex-1 {segment.color}"></div>
		{/each}
	</div>
</div>
