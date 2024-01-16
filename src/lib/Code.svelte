<script lang="ts">
	import type { Block } from './types.js';
	import { twMerge } from 'tailwind-merge';
	import Prism from 'prismjs';

	export let block: Block;
	let clazz = '';
	export { clazz as class };

	$: texts = block[block.type].rich_text || [];
	$: language = block[block.type].language || '';
</script>

<code
	id={block.id}
	style:tab-size="2"
	class={twMerge(
		'bg-gray-50 mb-2 block overflow-scroll whitespace-pre p-4 md:p-6 text-sm w-0 min-w-full',
		clazz
	)}
>
	{#each texts as text}
		<div>
			{#if Prism.languages[language]}
				{@html Prism.highlight(text.text?.content, Prism.languages[language], language)}
			{:else}
				{text.text?.content}
			{/if}
		</div>
	{/each}
</code>

<style>
	:global(.token.operator) {
		background: none !important;
	}
</style>
