const pictureCards = new Swiper('#pictureCards', {
    speed: 300,
    spaceBetween: 20,
    slidesPerView: 1,
    centeredSlides: false,
    autoHeight: true,
    freeMode: true,
    mousewheel: true,
    direction: 'horizontal',
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints: {
        0: {
            autoHeight: false,
            freeMode: false,
            mousewheel: false,
        },
        767: {
            direction: 'vertical',
        }
    }
});

const pictureCards2 = new Swiper('#pictureCards2', {
    speed: 300,
    spaceBetween: 20,
    slidesPerView: 1,
    centeredSlides: false,
    autoHeight: true,
    freeMode: true,
    mousewheel: true,
    direction: 'horizontal',
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints: {
        0: {
            autoHeight: false,
            freeMode: false,
            mousewheel: false,
        },
        767: {
            direction: 'vertical',
        }
    }
});

document.querySelectorAll('.card').forEach(card => {
    const colorButtons = card.querySelectorAll('.card-color');
    const sizeButtons = card.querySelectorAll('.card-size');
    const images = card.querySelectorAll('.card-picture img');

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedColor = button.getAttribute('data-color');

            colorButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            images.forEach(img => {
                if (img.getAttribute('data-color') === selectedColor) {
                    img.style.display = 'block';
                } else {
                    img.style.display = 'none';
                }
            });
        });
    });

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});