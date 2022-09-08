<script>
  import _ from "../lib/i18n";
  import { config, query } from "../lib/store";
</script>

<div class="spacer" class:offset={!$query} />
{#if $config.logo}
  <img src={$config.logo} alt={_("logo.alt")} class="logo" />
{/if}

<style>
  .spacer {
    margin-top: 32px;
    transition: margin-top 0.25s ease;
  }
  .spacer.offset {
    margin-top: 20vh;
  }
  .logo {
    max-width: 350px;
    max-height: 200px;
  }
</style>
