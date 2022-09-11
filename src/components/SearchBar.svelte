<script>
  import { get } from "svelte/store";

  import _ from "../lib/i18n";
  import { config, items, query, results, selectedResultItem } from "../lib/store";
  import * as storage from "../lib/storage";
  import { navigate } from "../lib/navigation";
  import search from "../assets/search.svg";

  /**
   * Currently selected index
   * @type {?Index}
   */
  let selectedIndex;

  /**
   * Search input DOM element
   */
  let searchInput;

  /**
   * Search query text value (local)
   * @type {string}
   */
  let localQuery;

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
        navigate(item);
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
  <!-- Index selector -->
  <select
    name="index"
    id="index-select"
    title={_("index-select.desc")}
    bind:value={selectedIndex}
    on:change={() => loadIndex(selectedIndex)}
    disabled={$config.indexes?.length <= 1}
  >
    {#each $config.indexes as index (index.name)}
      <option value={index}>
        {index.icon ?? ""}
        {index.name ?? ""}
      </option>
    {/each}
  </select>
  <!-- Search box -->
  <div class="search-icon">
    <img src={search} alt={_("search-bar.icon.alt")} />
  </div>
  <input
    type="text"
    title={_("search-bar.desc")}
    placeholder={_("search-bar.placeholder")}
    bind:value={localQuery}
    bind:this={searchInput}
    on:input={() => query.set(localQuery)}
    on:keydown={handleKeys}
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
  }
  .search-bar input,
  .search-bar select {
    font-size: large;
    padding: 14px 18px;
  }
  .search-bar select {
    background-color: var(--card-color);
    padding-right: 0;
  }
  .search-bar select:disabled {
    appearance: none;
  }
  .search-bar .search-icon {
    width: 0;
    display: flex;
    align-items: center;
  }
  .search-bar .search-icon img {
    width: 18px;
    margin-left: 16px;
    opacity: 0.5;
    filter: invert(var(--img-filter-invert));
  }
  .search-bar input {
    background-color: transparent;
    padding-left: 46px;
    flex-grow: 1;
    z-index: 1;
  }
</style>
