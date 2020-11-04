<script>
  import VotingButton from "../UI/VotingButton.svelte";
  import { _, date, dir } from "../../services/i18n";

  export let character;

  const { name, imageUrl, firstAppearedInFilm } = character;

  let { voteCount } = character;
</script>

<style>
  .character {
    background: #f1f1f1;
    border-radius: 0.5em;
    padding: 1em 2em;
    display: flex;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  }

  .character__picture {
    width: 100px;
    display: flex;
    align-items: center;
  }

  .character__picture.dir-ltr {
    margin-right: 1em;
  }
  .character__picture.dir-rtl {
    margin-left: 1em;
  }

  .character__picture img {
    border-radius: 1em;
    max-height: 100%;
    width: 100%;
  }

  .character__name {
    margin-bottom: 0;
  }

  .character__text {
    margin: 5px 0 1em 0;
  }

  .character__votes {
    text-align: center;
  }
  .character__buttons {
    display: flex;
    gap: 1em;
    justify-content: center;
  }
</style>

<div class="character">
  <div class="character__picture dir-{$dir}">
    <img src={imageUrl} alt={name} />
  </div>

  <div class="character__info">
    <h3 class="character__name">{name}</h3>

    <p class="character__text">
      First appeared in
      <span>{firstAppearedInFilm.title}</span>,
      {$date(new Date(firstAppearedInFilm.releasedAt), { format: 'medium' })}
    </p>

    <div class="character__votes">
      <div class="character__buttons">
        <VotingButton type="up" on:click={() => (voteCount += 1)} />

        <VotingButton type="down" on:click={() => (voteCount -= 1)} />
      </div>
      <p>{$_('total_votes', { values: { n: voteCount } })}</p>
    </div>
  </div>
</div>
