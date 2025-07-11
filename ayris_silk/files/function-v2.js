$.fancybox.defaults.thumbs.autoStart = true
$.fancybox.defaults.thumbs.axis = 'x'


if($('.cards-slider').length) initCardsSlider();

if(location.hash === '#subscribe') {
    $.fancybox.open({src: '#subscribe'})
}



function initCardsSlider() {
    new Swiper('.cards-slider', {
        navigation: {
            nextEl: '#card-modal .button-next',
            prevEl: '#card-modal .button-prev',
        },
        loop: true,
        effect: 'fade'
    });
  
    
    $(document).on('click', '#card-modal button[type="button"]', function() {
        let modal = $(this).closest('#card-modal'),
            form = modal.find('.swiper-slide-active form'),
            text = modal.find('[name="text"]').val();
            
        modal.find('[name="text"]').removeClass('error');
            
        if(text.length < 4) {
            modal.find('[name="text"]').addClass('error');
            miniShop2.Message.error('Заполните поле подпись');
            return false;
        }
            
        text = JSON.stringify({'text' : text});

        console.log(form)
        
        form.find('[name="options"]').val(text);
        form.find('button[type="submit"]').trigger('click');
        $('#msCart [href="#card-modal"] span').text('Заменить открытку');
        $.fancybox.close('all');
        setTimeout(() => { location.reload() }, 1000)
        return false;
    })
}

function initSetImageFromColor() {
    $('#product:not(.two-row) .colors input[name^="options"]:checked').each(function () {
        setImageFromColor(this, true);
    });
}

function initSetImageFromColor2() {
    $('#product.two-row .colors input[name^="options"]:checked').each(function () {
        setImageFromColor2(this);
    });
}

function urlToId(e) {
    var i, t;
    if (e)
        if (-1 !== e.indexOf("https://youtu.be/"))
            try {
                -1 != (t = (i = e.split("be/")[1]).indexOf("&")) && (i = i.substring(0, t));
            } catch (e) {}
        else
            try {
                -1 != (t = (i = e.split("v=")[1]).indexOf("&")) && (i = i.substring(0, t));
            } catch (e) {}
    else i = null;
    return "https://www.youtube.com/embed/" + i + "?autoplay=1&modestbranding=1&iv_load_policy=3";
}

function onYouTubeIframeAPIReady(id) {
    player = new YT.Player('player', {
        width: 520,
        height: 520,
        videoId: id,
        events: {
            'onReady': onPlayerReady,
        },
    });
}

function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
}


function setImageFromColor(el, firstload = false) {
    input = $(el);

    if(input.data('alias') === undefined) return;

    if (src = input.data('img')) {
        input.closest('.product').find('.img img').attr('src', src);
    } else {
        var idx = $('#product:not(.two-row) .product-for').find('.swiper-slide[data-id="' + input.data('id') + '"]').index();
        //product_for.slideTo(idx);
    }
    var items = [],
        thumbs = [],
        unique = [],
        allItems = [],
        allThumbs = [],
        video = {
            items: [],
            thumbs: [],
            current: ''
        },
        name = '',
        alias = input.data('alias').split('|')
        
    photos.forEach((el,idx) => {
        name = el.file.toLowerCase()
        
        allItems.push(`<a class="swiper-slide" href="${el.url}" data-fancybox="product" data-id="${el.id}" data-file="${el.file}"><img data-src="${el.big}" src="${el.big}" class="swiper-lazy" src="" alt="${el.name}"></a>`)
        allThumbs.push(`<div class="swiper-slide"><img data-src="${el.big}" src="${el.big}" class="swiper-lazy" alt="${el.name}" data-file="${el.file}"></div>`)
        
        alias.forEach(n => {
            if(name.indexOf(n) !== -1) {
                unique.push(el.url)
                items.push(`<a class="swiper-slide" href="${el.url}" data-fancybox="product" data-id="${el.id}" data-file="${el.file}"><img data-src="${el.big}" src="${el.big}" class="swiper-lazy" src="" alt="${el.name}"></a>`)
                thumbs.push(`<div class="swiper-slide"><img data-src="${el.big}" src="${el.big}" class="swiper-lazy" alt="${el.name}" data-file="${el.file}"></div>`)
            }
        })
    })
    
    videos.forEach((el,idx) => {
        if(el.alias.indexOf(alias.join('|')) !== -1 && el.video) {
            video.current = el.id
            video.items.push(`<div class="swiper-slide"><div id="player" width="540" height="540" src="${el.video}?controls=0" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></div></div>`)
            video.thumbs.push(`<div class="swiper-slide video-slide"><img src="${el.preview}"></div>`)
        }
    })
    items = [ ...new Set(items) ]
    thumbs = [ ...new Set(thumbs) ]
    
    items = items.concat(video.items)
    thumbs = thumbs.concat(video.thumbs)
    
    
    

    // if(items.length === 0) {
    //     items = allItems
    //     thumbs = allThumbs
    // }
    
    $('.gallery-wrapper').hide()
    setTimeout(() => {
        product_for.removeAllSlides()
        product_for.appendSlide(items)
    }, 100)
    product_for.update()
    product_for.slideTo(0)
    
    setTimeout(() => {
        product_thumbs.removeAllSlides()
        product_thumbs.appendSlide(thumbs)
    }, 100)
    product_thumbs.update()
    product_thumbs.slideTo(0)
    
    setTimeout(() => {
        $('.gallery-wrapper').fadeIn()
        product_for.update()
    }, 500)
    
    setTimeout(() => {
        window.player = new YT.Player('player', {
            width: 540,
            height: 540,
            videoId: video.current
        });
    }, 1000)
    
}


