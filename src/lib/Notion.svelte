<script lang="ts">
	import Block from './Block.svelte';
	import TableContents from './TableContents.svelte';
	import type { Block as BlockType } from './types.js';

	let clazz = '';
	export { clazz as class };
	export let blocks: BlockType[] = [];
	export let pathname = '/';
	export let prefix = '';
</script>

<div class="svelte-notion whitespace-pre-line leading-relaxed {clazz}">
	{#each blocks || [] as block, i (block.id)}
		{#if block?.type === 'table_of_contents'}
			<TableContents {blocks} />
		{:else if block}
			{#if !block[block.type].is_toggleable && block.type !== 'toggle'}
				<Block {block} {pathname} {prefix} resetCount={blocks?.[i - 1]?.type !== block.type} />
			{:else}
				<details>
					<summary class="cursor-pointer">
						<Block {block} {pathname} {prefix} resetCount={blocks?.[i - 1]?.type !== block.type} />
					</summary>

					<div class="pl-4">
						<svelte:self blocks={block.children} {pathname} {prefix} />
					</div>
				</details>
			{/if}
		{/if}
	{/each}
</div>

<style lang="postcss">
	@tailwind components;
	@tailwind utilities;
</style>
