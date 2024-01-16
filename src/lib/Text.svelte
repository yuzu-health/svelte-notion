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

	const colors = {
		default: '',
		gray: 'text-gray-800',
		brown: 'text-amber-900',
		orange: 'text-orange-600',
		yellow: 'text-yellow-500',
		green: 'text-green-800',
		blue: 'text-blue-800',
		purple: 'text-purple-800',
		pink: 'text-pink-800',
		red: 'text-red-800',
		gray_background: 'bg-gray-800',
		brown_background: 'bg-amber-900',
		orange_background: 'bg-orange-600',
		yellow_background: 'bg-yellow-500',
		green_background: 'bg-green-800',
		blue_background: 'bg-blue-800',
		purple_background: 'bg-purple-800',
		pink_background: 'bg-pink-800',
		red_background: 'bg-red-800'
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
			colors[text.annotations.color],
			clazz(text, block)
		)}
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
