<script>
  import { preventDefault } from "svelte/legacy";

  import _ from "../lib/i18n";
  import { navigate } from "../lib/navigation";
  import { parsedQuery } from "../lib/store.js";

  import Icon from "./Icon.svelte";

  /**
   * @typedef Props
   * @property {Item} item Item to display in the card
   * @property {boolean} visited Mark the item as already visited
   * @property {boolean} selected Mark the item as selected
   */

  /** @type {Props} */
  let { item, visited = false, selected = false } = $props();
</script>

<a
  href={item.url}
  title={_(item.url.includes("%s") ? "item.desc.search" : "item.desc", item.name, $parsedQuery.target)}
  class="item card"
  class:selected
  onclick={preventDefault(() => navigate(item, $parsedQuery.target))}
>
  {#if visited}
    <div class="item-visited" title={_("item.visited.desc")}>🕓</div>
  {/if}
  <div class="item-icon">
    <Icon src={item.icon} />
  </div>
  <div class="item-name">{item.name ?? ""}</div>
  <div class="item-description">{item.description ?? ""}</div>
</a>

<style>
  .item {
    padding: 22px 18px;
    width: calc((100% - (var(--cols) - 1) * 16px) / var(--cols) - 2 * 18px);
    text-align: center;
    transition: color 0.25s ease, background-color 0.25s ease;
  }

  /* Selected */
  .item.selected {
    outline: solid 2px var(--primary-color);
  }

  /* Visited icon */
  .item-visited {
    position: absolute;
    inset: 0 0 auto auto;
    padding: 7px 7px 16px 16px;
    background-color: rgba(0, 0, 0, 0.05);
    border-bottom-left-radius: 100%;
    font-size: large;
    transition: padding 0.25s ease;
  }

  /* Icon */
  .item-icon {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item-icon :global(.icon) {
    width: 90%;
    height: 40px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .item-icon :global(.icon.emoji) {
    font-size: 35px;
    margin-top: -5px;
  }

  /* Name */
  .item-name {
    margin-top: 10px;
    font-weight: bold;
    transition: color 0.25s ease;
  }
  .item:hover .item-name,
  .item.selected .item-name {
    color: var(--primary-color);
  }

  /* Description */
  .item-description {
    margin-top: 8px;
    font-size: 90%;
  }
</style>
