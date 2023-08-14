<script lang="ts">
  import Block from "./Block.svelte";
  import TableContents from "./TableContents.svelte";
  import type { Block as BlockType } from "./types.js";

  let clazz = "";
  export { clazz as class };
  export let blocks: BlockType[] = [];
  export let pathname = "/";
  export let prefix = "";
</script>

<div class="svelte-notion whitespace-pre-line leading-relaxed {clazz}">
  {#each blocks || [] as block, i (block.id)}
    {#if block?.type === "table_of_contents"}
      <TableContents {blocks} />
    {:else if block}
      <Block
        {block}
        {pathname}
        {prefix}
        resetCount={blocks?.[i - 1]?.type !== block.type}
      />
    {/if}
  {/each}
</div>

<style lang="postcss">
  @tailwind components;
  @tailwind utilities;
</style>
