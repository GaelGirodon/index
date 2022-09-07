<script>
  import { get } from "svelte/store";
  import { items, query, results, selectedResultItem } from "../lib/store";
  import ItemsGrid from "./ItemsGrid.svelte";
  import { fuzzyMatch } from "../lib/fuzzy";

  /*
   * Filter results when search query is updated.
   */
  query.subscribe((q) => search(q));

  /**
   * Search in current index items using a fuzzy search algorithm.
   * @param {string} q Search query
   */
  function search(q) {
    const newResults = get(items)
      .map((item) => ({
        item,
        score: fuzzyMatch(itemToString(item), q.toLowerCase()),
      }))
      .filter((i) => i.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((m) => m.item);
    results.set(newResults);
    selectedResultItem.set(newResults.length > 0 ? newResults[0] : null);
  }

  /**
   * Build the item string representation to search a match in it.
   * @param {Item} item The item
   * @returns {string} String representation
   */
  function itemToString(item) {
    return [item.name, ...item.tags].map((i) => i.toLowerCase()).join(" ");
  }
</script>

{#if $query}
  {#if $results?.length}
    <ItemsGrid items={$results} selectedItem={$selectedResultItem} />
  {:else}
    <div class="no-results">No result found for "{$query}"</div>
  {/if}
{/if}

<style>
  .no-results {
    margin-top: 48px;
    font-size: large;
    color: var(--text-light-color);
  }
</style>
