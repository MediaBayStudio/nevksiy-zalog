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