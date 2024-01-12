import * as Notion from '@notionhq/client';
import type { Page, Block } from './types.js';
import type {
	ListBlockChildrenParameters,
	TextRichTextItemResponse,
	TitlePropertyItemObjectResponse,
	RichTextPropertyItemObjectResponse,
	QueryDatabaseParameters
} from '@notionhq/client/build/src/api-endpoints.js';

export type * from './types.js';

export class Client {
	public Notion: Notion.Client;

	constructor(notionKey: string) {
		this.Notion = new Notion.Client({ auth: notionKey });
	}

	public async fetchDatabase(q: QueryDatabaseParameters): Promise<Page[]> {
		const { results } = await this.Notion.databases.query(q);
		return results.filter((page) => page !== null) as Page[];
	}

	public async fetchProperty(page_id: string, property_id: string) {
		try {
			const resp = await this.Notion.pages.properties.retrieve({
				page_id,
				property_id
			});

			if ('results' in resp && resp.results[0]) return resp.results[0];
			return null;
		} catch {
			return null;
		}
	}

	public async fetchBlocks({
		q,
		transform,
		slugProperty = 'slug'
	}: {
		q: string | ListBlockChildrenParameters;
		transform?: (block: Block) => Promise<Block> | Block;
		slugProperty?: string;
	}) {
		const resp = await this.Notion.blocks.children.list(
			typeof q === 'string' ? { block_id: q, page_size: 100 } : q
		);

		const blocks = resp.results as any as Block[];
		for (let block of blocks) {
			if (block.link_to_page) block = await this.linkToPage(block, slugProperty);
			block = await this.mapLinksToSlugs(block, slugProperty);
			if (transform) block = await transform(block);
			if (block.has_children) block.children = await this.fetchBlocks({ q: block.id, transform });
		}
		return blocks;
	}

	private mapLinksToSlugs = async (block: Block, slugProperty = 'slug') => {
		const links = (block?.[block.type]?.rich_text || [])
			.map((b) => b?.href || '')
			.filter((href) => href?.startsWith('/'));

		block.links = Object.fromEntries(
			await Promise.all(
				links.map(async (link) => {
					const property = await this.fetchProperty(
						link?.slice(1)?.split('?')?.[0] || '',
						slugProperty
					);

					if (!property || !('rich_text' in property || 'title' in property)) return [link, ''];
					else if ('rich_text' in property) return [link, property?.rich_text?.plain_text];
					else return [link, property?.title?.plain_text || ''];
				})
			)
		);

		return block;
	};

	private linkToPage = async (block: Block, slugProperty = 'slug') => {
		const pageId = block.link_to_page.page_id;
		if (!pageId) return block;

		const title = (await this.fetchProperty(pageId, 'title')) as TitlePropertyItemObjectResponse;
		const slug = (await this.fetchProperty(pageId, slugProperty)) as
			| RichTextPropertyItemObjectResponse
			| TitlePropertyItemObjectResponse;

		if (title && slug) {
			title.title.href = '/' + pageId;
			block.link_to_page.rich_text = [title?.title as TextRichTextItemResponse];
			// @ts-ignore
			block.links = { ['/' + pageId]: slug?.rich_text?.plain_text || slug?.title?.plain_text };
		}

		return block;
	};

	static getTextFromBlock = (block: Block): string =>
		(block[block.type]?.rich_text
			?.map(({ plain_text }) => plain_text)
			?.join('')
			.replaceAll('\n', ' ') || '') +
		' ' +
		(block.children?.map((child) => Client.getTextFromBlock(child)).join(' ') || '');
}
