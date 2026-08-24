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
		class="border-cc-current/30 bg-cc-bg rounded border px-2 py-1 text-xs tracking-wider uppercase disabled:cursor-not-allowed disabled:opacity-40"
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
				onclick={() => removeCountry(code)}
				class="border-cc-current/30 rounded-full border px-3 py-1 text-xs tracking-wider uppercase hover:opacity-60"
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
</style>
