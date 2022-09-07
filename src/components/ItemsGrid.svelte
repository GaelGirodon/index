<script>
  import { visitedItems } from "../lib/store";
  import ItemCard from "./ItemCard.svelte";

  /**
   * Items to display in the grid
   * @type {Item[]}
   */
  export let items;

  /**
   * Mark all items as visited without checking individually
   * if they are in the visited items.
   */
  export let visited = false;

  /**
   * Currently selected item
   * @type {?Item}
   */
  export let selectedItem = null;
</script>

<div class="items">
  {#each items as item (item.name)}
    <ItemCard
      {item}
      selected={selectedItem === item}
      visited={visited || $visitedItems.some((i) => item.url === i.url)}
    />
  {/each}
</div>

<style>
  .items {
    position: relative;
    margin-top: 48px;
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    --items-cols: 4;
  }

  @media screen and (max-width: 512px) {
    .items {
      --items-cols: 1;
    }
  }
  @media screen and (min-width: 513px) and (max-width: 768px) {
    .items {
      --items-cols: 2;
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1023px) {
    .items {
      --items-cols: 3;
    }
  }
</style>
