<script>
  /**
   * Icon source: URL, data string or emoji
   * @type {string}
   */
  export let src;

  /**
   * Alternative text
   * @type {string}
   */
  export let alt;
</script>

{#if src?.length <= 4}
  <span class="icon">{src}</span>
{:else if src?.match(/^(\w+:\/\/|data:image\/)/)}
  <img {src} {alt} class="icon" />
{:else}
  <span class="icon">🌐</span>
{/if}
