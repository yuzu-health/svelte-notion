<script lang="ts">
  import type { Block } from "./types.js";

  export let blocks: Block[] = [];
  $: headings = blocks
    .map(({ type = "" }) => type)
    .filter((type = "") => type.includes("heading"));
  $: uniqueHeadings = [...new Set(headings)];
  $: marginLefts =
    uniqueHeadings.length === 3
      ? { heading_1: 0, heading_2: 1, heading_3: 2 }
      : uniqueHeadings.length === 2
      ? { heading_1: 0, heading_2: 1, heading_3: 1 }
      : { heading_1: 0, heading_2: 0, heading_3: 0 };
</script>

{#each blocks as block ("toc-" + block.id)}
  {#if block?.type.includes("heading")}
    <div>
      <a
        style={`margin-left: ${
          // @ts-ignore
          marginLefts[block.type]
        }rem;`}
        class="block"
        href={`#${block.id}`}
      >
        {(block[block.type].rich_text || [])
          .map(({ text = { content: "" } }) => text.content)
          .join("")}
      </a>
    </div>
  {/if}
{/each}
<div class="h-10" />
