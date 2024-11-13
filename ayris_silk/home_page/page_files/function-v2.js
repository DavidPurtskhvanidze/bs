









var body = $('body');
var header = $('header');
var to_top = $('#panel .up');
var tab_slider = undefined;
$(document).ready(function () {



    new Swiper('#slider', {
        navigation: {
            nextEl: '#slider .button-next',
            prevEl: '#slider .button-prev',
        },
        loop: true,
        effect: 'fade',
        autoplay: {
                delay: 7000,
        },
        on: {
            slideChange: function (slider) {
                var index = slider.activeIndex;
                var slide = document.getElementsByClassName('swiper-slide')[index];
                
                if($(slide).attr('data-left') !== undefined) {
                    $('#slider').addClass('left');
                }
                else {
                    $('#slider').removeClass('left');
                }
                
                if($(slide).attr('data-inverse') !== undefined) {
                    $('header').addClass('inverse');
                    $('.header').addClass('inverse');
                    if($('header.fixed').length === 0) $('.header .logo img').attr('src', 'assets/tpl/icon/logo_inverse.svg')
                    if($('header.fixed').length === 0) $('#msMiniCart > *').css({ 'background-image': "url(assets/tpl/icon/cart.svg#caramel)" })
                    $('#slider').addClass('inverse');
                }
                else {
                    $('header').removeClass('inverse');
                    $('.header').removeClass('inverse');
                    $('.header .logo img').attr('src', 'assets/tpl/icon/logo.svg')
                    $('#msMiniCart > *').css({ 'background-image': "url(assets/tpl/icon/cart.svg#black)" })
                    $('#slider').removeClass('inverse');
                }
            }
        },
    });
    
    product_thumbs = new Swiper('#product:not(.two-row) .product-nav', {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: false,
        //lazy: { loadPrevNext: true },
        breakpoints: {
            1000: {
                spaceBetween: 18,
            }
        }
    });

    /*если используется 1 ряд миниатюр*/
    product_for = new Swiper('#product:not(.two-row) .product-for', {
        spaceBetween: 10,
        navigation: {
            nextEl: '#product:not(.two-row) .gallery .product-button-next',
            prevEl: '#product:not(.two-row) .gallery .product-button-prev',
        },
        pagination: {
          type: 'bullets',
          el: ".swiper-pagination1",
          dynamicBullets: false,
          clickable: true,
        },
        loop: false,
        effect: 'fade',
        //lazy: { loadOnTransitionStart: true },
        on: {
            init: function (slider) {
                setTimeout(function () {
                    $(slider.el).closest('#product:not(.two-row) .gallery').css({ visibility: 'visible' });
                }, 1000);
            },
            slideChange: function (slider) {
                var index = slider.activeIndex;
                //slider.thumbs.swiper.slideTo(index + 3);
                
                
                var index = this.realIndex;
                var slide = document.getElementsByClassName('swiper-slide')[index];
                var slideVideo = slide.getElementsByTagName('iframe')[0];
                
                if(slideVideo !== undefined) {
                    window.player.playVideo()
                }
            }
        },
        thumbs: {
            swiper: product_thumbs
        }
    });
    
    /*если используется 2 ряда миниатюр*/
    product_for2 = new Swiper('#product.two-row .product-for', {
        spaceBetween: 10,
        navigation: {
            nextEl: '#product.two-row .gallery .product-button-next',
            prevEl: '#product.two-row .gallery .product-button-prev',
        },
        loop: true,
        effect: 'fade',
        lazy: { loadOnTransitionStart: true },
        on: {
            init: function (slider) {
                setTimeout(function () {
                    $(slider.el).closest('#product.two-row .gallery').css({ visibility: 'visible' });
                }, 1000);
            },
            slideChange: function (slider) {
                var index2 = slider.activeIndex + ((slider.activeIndex % 2 === 0) ? 0 : 1);
                index2 = index2/2 + 1;
                slider.thumbs.swiper.slideTo(index2);
                

                /*console.log(slider.activeIndex);
                console.log((slider.activeIndex % 2 === 0) ? 0 : 1);
                console.log(index2);*/
            }
        },
        thumbs: {
            swiper: {
                el: '#product.two-row .product-nav',
                slidesPerView: 4,
                spaceBetween: 10,
                slidesPerGroup: 1,
                grid: {
                    rows: 1,
                },
                loop: true,
                lazy: { loadPrevNext: true },
                breakpoints: {
                    1000: {
                        spaceBetween: 18,
                    }
                }
            }
        }
    });

    $('.products.slider').each(function () {
        var container = $(this).find('.swiper-container')[0];
        products_slider = new Swiper(container, {
            slidesPerView: "auto",
            spaceBetween: 10,
            watchSlidesVisibility: true,
            lazy: { loadPrevNext: true },
            on: {
                init: function (swiper) {
                    swiper.params.navigation.prevEl = $(swiper.el).parent().find('.swiper-button-prev')[0];
                    swiper.params.navigation.nextEl = $(swiper.el).parent().find('.swiper-button-next')[0];
                    swiper.navigation.init();
                }
            },
            breakpoints: {
                780: {
                    slidesPerView: 3,
                },
                1000: {
                    slidesPerView: 4,
                }
            }
        });
    });
    
    if($('#comments').length) {
        new Swiper('#comments .items-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 2000,
            pagination: false,
            slidesPerGroup: 1,
            pagination: {
                clickable: true,
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: "#comments .swiper-button-next",
                prevEl: "#comments .swiper-button-prev",
            },
        });
    }

    $('.videos.slider').each(function () {
        var container = $(this).find('.swiper-container')[0];
        videos_slider = new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 15,
            watchSlidesVisibility: true,
            watchOverflow: true,
            lazy: { loadPrevNext: true },
            on: {
                init: function (swiper) {
                    swiper.params.navigation.prevEl = $(swiper.el).parent().find('.swiper-button-prev')[0];
                    swiper.params.navigation.nextEl = $(swiper.el).parent().find('.swiper-button-next')[0];
                    swiper.navigation.init();
                }
            },
            breakpoints: {
                400: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 3,
                },
            }
        });
    });

    $('.benefit-slider').each(function () {
        var shell = $(this).find('.swiper-container')[0];
        benefit_slider = new Swiper(shell, {
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 5000,
            },
            slidesPerView: 3,
            spaceBetween: 40,
            loop: true,
            speed: 2000,
            slidesPerGroup: 1,
            watchSlidesVisibility: true,
            breakpoints: {
                320: {
                    slidesPerView: 1.5,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                },
                640: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 0
                },
                780: {
                    slidesPerView: 3,
                }
            }
        });
        benefit_slider.params.navigation.prevEl = $(benefit_slider.el).parent().find('.swiper-button-prev')[0];
        benefit_slider.params.navigation.nextEl = $(benefit_slider.el).parent().find('.swiper-button-next')[0];
        benefit_slider.navigation.init();
    });
    
    if($('.reviews-slider').length) {
        var reviews_slider = new Swiper('.reviews-slider', {
            autoplay: {
                delay: 5000,
            },
            slidesPerView: 3,
            spaceBetween: 40,
            loop: true,
            speed: 2000,
            slidesPerGroup: 1,
            watchSlidesVisibility: true,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 0
                },
                780: {
                    slidesPerView: 3,
                }
            }
        });
        reviews_slider.params.navigation.prevEl = $(reviews_slider.el).parent().find('.swiper-button-prev')[0];
        reviews_slider.params.navigation.nextEl = $(reviews_slider.el).parent().find('.swiper-button-next')[0];
        reviews_slider.navigation.init();
    }

    initTabSwiper();
    paddingBody();

    initSetImageFromColor();
    body.on('change', '#product:not(.two-row) .colors input[name^="options"]', function () {
        setImageFromColor(this);
        history.pushState({}, undefined, location.pathname+'?mod='+$(this).data('name'));
    });
    
    initSetImageFromColor2();
    body.on('change', '#product.two-row .colors input[name^="options"]', function () {
        setImageFromColor2(this);
    });

    initScrollActions();
    $(window).scroll(function () {
        initScrollActions();
    });

    to_top.on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    $('.faq .item').on('click', function () {
        if ($(this).hasClass('active')) {
            return;
        }
        $('.faq .item.active').find('.content-text').slideUp(function () {
            $(this).parent().removeClass('active');
        });
        $(this).addClass('active');
        $(this).find('.content-text').slideDown();
    });

    $('.scroll').click(function () {
        str = $(this).attr("href");
        if ($(str).length > 0) {
            var offset = -20 - header.outerHeight();
            $('body').scrollTo(str, 1500, {
                offset: offset
            });
        } else {
            window.location.href = '/' + str;
        }
        return false;
    });

    $('footer .menu .title').on('click', function () {
        if (body.width() > 780) {
            return;
        }
        var par = $(this).parent();
        var foot_menu = par.find('ul');
        if (par.hasClass('active')) {
            foot_menu.slideUp();
        } else {
            foot_menu.slideDown();
        }
        par.toggleClass('active');
    });

    if ($('.suggestions').length) {
        $('.suggestions[name=city]').suggestions({
            token: dadata_token,
            type: 'ADDRESS',
            hint: false,
            bounds: 'city-settlement',
            onSelect: onSelectSuggestion,
            onSelectNothing: function(query) { onSelectNothing('city', query) },
            constraints: {
                locations: {
                    country: "*"
                }
            }
        });

        $('.suggestions[name=country]').suggestions({
            token: dadata_token,
            hint: false,
            onSelectNothing: function(query) { onSelectNothing('country', query) },
            type: "country",
            locations: {
                country: "*"
            }
        });

        $('.suggestions[name=region]').suggestions({
            token: dadata_token,
            type: "ADDRESS",
            hint: false,
            bounds: "region",
        });
    }

    $(document).on('msoptionsprice_product_action', function (e, action, form, r) {
        if (action == 'modification/get' && r.success && r.data) {

            // Для работы переключения фоток в мини-корзине
            //if ( $('#msCart.active').length > 0){
            if ( $('#msCart').length > 0 || $('.fx-msop-on-imgs').length > 0 )  {
                if (r.data.modification.showsale == 1) {
                    $('.fx-msoptionboxprecents-'+r.data.rid).addClass('show');
                } else {
                    $('.fx-msoptionboxprecents-'+r.data.rid).removeClass('show');
                }
                $('.fx-msoptionboxproduct-'+r.data.rid).find('.fx-msoptionsprice-image-insert').attr('src',r.data.modification.thumbs.small[0]);
            }
            if ($('.fx-product-one-msop').length > 0 && r.data.modification.showsale == 1) {
                //$('.fx-product-one-msop').eq(0).
                if (r.data.modification.old_cost > r.data.modification.cost){
                    $('.fx-product-one-msop').find('.fx-prod-new').show();
                    $('.fx-product-one-msop').find('.fx-prod-old').addClass('old');
                } else {
                    $('.fx-product-one-msop').find('.fx-prod-new').hide();
                    $('.fx-product-one-msop').find('.fx-prod-old').removeClass('old');
                }
            }


            var status = r.data.options.status ?? false;
            if (status) {
                $('#product .status').html('<span>' + status +'</span>');
            } else {
                $('#product .status').html('');
            }
        }
    });
    
    
    $(document).on("click", ".pp_", function (e) {
            e.preventDefault();
            var i = $(this),
                s = i.attr("data-pp");
            if (($("html,body").addClass("noscroll"), $(".pp").removeClass("show"), $('.pp[data-pp="' + s + '"]').addClass("show"), "promo-video" === s)) t && t.play();
            else if ("video-review" == s) $('.pp[data-pp="' + s + '"] iframe').attr("src", urlToId(i.data("link")));
    })
        
        
     $(document).on("click", ".pp__close, .pp__bg, .close_btn", function () {
            $(".pp").removeClass("show"),
                $("html,body").removeClass("noscroll"),
                t && t.pause(),
                $('.pp[data-pp="video-review"] iframe').attr("src", "")
    })
    
    $(document).on('click', '#comments-modal .content-stars svg', function(e) {
        e.preventDefault();
        var rating = $(this).data('rating');
        $(this).closest('.content-stars').attr('data-rating', rating);
        $('.ec-rating-stars [data-rating="'+rating+'"]').click();
    })

    // dop 04-03-2024
    $(document).on('click', '.fx-modal-on', function () {
        var linko = $(this).attr('href');
        var closeexisting = $(this).data('closeexisting') ?? 0;
        var hashcode = linko.split('#')[1];

        $.fancybox.open({
            src  : '#'+hashcode,
            type : 'inline',
            opts : {
                loop : false,
                keyboard: false,
                arrows: false,
                touch : false,
                infobar: false,
                protect: false,
                wheel: false,
                modal: false,
                autoFocus: false,
                backFocus : false,
                'closeExisting' : closeexisting,
            }
        });

        return false;
    })


});

$(window).resize(function () {
    initTabSwiper();
    paddingBody();
});