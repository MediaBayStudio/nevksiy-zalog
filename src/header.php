<?php
  global
    $preload,
    $site_url,
    $logo_url,
    $template_directory_uri,
    $current_template,
    $tel,
    $tel_clean,
    $email,
    $t,
    $address,
    $wsap;

  $current_template = $GLOBALS['current_template'];

  if ( !$preload ) {
    $preload = get_field( 'preload' );
  }

  if ( is_front_page() ) {
    $script_name = 'script-index';
    $style_name = 'style-index';
  } else {
    if ( $current_template ) {
      $script_name = 'script-' . $GLOBALS['current_template'];
      $style_name = 'style-' . $GLOBALS['current_template'];
    } else {
      $script_name = '';
      $style_name = '';
    }
  }

  $GLOBALS['page_script_name'] = $script_name;
  $GLOBALS['page_style_name'] = $style_name ?>
<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=CustomEvent%2CIntersectionObserver%2CIntersectionObserverEntry%2CElement.prototype.closest%2CElement.prototype.dataset%2CHTMLPictureElement"></script>
  <meta charset="<?php bloginfo( 'charset' ) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, user-scalable=no, viewport-fit=cover">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- styles preload -->
  <link rel="preload" as="style" href="<?php echo $template_directory_uri ?>/style.css">
	<link rel="preload" as="style" href="<?php echo $template_directory_uri ?>/css/<?php echo $style_name ?>.css" />
	<link rel="preload" as="style" href="<?php echo $template_directory_uri ?>/css/<?php echo $style_name ?>.576.css" media="(min-width:575.98px)" />
	<link rel="preload" as="style" href="<?php echo $template_directory_uri ?>/css/<?php echo $style_name ?>.768.css" media="(min-width:767.98px)" />
	<link rel="preload" as="style" href="<?php echo $template_directory_uri ?>/css/<?php echo $style_name ?>.1024.css" media="(min-width:1023.98px)" />
	<link rel="preload" as="style" href="<?php echo $template_directory_uri ?>/css/<?php echo $style_name ?>.1280.css" media="(min-width:1279.98px)" />
  <link rel="preload" as="style" href="<?php echo $template_directory_uri ?>/css/hover.css" media="(hover) and (min-width:1024px)">
  <!-- fonts preload --> <?php
	$fonts = [
		'Raleway-Light.woff',
		'Raleway-Medium.woff',
		'Raleway-Regular.woff',
		'OldStandardTT-Bold.woff',
		'OldStandardTT-Regular.woff'
	];
	foreach ( $fonts as $font ) : ?>

	<link rel="preload" href="<?php echo $template_directory_uri . '/fonts/' . $font ?>" as="font" type="font/woff" crossorigin="anonymous" /> <?php
	endforeach ?>
  <!-- other preload --> <?php
  echo PHP_EOL;

  $preload[] = $logo_url;

  if ( $preload ) {
    foreach ( $preload as $item ) {
      create_link_preload( $item );
    }
    unset( $item );
    echo PHP_EOL;
  } ?>
  <!-- favicons --> <?php
  echo PHP_EOL;

  wp_head() ?>
</head>

<body <?php body_class() ?>> <?php
  wp_body_open() ?>
  <!-- Yandex.Metrika counter -->
  <script type="text/javascript" >
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(87630402, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
    });
  </script>
  <noscript><div><img src="https://mc.yandex.ru/watch/87630402" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
  <!-- /Yandex.Metrika counter -->
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <div id="page-wrapper">
  <header class="hdr container">
    <?php
      // wp_nav_menu( [
      //   'theme_location'  => 'header_menu',
      //   'container'       => 'nav',
      //   'container_class' => 'hdr__nav',
      //   'menu_class'      => 'hdr__nav-list',
      //   'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
      // ] )
    ?>
    <a href="<?= home_url() ?>" class="hdr__logo logo" aria-label="перейти на главную">
      <img src="<?= $template_directory_uri ?>/img/Logo.svg" class="logo__img" alt="лого">
      <p class="logo__text">
        <span class="logo__title">Невский залог</span>
        <span class="logo__subtitle">Кредитный эксперт</span>
      </p>
    </a>

    <a href="tel:<?= $tel_clean ?>" class="hdr__tel tel-link">
      <span class="s-icon s-icon_tel-black"></span>
      <?= $tel ?>
    </a>

    <div class="hdr__socials">
      <a href="https://t.me/<?= $tel_clean ?>" class="hdr__socials-link" target="_blank">
        <span class="s-icon s-icon_tg-black"></span>
      </a>
      <a href="https://wa.me/<?= $tel_clean ?>" class="hdr__socials-link" target="_blank">
        <span class="s-icon s-icon_wsap-black"></span>
      </a>
    </div>

    <a href="#request" class="hdr__callback btn btn_red btn_hover-red">Обратный звонок</a>
  </header>