$(document).on('click', '[href="#want-modal"]', function() {
    if($('#product .colors').length) {
        var color = $('#product .colors input:checked').val()
        $('#want-modal .product__form input[name="color"]').val(color)
        $('#want-modal .product__options [data-color] span').text(color)
        $('#want-modal .product__options [data-color]').show()
    }
    var firstImg = $('#product .product-for .swiper-slide-active:first-child img').attr('src')
    $('#want-modal .product__form input[name="img"]').val(firstImg)
    $('#want-modal .product__img img').attr('src', firstImg)
    $('#want-modal .product__form input[name="link"]').val(location.href)
    if($('#product .sizes').length) {
        var size = $('#product .sizes [name="options[size]"]').val()
        $('#want-modal .product__form input[name="size"]').val(size)
        $('#want-modal .product__options [data-size] span').text(size)
        $('#want-modal .product__options [data-size]').show()
    }    
})

function setImageFromColor2(el) {
    input = $(el);
    if (src = input.data('img')) {
        input.closest('.product').find('.img img').attr('src', src);
    } else {
        var idx2 = $('#product.two-row .product-for').find('.swiper-slide[data-id="' + input.data('id') + '"]').index();
        setTimeout(function(){
                product_for2.slideTo(idx2+2);
                product_for2.slideTo(idx2);
                console.log('setImageFromColor2')
        }, 100);
    }
}

function unscroll(on = true) {
    if (on) {
        $('html').addClass('unscroll');
    } else {
        $('html').removeClass('unscroll');
    }
}

function initSpinner() {
    $(".uispinner").spinner({
        min: 1,
        stop: function (event, ui) {
            var form = $(event.target).closest('form');
            if (form.find('button:visible').length < 1) {
                form.submit();
            }
            $(".uispinner_dub").val(event.target.value)
            
        },
        create: function( event, ui ) {
            var form = $(event.target).closest('form');
            var val = parseInt(form.find('[name="count"]').val());
            
            if(form.closest('#sideCart').length) {
                if(val === 1) {
                    form.find('.ui-spinner-down').css({'pointer-events':'none'})
                }
                else {
                    form.find('.ui-spinner-down').css({'pointer-events':'all'})
                }
            } 
        }
    });
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}


function initScrollActions() {
    if ($(this).scrollTop() != 0) {
        header.addClass('fixed');
        $('header.fixed .logo img').attr('src', 'assets/tpl/icon/logo.svg');
        $('#msMiniCart > *').css({ 'background-image': "url(assets/tpl/icon/cart.svg#black)" })
    } else {
        header.removeClass('fixed');
        if($('.header.inverse').length) {
            $('header .logo img').attr('src', 'assets/tpl/icon/logo_inverse.svg');
            $('#msMiniCart > *').css({ 'background-image': 'url("assets/tpl/icon/cart.svg#caramel")' });
        }
    }
    if ($(this).scrollTop() > 100) {
        to_top.fadeIn();
    } else {
        to_top.fadeOut();
    }
}

