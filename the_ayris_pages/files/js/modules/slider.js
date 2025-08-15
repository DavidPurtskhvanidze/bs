const newItemsSlider = new Swiper('#newItemsSlider', {
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 1.5,
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
const newItemsMainPageSlider = new Swiper('#newItemsMainPageSlider', {
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 1.5,
    centeredSlides: true,
    navigation: {
        nextEl: '#newItemsMainPageSlider .swiper-button-next',
        prevEl: '#newItemsMainPageSlider .swiper-button-prev',
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
        // when window width is >= 1023px
        1440: {
            centeredSlides: false,
            slidesPerView: 5.2,
        },

    }
});
const bestsellersSlider = new Swiper('#bestsellersSlider', {
    speed: 300,
    spaceBetween: 5,
    slidesPerView: 1.5,
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
    slidesPerView: 1.5,
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
        // when window width is >= 1023px
        1440: {
            centeredSlides: false,
            slidesPerView: 2.6,
        },
    }
});


const productPictures = new Swiper('#productPictures', {
    speed: 300,
    spaceBetween: 2,
    slidesPerView: 1,
    centeredSlides: true,
    navigation: {
        nextEl: '#productPictures .swiper-button-next',
        prevEl: '#productPictures .swiper-button-prev',
    },
    pagination: {
        el: '#productPictures .swiper-pagination',
    },
});
