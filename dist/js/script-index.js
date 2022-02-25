document.addEventListener('DOMContentLoaded', function() {

//=include ../sections/header/header.js

//=include ../sections/mobile-menu/mobile-menu.js

(function() {
  const menuToggleBtn = q('.hero__burger')
  const menu = q('.menu')
  const hideElems = [
    q('.hero__title'),
    q('.hero__descr-list'),
    q('.hero__link'),
  ]

  menuToggleBtn.addEventListener('click', function() {
    menuToggleBtn.classList.toggle('open')
    if (menuToggleBtn.classList.contains('open')) {
      menu.classList.add('open')

      hideElems.forEach(function(el) {
        el.classList.add('hide')
      })
    } else {
      menu.classList.remove('open')

      hideElems.forEach(function(el) {
        el.classList.remove('hide')
      })
    }
  })

  menu.addEventListener('click', function(e) {
    const callLink = e.target.closest('.menu__prim-link')
    const navLink = e.target.closest('.menu__item')

    if (navLink || callLink) {
      menuToggleBtn.classList.remove('open')
      menu.classList.remove('open')
      hideElems.forEach(function(el) {
        el.classList.remove('hide')
      })
    }
  })
})();

(function() {
  $('.servcies__list').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    dots: true,
    arrows: false,
    // variableWidth: true,
    customPaging : function() {
      return '<button class="slick__dot"></button>';
    },
    // responsive: [
    //   {
    //     breakpoint: 767.98,
    //     settings: 'unslick'
    //   }
    // ]
  })
})();

//=include ../sections/index-requirements/index-requirements.js

//=include ../sections/index-rejection/index-rejection.js

//=include ../sections/index-request/index-request.js

(function() {
  const btns = qa('.objects__toggle-btn')
  const wrapper = q('.objects__toggle-btns')
  const img = q('.objects__img')

  wrapper.addEventListener('click', function(e) {
    const btn = e.target.closest('.objects__toggle-btn')

    if (btn) {
      const src = btn.dataset.img
      img.src = ''
      img.src = src
      removeActiveClass()
      btn.classList.add('active')
    }
  })

  function removeActiveClass() {
    btns.forEach(function(btn) {
      btn.classList.remove('active')
    });
  }
})();

(function() {
  const amountInp = q('.range-inp__inp[name="loan-amount"]')
  const monthInp  = q('.range-inp__inp[name="loan-term"]')

  const amountOutput = q('.js-amount')
  const monthOutput = q('.js-month')
  const totalOutput = q('.js-total')

  let amount = amountInp.value
  let month  = monthInp.value

  amountInp.addEventListener('input', e => {
    amount = e.target.value
    amountOutput.textContent = amount.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")
    calcSum()
  })

  monthInp.addEventListener('input', e => {
    month = e.target.value
    monthOutput.textContent = month.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")
    calcSum()
  })

  function calcSum() {
    const rate = (9.49 / 12) / 100
    const koef = (rate * (Math.pow(1 + rate, month))) / (Math.pow(1 + rate, month) - 1)

    totalOutput.textContent = ((amount * koef).toFixed()).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")
  }
})();

//=include ../sections/index-results/index-results.js

//=include ../sections/index-escort/index-escort.js

(function() {
  $('.partners__slider').slick({
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    mobileFirst: true,
    dots: true,
    arrows: false,
    centerMode: true,
    centerPadding: 0,
    touchThreshold: 15,
    autoplaySpeed: 100,
    speed: 1000,
    lazyLoad: 'progressive',
    customPaging : function() {
      return '<button class="slick__dot"></button>';
    },
    responsive: [
      {
        breakpoint: 767.98,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1023.98,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1279.98,
        settings: {
          slidesToShow: 6,
          dots: false,
        }
      }
    ]
  })
})();

(function() {
  const amountInp = q('.calc-field__inp[name="amount"]')
  const amountField = q('.calc-field--amount')
  const termInp  = q('.calc-field__inp[name="term"]')
  const termField = q('.calc-field--term')
  const totalInp = q('.calc-field__inp[name="total"]')
  const resOutput = q('.calc-field--total .calc-field__inp')

  const percent = 9.49

  let amount_int = 0
  let month_int = 120

  amountInp.addEventListener('input', function(e) {
    const value = e.target.value
    let digitsVal = saveOnlyDigits(value)

    if (+digitsVal > 100000000) {
      digitsVal = (100000000).toString()
    } else if (+digitsVal <= 0) {
      digitsVal = ''
    } else {
      digitsVal = digitsVal.toString()
    }

    if (+digitsVal < 100000) {
      amountField.classList.add('invalid')
    } else {
      amountField.classList.remove('invalid')
    }

    const formatedVal = digitsVal.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")

    e.target.value = formatedVal + ' ₽'
    amount_int = +digitsVal
    calcSum(amount_int, month_int)
    // resOutput.textContent = calcSum(amount_int, month_int) + ' ₽'
  })

  amountInp.addEventListener('keydown', function(e) {
    if (e.keyCode !== 8) return

    amount_int = +(amount_int.toString().slice(0, -1))
    e.target.value = amount_int.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") + ' ₽'
    calcSum(amount_int, month_int)
    // resOutput.textContent = calcSum(amount_int, month_int) + ' ₽'
  })

  termInp.addEventListener('input', function(e) {
    let val = e.target.value

    if (val > 25) {
      val = 25
      e.target.value = 25
    } else if (val <= 0) {
      val = 0
      e.target.value = ''
    }

    if (val === 0) {
      termField.classList.add('invalid')
    } else {
      termField.classList.remove('invalid')
    }

    month_int = +val * 12
    calcSum(amount_int, month_int)
  })

  function calcSum(amount, month) {
    const rate = (percent / 12) / 100
    const koef = (rate * (Math.pow(1 + rate, month))) / (Math.pow(1 + rate, month) - 1)
    let res  = ((amount * koef).toFixed()).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")

    if (res === 'Infinity' || res === 'NaN') res = 0

    // resOutput.textContent = res + ' ₽'

    return res
  }

  function saveOnlyDigits(value) {
    return value.replace(/\D+/g, '');
  }
})();

(function() {

  window.__lmap = function() {
    const coord = [59.925173, 30.380206]

    const map = new ymaps.Map(q('#map'), {
      center: coord,
      zoom: 16,
      controls: []
    })
    const placemark = new ymaps.Placemark(coord)

    map.geoObjects.add(placemark)
  }
})();

//=include ../sections/footer/footer.js

});