function paddingBody() {
    if ($('body#main').length == 0) {
        $('body').css({ "padding-top": header.outerHeight() + 'px' })
    }
}

function initTabSwiper() {
    if(!$('.tabs .swiper-container').length) return;
    var screenWidth = $(window).width();
    if (screenWidth <= 1330 && tab_slider == undefined) {
        tab_slider = new Swiper('.tabs .swiper-container', {
            slidesPerView: "auto",
            slidesPerGroup: 1,
            spaceBetween: 15
        });
    } else if (screenWidth > 1030 && tab_slider != undefined) {
        tab_slider.destroy();
        tab_slider = undefined;
    }
    
    tab_slider = new Swiper('.tabs .swiper-container', {
            slidesPerView: "auto",
            slidesPerGroup: 1,
            loopAddBlankSlides: true,
            loop: false,
            spaceBetween: 15,
        });
     
    if($('.tabs .swiper-slide.active').length) {
        var idx = parseInt($('.tabs .swiper-slide.active').attr('aria-label').split(' / '));
        tab_slider.slideTo(idx - 1);
    }
}
/*
function onSelectSuggestion(suggestion, changed) {
    var th_region = ((suggestion.data.region != null) ? suggestion.data.region : '');

    $('input[name=country]').val(suggestion.data.country).trigger('change');
    $('input[name=region]').val(th_region);
    $('input[name=city]').val(suggestion.data.city);
    $('input[name=index]').val(suggestion.data.postal_code);
    $('input[name=country_code]').val(suggestion.data.country_iso_code);
    $("#federal").val(suggestion.data.federal_district);
    $("#region").val(th_region);
    
    const params = new URLSearchParams({
        country: suggestion.data.country,
        city: suggestion.data.city,
        federal: suggestion.data.federal_district,
        region: th_region
    });
    $.get('/scripts/update_minishop2_session.php?' + params.toString());
    miniShop2.Order.deliveryCost = '.ms2_order_delivery_cost';
    setTimeout(() => miniShop2.Order.getcost(), 1000);
}

function onSelectNothing(name, query) {
    console.log("[ onSelectNothing ] ty 3",name, query);
    if (query === '') return;
    //if (name == 'city') return;
    var $el = $('input[name='+name+']');
    setTimeout(function() {$el.val('');}, 100);
    var mess = $('<span>', {class: 'err'}).html('Выберите вариант из списка.');
    $el.after(mess);
    setTimeout(function() {mess.fadeOut();}, 3000);
}*/

$(document).on('af_complete', function (event, response) {
    var form = response.form;
    console.log(form);
    if(form.attr('id') == 'form-want') {
        form.closest('#want-modal').find('.wrapper').toggle();
        setTimeout(() => {
            form.closest('#want-modal').find('.wrapper').toggle();
        }, 3000)
        return false;
    }
    
    if (!response.success && response.message) {
        for (var mess in response.data) {
            AjaxForm.Message.error(response.data[mess], 1);
        }
    }
    if (response.success && response.message) {
        if (response.form.attr('id') === 'subscribe') {
            response.form.find('.subscribe-form').hide();
            response.form.find('.subscribe-thanks').show();
            return;
        }
        $(form).find('>*').wrapAll('<div class="fade">');
        $(form).find('.fade').fadeOut(function () {
            $('<p>', { class: 'results' }).html(response.message).appendTo(form);
            setTimeout(function () {
                $.fancybox.close();
            }, 3000);
        });
    }
});

var body = $('body');
var header = $('header');
var to_top = $('#panel .up');
var tab_slider = undefined;

