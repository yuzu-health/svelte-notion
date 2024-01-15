<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
</script>

<div id={block.id} class={twMerge('break-word mb-2', 'border-foreground border-l-4 pl-4', clazz)}>
	<slot />
</div>
