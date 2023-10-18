<script lang="ts">
	// todo
	let clazz = '';
	export { clazz as class };
	export let buttonClass = '';
	export let animation = true;

	let show = false;

	let ref: HTMLDivElement;
	let height = '0px';
	let transitionProperty = 'none';

	const showSection = () => {
		height = `${ref?.clientHeight}px`;
	};

	const hideSection = () => {
		if (height === 'auto') {
			height = `${ref?.clientHeight}px`;
			setTimeout(() => (height = '0px'), 0); // tick doesn't work
		} else {
			height = '0px';
		}
	};

	$: show ? showSection() : hideSection();
	$: if (height === 'auto') {
		transitionProperty = 'none';
	} else if (animation) {
		transitionProperty = 'height';
	}
</script>

<div class={clazz}>
	<button
		class="cursor-pointer items-center mr-4 block before:transition-transform before:content-['▶'] {show
			? 'before:rotate-90'
			: ''} {buttonClass}"
		type="button"
		on:click|preventDefault={() => (show = !show)}
	>
		<slot name="summary" />
	</button>

	<div
		style="height: {height}; transition-property: {transitionProperty};"
		style:transform="translate3d(0, 0, 0)"
		class="overflow-hidden inline-block transition-[height] duration-200"
		on:focusin={() => (show = true)}
	>
		<div class="pl-6" bind:this={ref}>
			<slot />
		</div>
	</div>
</div>
