// скрол к категории товаров
$(document).on('click', '.tabs-slider a[data-name]', function() {
    var title = $(this).data('name');
    var anchor = $('h2[data-name="' + title + '"]').closest('.product-group');
    console.log(title, anchor);
    $('html,body').animate({
        scrollTop: anchor.offset().top - $('.header').outerHeight()
    }, 400);
    return false;
})

// стики меню при скроле
$(window).on('scroll', function() {
    var tabs = $('#tabs')
        , replacer = $('.tabs-replacer')
        , tabsHeight = tabs.outerHeight()
        , replacerHeight = replacer.outerHeight();

    if ($(window).scrollTop() >= replacer.offset().top - tabsHeight) {
        replacer.css({
            height: tabsHeight
        });
        tabs.addClass('fixed');
    }

    if ($(window).scrollTop() < replacer.offset().top + 15) {
        replacer.css({
            height: ''
        });
        tabs.removeClass('fixed');
    }
})
// клик по цвету
$(document).on('click', '.product-colors-list .product-colors-list-item', function() {
    var i = $(this).index();
    $(this).closest('.product-colors-wrapper').prev().find('.swiper-pagination').find('span').eq(i).click();
})
// подгружаем слайдеры при скроле
$(document).on('pdopage_load', function(e, config, response) {
    loadSliders()
});
$(window).on('load', function() {
    $('main').addClass('loaded');

    window.tabs_slider = new Swiper('#tabs .swiper-container',{
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        loop: true,
        navigation: {
            nextEl: '#tabs .button-next',
            prevEl: '#tabs .button-prev',
        },
        on: {
            init: function(s) {
                setTimeout( () => {
                        s.slideTo($('#tabs .swiper-container .active').first().index())
                    }
                    , 400)
            }
        }
    });

});

// загружаем видимые слайдеры
$(document).on('ready', function() {
    loadSliders()
});

// скрол спай
$(window).on('scroll', function() {
    scrNav();
});
scrNav();

// главное меню
function scrNav() {
    var sTop = $(window).scrollTop();
    $('.product-group').each(function() {

        if ([149, 155, 152].indexOf($(this).data('id')) > -1)
            return;

        var el = $(this).find('[data-name2]')
            , tabs = $('#tabs')
            , offset = $(this).offset().top
            , name = el.data('name2')
            , height = $(this).height()
            , tabsHeight = tabs.outerHeight()
            , index = tabs.find('[data-name="' + name + '"]').index();

        if (sTop - tabsHeight <= 300) {
            tabs.find('[data-name]').removeClass('active');
            tabs.find('[data-name]').first().addClass('active');
            if (window.tabs_slider !== undefined)
                window.tabs_slider.slideTo(0);
        } else if (sTop - tabsHeight > offset && sTop - tabsHeight < offset + height) {
            tabs.find('[data-name]').removeClass('active');
            tabs.find('[data-name="' + name + '"]').addClass('active');

            if (window.tabs_slider !== undefined)
                window.tabs_slider.slideTo(index);
        }
    });
}

function loadSliders() {
    const tabsSlider = document.querySelectorAll('.tabs-slider .swiper-container');
    for (i = 0; i < tabsSlider.length; i++) {
        tabsSlider[i].classList.add('tabs-slider-' + i);

        if ($('.tabs-slider-' + i).hasClass('swiper-initialized'))
            continue;

        if (i !== 0) {
            new Swiper('.tabs-slider-' + i,{
                slidesPerView: "auto",
                slidesPerGroup: 1,
                loop: false,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.tabs-slider-' + i + ' + .button-prev + .button-next',
                    prevEl: '.tabs-slider-' + i + ' + .button-prev',
                },
                on: {
                    init: function(s) {
                        setTimeout( () => {
                                s.slideTo($('.tabs-slider-' + i + ' .active').first().index())
                            }
                            , 800)
                    }
                }
            });
        }

    }

    const colorsSlider = document.querySelectorAll('.colors2 .swiper-container');
    for (i = 0; i < colorsSlider.length; i++) {
        colorsSlider[i].classList.add('colors-slider-' + i);

        if ($('.colors-slider-' + i).hasClass('swiper-initialized') || $('.colors-slider-' + i + ' .swiper-slide').length < 9)
            continue;

        new Swiper('.colors-slider-' + i,{
            spaceBetween: 10,
            loop: false,
            slidesPerView: 'auto',
        });
    }

    const previewsSlider = document.querySelectorAll('.pictures-slider .swiper-container');
    for (i = 0; i < previewsSlider.length; i++) {
        previewsSlider[i].classList.add('previews-slider-' + i);

        if ($('.previews-slider-' + i).hasClass('swiper-initialized'))
            continue;

        new Swiper('.previews-slider-' + i,{
            loop: true,
            speed: 700,
            freeMode: false,
            spaceBetween: 10,
            navigation: {
                nextEl: '.previews-slider-' + i + ' .button-next',
                prevEl: '.previews-slider-' + i + ' .button-prev',
            },
            autoplay: {
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                }
            },
            on: {
                init: function(s) {
                    setTimeout( () => {
                            s.slideTo($('.previews-slider-' + i + ' .active').first().index())
                        }
                        , 400)
                }
            }
        });
    }

    const productsSlider = document.querySelectorAll('.product-slider .swiper-container');
    for (i = 0; i < productsSlider.length; i++) {
        productsSlider[i].classList.add('products-slider-' + i);

        if ($('.products-slider-' + i).hasClass('swiper-initialized'))
            continue;

        var loop = $('.products-slider-' + i + ' .swiper-slide').length > 4

        new Swiper('.products-slider-' + i,{
            loop: loop,
            spaceBetween: 10,
            speed: 700,
            freeMode: false,
            navigation: {
                nextEl: '.products-slider-' + i + ' .button-next',
                prevEl: '.products-slider-' + i + ' .button-prev',
            },
            pagination: {
                el: '.products-slider-' + i + ' .swiper-pagination ',
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1199: {
                    slidesPerView: 5,
                    spaceBetween: 18,
                }
            },
            on: {
                init: function(s) {//   setTimeout(() => {
                    //       s.slideTo($('.products-slider-' + i + ' .active').first().index())
                    //   }, 400)
                },
                afterInit: function() {
                    var count = $('.products-slider-' + i).parent().next().find('.swiper-slide').length;
                    var content = $('.products-slider-' + i).parent().next().find('.colors__title');
                    var text = count + ' ' + declOfNum(count, ['оттенок', 'оттенка', 'оттенков']);

                    if (count <= 1) {
                        content.text('Один оттенок');
                        // content.next().hide();
                    } else
                        content.text(text);
                },
            },
        });

    }
}

// наведение на доты
$(document).on({
    mouseenter: function() {
        $('.previews .item__caption').removeClass('active');
        $(this).parent().addClass('active');
    },

    mouseleave: function() {
        setTimeout( () => {
                if (!$(this).parent().find('.item__dot-caption').is(':hover'))
                    $(this).parent().removeClass('active');
            }
            , 1500)
    }
}, ".previews .item__caption .item__dot");

function declOfNum(n, titles) {
    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}