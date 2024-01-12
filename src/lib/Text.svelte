<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { Block, TextRichTextItemResponse } from './types.js';

	export let prefix = '';
	export let block: Block;
	export let rich_text: undefined | TextRichTextItemResponse[] = undefined;
	export let textClass: string | ((text: TextRichTextItemResponse, block?: Block) => string) = '';

	const constructPath = (prefix: string, link: string) => {
		if (link.startsWith('http') || link.startsWith('mailto')) return link;
		return [prefix, link]
			.map((part) => part.replace(/^\/+/, '').replace(/\/+$/, ''))
			.filter(Boolean)
			.reduce((acc, part) => acc + part + '/', '/');
	};

	$: texts = rich_text || block[block.type].rich_text || [];
	$: clazz =
		typeof textClass === 'function'
			? textClass
			: (_t: TextRichTextItemResponse, _b?: Block) => textClass as string;
</script>

{#each texts as text, i (block.id + '-' + i)}
	<svelte:element
		this={text.href ? 'a' : 'span'}
		class={twMerge(
			text.annotations.code ? 'bg-foreground bg-opacity-5 px-1' : '',
			text.annotations.bold && !block.type.includes('heading') ? 'font-semibold' : '',
			text.annotations.italic ? 'italic' : '',
			text.annotations.underline || text.href ? 'underline' : '',
			text.annotations.strikethrough ? 'line-through' : '',
			clazz(text, block)
		)}
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
		target={text.href ? (block.links[text.href] || text.href.startsWith('/') ? '' : '_blank') : ''}
		>{text.text.content}</svelte:element
	>
{/each}
