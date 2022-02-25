<?php $cards = $section['cards'] ?>

<section id="services" class="services sect container">
  <h2 class="sect-title">Услуги</h2>

  <div class="servcies__list">
    <?php foreach ( $cards as $card ) : ?>
      <div class="service">
        <div class="service__pic">
          <img src="<?= $card['img'] ?>" alt="<?= $card['title'] ?>" class="service__img">
        </div>
        <div class="service__text">
          <h3 class="service__title"><?= $card['title'] ?></h3>
          <p class="service__descr"><?= $card['descr'] ?></p>
        </div>
      </div>
    <?php endforeach ?>
  </div>
</section>