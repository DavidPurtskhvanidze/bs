const collectionSlider = new Swiper('.collection-slider', {
    slidesPerView: 1.5,
    spaceBetween: 10,
    breakpoints: {
        640: {
            slidesPerView: 1.5,
            spaceBetween: 10,
        },
        780: {
            slidesPerView: 5,
            spaceBetween: 18,
        }
    }
});