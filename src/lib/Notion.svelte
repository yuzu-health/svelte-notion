<script lang="ts">
	import Block from './Block.svelte';
	import type { Block as BlockType } from './types.js';

	export let clazz: string | ((block: BlockType) => string) = '';
	export { clazz as class };
	export let blockClass: string | ((block: BlockType) => string) = '';
	export let blocks: BlockType[] = [];
	export let highlightClass = '';
	export let pathname = '/';
	export let prefix = '';

	$: className = typeof clazz === 'function' ? clazz : (_b: BlockType) => clazz as string;

	$: props = { blockClass, pathname, prefix, highlightClass, blocks };
</script>

{#each blocks || [] as block, i (block.id)}
	{#if !block[block.type].is_toggleable && block.type !== 'toggle'}
		<div class="svelte-notion {className(block)}">
			<Block {...props} {block} />
		</div>
	{:else}
		<details class={className(block)}>
			<summary class="cursor-pointer svelte-notion">
				<Block {...props} {block} />
			</summary>

			<svelte:self
				class={clazz}
				{blockClass}
				blocks={block.children}
				{highlightClass}
				{pathname}
				{prefix}
			/>
		</details>
	{/if}
{/each}

<style lang="postcss">
	@tailwind components;
	@tailwind utilities;

	.svelte-notion {
		@apply whitespace-pre-line leading-relaxed;
	}
</style>
