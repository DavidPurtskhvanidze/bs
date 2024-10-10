const riskSlider = new Swiper('#risk-slider', {
    loop: true,
    // Default parameters
    slidesPerView: 6,
    spaceBetween: 20,
    // Responsive breakpoints
    // breakpoints: {
    //     // when window width is >= 320px
    //     320: {
    //         slidesPerView: 2,
    //         spaceBetween: 20
    //     },
    //     // when window width is >= 480px
    //     480: {
    //         slidesPerView: 3,
    //         spaceBetween: 30
    //     },
    //     // when window width is >= 640px
    //     640: {
    //         slidesPerView: 4,
    //         spaceBetween: 40
    //     }
    // }
});
const factsSlider = new Swiper('#facts-slider', {
    loop: true,
    // Default parameters
    slidesPerView: 4,
    spaceBetween: 20,
    // Responsive breakpoints
    // breakpoints: {
    //     // when window width is >= 320px
    //     320: {
    //         slidesPerView: 2,
    //         spaceBetween: 20
    //     },
    //     // when window width is >= 480px
    //     480: {
    //         slidesPerView: 3,
    //         spaceBetween: 30
    //     },
    //     // when window width is >= 640px
    //     640: {
    //         slidesPerView: 4,
    //         spaceBetween: 40
    //     }
    // }
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

