<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<section>
	<div class="slide-inner">
		{@render children?.()}
	</div>
</section>

<style>
	section {
		height: 100%;
	}

	.slide-inner {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: auto;
		min-height: 0;
		overflow-y: auto;
		box-sizing: border-box;
		padding: 1.5rem;
		background: #ffffff;
	}

	@media (max-width: 700px) {
		section {
			height: auto;
			min-height: calc(100dvh - 72px);
		}

		.slide-inner {
			position: relative;
			inset: auto;
			height: auto;
			min-height: 0;
			padding: 2rem 1rem;
			overflow: visible;
		}
	}
</style>
