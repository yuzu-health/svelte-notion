<script lang="ts">
	import type { Block } from './types.js';

	export let prefix = '';
	export let block: Block;

	const constructPath = (prefix: string, link: string) => {
		if (link.startsWith('http') || link.startsWith('mailto')) return link;
		return [prefix, link]
			.map((part) => part.replace(/^\/+/, '').replace(/\/+$/, ''))
			.filter(Boolean)
			.reduce((acc, part) => acc + part + '/', '/');
	};

	$: texts = block[block.type].rich_text || [];
</script>

{#each texts as text, i (block.id + '-' + i)}
	<svelte:element
		this={text.href ? 'a' : 'span'}
		class={text.annotations.code ? 'bg-primary -my-1 bg-opacity-5 p-1' : ''}
		class:font-medium={text.annotations.bold}
		class:italic={text.annotations.italic}
		class:underline={text.annotations.underline}
		style:color={text.annotations.color === 'default'
			? text.annotations.code
				? 'crimson'
				: ''
			: text.annotations.color}
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
