<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block, TextRichTextItemResponse } from './types.js';
	import Text from './Text.svelte';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
	export let prefix = '';
	export let textClass: string | ((text: TextRichTextItemResponse, block?: Block) => string) = '';

	$: toggleable = block[block.type].is_toggleable || block.type === 'toggle';
</script>

<p
	id={block.id}
	class:inline={toggleable}
	class={twMerge(
		'break-word mb-2',
		block.type === 'quote' ? 'border-foreground border-l-4 pl-4' : '',
		block.type === 'callout' ? `bg-gray-50 p-4` : '',
		clazz
	)}
>
	{#if block[block.type]?.icon?.emoji}
		<span class="pr-4">{block?.[block.type]?.icon?.emoji}</span>
	{/if}

	{#if block[block.type]?.rich_text?.length === 0}
		<br />
	{:else}
		<Text {block} {prefix} {textClass} />
	{/if}
</p>
