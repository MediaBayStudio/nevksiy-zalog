<?php $cards = $section['cards'] ?>

<section class="hero sect container">
  <div class="hero__top">
    <a href="<?= home_url() ?>" class="hero__logo logo" aria-label="перейти на главную">
      <img src="<?= $template_directory_uri ?>/img/Logo.svg" class="logo__img" alt="лого">
      <p class="logo__text">
        <span class="logo__title">Невский залог</span>
        <span class="logo__subtitle">Кредитный эксперт</span>
      </p>
    </a>

    <button class="hero__burger"></button>

    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item"><a href="#results" class="nav__link">О нас</a></li>
        <li class="nav__item"><a href="#calculator" class="nav__link">Калькулятор</a></li>
        <li class="nav__item"><a href="#contacts" class="nav__link">Контакты</a></li>
      </ul>
    </nav>

    <a href="https://t.me/<?= $tel_clean ?>" target="_blank" class="hero__s-link">
      <span class="s-icon s-icon_tg-white"></span>
      Написать в Telegram
    </a>
    <a href="https://wa.me/<?= $tel_clean ?>" target="_blank" class="hero__s-link">
      <span class="s-icon s-icon_wsap-white"></span>
      Написать в WhatsApp
    </a>
  </div>

  <div class="hero__mid">
    <h1 class="hero__title">КРЕДИТЫ И ЗАЙМЫ ПОД ЗАЛОГ НЕДВИЖИМОСТИ</h1>

    <ul class="hero__descr-list">
      <li class="hero__descr-item">Выгодные условия по займам от частного инвестора</li>
      <li class="hero__descr-item">Работаем со сложными ситуациямии</li>
      <li class="hero__descr-item">Поможем получить вам выгодный кредит под залог недвижимости в банке</li>
    </ul>

    <a href="#services" class="hero__link btn btn_red btn_hover-white">Узнать подробнее</a>

    <?php require $template_directory . '/template-parts/mobile-menu.php' ?>
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
