<?php $cards = $section['cards']; ?>

<section class="escort sect container">
  <h2 class="escort__title sect-title">Компетентное сопровождение сделок</h2>

  <ul class="escort__list">
    <?php foreach ( $cards as $card ) : ?>
      <li class="escort__item"><?= $card['title'] ?></li>
    <?php endforeach ?>
  </ul>
</section>