<script lang="ts">
	// todo
	let clazz = '';
	export { clazz as class };

	let show = false;

	let ref: HTMLDivElement;
	let height = '0px';

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
</script>

<div class={clazz}>
	<button
		class="cursor-pointer items-baseline flex gap-2 text-left"
		type="button"
		on:click|preventDefault={() => (show = !show)}
	>
		<div class:rotate-90={show} class="transition-transform text-base">▶</div>
		<slot name="summary" />
	</button>

	<div
		style:height
		style:transition-property="height"
		style:transform="translate3d(0, 0, 0)"
		class="overflow-hidden transition-[height] duration-200"
		on:focusin={() => (show = true)}
	>
		<div class="pl-6" bind:this={ref}>
			<slot />
		</div>
	</div>
</div>
