<script lang="ts">
	import type { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
	import type { Block } from './types.js';

	export let prefix = '';
	export let block: Block;
	export let rich_text: undefined | TextRichTextItemResponse[] = undefined;

	const constructPath = (prefix: string, link: string) => {
		if (link.startsWith('http') || link.startsWith('mailto')) return link;
		return [prefix, link]
			.map((part) => part.replace(/^\/+/, '').replace(/\/+$/, ''))
			.filter(Boolean)
			.reduce((acc, part) => acc + part + '/', '/');
	};

	$: texts = rich_text || block[block.type].rich_text || [];
</script>

{#each texts as text, i (block.id + '-' + i)}
	<svelte:element
		this={text.href ? 'a' : 'span'}
		class={text.annotations.code ? 'bg-primary -my-1 bg-opacity-5 p-1' : ''}
		class:font-medium={text.annotations.bold && !block.type.includes('heading')}
		class:italic={text.annotations.italic}
		class:underline={text.annotations.underline}
		style:color={text.annotations.color === 'default'
			? text.annotations.code
				? 'crimson'
				: ''
			: text.annotations.color}
		style:background-color={text.annotations.color.endsWith('_background')
			? text.annotations.color.replace('_background', '')
			: ''}
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
