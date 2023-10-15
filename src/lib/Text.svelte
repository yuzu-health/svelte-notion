<script lang="ts">
	import type { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints.js';
	import type { Block } from './types.js';

	export let texts: TextRichTextItemResponse[] = [];
	export let prefix = '';
	export let block: Block;

	const constructPath = (prefix: string, link: string) => {
		if (link.startsWith('http') || link.startsWith('mailto')) return link;
		return [prefix, link]
			.map((part) => part.replace(/^\/+/, '').replace(/\/+$/, ''))
			.filter(Boolean)
			.reduce((acc, part) => acc + part + '/', '/');
	};
</script>

{#each texts as text, i (block.id + '-' + i)}
	<svelte:element
		this={text.href ? 'a' : 'span'}
		class={text.annotations.code ? 'bg-primary -my-1 bg-opacity-5 p-1' : ''}
		class:font-medium={text.annotations.bold}
		class:font-semibold={['heading_1', 'heading_2', 'heading_3'].includes(block.type)}
		class:italic={text.annotations.italic}
		class:text-2xl={block.type === 'heading_1'}
		class:text-lg={block.type === 'heading_3'}
		class:text-xl={block.type === 'heading_2'}
		class:underline={text.annotations.underline}
		href={text.href
			? constructPath(
					prefix,
					block.links[text.href]
						? block.links[text.href].startsWith('/')
							? block.links[text.href]
							: `/${block.links[text.href]}`
						: text?.href
			  )
			: ''}
		target={text.href ? (block.links[text.href] ? '' : '_blank') : ''}
		>{text.text.content}</svelte:element
	>
{/each}
