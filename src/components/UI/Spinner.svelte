<script>
  import { isLoading } from "svelte-i18n";
</script>

<style>
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  .loader {
    font-size: 10px;
    position: relative;
    border-top: 1.1em solid rgba(224, 61, 97, 0.2);
    border-right: 1.1em solid rgba(224, 61, 97, 0.2);
    border-bottom: 1.1em solid rgba(224, 61, 97, 0.2);
    border-left: 1.1em solid rgb(224, 61, 97);

    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>

<div class="loader" />
