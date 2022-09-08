<script>
  import { onMount } from "svelte";

  import { query, visitedItems } from "../lib/store";
  import * as storage from "../lib/storage";
  import ItemsGrid from "./ItemsGrid.svelte";

  /**
   * Load recently visited items.
   */
  onMount(() => {
    visitedItems.set(
      storage
        .getVisitedItems()
        // Aggregate by distinct item with visits count calculation
        .reduce((distinct, item) => {
          const i = distinct.findIndex((s) => s.item.name === item.name);
          const stat = i >= 0 ? distinct[i] : { item, visits: 0 };
          stat.visits++;
          distinct.splice(i, i >= 0 ? 1 : 0, stat);
          return distinct;
        }, [])
        // Sort by descending visits count
        .sort((a, b) => b.visits - a.visits)
        .map((s) => s.item)
        .slice(0, 8)
    );
  });
</script>

<!-- Most & recently visited items-->
{#if !$query && $visitedItems?.length}
  <ItemsGrid items={$visitedItems} visited={true} />
{/if}
