<?php $cards = $section['cards'] ?>

<section class="partners sect">
  <h2 class="sect-title container">надежные партнеры</h2>

  <div class="partners__slider">
    <?php foreach ( $cards as $card ) : ?>
      <img src="<?= $card['icon'] ?>" alt="банк-партнер" class="partners__slide">
    <?php endforeach ?>
  </div>
</section>