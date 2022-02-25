<?php
$cards = $section['cards'];
$form_id = $section['form']->ID;
$form_shortcode = '[contact-form-7 id="' . $form_id . '" html_id="request-form"]';
?>

<section id="request" class="request sect container lazy" data-src="">
  <div class="request__form">
    <h2 class="request__form-title">Отправьте заявку прямо сейчас</h2>
    <?= do_shortcode( $form_shortcode ) ?>
  </div>
</section>

<div class="container flex adv-subsect">
  <ul class="adv-subsect__cards">
    <?php foreach ( $cards as $card ) : ?>
      <li class="adv-subsect__card">
        <h2 class="adv-subsect__card-title"><?= $card['title'] ?></h2>
        <p class="adv-subsect__card-descr">
          <span class="adv-subsect__card-text"><?= $card['descr'] ?></span>
          <img src="<?= $card['icon'] ?>" alt="<?= $card['title'] ?>" class="adv-subsect__card-icon">
        </p>
      </li>
    <?php  endforeach ?>
  </ul>
</div>