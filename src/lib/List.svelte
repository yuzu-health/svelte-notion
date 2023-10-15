<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';
	import Text from './Text.svelte';

	export let block: Block;
	let clazz = '';
	export { clazz as class };
	export let prefix = '';
</script>

<div
	id={block.id}
	class={twMerge('relative my-1.5 gap-2 pl-4', clazz)}
	class:count={block.type === 'numbered_list_item'}
>
	{#if block.type === 'bulleted_list_item'}
		<span class="absolute left-0">•</span>
	{:else}
		<span class="counter absolute left-0">.</span>
	{/if}

	<Text {block} {prefix} />
</div>

<style>
	.counter::before {
		content: counter(my-counter);
	}
</style>
