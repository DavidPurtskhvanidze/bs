const riskSlider = new Swiper('#risk-slider', {
    loop: true,
    // Default parameters
    slidesPerView: 2,
    spaceBetween: 20,
    centeredSlides: false,
    speed: 3000,
    autoplay: {
        delay: 2000,
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2,
            spaceBetween: 10,
            centeredSlides: true,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 4,
            spaceBetween: 16
        },
        // when window width is >= 992px
        992: {
            slidesPerView: 6,
            spaceBetween: 48
        }
    }
});
const catalogSlider = new Swiper('#catalog-slider', {
    slidesPerView: 1.4,
    spaceBetween: 20,
    navigation: {
        nextEl: ".p-o-catalog-section__wrapper .p-o-slider-next",
        prevEl: ".p-o-catalog-section__wrapper .p-o-slider-prev",
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            centeredSlides: true,
            slidesPerView: 1.4,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            centeredSlides: true,
            slidesPerView: 1.4,
            spaceBetween: 20,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 16
        },
        // when window width is >= 992px
        992: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }
});
const factsSlider1 = new Swiper('#facts-slider1', {
    // Default parameters
    slidesPerView: 1.4,
    spaceBetween: 20,
    navigation: {
        nextEl: ".p-o-facts-section__slider-1 .p-o-slider-next",
        prevEl: ".p-o-facts-section__slider-1 .p-o-slider-prev",
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            centeredSlides: true,
            slidesPerView: 1.4,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            centeredSlides: true,
            slidesPerView: 1.4,
            spaceBetween: 20,
        },
        // when window width is >= 992px
        992: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        // when window width is >= 1320px
        1320: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }
});
const factsSlider2 = new Swiper('#facts-slider2', {
    // Default parameters
    slidesPerView: 1.4,
    spaceBetween: 20,
    navigation: {
        nextEl: ".p-o-facts-section__slider-2 .p-o-slider-next",
        prevEl: ".p-o-facts-section__slider-2 .p-o-slider-prev",
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            centeredSlides: true,
            slidesPerView: 1.4,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            centeredSlides: true,
            slidesPerView: 1.4,
            spaceBetween: 20,
        },
        // when window width is >= 992px
        992: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        // when window width is >= 1320px
        1320: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    }
});
const examInfoSlider = new Swiper('#exam-info-slider', {
    slidesPerView: 1,
    effect: "fade",
    allowTouchMove: false,
    shortSwipes: false,
    grabCursor: false,
});
const examSlider = new Swiper('#exam-slider', {
    slidesPerView: 1,

    thumbs: {
        swiper: examInfoSlider,
    },

    navigation: {
        nextEl: ".exam-slider-next-js-action",
        prevEl: ".exam-slider-prev-js-action",
    },
    pagination: {
        el: '.p-o-exam-section__info-slider-pagination',
        clickable: true,
        bulletClass: 'p-o-exam-section__info-slider-bullet',
        renderBullet: function (index) {
            return '<div class="p-o-exam-section__info-slider-bullet">' + ('0' + [index + 1]) + '</div>';
        },
    },
});

