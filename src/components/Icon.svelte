<script>
  /**
   * Icon source: URL, data string or emoji
   * @type {string}
   */
  export let src;
</script>

{#if src && src.length <= 4}
  <div class="icon emoji">{src}</div>
{:else if src?.match(/^(\w+:\/\/|data:image\/)/)}
  <div class="icon" style={`background-image: url("${src}")`} />
{:else}
  <div class="icon emoji">🌐</div>
{/if}
