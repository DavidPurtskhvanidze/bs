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

$(document).ready(function () {
    try {
        if(promo_table == undefined) promo_table = '';
    } catch (error) {
        var promo_table = '';
        console.error(error);
    }

    function declension(n, forms) {
        return forms[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    //SHOP PAGE CATEGORIES HANDLING IF GET PARAMETER
    var category_in_get = getParameterByName('category');
    
    if (category_in_get) {
        cats_array = category_in_get.split('-');

        $.each(cats_array, function (index, value) {
            $('.shop-section__goods_sidebar .checkbox input[data-id="' + value + '"]').prop('checked', true);

        });

        var data = {};
        data['bs_action'] = 'render_category';
        data['category'] = category_in_get;

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
            success: function (response) {
                if (response.success) {
                    $('.shop-section__goods_content').html(response.output);

                    $('.js-count-goods').html(lexiconForJs.showed + ': ' + $('.slide-product').length)
                } 
            }
        });
    } else {
        $('.shop-section__goods_sidebar .checkbox input[id="all_goods"]').prop('checked', true)
    }

    $.fn.serializeObject = function () {
        "use strict";

        var result = {};
        var extend = function (i, element) {
            var node = result[element.name];
            if ('undefined' !== typeof node && node !== null) {
                if ($.isArray(node)) {
                    node.push(element.value);
                } else {
                    result[element.name] = [node, element.value];
                }
            } else {
                result[element.name] = element.value;
            }
        };
        $.each(this.serializeArray(), extend);

        return result;
    };

    function serializeForm(form) {
        var data = form.serializeObject();
        return data;
    };

    //SHOP PAGE CATEGORIES HANDLING
    $('.shop-section__goods_sidebar input[name="shop-goods"]').change(function () {
        var th_id = $(this).attr('data-id');

        if (th_id == 'all') {
            $('.shop-section__goods_sidebar .checkbox input[id!="all_goods"]').prop('checked', false)
        } else {
            $('.shop-section__goods_sidebar .checkbox input[id="all_goods"]').prop('checked', false)
        }

        if ($('.shop-section__goods_sidebar .checkbox input:checked').length == 0) {
            $('.shop-section__goods_sidebar .checkbox input[id="all_goods"]').prop('checked', true)
        }
        collect_checked_category();
    })

    function collect_checked_category() {
        var get_to_append = '';

        $('.shop-section__goods_sidebar .checkbox input[type="checkbox"]').each(function () {
            if ($(this).prop('checked')) {
                get_to_append += $(this).attr('data-id') + '-';
            }

        });

        var url = new URL(document.location.href);
        var search_params = url.searchParams;

        search_params.delete('category')

        if (get_to_append != '') {
            get_to_append = get_to_append.slice(0, -1);
            search_params.append('category', get_to_append);

        }
        url.search = search_params.toString();
        var new_url = url.toString();
        window.history.replaceState(null, null, new_url);

        var data = {};
        data['bs_action'] = 'render_category';
        data['category'] = get_to_append;

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
            success: function (response) {
                if (response.success) {
                    $('.shop-section__goods_content').html(response.output);

                    $('.js-count-goods').html(lexiconForJs.showed + ': ' + $('.slide-product').length)
                }
            }
        });

    }

