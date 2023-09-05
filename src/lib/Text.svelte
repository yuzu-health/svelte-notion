<script lang="ts">
	const constructPath = (prefix: string, link: string) => {
		if (link.startsWith('http') || link.startsWith('mailto')) return link;

		return [prefix, link]
			.map((part) => part.replace(/^\/+/, '').replace(/\/+$/, ''))
			.filter(Boolean)
			.reduce((acc, part) => acc + part + '/', '/');
	};

	export let text: {
		annotations?: {
			bold?: boolean;
			code?: boolean;
			color?: string;
			italic?: boolean;
			strikethrough?: boolean;
			underline?: boolean;
		};
		href?: string | null;
		// eslint-disable-next-line @typescript-eslint/naming-convention
		plain_text?: string;
		text?: {
			content: string;
			link?: { url: string } | null;
		};
	} = {};

	export let prefix = '';

	export let block: any;
</script>

{#if text?.href}
	<a
		id={block?.id}
		class="font-medium underline {text?.annotations?.code
			? 'bg-primary -my-1 bg-opacity-5 p-1'
			: ''}"
		class:font-medium={text?.annotations?.bold}
		class:font-semibold={['heading_1', 'heading_2', 'heading_3'].includes(block.type)}
		class:italic={text?.annotations?.italic}
		class:text-2xl={block?.type === 'heading_1'}
		class:text-lg={block?.type === 'heading_3'}
		class:text-xl={block?.type === 'heading_2'}
		class:underline={text?.annotations?.underline}
		href={constructPath(
			prefix,
			block.links[text?.href]
				? block.links[text?.href].startsWith('/')
					? block.links[text?.href]
					: `/${block.links[text?.href]}`
				: text?.href
		)}
		target={block.links[text?.href] ? '' : '_blank'}
	>
		{text?.text?.content}
	</a>
{:else}
	<span
		id={block?.id}
		class={text?.annotations?.code ? 'bg-primary -my-1 bg-opacity-5 p-1' : ''}
		class:font-medium={text?.annotations?.bold}
		class:font-semibold={['heading_1', 'heading_2', 'heading_3'].includes(block?.type)}
		class:italic={text?.annotations?.italic}
		class:text-2xl={block?.type === 'heading_1'}
		class:text-lg={block?.type === 'heading_3'}
		class:text-xl={block?.type === 'heading_2'}
		class:underline={text?.annotations?.underline}
	>
		{text?.text?.content}
	</span>
{/if}

<style>
	a {
		text-decoration: underline;
	}
</style>
