<script>
  import { get } from "svelte/store";

  import { fuzzyMatch } from "../lib/fuzzy";
  import _ from "../lib/i18n";
  import { config, items, query, results, selectedResultItem } from "../lib/store";

  import ItemsGrid from "./ItemsGrid.svelte";

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
      .map((item) => ({ item, score: getScore(item, q) }))
      .filter((i) => i.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((m) => m.item);
    results.set(newResults);
    selectedResultItem.set(newResults.length > 0 ? newResults[0] : null);
  }

  /**
   * Compute match score.
   * @param {Item} item The item to test
   * @param {string} query Search query
   * @return Match score
   */
  function getScore(item, query) {
    const q = query.toLowerCase();
    const keywords = item.keywords || [];
    return fuzzyMatch(item.name.toLowerCase(), q) +
      (keywords.some((k) => k.toLowerCase().includes(q)) ? q.length : 0) +
      (keywords.includes("_default") ? 1 : 0);
  }
</script>

{#if $query}
  {#if $results?.length}
    <ItemsGrid items={$results} selectedItem={$selectedResultItem} />
  {:else}
    <div class="no-results">
      <p>{_("results.none", $query)}</p>
      {#if $config.source}
        <a class="btn" title={_("results.contribute")} href={$config.source}>
          📝 {_("results.contribute")}
        </a>
      {/if}
    </div>
  {/if}
{/if}

<style>
  .no-results {
    margin-top: 64px;
    font-size: large;
    color: var(--text-light-color);
  }

  .btn {
    margin: 32px auto 0;
  }
</style>
