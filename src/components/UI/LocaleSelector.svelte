<script>
  import { createEventDispatcher } from "svelte";
  import { locales } from "../../config/l10n";

  export let value;

  const dispatch = createEventDispatcher();

  const handleLocaleChange = (event) => {
    event.preventDefault();

    dispatch("locale-changed", event.target.value);
  };
</script>

<style>
</style>

<div class="locale-selector">
  <select {value} on:blur={handleLocaleChange} on:change={handleLocaleChange}>
    {#each Object.keys(locales) as locale}
      <option value={locale} selected={locale === $value}>
        {locales[locale]}
      </option>
    {/each}
  </select>
</div>
