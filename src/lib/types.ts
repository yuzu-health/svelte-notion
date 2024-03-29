/* eslint @typescript-eslint/naming-convention: 0 */

import type {
	PageObjectResponse,
	TextRichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints.js';

export type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints.js';

export type { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints.js';

type SelectPropertyResponse = { id: string; name: string; color: string };
type DateResponse = {
	start: string;
	end: string | null;
	time_zone: string | null;
};
type PersonUserObjectResponse = {
	type: 'person';
	person?: { email?: string };
	name?: string | null;
	avatar_url?: string | null;
	id: string;
	object?: 'user';
};

export type Page = PageObjectResponse & {
	properties: { [key: string]: PageProperty };
	blocks?: Block[];
	subpages?: Page[];
};

export type PageProperty = {
	id: string;
	type: string;
	number?: number | null;
	url?: string | null;
	select?: SelectPropertyResponse | null;
	multi_select?: Array<SelectPropertyResponse>;
	status?: SelectPropertyResponse | null;
	date?: DateResponse;
	email?: string | null;
	phone_number?: string | null;
	checkbox?: boolean;
	files?: {
		file?: { url: string; expiry_time: string };
		external?: { url: string };
		name: string;
		type?: 'file' | 'external';
	}[];
	created_by?: PersonUserObjectResponse;
	created_time?: string;
	last_edited_by?: PersonUserObjectResponse;
	last_edited_time?: string;
	// formula?: FormulaPropertyResponse;
	title?: TextRichTextItemResponse[];
	rich_text?: TextRichTextItemResponse[];
	people?: PersonUserObjectResponse[];
	relation?: { id: string }[];
	// rollup?:
};

export type Block = BlockProperties & BlockValues;

type BlockTypes =
	| 'table_of_contents'
	| 'divider'
	| 'paragraph'
	| 'heading_1'
	| 'heading_2'
	| 'heading_3'
	| 'callout'
	| 'paragraph'
	| 'quote'
	| 'link_to_page'
	| 'toggle'
	| 'bulleted_list_item'
	| 'numbered_list_item'
	| 'to_do'
	| 'image'
	| 'file'
	| 'code'
	| 'video'
	| 'child_page'
	| 'column_list'
	| 'table'
	| 'table_row'
	| 'child_database';

type BlockProperties = {
	id: string;
	type: BlockTypes;
	created_time: string;
	created_by: PersonUserObjectResponse;
	last_edited_time: string;
	last_edited_by: PersonUserObjectResponse;
	has_children: boolean;
	archived: boolean;

	links: { [key: string]: string };
	children: Block[];
	pages?: Page[];
};

type BlockValues = {
	[ty: string]: {
		type?: BlockTypes;

		rich_text?: TextRichTextItemResponse[];
		color?: string;
		checked?: boolean;
		title?: TextRichTextItemResponse[];
		expression?: string;
		language?: string;
		caption?: TextRichTextItemResponse[];

		icon?: {
			type: string;
			emoji?: string;
			external?: { url: string };
			file?: { url: string; expiry_time: string };
		};

		page_id?: string;
		database_id?: string;
		comment_id?: string;

		has_column_header?: boolean;
		has_row_header?: boolean;
		table_width?: number;

		cells?: Array<Array<TextRichTextItemResponse>>;

		url?: string;

		file?: { url: string; expiry_time: string };
		external?: { url: string };

		children?: Block[];
		is_toggleable?: boolean;

		pages?: Page[];
	};
};
