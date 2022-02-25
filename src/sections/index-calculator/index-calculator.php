<section id="calculator" class="calculator sect container">
  <h2 class="sect-title">Рассчитайте платеж по кредиту</h2>

  <div class="calculator__inner">

    <div class="calculator__inputs">
      <label class="range-inp">
        <p class="range-inp__top">
          <span class="range-inp__title">Сумма кредита</span>
          <span class="range-inp__preview"><span class="js-amount">100 000</span> ₽</span>
        </p>
        <input type="range" name="loan-amount" class="range-inp__inp" min="100000" max="100000000" step="100000" value="100000"/>
        <p class="range-inp__info">до 100 000 000 ₽</p>
      </label>

      <label class="range-inp">
        <p class="range-inp__top">
          <span class="range-inp__title">Срок</span>
          <span class="range-inp__preview"><span class="js-month">12</span> мес.</span>
        </p>
        <input type="range" name="loan-term" class="range-inp__inp" min="12" max="300" step="12" value="12"/>
        <p class="range-inp__info">до 25 лет</p>
      </label>
    </div>

    <div class="calculator__results">
      <ul class="calc-res">
        <li class="calc-res__item">
          <h3 class="calc-res__item-title">Ежемесячный платёж</h3>
          <p class="calc-res__item-info">
            <span class="js-total">8 768</span> ₽
          </p>
        </li>
        <li class="calc-res__item">
          <h3 class="calc-res__item-title">Процентная ставка</h3>
          <p class="calc-res__item-info">9,49%</p>
        </li>
      </ul>

      <div class="calc-res__info">
        <p class="calc-res__info-text">Доля одобрений составляет до 90%</p>
        <a href="#calc-request" class="calc-res__link btn btn_red btn_hover-gold">Оставить заявку</a>
      </div>
    </div>

  </div>
</section>