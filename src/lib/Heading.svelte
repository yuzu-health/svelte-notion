<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';
	import Text from './Text.svelte';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
	export let prefix = '';
</script>

<svelte:element
	this={block.type === 'heading_1' ? 'h1' : block.type === 'heading_2' ? 'h2' : 'h3'}
	id={block.id}
	class={twMerge(
		'mb-2 mt-4 font-semibold',
		block.type === 'heading_1' ? 'text-2xl' : block.type === 'heading_2' ? 'text-xl' : 'text-lg',
		clazz
	)}
	class:inline-block={block[block.type].is_toggleable}
>
	<Text {block} {prefix} />
</svelte:element>
