<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block, TextRichTextItemResponse } from './types.js';
	import Text from './Text.svelte';

	export let block: Block;
	let clazz = '';
	export { clazz as class };
	export let prefix = '';
	export let blocks: Block[];
	export let textClass: string | ((text: TextRichTextItemResponse, block?: Block) => string) = '';

	$: blockIndex = blocks.findIndex((b) => b.id === block.id);
	$: itemNum = blocks.slice(0, blockIndex).findLastIndex((b) => b.type !== block.type);
</script>

<div
	id={block.id}
	class={twMerge(
		'relative mb-1 gap-2 pl-4',
		blocks[blockIndex + 1]?.type !== block.type ? 'mb-3' : '',
		clazz
	)}
>
	{#if block.type === 'bulleted_list_item'}
		<span class="absolute left-0">•</span>
	{:else}
		<span class="absolute -left-1">{blockIndex - itemNum}.</span>
	{/if}

	<Text {block} {prefix} {textClass} />
</div>