// закоментил был бак с ценами в корзине
    // $(document).on('click', '#msCart .cart-item .hand_button', function () {
    //     $('.js-order-cart').prepend('<div class="loading show"/>');
    //     $('.js-minicart').prepend('<div class="loading show"/>');
    //     $('.js-cart').prepend('<div class="loading show"/>');
    //     setTimeout(function () {
    //         sAgGlobalFunctions.send_ajax_rerender_cart()
    //     }, 500);
    // })


    $(document).on('focusout', '.js-minicart .cart-item input[type="number"]', function () {
        $('.js-order-cart').prepend('<div class="loading show"/>');
        $('.js-minicart').prepend('<div class="loading show"/>');
        $('.js-cart').prepend('<div class="loading show"/>');
        setTimeout(function () {
            sAgGlobalFunctions.send_ajax_rerender_minicart()
        }, 500);
    })


    $(document).on('focusout', '#msCart .cart-item input[type="number"]', function () {
        $('.js-order-cart').prepend('<div class="loading show"/>');
        $('.js-minicart').prepend('<div class="loading show"/>');
        $('.js-cart').prepend('<div class="loading show"/>');
        setTimeout(function () {
            sAgGlobalFunctions.send_ajax_rerender_cart()
        }, 500);
    })

    //HANDLING NUMBER INPUTS CART/MINICART/PRODUCT CARDS
    $(document).on('click', '.js-now-submit .hand_button', function () {
        $(this).closest('.ms2_form').trigger('submit');

        var th_parent = $(this).closest('.cart-item');
        var th_price_for_one = parseFloat($(this).parents('.cart-item').attr('data-price'));
        var th_oldprice_for_one = parseFloat($(this).parents('.cart-item').attr('data-oldprice'));
        var th_count = parseFloat($(this).parent().find('input[type="number"]').val());


        var th_new_price_total = th_price_for_one * th_count;
        var th_new_oldprice_total = th_oldprice_for_one * th_count;
    })

    function recalc_minicart() {
        var cart_cost = 0;

        $('.js-minicart .cart-item').each(function () {
            var _this = $(this);
            var th_price_for_one = parseFloat(_this.attr('data-price'));
            var th_oldprice_for_one = parseFloat(_this.attr('data-oldprice'));
            var th_count = parseFloat(_this.find('input[type="number"]').val());

            cart_cost += th_price_for_one * th_count;
        });
    }

    //RERENDER BIG CART / CART PAGE
    $(document).on('click', '.js-rerender-cart', function () {

        setTimeout(function () {
            sAgGlobalFunctions.send_ajax_rerender_cart()
        }, 500);
    })

    //COUPONS
    if ($('#msCart').length > 0) {
        sAgGlobalFunctions.merge_bigcart_products();

        $('.js-cart-total2').text($('.js-cart-total').text());


        var goods_arr = [];

        $('.js-cart-item').each(function () {
            th_obj = {};

            th_obj.name = $(this).attr('data-pagetitle');
            th_obj.id = $(this).attr('data-id');
            th_obj.category = $(this).attr('data-category');
            th_obj.price = $(this).attr('data-price');
            th_obj.brand = 'Sleep&Glow';
            th_obj.quantity = $(this).find('input[name="count"]').val();

            goods_arr.push(th_obj);
        });

/*
        try {
            dataLayer.push({
                'event': 'addEcommerce_checkout1',
                'ecommerce': {
                    'checkout': {
                        'actionField': {
                            'step': 1
                        },
                        'products': goods_arr
                    }
                }
            });
        } catch(e) {
            console.error(e);
        }
*/

        $(document).on('click', '.single-product__counter .decrement, .single-product__counter .increment', function () {
            var goods_arr = [];

            $('.js-cart-item').each(function () {
                th_obj = {};

                th_obj.name = $(this).attr('data-pagetitle');
                th_obj.id = $(this).attr('data-id');
                th_obj.category = $(this).attr('data-category');
                th_obj.price = $(this).attr('data-price');
                th_obj.brand = 'Sleep&Glow';
                th_obj.quantity = $(this).find('input[name="count"]').val();

                goods_arr.push(th_obj);
            });

            try {
                dataLayer.push({
                    'event': 'addEcommerce_checkout1',
                    'ecommerce': {
                        'checkout': {
                            'actionField': {
                                'step': 1
                            },
                            'products': goods_arr
                        }
                    }
                });
            } catch(e) {
                console.error(e);
            }

        });
    }

    if ($('.js-product-layout').length > 0) {
        let timerViewContent = setTimeout(function viewContent() {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'ViewContent', {
                    content_name: $('.js-product-box').attr('data-pagetitle'),
                    content_category: $('.js-product-box').attr('data-parent'),
                    content_ids: [$('.js-product-box').attr('data-id')],
                    content_type: 'product',
                    value: $('.js-product-box').attr('data-price'),
                    currency: 'RUB'
                });
                clearTimeout(timerViewContent);
            } else {
                timerViewContent = setTimeout(viewContent, 500);
            }
        }, 500);

    }

    if ($('.js-product-box').length > 0) {

        $('.js-product-counter').change(function () {
            calculate_product_price(promo_table);
        })
    }

    function calculate_product_price(promo_table) {
        var base_price = parseFloat($('.js-prod-data').attr('data-price'));
        var count = parseFloat($('.js-product-counter').val());

        var new_old_price_total = base_price * count;
        var new_price_total = 0;

        if (promo_table && promo_table != '') {
            var tab = promo_table;
            var promo_count_arr = [];

            $.each(promo_table, function (index) {
                promo_count_arr.push(promo_table[index].count)
            })

            var promo_count_max = Math.max.apply(null, promo_count_arr);
            var promo_count_max_index = promo_count_arr.indexOf(promo_count_max.toString());

            for (var i = 1; i <= count; i++) {

                var th_price = base_price;

                $.each(promo_table, function (index) {

                    if (parseFloat(promo_table[index].count) == i) {

                        var th_discount = promo_table[index].discount;

                        if (th_discount.indexOf('%') != -1) {
                            th_price = base_price - (base_price * (parseFloat(th_discount) / 100));
                        } else {
                            th_price = base_price - parseFloat(th_discount);
                        }
                    }
                    if (i > parseFloat(promo_table[index].count)) {
                        var th_discount = promo_table[promo_count_max_index].discount;

                        if (th_discount.indexOf('%') != -1) {
                            th_price = base_price - (base_price * (parseFloat(th_discount) / 100));
                        } else {
                            th_price = base_price - parseFloat(th_discount);
                        }
                    }
                })

                new_price_total += th_price;

            }

        } else {
            var $oldPrice = $('.js-prod-data').attr('data-old-price');
            if($oldPrice) {
                new_old_price_total = $oldPrice * count;
            }
            
            new_price_total = base_price * count;
        }

        if (new_old_price_total > new_price_total) {
            $('.js-prod-data .js-new-price').parent('span').addClass('newprice');
            $('.js-prod-data .js-new-price').text(miniShop2.Utils.formatPrice(new_price_total)/* + ' ' + lexiconForJs.currency*/);
            $('.js-prod-data .old-price').show();
            $('.js-prod-data .old-price .js-old-price').text(miniShop2.Utils.formatPrice(new_old_price_total)/* + ' ' + lexiconForJs.currency*/);

        } else {
            $('.js-prod-data .js-new-price').text(miniShop2.Utils.formatPrice(new_price_total)/* + ' ' + lexiconForJs.currency*/);
            $('.js-prod-data .js-new-price').parent('span').removeClass('newprice');
            $('.js-prod-data .old-price').hide();
        }
    }

    $(document).on('click', '.shopping-cart__footer_title', function () {
        sAgGlobalFunctions.merge_minicart_products();
    })

    //on page start
    sAgGlobalFunctions.merge_minicart_products();

    if ($('.js-order-cart').length > 0) {
        sAgGlobalFunctions.merge_ordercart_products();
    }

    //SET TO PHP SESSION AJAX
    function set_to_php_session(array) {

        var data = {};
        data.array = array;
        //data.value = value;
        data.bs_action = 'util/set-to-session';
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
            success: function (response) {

            },
            error: function () {
                PNotify.notice(lexiconForJs.messageError, {
                    theme: 'ms2-message-error'
                });
                //console.log(data);
            }
        });
    }
    
    // промокоды

    $(document).on('submit', '.js-check-coupon', function (e) {
       
        e.preventDefault();

        var coup_val = $(this).find('input[name="coupon_value"]').val();

        $('.js-order-cart').prepend('<div class="loading show"/>');

        if (!coup_val || coup_val == '') {
            $(this).find('input[name="coupon_value"]').addClass('error');
        } else {
            $(this).find('input[name="coupon_value"]').removeClass('error');
            var data = {};
            data.coupon = coup_val;
            data.bs_action = 'order/check-coupon';
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
                success: function (response) {


                    if (response.success) {

                        if (response.cart_rerendered != '' && response.rerender) {

                            $('.js-order-cart').html(response.cart_rerendered);
                            $('.js-cart').html(response.cart_rerendered_big);

                            sAgGlobalFunctions.merge_ordercart_products();
                            sAgGlobalFunctions.merge_bigcart_products();
                            sAgGlobalFunctions.merge_minicart_products();
                        }

                        $('.js-cart-total2').text($('.js-cart-total').text());
                        // убрать ввод промокода
                        //$('.cart-container__code').remove();
                        //recalc_cart_cost();

                    } else {
                        PNotify.notice(response.message, {
                            theme: 'ms2-message-error'
                        });
                        $(this).find('input[name="coupon_value"]').addClass('error');
                        $('.cart-container__code .js-promocode-error').text(response.message);
                    }



                },
                error: function () {
                    $(this).find('input[name="coupon_value"]').addClass('error');
                    //  $.fancybox.close();
                    PNotify.notice(lexiconForJs.messageError, {
                        theme: 'ms2-message-error'
                    });
                    //console.log(data);
                },
                complete: function () {
                    $('.loading').remove();

                }
            });

        }

    })

    //REMOVE FROM PHP SESSION
    function remove_from_php_session(array) {

        var data = {};
        data.array = array;
        data.bs_action = 'util/remove-from-session';
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
            success: function (response) {

            },
            error: function () {
                PNotify.notice(lexiconForJs.messageError, {
                    theme: 'ms2-message-error'
                });
                //console.log(data);
            }
        });

    }

    $('.shopping-cart__title .goods-count').click(function () {
        var array = [];
        array.push('cart_with_disc');
        array.push('discount');
        array.push('discount_cart_value');
        array.push('discount_name');
        array.push('discount_type');
        array.push('site_action_discount');

        setTimeout(function () {
            remove_from_php_session(array)
        }, 100);

    })

    if ($('.js-order-container').length > 0) {

        var array = [];

        array.push('order_id');
        array.push('customer_phone');
        array.push('customer_email');

        array.push('delivery_country');
        array.push('delivery_city');
        array.push('delivery_region');
        array.push('delivery_available_cur');
        array.push('delivery_available_nal_cur');

        array.push('customer_name');
        array.push('is_update');
        array.push('order_num');

        setTimeout(function () {
            remove_from_php_session(array)
        }, 500);


        $('.ms2_link[value="order/submit"]').click(function () {
            var array = {};
            array.submit_order_flag = 1;
        });

    }

    $(document).on('focusout', '#first-name, #last-name', function () {

        collect_receiver();

    });

    $('button[value="cart/add"]').addClass('show');
    $('.product-bottom-panel').addClass('ready');

    function collect_receiver() {
        var f_name = $("#first-name").val();
        var l_name = $("#last-name").val();

        $('input[name="receiver"]').val(f_name + ' ' + l_name);

        var array = {};
        array.customer_first_name = f_name;
        array.customer_last_name = l_name;
        set_to_php_session(array);

    }

    function save_basket_as_order(name, sec_name, phone, email, is_update, order_id) {
        var data = {};
        data.phone = phone;
        data.email = email;
        data.is_update = is_update;
        data.order_id = order_id;
        data.name = name;
        data.sec_name = sec_name;

        data.bs_action = 'util/save-basket';
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
            success: function (response) {

                if (response.success) {
                    var order_id = response.ms2_resp.data.msorder;

                    if (order_id && order_id != '') {
                        var array = {};
                        array.order_id = order_id;
                        set_to_php_session(array);
                        //  set_to_php_session('order_id',order_id);
                        $('.cart-container__order').attr('data-order', order_id);
                    }



                }
            },
            error: function () {
                PNotify.notice(lexiconForJs.messageError, {
                    theme: 'ms2-message-error'
                });
                //console.log(data);
            }
        });

    }

    //COLOR OPTIONS PRODUCT
    $(document).on('click', '.js-product-color .slide-product__img_colors .c_button', function () {
       
        var th_val = $(this).attr('data-value');

        var th_parent = $(this).parents('.js-product-box');
        var prod_id = th_parent.find('.slide-product__img_colors').attr('data-id');

        if($(this).hasClass('c_button--disabled')) {
            th_parent.find('.single-product-non--forcolor').fadeIn();
            th_parent.find('.single-product-buy').fadeOut(0);
            th_parent.find('.single-product-price--desktop').fadeOut(0);
            // th_parent.find('.single-product__counter').fadeOut(0);
            th_parent.find('.single-product__to-card').fadeOut(0);
            th_parent.find('.btn-add-basket').fadeOut(0);
        } else {
            th_parent.find('.single-product-non--forcolor').fadeOut(0);
            th_parent.find('.single-product-buy').fadeIn();
            th_parent.find('.single-product-price--desktop').fadeIn();
            // th_parent.find('.single-product__counter').fadeIn();
            th_parent.find('.single-product__to-card').fadeIn();
            th_parent.find('.btn-add-basket').fadeIn();
        }

        if (!prod_id || prod_id == '') {
            prod_id = th_parent.find('.js-product-color').attr('data-id');
        }

        th_parent.find('input[name="options[color]"]').val(th_val);

        var data = {};
        data.id = prod_id;
        data.count = 1;
        data.action = 'modification/get';
        data.ctx = 'web';
        data['options[color]'] = th_val;
        $.ajax({
            url: [
                location.protocol,
                '//',
                location.host,
                '/assets/components/msoptionsprice/action.php'
            ].join(''),
            data: data,
            type: 'post',
            dataType: 'json',
            success: function (response) {
                //console.log(response);
                if (response.success) {
                    var th_price = response.data.modification.price;
                    var th_old_price = response.data.modification.old_price;

                    var price_to_front = th_price;

                    th_parent.find('.js-prod-data').attr('data-price', th_price)
                    th_parent.find('.js-prod-data').attr('data-old-price', th_old_price)

                    calculate_product_price(promo_table);

                    if (th_parent.find('input[name="count"]').val() > 1) {

                        price_to_front = th_price * th_parent.find('input[name="count"]').val();
                        
                    }
                    th_parent.find('.js-new-price').text(miniShop2.Utils.formatPrice(price_to_front)/* + ' ' + lexiconForJs.currency*/);

                    if ($('.product-bottom-panel').length > 0 && $('.js-product-box').length > 0) {
                        $('.product-bottom-panel').find('.single-product-price .js-new-price').text(miniShop2.Utils.formatPrice(price_to_front)/* + ' ' + lexiconForJs.currency*/);
                    }

                    if (th_old_price && th_old_price != '0' && th_old_price != '') {
                        th_parent.find('.js-old-price').text(miniShop2.Utils.formatPrice(th_old_price)/* + ' ' + lexiconForJs.currency*/);
                        th_parent.find('.old-price').show();

                        var sale_percent = (100 - th_price / th_old_price * 100);

                        if (th_parent.hasClass('js-product-box')) {
                            if ($('.product-bottom-panel').length > 0) {
                                var f_th_parent = $('.product-bottom-panel');
                                f_th_parent.find('.js-old-price').text(miniShop2.Utils.formatPrice(th_old_price)/* + ' ' + lexiconForJs.currency*/);
                                f_th_parent.find('.old-price').show();

                            }
                        }

                    } else {
                        th_parent.find('.js-old-price').text('');
                        th_parent.find('.old-price').hide();
                        th_parent.find('.pillow-preview__label.sale').hide();

                        if ($('.product-bottom-panel').length > 0) {
                            var f_th_parent = $('.product-bottom-panel');
                            f_th_parent.find('.js-old-price').text('');
                            f_th_parent.find('.old-price').hide();
                            f_th_parent.find('.pillow-preview__label.sale').hide();

                        }
                    }

                    // if ($('.js-product-page').length > 0) {
                        // calculate_product_price();
                    // }
                } 
            },
            error: function () {
                PNotify.notice(lexiconForJs.messageError, {
                    theme: 'ms2-message-error'
                });
                //console.log(data);
            }
        });

    })

    sAgGlobalFunctions.apply_mods_products();

    if ($('.single-product-section__header').length > 0 && $('.slide-product__img_colors .c_button').length > 0) {

        $('.js-product-counter').change(function () {
            var th_val = $(this).val();

            $('.js-product-counter').val(th_val);
        });
    }

    $(document).on('click', '.js-to-card-additional', function () {
        $('.single-product-section__info button[value="cart/add"]').trigger('click');
    })

    //SHOULD BE REMOVED ON PROD
    /*$('.header-info').click(function () {
        $('.shopping-cart').addClass('active');

        var data = {};
        data.bs_action = 'util/get-php-session';
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
            success: function (response) {

                if (response.success) {

                } else {
                    PNotify.notice(response.message, {
                        theme: 'ms2-message-error'
                    });

                }
            },
            error: function () {
                PNotify.notice(lexiconForJs.messageError, {
                    theme: 'ms2-message-error'
                });
                //console.log(data);
            }
        });
    })*/

    $('.single-product-section__info .c_button').click(function () {
        var th_val = $(this).attr('data-value');

        $(this).parents('.single-product-section').find('.swiper-slide img[data-desc="' + th_val + '"]').click();

    })


    

});
