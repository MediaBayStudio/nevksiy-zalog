<?php $cards = $section['cards'] ?>

<section class="estate-object sect container">
  <h2 class="sect-title">Объекты недвижимости</h2>

  <div class="objects">

    <div class="objects__img-wrapper">
      <img src="<?= $cards[0]['img'] ?>" alt="обьект недвижимости" class="objects__img">
    </div>

    <div class="objects__toggle-btns">
      <?php
        $i = 0;
        foreach ( $cards as $card ) :
          $active_class = $i === 0 ? ' active': '';
          $i++;
      ?>
        <button class="objects__toggle-btn<?= $active_class ?>" data-img="<?= $card['img'] ?>"><?= $card['title'] ?></button>
      <?php endforeach ?>
    </div>
  </div>
</section>
