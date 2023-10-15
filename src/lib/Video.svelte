<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block } from './types.js';

	export let block: Block;
	let clazz = '';
	export { clazz as class };

	function getId(url: string) {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2]?.length === 11 ? match[2] : undefined;
	}
</script>

{#if block.video?.external?.url.includes('youtube')}
	<iframe
		id={block.id}
		class={twMerge('h-96 w-full', clazz)}
		allow="fullscreen"
		frameborder="0"
		src={`https://www.youtube.com/embed/${getId(block.video?.external?.url)}?rel=0`}
		title="YouTube video player"
	/>
{:else if block.video?.file?.url}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		id={block.id}
		class={clazz}
		controls
		playsinline
		preload="metadata"
		src={block.video?.file?.url}
	/>
{/if}
