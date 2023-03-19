<script>
  import { fly } from "svelte/transition";

  import _ from "../lib/i18n";
  import { clear } from "../lib/storage";
  import { config } from "../lib/store";

  import close from "../assets/close.svg";
  import settings from "../assets/settings.svg";

  import * as meta from "../../package.json";

  /**
   * true if the settings panel is displayed.
   */
  let opened = false;

  /**
   * Clear local storage and reload.
   */
  function forget() {
    clear();
    location.reload();
  }
</script>

{#if opened}
  <div class="settings card" transition:fly={{ y: -32, duration: 250 }}>
    <div class="title">{_("settings.title")}</div>
    <button class="btn" title={_("settings.clear-data.desc")} on:click={forget}>
      🗑️ {_("settings.clear-data")}
    </button>
    {#if $config.source}
      <a class="btn" title={_("settings.contribute.desc")} href={$config.source}>
        📝 {_("settings.contribute")}
      </a>
    {/if}
    <a class="meta" href={meta.homepage}>
      {meta.name} {meta.version}
    </a>
  </div>
{/if}

<button
  class="settings-toggle"
  on:click={() => (opened = !opened)}
  title={opened ? _("settings.toggle.close") : _("settings.toggle.open")}
>
  <img src={opened ? close : settings} alt={_("settings.toggle.icon.alt")} />
</button>

<style>
  /* Toggle button */
  .settings-toggle {
    position: absolute;
    inset: 16px 16px auto auto;
    padding: 8px;
    border-radius: 4px;
    line-height: 0;
    opacity: 0.5;
    transition: background-color 0.15s ease, opacity 0.15s ease;
  }
  .settings-toggle:hover {
    background: var(--button-hover-color);
    opacity: 1;
  }
  .settings-toggle img {
    width: 24px;
    height: 24px;
    filter: invert(var(--img-filter-invert));
  }

  /* Settings panel */
  .settings {
    position: absolute;
    inset: 0 0 auto auto;
    margin: 12px;
    padding: 20px;
    width: 100%;
    max-width: 200px;
    text-align: left;
  }
  .settings .title {
    font-size: large;
    font-weight: 600;
    margin-bottom: 16px;
    margin-top: -2px;
  }
  .settings .btn {
    margin-top: 8px;
  }
  .settings .meta {
    display: block;
    margin: 12px 0 -2px 0;
    font-size: small;
    text-transform: capitalize;
    color: var(--text-light-color);
  }
</style>
