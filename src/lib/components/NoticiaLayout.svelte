<script lang="ts">
	type Note = {
		title: string;
		blurb: string;
		author: string;
		date: string;
		body: string[];
	};

	let { note }: { note: Note } = $props();
</script>

<svelte:head>
	<title>{note.title}</title>
	<meta name="description" content={note.blurb} />
</svelte:head>

<main class="mx-auto max-w-300 px-4 py-12 sm:px-6 lg:px-8">
	<header class="mx-auto max-w-250">
		<p class="text-cc-current font-sans text-[10px] font-semibold tracking-[0.2em] uppercase">
			Noticias
		</p>
		<h1
			class="font-display mt-5 text-[3rem] leading-[0.9] tracking-[-0.06em] uppercase sm:text-[4.5rem] md:text-[6rem]"
		>
			{note.title}
		</h1>
		<p class="mt-8 max-w-[60ch] font-sans text-lg leading-8 sm:text-xl">
			{note.blurb}
		</p>
		<div class="mt-6 flex gap-3 font-sans text-xs tracking-wider uppercase">
			<span>{note.author}</span>
			<span>·</span>
			<span>{note.date}</span>
		</div>
	</header>

	<figure class="mx-auto mt-12 max-w-275"></figure>

	<article class="mx-auto mt-14 max-w-[70ch]">
		{#each note.body as paragraph, i (i)}
			<p class="mb-7 font-sans text-lg leading-8 sm:text-xl sm:leading-9">
				{paragraph}
			</p>
		{/each}
	</article>
</main>
