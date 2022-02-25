<?php $cards = $section['cards'] ?>

<section class="rejection sect container">
  <h2 class="sect-title">Будет отказ, если:</h2>

  <ul class="rejection__list">
    <?php foreach ( $cards as $card ) : ?>
      <li class="rejection__item"><?= $card['title'] ?></li>
    <?php endforeach ?>
  </ul>
</section>