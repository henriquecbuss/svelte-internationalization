<script>
  export let type = "up";
</script>

<style>
  button {
    padding: 0.5em 1.5em;
  }
</style>

<div>
  <button class="button" on:click> {type === 'up' ? '+' : '-'} </button>
</div>
