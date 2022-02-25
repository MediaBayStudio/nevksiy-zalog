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