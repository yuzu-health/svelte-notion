<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getTextFromBlock } from './utils.js';
	import type { Block } from './types.js';

	let clazz = '';
	export { clazz as class };
	export let blocks: Block[] = [];

	$: uniqueHeadings = [
		...new Set(blocks.map(({ type }) => type).filter((type) => type.includes('heading')))
	];

	$: marginLefts =
		uniqueHeadings.length === 3
			? { heading_1: 0, heading_2: 1, heading_3: 2 }
			: uniqueHeadings.length === 2
			? { heading_1: 0, heading_2: 1, heading_3: 1 }
			: { heading_1: 0, heading_2: 0, heading_3: 0 };
</script>

<div class={twMerge('text-sm opacity-50 space-y-2', clazz)}>
	{#each blocks as block ('toc-' + block.id)}
		{#if block.type.includes('heading')}
			<a
				style:margin-left="{// @ts-ignore
				marginLefts[block.type]}rem"
				class="block underline"
				href={`#${block.id}`}
			>
				{getTextFromBlock(block)}
			</a>
		{/if}
	{/each}
</div>
