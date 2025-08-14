// direction vertical
// swiper-slide
// test ci\cd 10

const fxProductPicsSlider = new Swiper('#fxProductPicsSlider', {
    speed: 300,
    spaceBetween: 2,
    slidesPerView: 1,
    centeredSlides: true,
    direction : 'vertical', // horizontal
    el : '.fx-image-scrl',
    autoHeight : true,
    freeMode: {
        enabled: true,
        // sticky: true,
    },
    mousewheel: {
        enabled: true,
        releaseOnEdges: true,
    },
    /*  scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
      },*/
    navigation: {
        nextEl: '#fxProductPicsSlider .swiper-button-next',
        prevEl: '#fxProductPicsSlider .swiper-button-prev',
    },
    pagination: {
        el: '#fxProductPicsSlider .swiper-pagination',
        clickable : true
    },
    breakpoints: {
        // when window width is >= 767px
        320: {
            //autoHeight : true,
            direction : 'horizontal',
            freeMode: {
                enabled: false,
                // sticky: true,
            },
        },
        // when window width is >= 767px
        992: {
            direction : 'vertical',

        },

    }
});


