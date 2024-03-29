<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	import Notion from './Notion.svelte';
	import Toggle from './Toggle.svelte';
	import Text from './Text.svelte';
	import Video from './Video.svelte';
	import Code from './Code.svelte';
	import List from './List.svelte';
	import TableContents from './TableContents.svelte';
	import Image from './Image.svelte';
	import Heading from './Heading.svelte';
	import ToDo from './ToDo.svelte';
	import Columns from './Columns.svelte';
	import Paragraph from './Paragraph.svelte';
	import File from './File.svelte';
	import Callout from './Callout.svelte';
	import Quote from './Quote.svelte';

	import type { Block, TextRichTextItemResponse } from './types.js';

	export let block: Block;
	export let blocks: Block[] = [];
	export let pathname = '/';
	export let prefix = '';
	export let blockClass: string | ((block: Block, level?: number) => string) = '';
	export let level: number;
	export let textClass: string | ((text: TextRichTextItemResponse, block?: Block) => string) = '';
	export let columnClass: undefined | ((colNumber: number, columns: Block[]) => string);
	export let BlockWrapper: typeof SvelteComponent<{ block: Block }> | undefined = undefined;

	$: clazz = typeof blockClass === 'function' ? blockClass(block, level) : blockClass;
	$: headerToggleClass =
		typeof blockClass === 'function'
			? blockClass({ ...block, type: 'toggle' } as Block, level)
			: blockClass;

	$: props = { class: clazz, block, prefix, textClass };
	$: childrenProps = {
		blockClass,
		blocks: block.children,
		pathname,
		prefix,
		textClass,
		columnClass,
		BlockWrapper
	};
</script>

{#if block.type === 'toggle'}
	<Toggle class={clazz}>
		<Paragraph slot="summary" {...props} />
		<Notion {...childrenProps} level={level + 1} />
	</Toggle>
{:else if block[block.type].is_toggleable}
	<Toggle class={headerToggleClass}>
		<Heading slot="summary" {...props} />
		<Notion {...childrenProps} level={level + 1} />
	</Toggle>
{:else if block?.type === 'table_of_contents'}
	<TableContents {...props} {blocks} />
{:else if block.type === 'divider'}
	<hr class={twMerge('my-2', clazz)} />
{:else if ['heading_1', 'heading_2', 'heading_3'].includes(block.type)}
	<Heading {...props} />
{:else if 'callout' === block.type}
	<Callout {...props}>
		<Paragraph {...props} class="" />
		<Notion {...childrenProps} blocks={block.children} {level} />
	</Callout>
{:else if 'quote' === block.type}
	<Quote {...props}>
		<Paragraph {...props} class="" />
		<Notion {...childrenProps} blocks={block.children} {level} />
	</Quote>
{:else if ['paragraph', 'link_to_page'].includes(block.type)}
	<Paragraph {...props} />
{:else if ['bulleted_list_item', 'numbered_list_item'].includes(block.type)}
	<List {...props} {blocks} />
{:else if block.type === 'to_do'}
	<ToDo {...props} />
{:else if block.type === 'image'}
	<Image {...props} />
{:else if block.type === 'file'}
	<File {...props} />
{:else if block.type === 'code'}
	<Code {...props} class={clazz} />
{:else if block.type === 'video'}
	<Video {...props} />
{:else if block.type === 'child_page'}
	<a {...props} href="{pathname}{block.id}">{block.child_page.title}</a>
{:else if block.type === 'column_list'}
	<Columns {...props} {columnClass} let:column>
		<Notion {...childrenProps} blocks={column.children} level={level + 1} />
	</Columns>
{:else if block.type === 'table'}
	<table class={twMerge('border-collapse border', clazz)}>
		<tbody>
			{#each block.children as { table_row }}
				<tr>
					{#each table_row.cells || [] as texts}
						<td class="border p-2"><Text {block} {prefix} rich_text={texts} /></td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

{#if !!block[block.type].caption?.length}
	<div class="text-muted-foreground mb-2 text-xs">
		<Text {block} {prefix} {textClass} rich_text={block[block.type].caption} />
	</div>
{/if}
