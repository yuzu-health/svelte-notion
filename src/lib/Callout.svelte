<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
</script>

<div id={block.id} class={twMerge('break-word mb-2', `bg-gray-50 p-4`, clazz)}>
	{#if block[block.type]?.icon?.emoji}
		<span class="pr-4">{block?.[block.type]?.icon?.emoji}</span>
	{/if}

	<slot />
</div>
