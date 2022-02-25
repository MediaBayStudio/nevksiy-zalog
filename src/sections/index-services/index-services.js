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