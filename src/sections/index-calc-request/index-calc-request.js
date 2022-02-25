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