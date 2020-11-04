<script>
  import { _ } from "svelte-i18n";
</script>

<style>
  header {
    text-align: center;
  }
</style>

<header>
  <h1 class="title">{$_('app.title')}</h1>

  <h2 class="subtitle">{$_('app.slogan')}</h2>
</header>
