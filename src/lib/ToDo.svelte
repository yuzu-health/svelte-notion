<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block, TextRichTextItemResponse } from './types.js';
	import Text from './Text.svelte';

	let clazz = '';
	export { clazz as class };
	export let block: Block;
	export let prefix = '';
	export let textClass: string | ((text: TextRichTextItemResponse, block?: Block) => string) = '';
</script>

<label id={block.id} class={twMerge('pointer-events-none block', clazz)}>
	<input checked={block.to_do.checked} type="checkbox" />
	<Text {block} {prefix} {textClass} />
</label>
