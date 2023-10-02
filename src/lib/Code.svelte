<script lang="ts">
	import prism from 'prismjs';
	import 'prismjs/components/prism-typescript';

	const { highlight, languages } = prism;

	export let code: string;
	export let language = '';
</script>

<div class="code">
	{#if languages[language]}
		{@html highlight(code, languages[language], language)}
	{:else}
		{code}
	{/if}
</div>

<svelte:head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	:global(.token.operator) {
		background: none !important;
	}
</style>
