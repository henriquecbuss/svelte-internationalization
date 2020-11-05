<script>
  import { _ } from "../../services/i18n";
  let counter = 0;
</script>

<button on:click={() => (counter += 1)}> + </button>
<button on:click={() => (counter = 0)}>
  {$_('main.numbers.counter_format', { values: { n: counter } })}
</button>
<button on:click={() => (counter > 0 ? (counter -= 1) : counter)}>-</button>
