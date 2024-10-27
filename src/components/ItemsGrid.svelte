<script>
  import { visitedItems } from "../lib/store";

  import ItemCard from "./ItemCard.svelte";

  /**
   * @typedef Props
   * @property {Item[]} items Items to display in the grid
   * @property {boolean} visited Mark all items as visited without
   * checking individually if they are in the visited items.
   * @property {Item} [selectedItem] Currently selected item
   */

  /** @type {Props} */
  let { items, visited = false, selectedItem = null } = $props();
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
