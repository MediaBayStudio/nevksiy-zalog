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