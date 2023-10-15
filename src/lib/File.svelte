<script lang="ts">
	import type { Block } from './types.js';
	import { twMerge } from 'tailwind-merge';

	export let block: Block;
	let clazz = '';
	export { clazz as class };
</script>

<a
	id={block.id}
	class={twMerge('no-underline', clazz)}
	href={block.file?.external?.url || block.file?.url}
>
	<span class="material-icons-sharp">description</span>
	<span class="underline">File</span>
</a>
