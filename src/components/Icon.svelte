<script>
  /**
   * @typedef Props
   * @property {string} src Icon source (URL, data string or emoji)
   */

  /** @type {Props} */
  let { src } = $props();
</script>

{#if src && src.length <= 4}
  <div class="icon emoji">{src}</div>
{:else if src?.match(/^(\w+:\/\/|data:image\/)/)}
  <div class="icon" style={`background-image: url("${src}")`}></div>
{:else}
  <div class="icon emoji">🌐</div>
{/if}
