<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import BlockComp from './Block.svelte';
	import type { Block, TextRichTextItemResponse } from './types.js';

	export let level = 0;
	export let blockClass: string | ((block: Block, level?: number) => string) = '';
	export let blocks: Block[] = [];
	export let pathname = '/';
	export let prefix = '';
	export let BlockWrapper: typeof SvelteComponent<{ block: Block }> | undefined = undefined;
	export let textClass: string | ((text: TextRichTextItemResponse, block?: Block) => string) = '';
	export let columnClass: (colNumber: number, columns: Block[]) => string = () => '';

	$: props = { blockClass, pathname, prefix, blocks, level, textClass, columnClass };
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
