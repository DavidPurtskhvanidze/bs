if(!lexiconForJs) {
    var lexiconForJs = {
        "free": "Is free",//Бесплатно
        "showed": "Shown",//Показано
        "currency" : "$",
        "messageError" : "An error occurred in the process", //В процессе произошла ошибка
        "requiredField" : "This field must be filled in", //это поле должно быть заполнено
        "incorrectEmail" : "Enter a valid email address", // введите корректный e-mail
        "incorrectPhone" : "Enter the correct phone number", // введите корректный номер телефона
        "incorrectZip" : "This zip/post code does not match your state/province"
    };
}

function yaReachGoal(target) {
    if (typeof(Ya)!='undefined'){
        Ya._metrika.counter.reachGoal(target);
		console.log('Цель ' + target + ' отправлена');
    } else{
		console.log('Цель ' + target + ' не отправлена');
	}
    return true;
}
function hideMenu() {
    var e = window.pageYOffset || document.documentElement.scrollTop;
    window.innerWidth < 1024 && document.documentElement.scrollTop > 420 && e > lastScrollTop ? $("header").addClass("hide2") : $("header").removeClass("hide"), (lastScrollTop = e <= 0 ? 0 : e);
}
function scrollNav() {
    $(window).scrollTop() >= offserHeader
        ? ($("header").addClass("scroll"),
          window.innerWidth > 767 &&
              $(".single-product-section__content").length > 0 &&
              ($(window).scrollTop() >= $(".single-product-section__content").offset().top + $(".single-product-section__content").outerHeight(!0) - $("header").height()
                  ? $(".product-bottom-panel").addClass("show")
                  : $(".product-bottom-panel").removeClass("show")))
        : ($("header").removeClass("scroll"),
          $(".general-swiper").length > 0 &&
              window.innerWidth > 1023 &&
              ((offsetTop = ($(window).scrollTop() / 10) * -1),
              $(".general-swiper").css({ transform: "translate3d(0px, " + offsetTop + "px, 0px)", "-webkit-transform": "translate3d(0px, " + offsetTop + "px, 0px)", "-ms-transform": "translate3d(0px, " + offsetTop + "px, 0px)" })),
          $(".single-photo.fixed").length > 0 &&
              window.innerWidth > 1023 &&
              ((offsetTop = ($(window).scrollTop() / 10) * -1),
              $(".single-photo.fixed").css({ transform: "translate3d(0px, " + offsetTop + "px, 0px)", "-webkit-transform": "translate3d(0px, " + offsetTop + "px, 0px)", "-ms-transform": "translate3d(0px, " + offsetTop + "px, 0px)" })));
}
function urlToId(e) {
    var i, t;
    if (e)
        if (0 == e.indexOf("static/"))
            return e;
        else if (-1 !== e.indexOf("https://youtu.be/"))
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
function addProgressCircle() {
    $(".general-swiper-pagination .swiper-pagination-bullet-active").append(
        '\n  <svg version="1.0" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>\n  <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>\n  </svg>\n  '
    );
}
function logoSwiperFunc() {
    window.innerWidth < 768
        ? $(".partners-box > .swiper-container:first-child").length > 0 &&
          (logoSwiper = new Swiper(".partners-box > .swiper-container:first-child", {
              speed: 300,
              allowTouchMove: !1,
              initialSlide: 3,
              updateOnWindowResize: !0,
              centeredSlides: !0,
              loop: !1,
              slidesPerView: "auto",
              breakpoints: { 0: { allowTouchMove: !0, init: !0 }, 768: { init: !1 } },
              on: {
                  resize: function () {
                      let e = this;
                      e.update(), window.innerWidth < 768 ? e.init() : e.destroy();
                  },
              },
          })).init()
        : logoSwiper && logoSwiper.destroy();
}
function otherProductsSwiperSidebar(){

}
function sidebarSwitcher() {
    try {
        $(".shop-section__goods_content > [id]").each(function (e, i) {
            if ($(window).scrollTop() > $(i).offset().top - ($("header").height() + 100) && $(window).scrollTop() < $(i).offset().top + $(i).height()) {
                let e = "\\#" + $(i).attr("id");
                $(".delivery-switcher > *").removeClass("active"),
                    $(".delivery-switcher > a[href=" + e + "]").addClass("active"),
                    $($(".delivery-switcher .scroll")).css({ top: $(".delivery-switcher > a[href=" + e + "]").position().top, height: $(".delivery-switcher > a[href=" + e + "]").outerHeight() });
            }
        });  
    } catch (error) {
        //console.error(error);
    }
}
function getCookie(e) {
    var i = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return i ? decodeURIComponent(i[1]) : void 0;
}
function setCookie(e, i, t) {
    var s = (t = t || {}).expires;
    if ("number" == typeof s && s) {
        var o = new Date();
        o.setTime(o.getTime() + 1e3 * s), (s = t.expires = o);
    }
    s && s.toUTCString && (t.expires = s.toUTCString());
    var r = e + "=" + (i = encodeURIComponent(i));
    for (var n in t) {
        r += "; " + n;
        var a = t[n];
        !0 !== a && (r += "=" + a);
    }
    document.cookie = r;
}
function deleteCookie(e) {
    setCookie(e, "", { expires: -1 });
}
function changeShowView() {
    window.innerWidth < 767
        ? ($(".shop-format > [data-format='many']").removeClass("active"), $(".shop-format > [data-format='few']").addClass("active"), $(".shop-section__goods_content").addClass("few"))
        : ($(".shop-format > [data-format='few']").removeClass("active"), $(".shop-format > [data-format='many']").addClass("active"), $(".shop-section__goods_content").removeClass("few"));
}
function playAboutVideo() {
    $(".about-us-section").length > 0 && $(window).scrollTop() >= $(".about-us-section").offset().top / 2 && videojs("my-video_1").play();
}
var generalSwiper = !1,
    aboutUsSwiper = !1,
    partnersSwiper = !1,
    productSwiper = !1,
    collectionSwiper = !1,
    logoSwiper = !1,
    reviewsSwiper = !1,
    pillowSwiper = !1,
    goodsReviews = !1,
    patents = !1,
    duoSwiperFirst = !1,
    duoSwiperSecond = !1,
    swiperOtherProducts = !1,
    offserHeader = 100,
    offsetTop = 0,
    lastScrollTop = 0,
    resultContainer = !1,
    skr = !1;
$(document).ready(function () {
    $('*[data-reachgoal]').each(function () {
        if ($(this)[0].localName === 'form'){
            $(this).on('submit', function () {
                yaReachGoal($(this).data('reachgoal'));
                return true;
            });
        } else {
            $(this).on('click', function () {
                yaReachGoal($(this).data('reachgoal'));
                return true;
            });
        }
	});
    function e(e) {
        $(".about-us-section .swiper-pagination-bullet-active").append(
            `\n                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg">\n                  <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(79, 111, 193, 0.15)" fill="none"></circle>\n                  <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="var(--indigo)" fill="none" class="circle-load-svg" style="animation-duration:${e.params.autoplay.delay}ms"></circle>\n                  </svg>\n                  `
        );
    }
    function i(e, i, t, s) {
        i
            .closest(e)
            .find("img[data-color=" + t + "]")
            .is(":hidden")
            ? (i.closest(e).find(".slide-product__img_colors [data-color]").removeClass("active"),
              i.addClass("active"),
              i.closest(e).find("img[data-color]").fadeOut(200),
              setTimeout(() => {
                  i.closest(e)
                      .find("img[data-color=" + t + "]")
                      .fadeIn(200);
              }, 200),
              i
                  .closest(e)
                  .find(".slide-product__information_head>span")
                  .html(s + " р."))
            : (i.closest(e).find(".slide-product__img_colors [data-color]").removeClass("active"), i.addClass("active"));
            //console.log("first");
    }
    $('.shop-store .shop-section__goods_sidebar').on('click', '.show, .cart-close', function(){
        $('body').toggleClass('shop-section__goods_sidebar_active');
    });
    $('.shop-store .shop-section__goods_sidebar').on('change', 'input[name="shop-goods"]', function(){
        $('body').removeClass('shop-section__goods_sidebar_active');
    });
    $(".general-swiper").length > 0
        ? ((offserHeader = $(".general-swiper").position().top + $(".general-swiper").height()),
          (generalSwiper = new Swiper(".general-swiper", {
              speed: 2000,
              spaceBetween: 0,
              slidesPerView: "auto",
              loop: !0,
              keyboard: { enabled: !0, onlyInViewport: !0 },
              autoplay: { delay: 4000 },
              pagination: { el: ".general-swiper-pagination", clickable: !0 },
              on: {
                  init: function () {
                      setTimeout(() => {
                          addProgressCircle();
                      }, 100);
                  },
                  slideChange: function () {
                      $(".general-swiper-pagination  .swiper-pagination-bullet svg").remove(), addProgressCircle();
                  },
                  slideChangeTransitionStart: function () {
                      $(".general-swiper-pagination  .swiper-pagination-bullet svg").remove();
                  },
                  slideChangeTransitionEnd: function () {
                      addProgressCircle();
                  },
              },
              breakpoints: { 0: { autoplay: { delay: 2e3 } }, 768: { autoplay: { delay: 1.5e3 } } },
          })))
        : $(".general-photo").length > 0 && (offserHeader = $(".general-photo").position().top + $(".general-photo").height()),
        $(".about-us-swiper").length > 0 &&
            (aboutUsSwiper = new Swiper(".about-us-swiper", {
                speed: 2000,
                spaceBetween: 0,
                slidesPerView: "auto",
                autoplay: { delay: 4000 },
                loop: !0,
                effect: "fade",
                fadeEffect: { crossFade: !0 },
                pagination: { el: ".about-us-section .swiper-pagination", clickable: !0 },
                on: {
                    init: function () {
                        let i = this;
                        setTimeout(() => {
                            e(i);
                        }, 100);
                    },
                    slideChange: function () {
                        $(".about-us-section .swiper-pagination-bullet svg").remove(), e(this);
                    },
                    slideChangeTransitionStart: function () {
                        $(".about-us-section .swiper-pagination-bullet svg").remove();
                    },
                    slideChangeTransitionEnd: function () {
                        e(this);
                    },
                },
            })),
        $(".experts-swiper").length > 0 &&
            (expertSwiper = new Swiper(".experts-swiper", {
                speed: 2000,
                spaceBetween: 0,
                slidesPerView: "auto",
                autoplay: { delay: 4000 },
                pagination: { el: ".experts-swiper-pagination", clickable: !0 },
                navigation: { nextEl: ".experts-swiper-nav .swiper-button-next", prevEl: ".experts-swiper-nav .swiper-button-prev" },
                on: {
                    init: function () {
                        let i = this;
                        setTimeout(() => {
                            e(i);
                        }, 100);
                    },
                   slideChange: function () {
                       // $(".experts-swiper-pagination  .swiper-pagination-bullet svg").remove(), addProgressCircle();
                    },
                    slideChangeTransitionStart: function () {
                      //  $(".experts-swiper-pagination  .swiper-pagination-bullet svg").remove();
                    },
                    slideChangeTransitionEnd: function () {
                      //  addProgressCircle();
                    },
                },
            })),
            $(".experts-swiper2").length > 0 &&
            (expertSwiper = new Swiper(".experts-swiper2", {
                speed: 2000,
                spaceBetween: 0,
                slidesPerView: "auto",
                autoplay: { delay: 4000 },
                pagination: { el: ".experts-swipe2r-pagination", clickable: !0 },
                navigation: { nextEl: ".experts-swiper2-nav .swiper-button-next", prevEl: ".experts-swiper2-nav .swiper-button-prev" },
                on: {
                    init: function () {
                        let i = this;
                        setTimeout(() => {
                            e(i);
                        }, 100);
                    },
                   slideChange: function () {
                        $(".experts-swiper2-pagination  .swiper-pagination-bullet svg").remove(), addProgressCircle();
                    },
                    slideChangeTransitionStart: function () {
                        $(".experts-swiper2-pagination  .swiper-pagination-bullet svg").remove();
                    },
                    slideChangeTransitionEnd: function () {
                        addProgressCircle();
                    },
                },
            })),
        $(".partners-swiper").length > 0 && (partnersSwiper = new Swiper(".partners-swiper", { speed: 300, allowTouchMove: !1, initialSlide: 1, centeredSlides: !0, loop: !1, slidesPerView: "auto", breakpoints: { 1279: {} } })),
        $(".partners-swipernew").length > 0 && (partnersSwiperNew = new Swiper(".partners-swipernew", { speed: 300, allowTouchMove: !1, initialSlide: 1, centeredSlides: !0, loop: !1, slidesPerView: "auto", breakpoints: { 1279: {} } })),
        $(".product-swiper").length > 0 &&
            (productSwiper = new Swiper(".product-swiper", {
                speed: 400,
                loop: !1,
                grabCursor: !0,
                keyboard: { enabled: !0, onlyInViewport: !0 },
                navigation: { nextEl: ".product-swiper-nav .swiper-button-next", prevEl: ".product-swiper-nav .swiper-button-prev" },
                slidesPerView: "auto",
                breakpoints: {
                    0: { centeredSlides: !0, spaceBetween: 28, keyboard: { enabled: !1, onlyInViewport: !1 }, initialSlide: 0 },
                    768: { centeredSlides: !1, spaceBetween: 0, keyboard: { enabled: !0, onlyInViewport: !0 }, initialSlide: 0 },
                },
            })),
        $(".collection-swiper").length > 0 &&
            (collectionSwiper = new Swiper(".collection-swiper", {
                speed: 400,
                loop: !1,
                freeMode: !0,
                keyboard: { enabled: !0, onlyInViewport: !0 },
                navigation: { nextEl: ".collection-swiper_navigation .swiper-button-next", prevEl: ".collection-swiper_navigation .swiper-button-prev" },
                slidesPerView: "auto",
                breakpoints: {
                    0: { freeMode: !1, centeredSlides: !0, mousewheel: { releaseOnEdges: !1 }, initialSlide: 1, keyboard: { enabled: !1, onlyInViewport: !1 } },
                    768: { initialSlide: 0, freeMode: !0, centeredSlides: !1, mousewheel: { releaseOnEdges: !0 }, keyboard: { enabled: !0, onlyInViewport: !0 } },
                },
            })),
        $(".reviews-swiper").length > 0 &&
            (reviewsSwiper = new Swiper(".reviews-swiper", {
                speed: 500,
                loop: !0,
                keyboard: { enabled: !0, onlyInViewport: !0 },
                autoplay: { delay: 3e3 },
                centeredSlides: !0,
                navigation: { nextEl: ".reviews-swiper_navigation .swiper-button-next", prevEl: ".reviews-swiper_navigation .swiper-button-prev" },
                slidesPerView: "auto",
                breakpoints: { 0: { centeredSlides: !1 }, 768: { slidesPerView: 3, spaceBetween: 20 }, 1801: { slidesPerView: "auto", spaceBetween: 0 } },
            })),
        $(".pillow-slider").length > 0 &&
            $(".pillow-slider .swiper-slide").length > 3 &&
            (pillowSwiper = new Swiper(".pillow-slider", {
                speed: 300,
                direction: "vertical",
                loop: !0,
                slidesPerView: "auto",
                autoplay: { delay: 3e3 },
                navigation: { nextEl: ".pillow-swiper_navigation .swiper-button-next", prevEl: ".pillow-swiper_navigation .swiper-button-prev" },
                watchSlidesProgress: !0,
                watchSlidesVisibility: !0,
                breakpoints: {
                    0: { pagination: { el: ".pillow-swiper-pagination", clickable: !0, centeredSlides: !0 }, direction: "horizontal", autoplay: { delay: 3e3 } },
                    768: { centeredSlides: !1, pagination: !1, direction: "vertical", autoplay: !1 },
                    1280: { autoplay: { delay: 3e3 } },
                },
                on: {
                    init: function () {
                        setTimeout(() => {
                            $(".pillow-swiper-pagination .swiper-pagination-bullet-active").append(
                                '\n                <svg version="1.0" xmlns="http://www.w3.org/2000/svg">\n                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>\n                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>\n                </svg>\n                '
                            );
                        }, 100);
                    },
                    slideChange: function () {
                        $(".pillow-swiper-pagination  .swiper-pagination-bullet svg").remove(),
                            $(".pillow-swiper-pagination .swiper-pagination-bullet-active").append(
                                '\n              <svg version="1.0" xmlns="http://www.w3.org/2000/svg">\n              <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>\n              <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>\n              </svg>\n              '
                            );
                    },
                    slideChangeTransitionStart: function () {
                        $(".pillow-swiper-pagination  .swiper-pagination-bullet svg").remove();
                    },
                    slideChangeTransitionEnd: function () {
                        $(".pillow-swiper-pagination .swiper-pagination-bullet-active").append(
                            '\n              <svg version="1.0" xmlns="http://www.w3.org/2000/svg">\n              <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>\n              <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>\n              </svg>\n              '
                        ),
                            $(".pillow-slider .swiper-slide-active").hasClass("video") ? $(".pillow-swiper-pagination").addClass("hidden") : $(".pillow-swiper-pagination").removeClass("hidden");
                    },
                },
            })),
        $(".goods-reviews").length > 0 &&
            (goodsReviews = new Swiper(".goods-reviews .swiper-container", {
                speed: 2e3,
                loop: !0,
                autoplay: { delay: 5e3 },
                spaceBetween: 100,
                slidesPerView: "auto",
                navigation: { nextEl: ".goods-reviews .swiper-button-next", prevEl: ".goods-reviews .swiper-button-prev" },
            })),
        $(".patents-slider").length > 0 &&
            (patents = new Swiper(".patents-slider .swiper-container", {
                speed: 300,
                loop: false,
                autoplay: false,
                spaceBetween: 40,
                centerInsufficientSlides: true,
                slidesPerView: "auto",
                navigation: { nextEl: ".patents-slider .swiper-button-next", prevEl: ".patents-slider .swiper-button-prev" },
                breakpoints: { 0: { centeredSlides: true }, 768: { slidesPerView: "auto" }, 1801: { slidesPerView: "auto" } },
            })),
        $(".swiper-duo-swiper.first").length > 0 &&
            (duoSwiperFirst = new Swiper(".swiper-duo-swiper.first", {
                speed: 1e3,
                spaceBetween: 30,
                loop: !0,
                keyboard: { enabled: !0, onlyInViewport: !0 },
                autoplay: { delay: 3e3 },
                centeredSlides: !0,
                slidesPerView: "auto",
                pagination: { el: ".swiper-duo-swiper.first ~ .general-swiper-pagination", clickable: !0 },
                on: {
                    init: function () {
                        setTimeout(() => {
                            $($(this)[0].$el[0])
                                .closest(".swiper-duo-section__item_slider")
                                .find(".general-swiper-pagination .swiper-pagination-bullet-active")
                                .append(
                                    '\n                <svg version="1.0" xmlns="http://www.w3.org/2000/svg">\n                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>\n                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>\n                </svg>\n                '
                                );
                        }, 100);
                    },
                    slideChangeTransitionStart: function () {
                        $($(this)[0].$el[0]).closest(".swiper-duo-section__item_slider").find(".general-swiper-pagination  .swiper-pagination-bullet svg").remove();
                    },
                    slideChangeTransitionEnd: function () {
                        $($(this)[0].$el[0])
                            .closest(".swiper-duo-section__item_slider")
                            .find(".general-swiper-pagination .swiper-pagination-bullet-active")
                            .append(
                                '\n              <svg version="1.0" xmlns="http://www.w3.org/2000/svg">\n              <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>\n              <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>\n              </svg>\n              '
                            );
                    },
                },
            })),
        $(".swiper-duo-swiper.second").length > 0 &&
            (duoSwiperSecond = new Swiper(".swiper-duo-swiper.second", {
                speed: 1e3,
                spaceBetween: 30,
                loop: !0,
                keyboard: { enabled: !0, onlyInViewport: !0 },
                autoplay: { delay: 3e3 },
                centeredSlides: !0,
                slidesPerView: "auto",
                pagination: { el: ".swiper-duo-swiper.second ~ .general-swiper-pagination", clickable: !0 },
                watchSlidesProgress: !0,
                watchSlidesVisibility: !0,
                on: {
                    init: function () {
                        setTimeout(() => {
                            $($(this)[0].$el[0])
                                .closest(".swiper-duo-section__item_slider")
                                .find(".general-swiper-pagination .swiper-pagination-bullet-active")
                                .append(
                                    '\n                <svg version="1.0" xmlns="http://www.w3.org/2000/svg">\n                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>\n                <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>\n                </svg>\n                '
                                );
                        }, 100);
                    },
                    slideChangeTransitionStart: function () {
                        $($(this)[0].$el[0]).closest(".swiper-duo-section__item_slider").find(".general-swiper-pagination  .swiper-pagination-bullet svg").remove();
                    },
                    slideChangeTransitionEnd: function () {
                        $($(this)[0].$el[0])
                            .closest(".swiper-duo-section__item_slider")
                            .find(".general-swiper-pagination .swiper-pagination-bullet-active")
                            .append(
                                '\n              <svg version="1.0" xmlns="http://www.w3.org/2000/svg">\n              <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="rgba(255, 255, 255, 0.31)" fill="none"></circle>\n              <circle cx="50%" cy="50%" r="50%" stroke-width="2" stroke="#fff" fill="none" class="circle-load-svg"></circle>\n              </svg>\n              '
                            );
                    },
                },
            })),
        $(".swiper-other-products.first").length > 0 &&
            (swiperOtherProducts = new Swiper(".swiper-other-products.first", {
                loop: !0,
                speed: 1e3,
                spaceBetween: 47,
                navigation: { nextEl: ".swiper-other-products_navigation .swiper-button-next", prevEl: ".swiper-other-products_navigation .swiper-button-prev" },
                breakpoints: {
                    0: { direction: "vertical", spaceBetween: "auto", slidesPerView: "auto", slidesPerView: 3, loop: 1, speed: 300, spaceBetween: 15 },
                    1280: { spaceBetween: 35, slidesPerView: 3, loop: !0, speed: 1e3 },
                    1441: { slidesPerView: 3, spaceBetween: 47 },
                },
            })),
        logoSwiperFunc(),
        $(".partners-swipernew").length > 0 && (partnersSwiperNew = new Swiper(".partners-swipernew", { speed: 300, allowTouchMove: !1, initialSlide: 1, centeredSlides: !0, loop: !1, slidesPerView: "auto", breakpoints: { 1279: {} } })),
        $(document).on("click", ".pp_", function (e) {
            e.preventDefault();
            var i = $(this),
                s = i.attr("data-pp");
            if (i.attr("href") == "" || (typeof(i.attr("href")) == "undefined") ) {
                
            } else {
                document.location.href = i.attr("href") ;
            }
            if (($("html,body").addClass("noscroll"), $(".pp").removeClass("show"), $('.pp[data-pp="' + s + '"]').addClass("show"), "promo-video" === s)) t && t.play();
            else if ("video-review" == s) $('.pp[data-pp="' + s + '"] iframe').attr("src", urlToId(i.data("link")));
            else if ("video-expert" == s) $('.pp[data-pp="video-review"] iframe').attr("src", i.data("link"));
            else if ("certificate" === s) $('.pp[data-pp="' + s + '"] .popup-content img ').attr("src", i.data("link"));
            else if ("fullreview" === s) {
                let e = i.data("fullreview"),
                    t = i.data("rating"),
                    o = i.find(".reviews-reviewer__name span:first-child").text(),
                    r = i.find(".reviews-reviewer__name span:last-child").text(),
                    n = i.data("product"),
                    a = !1,
                    l = !1;
                i.find(".reviews-reviewer__photo img").length > 0 ? (a = i.find(".reviews-reviewer__photo img")) : (l = i.find(".reviews-reviewer__photo span")),
                    $('.pp[data-pp="' + s + '"] .reviews-text-item__content_text').html(e),
                    $('.pp[data-pp="' + s + '"] .reviews-stars ').addClass(t),
                    $('.pp[data-pp="' + s + '"] .reviewer-name').text(o),
                    $('.pp[data-pp="' + s + '"] .review-date').text(r),
                    $('.pp[data-pp="' + s + '"] .review-product').html(n),
                    a
                        ? ($('.pp[data-pp="' + s + '"] .reviews-text-item__photo > div').removeClass("nophoto"), a.clone().appendTo('.pp[data-pp="' + s + '"] .reviews-text-item__photo > div'))
                        : o && ($('.pp[data-pp="' + s + '"] .reviews-text-item__photo > div').addClass("nophoto"), l.clone().appendTo('.pp[data-pp="' + s + '"] .reviews-text-item__photo > div'));
            }
        }),
        $(document).on("click", ".pp__close, .pp__bg, .close_btn", function () {
            $(".pp").removeClass("show"),
                $("html,body").removeClass("noscroll"),
                t && t.pause(),
                $('.pp[data-pp="video-review"] iframe').attr("src", ""),
                "certificate" === $(this).closest(".pp").data("pp") && $(this).closest(".pp").find(".popup-content img").attr("src", ""),
                setTimeout(() => {
                    $(".form-default").fadeIn(0), $(".form-success").fadeOut(0);
                }, 400),
                $('.pp[data-pp="fullreview"] .reviews-text-item__content_text ').empty(),
                $('.pp[data-pp="fullreview"] .reviews-stars ').removeClass("one two three four five"),
                $('.pp[data-pp="fullreview"] .reviewer-name ').empty(),
                $('.pp[data-pp="fullreview"] .review-date').empty(),
                $('.pp[data-pp="fullreview"] .review-product ').empty(),
                $('.pp[data-pp="fullreview"] .reviews-text-item__photo > div ').empty(),
                "mailing-pop" === $(this).closest(".pp").data("pp") && setCookie("mailing-hide", !0, { expires: new Date(new Date().getTime() + 7*24*60*60*1000).toUTCString(), path: "/" }),
                "mailing-pop_second" === $(this).closest(".pp").data("pp") && setCookie("mailing_second-hide", !0, { expires: new Date(new Date().getTime() + 7*24*60*60*1000).toUTCString(), path: "/" });
        }),
        (document.onkeydown = function (e) {
            27 === (e = e || window.event).keyCode &&
                ($(".pp").removeClass("show"),
                $("html,body").removeClass("noscroll"),
                t && t.pause(),
                $('.pp[data-pp="video-review"] iframe').attr("src", ""),
                $(".shopping-cart").removeClass("active"),
                setTimeout(() => {
                    $(".form-default").fadeIn(0), $(".form-success").fadeOut(0);
                }, 400),
                $('.pp[data-pp="fullreview"] .reviews-text-item__content_text ').empty(),
                $('.pp[data-pp="fullreview"] .reviews-stars ').removeClass("one two three four five"),
                $('.pp[data-pp="fullreview"] .reviewer-name ').empty(),
                $('.pp[data-pp="fullreview"] .review-date').empty(),
                $('.pp[data-pp="fullreview"] .review-product ').empty(),
                $('.pp[data-pp="fullreview"] .reviews-text-item__photo > div ').empty()),
                "mailing-pop" === $(".pp.show").data("pp") && setCookie("mailing-hide", !0, { expires: new Date(new Date().getTime() + 7*24*60*60*1000).toUTCString(), path: "/" }),
                "mailing-pop_second" === $(".pp.show").data("pp") && setCookie("mailing_second-hide", !0, { expires: new Date(new Date().getTime() + 7*24*60*60*1000).toUTCString(), path: "/" });
        }),
        $("a").click(function (e) {
            let i = $(this);
            if (-1 !== i.attr("href").indexOf("#"))
                try {
                    let t = $(this).attr("href"),
                        s = $(t).offset().top;
                    return (
                        i.parent("div").hasClass("delivery-switcher") && (i.hasClass("active") || ($(".delivery-switcher > *").removeClass("active"), i.addClass("active"))),
                        $("html,body").animate({ scrollTop: s - $("header").height() - 20 }, 1e3),
                        !1
                    );
                } catch (e) {}
        }),
        $(".partners-logo__item").hover(
            function (e) {
                let i = $(this),
                    t = i.data("num");
                i.hasClass("acitve") || ($(".partners-logo__item").removeClass("active"), i.addClass("active"), partnersSwiper && partnersSwiper.slideTo(parseInt(t)));
            },
            function (e) {}
        ),
        $(document).on("touchstart, click", function (e) {
            if (window.innerWidth < 1024 && $(".header-common__bottom").hasClass("active")) {
                var i = $(".header-common");
                i.is(e.target) || 0 !== i.has(e.target).length || ($(".burger-menu").removeClass("active"), $(".header-common__bottom").removeClass("active"), $("html,body").removeClass("noscroll"));
            }
        }),
        $(document).on("touchstart, click", ".burger-menu", function (e) {
            window.innerWidth < 1024 && ($(this).toggleClass("active"), $(".header-common__bottom").toggleClass("active"), $("html,body").toggleClass("noscroll"));
        }),
        $(document).on("touchstart, click", ".header-menu__item", function (e) {
            window.innerWidth < 1024 &&
                ($(this).hasClass("hover")
                    ? ($(this).removeClass("hover"), $(this).find(".header-menu__item_content").slideUp(300))
                    : ($(".header-menu__item").removeClass("hover"), $(".header-menu__item  .header-menu__item_content").slideUp(300), $(this).addClass("hover"), $(this).find(".header-menu__item_content").slideDown(300)));
        }),
        $(".menu-container > div").on("touchstart, click", function (e) {
            Math.min(window.innerWidth, window.innerWidth) < 1024 &&
                ($(this).hasClass("hover")
                    ? ($(this).removeClass("hover"), $(this).find("ul").slideUp(300))
                    : ($(".menu-container > div").removeClass("hover"), $(".menu-container > div").find("ul").slideUp(300), $(this).addClass("hover"), $(this).find("ul").slideDown(300)));
        }),
        $(document).on("touchstart, click", ".slide-product__img_colors [data-color]", function (e) {
            let t,
                s = $(this),
                o = $(this).data("color"),
                r = $(this).data("price");
            s.closest(".adds-item").length > 0
                ? i((t = s.closest(".adds-item")), s, o, r)
                : s.closest(".swiper-slide").length > 0
                ? i((t = s.closest(".swiper-slide")), s, o, r)
                : s.closest(".product-other").length > 0
                ? ($(".single-product-hints .slide-product__img_colors [data-color=" + o + "]").trigger("click"), s.siblings("[data-color]").removeClass("active"), s.addClass("active"))
                : s
                      .closest(".slide-product__img")
                      .find("img[data-color=" + o + "]")
                      .is(":hidden")
                ? (s.closest(".slide-product__img_colors").find("[data-color]").removeClass("active"),
                  s.addClass("active"),
                  s.closest(".slide-product__img").find("img[data-color]").fadeOut(200),
                  setTimeout(() => {
                      s.closest(".slide-product__img")
                          .find("img[data-color=" + o + "]")
                          .fadeIn(200);
                  }, 200),
                  s
                      .closest(".slide-product")
                      .find(".slide-product__info > span")
                      .html(r + " р."),
                  s
                      .closest(".adds-item")
                      .find(".slide-product__information_head>span")
                      .html(r + " р."))
                : (s.closest(".slide-product__img_colors").find("[data-color]").removeClass("active"), s.addClass("active")),
                s.closest(".single-product-hints").length > 0 && ($(".product-other [data-color]").removeClass("active"), $(".product-other [data-color=" + o + "]").addClass("active"));
        }),
        $(document).on("touchstart, click", ".shop-format [data-format]", function (e) {
            let i = $(this),
                t = i.data("format"),
                s = i.closest(".shop-section").find(".shop-section__goods_content");
            i.hasClass("active") || ($(".shop-format [data-format]").removeClass("active"), $(".shop-format [data-format=" + t + "]").addClass("active"), s.removeClass("many"), s.removeClass("few"), s.addClass(t));
        }),
        $(document).on("touchstart, click", ".faq__content_item", function (e) {
            let i = $(this);
            i.hasClass("active")
                ? (i.removeClass("active"), i.find(".faq-answer").slideUp(300))
                : ($(".faq__content_item").removeClass("active"), $(".faq__content_item .faq-answer").slideUp(300), i.addClass("active"), i.find(".faq-answer").slideDown(300));
        }),
        $(document).on("touchstart, click", ".pillow-slider .swiper-slide", function (e) {
            console.log("third1");
            let i = $(this),
                t = i.children("img").attr("src"),
                s = i.children(".slider-video").data("video");
            i.children("img").data("sale"),
                i.children("img").data("isnew"),
                i.hasClass("active") ||
                    ($(".pillow-preview").removeClass("video"),
                    $(".pillow-preview iframe").remove(),
                    $(".pillow-slider .swiper-slide").removeClass("active"),
                    i.addClass("active"),
                    s &&
                        (window.innerWidth < 768
                            ? (i.removeClass("video"),
                              i.find("ifame").remove(),
                              i.addClass("video"),
                              i.append(
                                  `\n                            <iframe id="yotubeplayer" type="text/html" width="100%" height="100%" src="${urlToId(
                                      s
                                  )}" frameborder="0" allowfullscreen="" crossorigin="anonymous">\n                                </iframe>\n                            `
                              ))
                            : ($(".pillow-preview").addClass("video"),
                              $(".pillow-preview").append(
                                  `\n            <iframe id="yotubeplayer" type="text/html" width="100%" height="100%" src="${urlToId(s)}" frameborder="0" allowfullscreen="" crossorigin="anonymous">\n        </iframe>\n            `
                              ))),
                    t && $(".pillow-preview img").attr("src", t));
                    
                    if ($(".pillow-slider .swiper-slide.active img").attr("data-desc") === "made_in") {
                         $(".pillow-preview__label.italy").show();
                         $(".pillow-preview__label.italy").addClass("active");
                     } else {
                         $(".pillow-preview__label.italy").hide();
                         $(".pillow-preview__label.italy").addClass("noactive");
                     }
                     
                     if ($(this).find('img').attr('alt') != 'slide-0') {
                         $(".single-product-section__slider .approved").hide();
                     } else {
                         $(".single-product-section__slider .approved").show();
                     }
                    
                     
                     if (window.innerWidth < 768) {
                         /*$(".swiper-slide-duplicate-active img").attr("src", t);
                         $(".swiper-slide-active img").attr("src", t);*/
                         
                         
                        
                         pillowSwiper.slideTo($('.swiper-slide img[data-desc="'+i.children("img").attr("data-desc")+'"]').parent('div').attr("data-swiper-slide-index"), 200, '');
                     } else {
                        $(".pillow-preview img").attr("src", t).click();
                     }
                     
        }),
        $(document).on("click", ".single-product__counter > .hand_button", function (e) {
            let i = $(this),
                t = i.parent("div").children("input");
            i.hasClass("increment")
                ? "" === t.val()
                    ? t.val(1)
                    : t.val() < 999 && t.val(parseInt(t.val()) + 1)
                : i.closest(".shopping-cart").length > 0 || i.closest(".cart-container__cart").length > 0
                ? parseInt(t.val()) > 0 && t.val(parseInt(t.val()) - 1)
                : parseInt(t.val()) > 1 && t.val(parseInt(t.val()) - 1),
                i.closest(".single-product-section__info").length > 0
                    ? $(".product-other .single-product__counter input").val(t.val())
                    : i.closest(".product-other").length > 0 && $(".single-product-section__info .single-product__counter input").val(t.val()),
                t.trigger("change");
        }),
        $(document).on("focus", ".input-box > input,.input-box > select", function (e) {
            $(this).parent(".input-box").addClass("inserted");
        }),
        $(document).on("input, blur", ".input-box > input,.input-box > select", function (e) {
            let i = $(this);
            "" !== i.val() ? i.parent(".input-box").addClass("inserted") : i.parent(".input-box").removeClass("inserted");
        }),
        $(document).on("change", ".select-box select", function (e) {
            let i = $(this);
            "" !== i.val() && null !== i.val() ? i.closest(".select-box").addClass("inserted") : i.closest(".select-box").removeClass("inserted");
        }),
        $(".input-row > .reviews-stars svg").hover(
            function () {
                let e = $(this);
                if (!e.closest(".reviews-stars").hasClass("clicked"))
                    switch (e.index()) {
                        case 0:
                            e.parent(".reviews-stars").addClass("one");
                            break;
                        case 1:
                            e.parent(".reviews-stars").addClass("two");
                            break;
                        case 2:
                            e.parent(".reviews-stars").addClass("three");
                            break;
                        case 3:
                            e.parent(".reviews-stars").addClass("four");
                            break;
                        case 4:
                            e.parent(".reviews-stars").addClass("five");
                    }
            },
            function () {
                $(this).parent(".reviews-stars:not(.clicked)").removeClass("one two three four five");
            }
        ),
        $(document).on("click", ".input-row > .reviews-stars svg", function (e) {
            let i = $(this);
            switch ((i.parent(".reviews-stars").removeClass("one two three four five").addClass("clicked"), i.index())) {
                case 0:
                    i.parent(".reviews-stars").addClass("one"),
                        i
                            .parent(".reviews-stars")
                            .find("input")
                            .val(i.index() + 1);
                    break;
                case 1:
                    i.parent(".reviews-stars").addClass("two"),
                        i
                            .parent(".reviews-stars")
                            .find("input")
                            .val(i.index() + 1);
                    break;
                case 2:
                    i.parent(".reviews-stars").addClass("three"),
                        i
                            .parent(".reviews-stars")
                            .find("input")
                            .val(i.index() + 1);
                    break;
                case 3:
                    i.parent(".reviews-stars").addClass("four"),
                        i
                            .parent(".reviews-stars")
                            .find("input")
                            .val(i.index() + 1);
                    break;
                case 4:
                    i.parent(".reviews-stars").addClass("five"),
                        i
                            .parent(".reviews-stars")
                            .find("input")
                            .val(i.index() + 1);
            }
        }),
        $(document).on("click", ".to-card", function (e) {
            //$(".shopping-cart").addClass("active"), $("html,body").addClass("noscroll");
        }),
        $(document).on("click", ".shopping-cart__title .cart-close, .shopping-cart-bg", function (e) {
            $(".shopping-cart").removeClass("active"), $("html,body").removeClass("noscroll");
        }),
        $(document).on("click", ".reviews-text-item__content_more", function (e) {
            $(this).siblings(".reviews-text-item__content_text").addClass("active");
        }),
        $(document).on("click", ".coockies-ok", function (e) {
            setCookie("coockies-hide", !0, { expires: new Date(new Date().getTime() + 2678e9).toUTCString(), path: "/" }), $(".coockies-container").fadeOut(300);
        }),
        $(".single-product-hints .c_button").hover(
            function () {
                if (window.innerWidth > 1023) {
                    let e = $(this),
                        i = e.data("color");
                    e.find(".tooltip").length < 1 ? e.append(`<span class="tooltip tooltip-in " data-tooltip="" style="display: block;">${i}</span>`) : e.find(".tooltip").removeClass("tooltip-out").show().addClass("tooltip-in");
                }
            },
            function () {
                if (window.innerWidth > 1023) {
                    let e = $(this);
                    e.find(".tooltip").removeClass("tooltip-in").addClass("tooltip-out"),
                        setTimeout(function () {
                            e.find(".tooltip").hide();
                        }, 200);
                }
            }
        ),
        getCookie("coockies-hide") || $(".coockies-container").slideDown(300),
        $(".select").each(function () {
            $(this).children("select").css("display", "none");
            var e = $(this);
            $(this)
                .find("option")
                .each(function (i) {
                    if (0 == i) {
                        e.prepend($("<div>", { class: e.attr("class").replace(/select/g, "select__box") }));
                        var t = $(this).text();
                        e.prepend($("<span>", { class: e.attr("class").replace(/select/g, "select__placeholder"), text: t, "data-placeholder": t }));
                    }
                    e.children("div").append($("<span>", { class: e.attr("class").replace(/select/g, "select__box__options"), text: $(this).text() })), e.find(".select__box__options:first-child").addClass("selected");
                });
        }),
        $(".select").click(function () {
            $(this).hasClass("active")
                ? ($(this).removeClass("active"), $(this).closest("section").removeClass("selsection"))
                : ($(".select").removeClass("active"), $(this).addClass("active"), $(this).closest("section").addClass("selsection"));
        }),
        $(".select__box__options").click(function () {
            var e = $(this).text(),
                i = $(this).index();
            $(this).siblings(".select__box__options").removeClass("selected"), $(this).addClass("selected");
            var t = $(this).closest(".select");
            t.children(".select__placeholder").text(e), t.children("select").prop("selectedIndex", i).trigger("change");
        }),
        $(document).mouseup(function (e) {
            var i = $(".select");
            i.is(e.target) || 0 !== i.has(e.target).length || $(".select").removeClass("active");
        });
    try {
        var t = videojs("my-video");
    } catch (e) {}
    scrollNav(),
        hideMenu(),
        $.validator &&
            ($.validator.addMethod("phoneUS", function (e, i) {
                return (e = e.replace(/\s+/g, "")), this.optional(i) || (e.length >= 9 && e.match(/^\s*\+?([- _():=+]?\d[- _():=+]?){9,14}\s*$/));
            }),
            $(".pp__content_question form").validate({
                rules: { email: { required: !0, email: !0 }, phone: { phoneUS: !0 }, question: { required: !0 } },
                messages: { email: { required: lexiconForJs.requiredField, email: lexiconForJs.incorrectEmail }, phone: { phoneUS: lexiconForJs.incorrectPhone }, question: { required: lexiconForJs.requiredField } },
            }),
            $(".pp__content_review form").validate({
                rules: { product: { required: !0 }, rating: { required: !0 }, email: { required: !0, email: !0 }, phone: { phoneUS: !0 }, review: { required: !0 } },
                messages: {
                    product: { required: lexiconForJs.requiredField },
                    rating: { required: lexiconForJs.requiredField },
                    email: { required: lexiconForJs.requiredField, email: lexiconForJs.incorrectEmail },
                    phone: { phoneUS: lexiconForJs.incorrectPhone },
                    review: { required: lexiconForJs.requiredField },
                },
            }),
            $(".pp__content_oneclick form").validate({
                rules: { email: { email: !0 }, phone: { required: !0, phoneUS: !0 } },
                messages: { email: { email: lexiconForJs.incorrectEmail }, phone: { required: lexiconForJs.requiredField, phoneUS: lexiconForJs.incorrectPhone } },
            }),
            $(".email-mailing form").validate({ rules: { email: { required: !0, email: !0 } }, messages: { email: { email: lexiconForJs.incorrectEmail, required: lexiconForJs.requiredField } } }),
            $("form.mailing-body").validate({ rules: { email: { required: !0, email: !0 } }, messages: { email: { email: lexiconForJs.incorrectEmail, required: lexiconForJs.requiredField } } }),
            $(".cart-container__form").validate({
                rules: { name: { required: !0 }, "last-name": { required: !0 } },
                messages: { name: { required: lexiconForJs.requiredField }, "last-name": { required: lexiconForJs.requiredField } },
            }),
            $("form").submit(function (e) {
                let i = $(this);
                i.hasClass("ignore") && i.trigger("submit"),
                    !1 === i.valid()
                        ? e.preventDefault()
                        : (e.preventDefault(),
                          i.closest(".popup-content").find(".form-default").fadeOut(300),
                          setTimeout(() => {
                              i.closest(".popup-content").find(".form-success").fadeIn(300);
                          }, 300),
                          i.closest(".email-mailing").length > 0 && $(".pp[data-pp=email-mailing]").addClass("show"));
            })),
        
        changeShowView(),
        playAboutVideo(),
        $(".structure-section").length > 0 && $(window).width() > 1279 && (skr = skrollr.init()),
        $(document).on("change", ".input__group .checkbox input", function () {
            $(this).closest(".input__group").find(".checkbox").removeClass("checked"); $(this).closest(".checkbox").addClass("checked");
        });
        if (getCookie("geoIpApi")) {
	        if (!getCookie("mailing-hide")) {
		        setTimeout(() => {
                    if (!$(".pp_country[data-pp=mailing-pop_latcountry]").hasClass("show")) {
	               	   $(".pp[data-pp=mailing-pop]").addClass("show"), $("html,body").addClass("noscroll");
                   }
		        }, 15e3)
	        }	
	         if (!getCookie("mailing_second-hide")) {
                 
                    setTimeout(() => {
                        if (!$(".pp_country[data-pp=mailing-pop_latcountry]").hasClass("show")) {
                           $(".pp[data-pp=mailing-pop_second]").addClass("show"), $("html,body").addClass("noscroll");
                        }
                    }, 100e3) 
	        }	
            
            if (!getCookie("geoCountry")) {
                setTimeout(() => {
                    if (!$(".pp__mailing--country").hasClass("show")) {
                        $(".pp_country[data-pp=mailing-pop_latcountry]").addClass("show");
                        if ($(".pp_country[data-pp=mailing-pop_latcountry]").hasClass("show")) {
                            $("html,body").addClass("noscroll");
                        }
                    }
                }, 1000)
            }
        }
    try {
        AOS.init({ once: !0, disable: "mobile" });
    } catch (e) {}
}),
    $(window).resize(function () {
        $(".general-swiper").length > 0 && (offserHeader = $(".general-swiper").offset().top + $(".general-swiper").height()),
            generalSwiper && generalSwiper.update(),
            aboutUsSwiper && aboutUsSwiper.update(),
            partnersSwiper && partnersSwiper.update(),
            productSwiper && productSwiper.update(),
            collectionSwiper && collectionSwiper.update(),
            reviewsSwiper && reviewsSwiper.update(),
            pillowSwiper && pillowSwiper.update(),
            goodsReviews && goodsReviews.update(),
            patents && patents.update(),
            duoSwiperFirst && duoSwiperFirst.update(),
            duoSwiperSecond && duoSwiperSecond.update(),
            swiperOtherProducts && swiperOtherProducts.update(),
            logoSwiperFunc(),
            changeShowView();
        try {
            $(".structure-section").length > 0 && ($(window).width() <= 1279 ? ((skr = skrollr().destroy()), (skr = fasle)) : !1 === skr && (skr = skrollr.init()));
        } catch (e) {}
        hideMenu();
    }),
    $(window).scroll(function () {
        scrollNav(), sidebarSwitcher(), playAboutVideo(), hideMenu();
    });