$(document).ready(function () {

    function ResetSpliter() {
        var price = Number($("#product-price").text().replaceAll(' ', ''));
        var price4 = Math.round(price / 4).toLocaleString();
        var price6 = Math.round(price / 6).toLocaleString();
        $(".parts-price").text(price6);
        $(".price4").text(price4);
        $(".price6").text(price6);
    }
    setTimeout(ResetSpliter, 1000);
   /* $("#product-price").on("DOMSubtreeModified", function() {
        var price = Number($("#product-price").text().replaceAll(' ', ''));
        var price4 = Math.round(price / 4).toLocaleString();
        var price6 = Math.round(price / 6).toLocaleString();
        $(".parts-price").text(price6);
        $(".price4").text(price4);
        $(".price6").text(price6);
    });*/
    
    const videoObserver = new IntersectionObserver(
        ([entry]) => {
            const video = entry.target || {};
            
            if (video.currentTime !== 0 && video.pause()) return;
            
            // Если видео вне viewport или видимо только на 20%
            if (!entry.isIntersecting || entry.intersectionRatio <= 0.2) {
                // жмем паузу
                video.pause();
            } else {
                // иначе воспроизводим
                video.play();
            }
        },
        {
            threshold: [0.1, 0.9]
        }
    );
    
    document
        .querySelectorAll(".video-player")
        .forEach((video) => videoObserver.observe(video));

    $('.js-select').select2({
        placeholder: 'ВЫБРАТЬ РАЗМЕР',
        minimumResultsForSearch: Infinity
    });

    AjaxForm.Message.success = function () { };

    initSpinner();

    $('.burger-menu').on('click', function () {
        header.toggleClass('mobile-menu-open');
    });

    $('.par > a').on('click', function () {
        $(this).closest('.par').toggleClass('active');
        return false;
    });

    if ($(document).width() < 1200) {
        $('.par > a').on('click', function (e) {
            e.preventDefault();
        });
    }


    
    $('[data-fancybox-load]').on('click', function () {
        var temp = $('<div>', { class: 'hidden' }).appendTo('body');
        temp.load($(this).attr('href') + ' #content', function () {
            $.fancybox.defaults.autoFocus = false;
            $.fancybox.open($(temp.html()).addClass('popup'));
            temp.remove();
        });
        return false;
    });
    
    $(".popup-size-table").on('click', function(e) {
        e.preventDefault();
        $(".size-table").addClass('active');
        $.fancybox.open({
            src: '#size-table',
            opts: {
                clickSlide: false
            }
        });
    });

    $('#label').fancybox({
        slideClass: 'label'
    });

    new Swiper('#slider', {
        navigation: {
            nextEl: '#slider .button-next',
            prevEl: '#slider .button-prev',
        },
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 20000,
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
                
                // if($(slide).attr('data-inverse') !== undefined) {
                //     $('header').addClass('inverse');
                //     $('.header').addClass('inverse');
                //     if($('header.fixed').length === 0) $('.header .logo img').attr('src', 'assets/tpl/icon/logo_inverse.svg')
                //     if($('header.fixed').length === 0) $('#msMiniCart > *').css({ 'background-image': "url(assets/tpl/icon/cart.svg#caramel)" })
                //     $('#slider').addClass('inverse');
                // }
                // else {
                //     $('header').removeClass('inverse');
                //     $('.header').removeClass('inverse');
                //     $('.header .logo img').attr('src', 'assets/tpl/icon/logo.svg')
                //     $('#msMiniCart > *').css({ 'background-image': "url(assets/tpl/icon/cart.svg#black)" })
                //     $('#slider').removeClass('inverse');
                // }
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

    /*
    initSetImageFromColor();
    body.on('change', '#product:not(.two-row) .colors input[name^="options"]', function () {
        setImageFromColor(this);
        history.pushState({}, undefined, location.pathname+'?mod='+$(this).data('name'));
    });
    
    initSetImageFromColor2();
    body.on('change', '#product.two-row .colors input[name^="options"]', function () {
        setImageFromColor2(this);
    });
    */

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

   /* if ($('.suggestions').length) {
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
    */

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
                ResetSpliter();
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



// телефон на странице заказа.

$(document).on("focusout", "#msOrder input[name='phone']", function() {
     console.log("start_typing_in_phone_field");
     }).on("blur", "input[name='phone']", function() {
        console.log("focus_in_phone_field");

        var data = {};

        data.as_action = 'util/add-phone';
        data.phone = $(this).val();
        data.name = $("#msOrder #firstname").val() +" "+$("#msOrder #lastname").val();
        console.log(data);
        $.ajax({
            url: [
                location.protocol,
                '//',
                location.host,
                location.pathname
            ].join(''),
            data: data,
            type: 'post',
            dataType: 'json',
            success: function(response) {

            },
            error: function() {

            }
        });


     })