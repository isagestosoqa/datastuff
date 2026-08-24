<script lang="ts">
	import { resolve } from '$app/paths';

	type Note = {
		id: string;
		href: string;
		title: string;
		category: string;
		blurb: string;
		author: string;
		date: string;
		body: string[];
	};

	let { data }: { data: { notes: Note[] } } = $props();
</script>

<svelte:head>
	<title>Data Stuff</title>
</svelte:head>

<main class="mx-auto max-w-300 px-4 py-8 sm:px-6 lg:px-8">
	<section class="grid gap-10 md:grid-cols-3 xl:grid-cols-3">
		{#each data.notes as note, index (note.id)}
			<article class={`group ${index === 0 ? 'md:col-span-2' : ''}`}>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a
					href={resolve(note.href as Parameters<typeof resolve>[0])}
					class="block transition-transform duration-300 hover:-translate-y-0.5"
				>
					<div class="pt-6">
						<h2
							class="font-display hover:text-cc-current mt-3 text-[2rem] leading-[0.9] tracking-[-0.07em] uppercase transition-colors duration-300 md:text-[2.8rem]"
						>
							{note.title}
						</h2>

						<p class="mt-5 max-w-[60ch] font-sans text-base leading-7 sm:text-lg">
							{note.blurb}
						</p>

						<p class="mt-4 font-sans text-xs tracking-wider uppercase">
							{note.author} · {note.date}
						</p>
					</div>
				</a>
			</article>
		{/each}
	</section>
</main>
