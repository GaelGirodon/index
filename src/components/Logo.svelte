<script>
  import _ from "../lib/i18n";
  import { config, query } from "../lib/store";
</script>

<div class="logo" class:offset={!$query}>
  {#if $config.logo}
    <img src={$config.logo} alt={_("logo.alt")} />
  {/if}
</div>

<style>
  .logo {
    margin-top: 48px;
    transition: margin-top 0.25s ease;
  }
  .logo.offset {
    margin-top: 20vh;
  }
  .logo img {
    max-width: 350px;
    max-height: 200px;
  }
</style>
