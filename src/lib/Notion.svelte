<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import BlockComp from './Block.svelte';
	import type { Block } from './types.js';

	export let level = 0;
	export let blockClass: string | ((block: Block, level?: number) => string) = '';
	export let blocks: Block[] = [];
	export let highlightClass = '';
	export let pathname = '/';
	export let prefix = '';
	export let BlockWrapper: typeof SvelteComponent<{ block: Block }> | undefined = undefined;

	$: props = { blockClass, pathname, prefix, highlightClass, blocks, level };
</script>

{#each blocks || [] as block (block.id)}
	{#if BlockWrapper}
		<svelte:component this={BlockWrapper} {block}>
			<BlockComp {...props} {block} />
		</svelte:component>
	{:else}
		<BlockComp {...props} {block} />
	{/if}
{/each}

<style lang="postcss">
	@tailwind components;
	@tailwind utilities;
</style>
