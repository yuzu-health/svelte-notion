<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
	export let level: number;
</script>

<div
	id={block.id}
	class={twMerge(
		'mb-2 grid grid-flow-row gap-2 md:gap-4',
		block.children.length === 5
			? 'grid-cols-5'
			: block.children.length === 4
			? 'grid-cols-4'
			: block.children.length === 3
			? 'grid-cols-3'
			: block.children.length === 2
			? 'grid-cols-2'
			: block.children.length === 1
			? 'grid-cols-1'
			: 'grid-flow-column',
		level === 0 ? clazz : ''
	)}
>
	{#each block.children || [] as column (column.id)}
		<div>
			<slot {column} />
		</div>
	{/each}
</div>
