<script lang="ts">
	import { highlight, languages } from 'prismjs';

	export let code: string;
	export let language = '';
</script>

<div class="code">
	{@html highlight(code, languages[language], language)}
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
