<script lang="ts">
	import type { Block } from './types.js';
	import { twMerge } from 'tailwind-merge';
	import prism from 'prismjs';
	import 'prismjs/components/prism-typescript';

	const { highlight, languages } = prism;

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
		'bg-gray-50 mb-1 block overflow-scroll whitespace-pre p-4 text-sm w-0 min-w-full',
		clazz
	)}
>
	{#each texts as text}
		<div>
			{#if languages[language]}
				{@html highlight(text.text?.content, languages[language], language)}
			{:else}
				{text.text?.content}
			{/if}
		</div>
	{/each}
</code>

<svelte:head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	:global(.token.operator) {
		background: none !important;
	}
</style>
