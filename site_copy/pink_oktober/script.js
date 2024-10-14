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
            spaceBetween: 20
        }
    }
});
const factsSlider1 = new Swiper('#facts-slider1', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: "#facts-slider1_next",
        prevEl: "#facts-slider1_prev",
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 10
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
const factsSlider2 = new Swiper('#facts-slider2', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: "#facts-slider2_next",
        prevEl: "#facts-slider2_prev",
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 10
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


const catalogSlider = new Swiper('#catalog-slider', {
    slidesPerView: 1,
    spaceBetween: 20,

    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1.4,
            spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 10
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
        nextEl: ".p-o-exam-section__info-slider-next",
        prevEl: ".p-o-exam-section__info-slider-prev",
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
function infoSliderNext() {
    $('.p-o-exam-section__info-slider-next').click();
}
function infoSliderPrev() {
    $('.p-o-exam-section__info-slider-prev').click();
}

