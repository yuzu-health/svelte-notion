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
	class={twMerge('mb-2 mt-8', clazz)}
	class:inline-block={block[block.type].is_toggleable}
>
	<Text {block} {prefix} texts={block[block.type].rich_text} />
</svelte:element>
