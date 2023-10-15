<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';
	import Text from './Text.svelte';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
	export let prefix = '';
	export let highlightClass = '';

	$: toggleable = block[block.type].is_toggleable || block.type === 'toggle';
</script>

<p
	id={block.id}
	class:inline-block={toggleable}
	class={twMerge(
		'break-word my-1',
		block.type === 'quote' ? 'border-primary border-l-4 pl-4' : '',
		block.type === 'callout' ? twMerge(`bg-gray-50 mb-1 p-4`, highlightClass) : '',
		clazz
	)}
>
	{#if block[block.type]?.icon?.emoji}
		<span class="pr-4">{block?.[block.type]?.icon?.emoji}</span>
	{/if}

	{#if block[block.type]?.rich_text?.length === 0}
		<br />
	{:else}
		<Text {block} {prefix} texts={block[block.type].rich_text || []} />
	{/if}
</p>
