<script>
  import { _ } from "../../services/i18n";
  let counter = 0;
</script>

<button on:click={() => (counter += 1)}>
  {$_('main.numbers.counter_format', { values: { n: counter } })}
</button>
