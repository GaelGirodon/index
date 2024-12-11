<script>
  import { get } from "svelte/store";

  import _ from "../lib/i18n";
  import { navigate } from "../lib/navigation";
  import * as storage from "../lib/storage";
  import { config, items, parsedQuery, query, results, selectedResultItem } from "../lib/store";

  import search from "../assets/search.svg";

  /**
   * Currently selected index
   * @type {?Index}
   */
  let selectedIndex = $state();

  /**
   * Search input DOM element
   * @type {HTMLInputElement}
   */
  let searchInput = $state();

  /**
   * Search query text value
   * @type {string}
   */
  let rawQuery = $state("");

  /**
   * Hint displayed dynamically after the search query text
   * @type {string}
   */
  let hint = $derived(
    rawQuery && !rawQuery.includes(":") && $selectedResultItem?.url?.includes("%s")
      ? _("search-bar.hint.target-query", $selectedResultItem.name)
      : ""
  );

  /**
   * true if the focus has already been set
   * on the search input DOM element.
   */
  let initialFocusSet = false;

  /*
   * Set and load the selected index on config updates.
   */
  config.subscribe((c) => {
    selectedIndex = storage.getSelectedIndex(c.indexes);
    if (selectedIndex) {
      loadIndex(selectedIndex);
    }
  });

  /**
   * Load index items on config or selection change.
   * @param {Index} index Index to load
   */
  async function loadIndex(index) {
    const res = await fetch(index.url);
    items.set(await res.json());
    storage.saveSelectedIndex(index);
    if (!initialFocusSet) {
      setTimeout(() => {
        searchInput?.focus();
        initialFocusSet = true;
      }, 500);
    }
  }

  /**
   * Handle keyboard events on search input.
   * @param {KeyboardEvent} event Keyboard events
   */
  function handleKeys(event) {
    if (event.key === "Enter" || event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const resultItems = get(results);
      const item = get(selectedResultItem);
      if (event.key === "Enter" && item) {
        navigate(item, $parsedQuery.target);
      } else if ((event.key === "ArrowDown" || event.key === "ArrowUp") && resultItems && item) {
        const currentIndex = resultItems.findIndex((i) => i === item);
        const offset = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex = (currentIndex + offset + resultItems.length) % resultItems.length;
        selectedResultItem.set(resultItems[nextIndex]);
      }
    }
  }
</script>

<div class="search-bar card">
  {#if $config.indexes?.length > 1}
    <!-- Index selector -->
    <select
      name="index"
      id="index-select"
      title={_("index-select.desc")}
      bind:value={selectedIndex}
      onchange={() => loadIndex(selectedIndex)}
    >
      {#each $config.indexes as index (index.name)}
        <option value={index}>
          {index.icon ?? ""}
          {index.name ?? ""}
        </option>
      {/each}
    </select>
  {/if}
  <!-- Search box -->
  <div class="search-icon">
    <img src={search} alt={_("search-bar.icon.alt")} />
  </div>
  <div class="search-hint">
    <span>{rawQuery}</span><span>{hint}</span>
  </div>
  <input
    type="text"
    title={_("search-bar.desc")}
    placeholder={_("search-bar.placeholder")}
    bind:value={rawQuery}
    bind:this={searchInput}
    oninput={() => query.set(rawQuery)}
    onkeydown={handleKeys}
    disabled={selectedIndex == null}
  />
</div>

<style>
  .search-bar {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    margin: 40px auto 0;
    font-size: large;
    line-height: normal;
  }
  .search-bar select {
    background-color: var(--card-color);
    padding: 14px 0 14px 18px;
    margin-right: -10px;
  }
  .search-bar .search-icon {
    width: 0;
    display: flex;
    align-items: center;
  }
  .search-bar .search-icon img {
    width: 18px;
    margin-left: 24px;
    opacity: 0.5;
    filter: invert(var(--img-filter-invert));
  }
  .search-bar .search-hint {
    width: 0;
    padding: 14px 0;
    color: var(--text-lighter-color);
    white-space: nowrap;
    user-select: none;
  }
  .search-bar .search-hint span:first-of-type {
    margin-left: 54px;
    visibility: hidden;
  }
  .search-bar input {
    background-color: transparent;
    padding: 14px 14px 14px 54px;
    flex-grow: 1;
    z-index: 1;
  }
</style>
