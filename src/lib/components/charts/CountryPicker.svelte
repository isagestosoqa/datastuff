<script lang="ts">
	type Country = { code: string; name: string; data: unknown[] };

	let {
		paises,
		selected = $bindable([]),
		max = 3
	}: {
		paises: Country[];
		selected: string[];
		max?: number;
	} = $props();

	let limitReached = $derived(selected.length >= max);

	function addCountry(e: Event) {
		const select = e.currentTarget as HTMLSelectElement;
		const code = select.value;
		if (code && !selected.includes(code) && selected.length < max) {
			selected = [...selected, code];
		}
		select.value = '';
	}

	function removeCountry(code: string) {
		selected = selected.filter((c) => c !== code);
	}
</script>

<div class="mb-4 flex flex-wrap items-center gap-2 font-sans text-sm">
	<select
		aria-label="Agregar país al gráfico"
		onchange={addCountry}
		disabled={limitReached}
		class="country-select border-cc-current/30 bg-cc-bg rounded border px-2 py-1 text-xs tracking-wider uppercase disabled:cursor-not-allowed disabled:opacity-40"
	>
		<option value="">
			{limitReached ? `Máximo ${max} países` : '+ Agregar país'}
		</option>
		{#each paises as p (p.code)}
			{#if !selected.includes(p.code)}
				<option value={p.code}>{p.name}</option>
			{/if}
		{/each}
	</select>

	{#each selected as code (code)}
		{@const country = paises.find((p) => p.code === code)}
		{#if country}
			<button
				type="button"
				aria-label={`Quitar ${country.name}`}
				onclick={() => removeCountry(code)}
				class="country-chip border-cc-current/30 rounded-full border px-3 py-1 text-xs tracking-wider uppercase hover:opacity-60"
			>
				{country.name} ✕
			</button>
		{/if}
	{/each}

	{#if !limitReached}
		<span class="text-cc-current/50 text-[10px] tracking-wider uppercase">
			{selected.length}/{max}
		</span>
	{/if}
</div>

<style>
	div {
		justify-content: center;
		width: 100%;
	}
	.country-select {
		position: relative;
		z-index: 2;
		width: min(100%, 260px);
		min-height: 2.25rem;
		touch-action: manipulation;
		pointer-events: auto;
	}

	.country-chip {
		position: relative;
		z-index: 2;
		min-height: 2.25rem;
		touch-action: manipulation;
		pointer-events: auto;
	}

	@media (max-width: 700px) {
		div {
			gap: 0.5rem;
		}

		.country-chip {
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
