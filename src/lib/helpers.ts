import * as Notion from "@notionhq/client";
import type { Page, Block } from "./types.js";
import type {
  ListBlockChildrenParameters,
  TextRichTextItemResponse,
  TitlePropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints.js";

export type * from "./types.js";

export class Client {
  private notionClient: Notion.Client | undefined;

  constructor(notionKey: string) {
    this.notionClient = new Notion.Client({ auth: notionKey });
  }

  public async fetchDatabase(q: QueryDatabaseParameters): Promise<Page[]> {
    const { results } = await this.notionClient!.databases.query(q);
    return results.filter((page) => page !== null) as Page[];
  }

  public async fetchProperty(page_id: string, property_id: string) {
    const resp = await this.notionClient!.pages.properties.retrieve({
      page_id,
      property_id,
    });

    if ("results" in resp && resp.results[0]) return resp.results[0];
    return null;
  }

  public async fetchBlocks(
    q: string | ListBlockChildrenParameters,
    transform?: (block: Block) => Promise<Block> | Block,
  ) {
    const resp = await this.notionClient!.blocks.children.list(
      typeof q === "string" ? { block_id: q, page_size: 100 } : q,
    );

    const blocks = resp.results as any as Block[];
    for (let block of blocks) {
      if (block.link_to_page) block = await this.linkToPage(block);
      block = await this.mapLinksToSlugs(block);
      if (transform) block = await transform(block);
      if (block.has_children)
        block.children = await this.fetchBlocks(block.id, transform);
    }
    return blocks;
  }

  private mapLinksToSlugs = async (block: Block) => {
    const links = (block?.[block.type]?.rich_text || [])
      .map((b) => b?.href || "")
      .filter((href) => href?.startsWith("/"));

    block.links = Object.fromEntries(
      await Promise.all(
        links.map(async (link) => {
          const property = await this.fetchProperty(
            link?.slice(1)?.split("?")?.[0] || "",
            "slug",
          );
          return property && "rich_text" in property
            ? [link, property?.rich_text?.plain_text]
            : [link, ""];
        }),
      ),
    );

    return block;
  };

  private linkToPage = async (block: Block) => {
    const pageId = block.link_to_page.page_id;
    if (!pageId) return block;

    const title = (await this.fetchProperty(
      pageId,
      "title",
    )) as TitlePropertyItemObjectResponse;
    const slug = (await this.fetchProperty(
      pageId,
      "slug",
    )) as RichTextPropertyItemObjectResponse;

    if (title && slug) {
      title.title.href = "/" + pageId;
      block.link_to_page.rich_text = [title?.title as TextRichTextItemResponse];
      block.links = { ["/" + pageId]: slug?.rich_text.plain_text };
    }

    return block;
  };
}
