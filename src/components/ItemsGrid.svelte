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
  {#each items as item (item.url)}
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
  }
</style>
