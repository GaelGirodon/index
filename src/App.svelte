<script>
  import { onMount } from "svelte";

  import _ from "./lib/i18n";
  import { config } from "./lib/store";

  import Logo from "./components/Logo.svelte";
  import SearchBar from "./components/SearchBar.svelte";
  import SearchResultItems from "./components/SearchResultItems.svelte";
  import Settings from "./components/Settings.svelte";
  import VisitedItems from "./components/VisitedItems.svelte";

  /**
   * Load configuration.
   */
  onMount(async () => {
    const res = await fetch("config.json");
    const cfg = await res.json();
    config.set(cfg);
    document.title = cfg.title ?? _("title");
  });
</script>

<main>
  <Logo />
  <SearchBar />
  <VisitedItems />
  <SearchResultItems />
  <Settings />
</main>
