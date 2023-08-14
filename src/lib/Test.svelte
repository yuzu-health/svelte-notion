<script lang="ts">
  import type { Block as BlockType } from "./types.js";
  export let blocks: BlockType[] = [];
</script>

{#each blocks as block}
  <div>test</div>
{/each}
