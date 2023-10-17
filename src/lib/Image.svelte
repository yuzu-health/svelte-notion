<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
</script>

<img
	id={block.id}
	class={twMerge('h-auto w-full mb-2', clazz)}
	src={block.image?.external?.url || block.image?.file?.url}
/>
