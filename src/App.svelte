<script>
  import Counter from "./components/UI/Counter.svelte";
  import LocaleSelector from "./components/UI/LocaleSelector.svelte";
  import {
    _,
    dir,
    date,
    time,
    locale,
    number,
    setupI18n,
    isLocaleLoaded,
  } from "./services/i18n";

  setupI18n();

  $: if (document.dir !== $dir) {
    document.dir = $dir;
  }

  $: if ($isLocaleLoaded) {
    document.title = $_("app.title");
  }

  let interpolatorValue = "i18n";
</script>

<style>
  .container {
    width: 80%;
    max-width: 1200px;
    margin: 0 auto;
  }

  header {
    text-align: center;
    margin-top: 0;
    padding-top: 2em;
  }

  .app-title {
    margin-top: 0;
  }

  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2em;
    margin: 1em 0 0 0;
  }

  .card {
    display: inline-block;
    border-radius: 1em;
    padding: 1em 2em;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  }

  .card__title {
    opacity: 0.9;
  }

  .card__sub-title {
    opacity: 0.7;
  }

  .card__item {
    color: rgb(224, 61, 97);
    font-size: 1.2rem;
  }
</style>

{#if $isLocaleLoaded}
  <div class="container">
    <header>
      <h1 class="app-title">{$_('app.title')}</h1>
    </header>
    <LocaleSelector
      on:locale-changed={(e) => setupI18n({ withLocale: e.detail })}
      value={locale} />

    <div class="card-list">
      <div class="card">
        <h1 class="card__title">{$_('main.strings.title')}</h1>

        <div class="card__sub-item">
          <h2 class="card__sub-title">{$_('main.strings.simple')}</h2>
          <h4 class="card__item">{$_('main.strings.ok')}</h4>
          <h4 class="card__item">{$_('main.strings.cancel')}</h4>
          <h4 class="card__item">{$_('main.strings.confirm')}</h4>
          <h4 class="card__item">{$_('main.strings.hello_world')}</h4>
        </div>

        <div class="card__sub-item">
          <h2 class="card__sub-title">{$_('main.strings.interpolating')}</h2>
          <input type="text" bind:value={interpolatorValue} />
          <h4 class="card__item">
            {$_('main.strings.hello_user', {
              values: { name: interpolatorValue },
            })}
          </h4>
        </div>
      </div>

      <div class="card">
        <h1 class="card__title">{$_('main.dates.title')}</h1>

        <div class="card__sub-item">
          <h2 class="card__sub-title">{$_('main.dates.date')}</h2>
          <h4 class="card__item">{$date(new Date(), { format: 'full' })}</h4>
          <h4 class="card__item">{$date(new Date(), { format: 'long' })}</h4>
          <h4 class="card__item">{$date(new Date(), { format: 'medium' })}</h4>
          <h4 class="card__item">{$date(new Date(), { format: 'short' })}</h4>
        </div>

        <div class="card__sub-item">
          <h2 class="card__sub-title">{$_('main.dates.time')}</h2>
          <h4 class="card__item">{$time(new Date(), { format: 'long' })}</h4>
          <h4 class="card__item">{$time(new Date(), { format: 'medium' })}</h4>
          <h4 class="card__item">{$time(new Date(), { format: 'short' })}</h4>
        </div>
      </div>

      <div class="card">
        <h1 class="card__title">{$_('main.numbers.title')}</h1>

        <div class="card__sub-item">
          <h2 class="card__sub-title">{$_('main.numbers.plain_number')}</h2>
          <h4 class="card__item">{$number(123456.789)}</h4>
          <h4 class="card__item">
            {$number(123456.789, { style: 'percent' })}
          </h4>
          <h4 class="card__item">
            {$number(123456.789, {
              notation: 'compact',
              compactDisplay: 'long',
            })}
          </h4>
          <h4 class="card__item">
            {$number(123456.789, { notation: 'compact' })}
          </h4>
        </div>
        <div class="card__sub-item">
          <h2 class="card__sub-title">{$_('main.numbers.plural')}</h2>
          <Counter />
        </div>

        <div class="card__sub-item">
          <h2 class="card__sub-title">{$_('main.numbers.currency')}</h2>
          <h4 class="card__item">
            {$number(123456.789, { style: 'currency', currency: 'USD' })}
          </h4>
          <h4 class="card__item">
            {$number(123456.789, { style: 'currency', currency: 'AED' })}
          </h4>
          <h4 class="card__item">
            {$number(123456.789, { style: 'currency', currency: 'BRL' })}
          </h4>
        </div>
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
