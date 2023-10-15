import type { Block } from './types.js';

export const getTextFromBlock = (block: Block): string =>
	(block[block.type]?.rich_text
		?.map(({ plain_text }) => plain_text)
		?.join('')
		.replaceAll('\n', ' ') || '') +
	' ' +
	(block.children?.map((child) => getTextFromBlock(child)).join(' ') || '');
