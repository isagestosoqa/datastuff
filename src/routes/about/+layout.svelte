<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="bg-cc-bg text-cc-ink min-h-screen">
	{@render children()}
</div>
