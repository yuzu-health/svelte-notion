<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';
	import Text from './Text.svelte';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
	export let prefix = '';
</script>

<label id={block.id} class={twMerge('pointer-events-none block', clazz)}>
	<input checked={block.to_do.checked} type="checkbox" />
	<Text {block} {prefix} texts={block.to_do.rich_text || []} />
</label>
