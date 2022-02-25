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