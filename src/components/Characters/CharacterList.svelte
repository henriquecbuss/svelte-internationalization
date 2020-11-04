<script>
  import Character from "./Character.svelte";

  const fetchCharacters = () =>
    fetch("/data/characters.json").then((response) => response.json());
</script>

<style>
  .character-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2em;
  }
</style>

{#await fetchCharacters()}
  <p>Loading...</p>
{:then characters}
  <div class="character-list">
    {#each characters as character}
      <Character {character} />
    {/each}
  </div>
{:catch error}
  <p>There was a problem loading characters.</p>
{/await}
