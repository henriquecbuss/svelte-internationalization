<script>
  import Header from "./components/Layout/Header.svelte";
  import Footer from "./components/Layout/Footer.svelte";
  import CharacterList from "./components/Characters/CharacterList.svelte";
  import LocaleSelector from "./components/UI/LocaleSelector.svelte";
  import { _, setupI18n, isLocaleLoaded, locale, dir } from "./services/i18n";

  setupI18n();

  $: if (document.dir !== $dir) {
    document.dir = $dir;
  }

  $: if ($isLocaleLoaded) {
    document.title = $_("app.title");
  }
</script>

<style>
  .container {
    width: 80%;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>

{#if $isLocaleLoaded}
  <div class="container">
    <Header />

    <h1>{$_('hello_user', { values: { name: 'Adam' } })}</h1>

    <LocaleSelector
      value={$locale}
      on:locale-changed={(e) => setupI18n({ withLocale: e.detail })} />

    <main role="main">
      <CharacterList />
    </main>
  </div>

  <Footer />
{:else}
  <p>Loading...</p>
{/if}
