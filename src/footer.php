      <?php
        global
          $site_url,
          $template_directory_uri,
          $template_directory,
          $tel,
          $tel_clean;
       ?>

      <footer class="ftr container sect">
        <?php
        // wp_nav_menu( [
        //   'theme_location'  => 'footer_menu',
        //   'container'       => 'nav',
        //   'container_class' => 'ftr__nav',
        //   'menu_class'      => 'ftr__nav-list',
        //   'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
        // ] )
        ?>
        <div class="ftr__top">
          <a href="<?= home_url() ?>" class="ftr__logo logo" aria-label="перейти на главную">
            <img src="<?= $template_directory_uri ?>/img/Logo.svg" class="logo__img" alt="лого">
            <p class="logo__text">
              <span class="logo__title">Невский залог</span>
              <span class="logo__subtitle">Кредитный эксперт</span>
            </p>
          </a>

          <nav class="nav">
            <ul class="nav__list">
              <li class="nav__item"><a href="#results" class="nav__link">О нас</a></li>
              <li class="nav__item"><a href="#calculator" class="nav__link">Калькулятор</a></li>
              <li class="nav__item"><a href="#contacts" class="nav__link">Контакты</a></li>
            </ul>
          </nav>

          <a href="tel:<?= $tel_clean ?>" class="tel-link">
            <span class="s-icon s-icon_tel-black"></span>
            <?= $tel ?>
          </a>

          <a href="#request" class="ftr__callback btn btn_red btn_hover-red">Обратный звонок</a>
        </div>

        <div class="ftr__bottom">
          <p class="ftr__rights">© Все права защищены<br><span style="font-size: 12px;">Компания оказывает исключительно консультационные услуги</span></p>

          <p class="ftr__dev">
            <span>Разработка сайта -&nbsp;</span>
            <a href="https://media-bay.ru/" target="_blank" title="Перейти на сайт разработчика" class="ftr__dev-link"><img src="<?= $template_directory_uri ?>/img/icons/mb-logo.svg" alt=""></a>
          </p>
        </div>

      </footer>
      <div id="fake-scrollbar"></div> <?php
      wp_footer() ?>
    </div>
  </body>
</html>