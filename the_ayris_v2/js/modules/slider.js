const newItemsSlider = new Swiper('#newItemsSlider', {
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 1.3,
    centeredSlides: true,
    navigation: {
        nextEl: '#newItemsSlider .swiper-button-next',
        prevEl: '#newItemsSlider .swiper-button-prev',
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 767px
        767: {
            centeredSlides: false,
            slidesPerView: 3,
        },
        // when window width is >= 1023px
        1023: {
            centeredSlides: false,
            slidesPerView: 4,
        },

    }
});
const bestsellersSlider = new Swiper('#bestsellersSlider', {
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 1.3,
    centeredSlides: true,
    navigation: {
        nextEl: '#bestsellersSlider .swiper-button-next',
        prevEl: '#bestsellersSlider .swiper-button-prev',
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 767px
        767: {
            centeredSlides: false,
            slidesPerView: 3,
        },
        // when window width is >= 1023px
        1023: {
            centeredSlides: false,
            slidesPerView: 4,
        },

    }
});


const youWillLikeIt = new Swiper('#youWillLikeIt', {
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 2,
    centeredSlides: false,
    navigation: {
        nextEl: '#youWillLikeIt .swiper-button-next',
        prevEl: '#youWillLikeIt .swiper-button-prev',
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 767px
        767: {
            centeredSlides: false,
            slidesPerView: 3,
        },
        // when window width is >= 1023px
        1023: {
            centeredSlides: false,
            slidesPerView: 4,
        },

    }
});
const recentlyWatched = new Swiper('#recentlyWatched', {
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 2,
    centeredSlides: false,
    navigation: {
        nextEl: '#recentlyWatched .swiper-button-next',
        prevEl: '#recentlyWatched .swiper-button-prev',
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 767px
        767: {
            centeredSlides: false,
            slidesPerView: 3,
        },
        // when window width is >= 1023px
        1023: {
            centeredSlides: false,
            slidesPerView: 4,
        },

    }
});

const cartSuggestionsSlider = new Swiper('#cartSuggestionsSlider', {
    speed: 300,
    spaceBetween: 20,
    slidesPerView: 2,
    centeredSlides: false,
    navigation: {
        nextEl: '.cart-sidebar-suggestions_slider .swiper-button-next',
        prevEl: '.cart-sidebar-suggestions_slider .swiper-button-prev',
    },
    // Responsive breakpoints
    // breakpoints: {
    //     // when window width is >= 767px
    //     767: {
    //         centeredSlides: false,
    //         slidesPerView: 3,
    //     },
    //     // when window width is >= 1023px
    //     1023: {
    //         centeredSlides: false,
    //         slidesPerView: 4,
    //     },
    //
    // }
});

const cardsButtonBlockSlider = new Swiper('#cardsButtonBlockSlider', {
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 1.3,
    centeredSlides: true,
    navigation: {
        nextEl: '#cardsButtonBlockSlider .swiper-button-next',
        prevEl: '#cardsButtonBlockSlider .swiper-button-prev',
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 767px
        767: {
            centeredSlides: false,
            slidesPerView: 2,
        },

    }
});

// direction vertical
// swiper-slide
/*const productPictures = new Swiper('#productPictures', {
    speed: 300,
    spaceBetween: 2,
    slidesPerView: 1,
    centeredSlides: true,
    direction : 'vertical', // horizontal
    el : '.fx-image-scrl',
    mousewheel: {
        enabled: true,
        releaseOnEdges: true,
    },
  /!*  scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },*!/
    navigation: {
        nextEl: '#productPictures .swiper-button-next',
        prevEl: '#productPictures .swiper-button-prev',
    },
    pagination: {
        el: '#productPictures .swiper-pagination',
        clickable : true
    },
});*/

//addGapBottomBanner
// This script adds padding to the bottom of a large banner. In a grid.
function addGapBottomBanner() {
    let cardBottomOuterHeight = $('.card-bottom').outerHeight();
    let cardBigBanner = $('.card-grid__big-banner');
    if (window.innerWidth >= 767) {
        cardBigBanner.css('margin-bottom', cardBottomOuterHeight);
    } else {
        cardBigBanner.removeAttr('style');
    }
}
$(document).ready(function () {
    addGapBottomBanner();
});
$(window).on('resize', function() {
    addGapBottomBanner();
});
//addGapBottomBanner



// fx- addMarginToBottomOfBanner
// This script adds padding to the bottom of a large banner. In a grid.
function addMarginToBottomOfBanner() {
    let cardBottomOuterHeight = $('.card-bottom').outerHeight();
    let cardBigBanner = $('.fx-big-banner-margin-bottom');
    if (window.innerWidth >= 767) {
        cardBigBanner.css('margin-bottom', cardBottomOuterHeight);
    } else {
        cardBigBanner.removeAttr('style');
    }
}
$(document).ready(function () {
    addMarginToBottomOfBanner();
});
$(window).on('resize', function() {
    addMarginToBottomOfBanner();
});
// fx- addMarginToBottomOfBanner
