<script async src="https://api-maps.yandex.ru/2.1?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&load=package.standard&onload=window.__lmap"></script>

<section id="contacts" class="contacts sect">
  <h2 class="sect-title container">Контакты</h2>

  <div class="contacts__cnt">
    <div class="contacts__map">
      <div id="map"></div>
    </div>

    <div class="contacts__info container">
      <ul class="contacts__list">
        <li class="contacts__item">
          <h3 class="contacts__item-title">Телефон и почта:</h3>
          <a href="tel:<?= $tel_clean ?>" class="contacts__item-link"><?= $tel ?></a>
          <a href="mailto:<?= $email ?>" class="contacts__item-link"><?= $email ?></a>
        </li>

        <li class="contacts__item">
          <h3 class="contacts__item-title">Адрес:</h3>
          <p class="contacts__item-address"><?= $address ?></p>
        </li>
      </ul>

      <div class="contacts__socials">
        <a href="https://t.me/<?= $tel_clean ?>" class="contacts__socials-link" target="_blank">
          <span class="s-icon s-icon_tg-black"></span>
          Написать в Telegram
        </a>
        <a href="https://wa.me/<?= $tel_clean ?>" class="contacts__socials-link" target="_blank">
          <span class="s-icon s-icon_wsap-black"></span>
          Написать в WhatsApp
        </a>
      </div>
    </div>
  </div>
</section>