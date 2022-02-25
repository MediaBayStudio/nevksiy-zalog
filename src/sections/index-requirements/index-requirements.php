<?php $cards = $section['cards']; ?>

<section class="requirements sect container lazy" data-src="">
  <h2 class="requirements__title sect-title">Требования для сделки</h2>

  <ul class="requirements__list">
    <?php foreach ( $cards as $card ) : ?>
      <li class="requirements__item"><?= $card['title'] ?></li>
    <?php endforeach ?>
  </ul>
</section>