<script lang="ts">
	import Notion from './Notion.svelte';
	import Text from './Text.svelte';
	import Video from './Video.svelte';
	import Code from './Code.svelte';
	import type { Block } from './types.js';

	export let block: Block;
	export let pathname = '/';
	export let resetCount = false;
	export let prefix = '';
</script>

{#if block.type === 'divider'}
	<hr class="my-2" />
{:else if 'heading_1' === block.type}
	<h1 id={block.id} class="mb-2 mt-8" class:inline-block={block[block.type].is_toggleable}>
		{#each block[block.type].rich_text || [] as text, i (block.id + '-' + i)}
			<Text {block} {prefix} {text} />
		{/each}
	</h1>
{:else if 'heading_2' === block.type}
	<h2 id={block.id} class="mb-2 mt-8" class:inline-block={block[block.type].is_toggleable}>
		{#each block[block.type].rich_text || [] as text, i (block.id + '-' + i)}
			<Text {block} {prefix} {text} />
		{/each}
	</h2>
{:else if 'heading_3' === block.type}
	<h3 id={block.id} class="mb-2 mt-8" class:inline-block={block[block.type].is_toggleable}>
		{#each block[block.type].rich_text || [] as text, i (block.id + '-' + i)}
			<Text {block} {prefix} {text} />
		{/each}
	</h3>
{:else if ['callout', 'paragraph', 'quote', 'link_to_page', 'toggle'].includes(block.type)}
	<p
		class:inline-block={block[block.type].is_toggleable}
		class="break-word my-1
      {block.type === 'quote' ? 'border-primary border-l-4 pl-4' : ''}
      {block.type === 'callout' ? 'bg-primary mb-1 bg-opacity-10 p-4' : ''}
    "
	>
		{#if block?.[block.type]?.icon?.emoji}
			<span class="pr-4">{block?.[block.type]?.icon?.emoji}</span>
		{/if}
		{#if block?.[block.type]?.rich_text?.length === 0}
			<br />
		{:else}
			{#each block[block.type].rich_text || [] as text, i (block.id + '-' + i)}
				<Text {block} {prefix} {text} />
			{/each}
		{/if}
	</p>
{:else if ['bulleted_list_item', 'numbered_list_item'].includes(block.type)}
	<div
		class="relative my-1.5 gap-2 pl-4"
		class:count={block.type === 'numbered_list_item'}
		class:reset-count={resetCount}
	>
		{#if block.type === 'bulleted_list_item'}
			<span class="absolute left-0">•</span>
		{:else}
			<span class="counter absolute left-0">.</span>
		{/if}
		<span class="">
			{#each block[block.type].rich_text || [] as text, i (block.id + '-' + i)}
				<Text {block} {prefix} {text} />
			{/each}
		</span>
	</div>
{:else if block.type === 'to_do'}
	<label class="pointer-events-none block">
		<input checked={block.to_do.checked} type="checkbox" />

		{#each block.to_do.rich_text || [] as text, i (block.id + '-' + i)}
			<Text {block} {prefix} {text} />
		{/each}
	</label>
{:else if block.type === 'image'}
	<img
		class="h-auto w-full"
		alt="related"
		src={block.image?.external?.url || block.image?.file?.url}
	/>
	{#if block[block.type]?.caption?.length}
		<div class="text-primary mt-2 text-xs text-opacity-50">
			{#each block[block.type].caption || [] as text, i (block.id + '-' + i)}
				<Text {block} {prefix} {text} />
			{/each}
		</div>
	{/if}
{:else if block.type === 'file'}
	<a class="no-underline" href={block.file?.external?.url || block.file?.url}>
		<span class="material-icons-sharp">description</span>
		<span class="underline">File</span>
	</a>
{:else if block.type === 'code'}
	<code
		style="tab-size: 2;"
		class="bg-primary mb-1 block overflow-scroll whitespace-pre bg-opacity-5 p-4 text-sm w-0 min-w-full"
	>
		{#each block[block.type].rich_text || [] as text, i (block.id + '-' + i)}
			<!-- <Text {text} {block} /> -->
			<Code code={text.text?.content} language={block[block.type].language} />
		{/each}
	</code>
{:else if block.type === 'video'}
	<Video {block} />
{:else if block.type === 'child_page'}
	<a href="{pathname}{block.id}">{block.child_page.title}</a>
{:else if block.type === 'column_list'}
	<div class="mb-4 grid grid-flow-col gap-2">
		{#each block.children || [] as column (column.id)}
			<Notion blocks={column.children} {pathname} {prefix} />
		{/each}
	</div>
{:else}
	<!-- <pre>{JSON.stringify(block, null, 2)}</pre> -->
{/if}

{#if !['toggle', 'column_list'].includes(block.type) && !block[block.type].is_toggleable && block.children}
	<div class="pl-4">
		<Notion blocks={block.children} {pathname} {prefix} />
	</div>
{/if}

<style>
	.reset-count {
		counter-reset: my-counter;
	}

	.count {
		counter-increment: my-counter;
	}

	.counter::before {
		content: counter(my-counter);
	}
</style>
