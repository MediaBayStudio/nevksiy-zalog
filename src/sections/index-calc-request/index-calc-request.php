<?php
$form_id = $section['form'];
$form_shortcode = '[contact-form-7 id="' . $form_id . '" html_id="calc-form"]';
?>

<section id="calc-request" class="calc-request sect container">
  <div class="calc-request__pic">
    <img src="<?= $template_directory_uri ?>/img/girlbg.png" alt="девушка с деньгами" class="calc-request__img">
  </div>

  <div class="calc-request__form">
    <h3 class="calc-request__form-title">Оформление онлайн заявки</h3>
    <div class="calc-fields">
      <label class="calc-field calc-field--amount">
        <span class="calc-field__text">Сумма кредита</span>
        <input type="text" name="amount" class="calc-field__inp" form="calc-form" placeholder="4 000 000 ₽">
        <span class="calc-field__info">100 000 - 100 000 000 ₽</span>
      </label>

      <label class="calc-field calc-field--term">
        <span class="calc-field__text">Срок кредита</span>
        <input type="number" name="term" class="calc-field__inp" form="calc-form" placeholder="10 лет">
        <span class="calc-field__info">Не более 25 лет</span>
      </label>

      <!-- <div class="calc-field calc-field--total">
        <span class="calc-field__text">Ежемесячный платеж</span>
        <div class="calc-field__inp"></div>
        <input type="text" name="total" class="calc-field__inp" form="calc-form" hidden>
      </div> -->
    </div>

    <label class="field field_name">
      <select type="text" name="object" class="field__inp field__select" placeholder="Апартаменты" required form="calc-form">
        <option value="" disabled selected>Объект недвижимости</option>
        <option value="квартира/дом">Квартира/Дом</option>
        <option value="апартаменты">Апартаменты</option>
        <option value="продающееся имуществоe">Продающееся имущество</option>
        <option value="земельный участок">Земельный участок</option>
        <option value="коммерческая недвижимость">Коммерческая недвижимость</option>
      </select>
      <span class="field__text required">Укажите тип объекта</span>
    </label>
    <?= do_shortcode( $form_shortcode ) ?>
  </div>
</section>