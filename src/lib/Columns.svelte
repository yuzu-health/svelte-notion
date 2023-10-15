<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
</script>

<div id={block.id} class={twMerge('mb-4 grid grid-flow-col gap-2', clazz)}>
	{#each block.children || [] as column (column.id)}
		<slot {column} />
	{/each}
</div>
