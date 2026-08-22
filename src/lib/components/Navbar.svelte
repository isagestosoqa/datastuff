<script lang="ts">
	import { resolve } from '$app/paths';

	let scrollY = $state(0);
	let scrolled = $derived(scrollY > 10);
</script>

<svelte:window bind:scrollY />

<nav
	class="sticky top-0 z-50 mx-auto flex max-w-350 items-center justify-between gap-4 px-4 py-4 transition-all duration-300 sm:px-6 lg:px-10 {scrolled
		? 'bg-white shadow-sm'
		: 'bg-transparent'}"
>
	<a href={resolve('/')} class="">
		<span class="flex text-4xl font-black sm:text-2xl"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="#black"
				><path
					d="M600-160v-80h120v-480H600v-80h200v640H600Zm-440 0v-640h200v80H240v480h120v80H160Z"
				/></svg
			>Data Stuff</span
		>
	</a>
	<div class="flex items-center gap-3 font-sans text-xl font-bold uppercase sm:gap-5">
		<!-- 		<a href={resolve('/about')} class="transition-colors duration-200 hover:text-[#39ff14]">
			About Me
		</a> -->
		<a
			href="https://www.linkedin.com/in/mariaisabelgestosodorado/"
			target="_blank"
			class="transition-colors duration-200 hover:text-[#39ff14]"
		>
			LinkedIn
		</a>
	</div>
</nav>
