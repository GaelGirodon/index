<script>
  import { fly } from "svelte/transition";
  import settings from "../assets/settings.svg";
  import close from "../assets/close.svg";
  import { config } from "../lib/store";
  import { clear } from "../lib/storage";

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
    <div class="title">Settings</div>
    <button class="btn" on:click={forget} title="Clear local storage and reload">
      🗑️ Forget me
    </button>
    {#if $config.source}
      <a class="btn" title="Contribute to this page" href={$config.source}>
        🖊️ Contribute
      </a>
    {/if}
  </div>
{/if}

<button
  class="settings-toggle"
  on:click={() => (opened = !opened)}
  title={opened ? "Close settings" : "Open settings"}
>
  <img src={opened ? close : settings} alt="Settings toggle icon" />
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
    display: block;
    width: fit-content;
    margin-top: 8px;
    padding: 8px 12px 8px 10px;
    background-color: var(--button-color);
    border: solid 1px var(--button-active-color);
    border-radius: 4px;
    font-size: 14px;
    transition: background-color 0.15s ease;
  }
  .settings .btn:hover {
    background-color: var(--button-hover-color);
  }
  .settings .btn:active {
    background-color: var(--button-active-color);
  }
</style>
