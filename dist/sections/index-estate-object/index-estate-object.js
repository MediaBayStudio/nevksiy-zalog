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