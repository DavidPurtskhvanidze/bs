function beautyPrice(price) {
  return miniShop2.Utils.formatPrice(price) + ' р.';
}

// если сдэк
function switchPayments(payments = []) {
  let d = parseInt($('[name="delivery"]:checked').val());
  if (d == 4) $('#payment_3').parent().hide();
}

switchPayments();
$(document).on('change', '[name="delivery"]', function () {
  switchPayments();
})

function merge_minicart_products() {
  $('.js-minicart .shopping-cart__goods .cart-item').each(function () {
    var th_id = $(this).attr('data-id');
    var th_option = $(this).attr('data-option');

    if ($('.js-minicart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]').length > 1) {

      var th_tot_count = 0;
      var th_tot_count_promo = 0;
      var th_tot_price = 0;
      var th_tot_oldprice = 0;

      $('.js-minicart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]').each(function (index) {
        th_tot_count += parseInt($(this).attr('data-count'));
        th_tot_price += parseInt($(this).attr('data-count')) * parseInt($(this).attr('data-price'));
        th_tot_oldprice += parseInt($(this).attr('data-count')) * parseInt($(this).attr('data-oldprice'));
        if (index != 0) {
          th_tot_count_promo += parseInt($(this).attr('data-count'));
        }
      });

      $('.js-minicart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:not(:first)').remove();
      $('.js-minicart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:first').find('.single-product__counter input[type="number"]').val(th_tot_count).attr('data-promogoods-count', th_tot_count_promo);
      $('.js-minicart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:first').find('.js-new-price').text(beautyPrice(th_tot_price));
      $('.js-minicart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:first').find('.js-old-price').removeClass('hidden').text(beautyPrice(th_tot_oldprice));
    }
  });
}

function merge_bigcart_products() {
  $('#msCart .shopping-cart__goods .cart-item').each(function () {
    var th_id = $(this).attr('data-id');
    var th_option = $(this).attr('data-option');

    if ($('#msCart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]').length > 1) {

      var th_tot_count = 0;
      var th_tot_price = 0;
      var th_tot_oldprice = 0;
      var th_tot_count_promo = 0;


      $('#msCart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]').each(function (index) {
        th_tot_count += parseInt($(this).attr('data-count'));
        th_tot_price += parseInt($(this).attr('data-count')) * parseInt($(this).attr('data-price'));
        th_tot_oldprice += parseInt($(this).attr('data-count')) * parseInt($(this).attr('data-oldprice'));
        if (index != 0) {
          th_tot_count_promo += parseInt($(this).attr('data-count'));
        }
      });

      $('#msCart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:not(:first)').remove();
      $('#msCart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:first').find('.cart-item__info_cont input[type="number"]').val(th_tot_count).attr('data-promogoods-count', th_tot_count_promo);
      $('#msCart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:first').find('.js-new-price').text(beautyPrice(th_tot_price));
      $('#msCart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:first').find('.js-old-price').removeClass('hidden').text(beautyPrice(th_tot_oldprice));
    }
  });
}

function merge_ordercart_products() {
  $('.js-order-cart .shopping-cart__goods .cart-item').each(function () {
    var th_id = $(this).attr('data-id');
    var th_option = $(this).attr('data-option');

    if ($('.js-order-cart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]').length > 1) {

      var th_tot_count = 0;
      var th_tot_price = 0;
      var th_tot_oldprice = 0;
      var th_tot_count_promo = 0;

      $('.js-order-cart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]').each(function (index) {
        th_tot_count += parseInt($(this).attr('data-count'));
        th_tot_price += parseInt($(this).attr('data-count')) * parseInt($(this).attr('data-price'));
        th_tot_oldprice += parseInt($(this).attr('data-count')) * parseInt($(this).attr('data-oldprice'));
        if (index != 0) {
          th_tot_count_promo += parseInt($(this).attr('data-count'));
        }
      });

      $('.js-order-cart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:not(:first)').remove();
      $('.js-order-cart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:first').find('.js-ordercart-count').text(th_tot_count + 'шт').attr('data-promogoods-count', th_tot_count_promo);
      $('.js-order-cart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:first').find('.js-new-price').text(beautyPrice(th_tot_price));
      $('.js-order-cart .shopping-cart__goods .cart-item[data-id="' + th_id + '"][data-option="' + th_option + '"]:first').find('.js-old-price').removeClass('hidden').text(beautyPrice(th_tot_oldprice));
    }
  });
}

function apply_mods_products() {
  $('.js-rec-prod-colors').each(function () {
    if ($(this).find('.c_button').length > 0) {
      var th_mod = $(this).find('.c_button:eq(0)').attr('data-value');
      if (th_mod) {
        $(this).parents('.js-product-box').find('form input[name="options[color]"]').val(th_mod)
      }
    }
  })

  $('.js-cartproduct-color').each(function () {
    if ($(this).find('.c_button').length > 0) {
      var th_mod = $(this).find('.c_button:eq(0)').attr('data-value');
      if (th_mod) {
        $(this).parents('.js-product-box').find('form input[name="options[color]"]').val(th_mod)
      }
    }
  })
}

function setShopCartBodyHeight() {
  var heightFoot = $('.shopping-cart .shopping-cart__footer').outerHeight();
  $('.shopping-cart').find('.shopping-cart-card').css('height', 'calc(100% - ' + heightFoot + 'px)');
}

function send_ajax_rerender_cart() {
  var data = {};
  var wrapper = $(render_cart_conf.wrapper);
  data['bs_action_old'] = render_cart_conf.bs_action_old;
  wrapper.prepend('<div class="loading show"/>');

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
        switch (render_cart_conf.name) {
          case 'cart':
            wrapper.html(response.cart);
            $('.js-cart-total2').text($('.js-cart-total').text());

            merge_ordercart_products();
            merge_bigcart_products();
            merge_minicart_products();
            apply_mods_products();
            break;
          case 'minicart':
            if (!wrapper.hasClass('active') && $('#msCart').length == 0) {
              wrapper.addClass("active");
              $("html,body").addClass("noscroll");
            }
            wrapper.html(response.minicart);
            merge_minicart_products();
            setShopCartBodyHeight();
            break;
        }
      }

    },
    error: function () {
    },
    complete: function () {
      $('.loading').remove();
    }
  });
}

$(document).ready(function () {
  function declension(n, forms) {
    return forms[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  }

  /* alex переписать. влияет на корзину негативно.

  $("#msCart .submit-order").click(function () {
       if ($("input[name='coupon_value']").val() !== ""){
           $('form.js-check-coupon').submit();
           posting.capture('cart_promo_auto_send', {
               block_name: "Промокод"
           })
           return true;
       }
       return false;
   })
   $(".result__result.mobile-fix .submit-order").click(function () {
       if ($(".result__result.mobile-fix input[name='coupon_value']").val() !== ""){
           $('.result__result.mobile-fix form.js-check-coupon').submit();
           posting.capture('cart_promo_auto_send', {
               block_name: "Промокод"
           })
           return true;
       }
       return false;
   });*/

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
    data['bs_action_old'] = 'render_category';
    data['category'] = category_in_get;
    if (typeof resource != 'undefined') {
      data['parent'] = resource;
    }
    ;

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
      beforeSend: function () {
        // $('#send_talisman_draft').addClass('disabled');
      },
      success: function (response) {
        if (response.success) {
          $('.shop-section__goods_content').html(response.output);
          $('.js-count-goods').html('Показано: ' + $('.slide-product').length);
          initCatSilkSlider();

          if (data.category == '437' || data.category == '437-444' || data.category == '437-444-445') {
            $('.photo-block .grid').eq(0).show();
            $('.photo-block .grid').eq(1).hide();
          } else {
            $('.photo-block .grid').eq(1).show();
            $('.photo-block .grid').eq(0).hide();
          }
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
  });

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
    data['bs_action_old'] = 'render_category';
    data['category'] = get_to_append;
    if (typeof resource != 'undefined') {
      data['parent'] = resource;
    }
    ;

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
          $('.js-count-goods').html('Показано: ' + $('.slide-product').length);
          initCatSilkSlider();
          initVideo();

          if (data.category == '437' || data.category == '437-444' || data.category == '437-444-445') {
            $('.photo-block .grid').eq(0).show();
            $('.photo-block .grid').eq(1).hide();
          } else {
            $('.photo-block .grid').eq(1).show();
            $('.photo-block .grid').eq(0).hide();
          }
        }
      }
    });
  }

  //SET CONFIG FOR RENDER CART BEFORE MINISHOP ACTIONS
  miniShop2.Callbacks.add('Cart.add.before', '', check_ms2_action_element);
  miniShop2.Callbacks.add('Cart.remove.before', '', check_ms2_action_element);
  miniShop2.Callbacks.add('Cart.change.before', '', check_ms2_action_element);
  miniShop2.Callbacks.add('Cart.clean.before', '', check_ms2_action_element);

  function check_ms2_action_element() {
    if (miniShop2.sendData.$form.closest('#msCart').length > 0) {
      render_cart_conf = {
        name: 'cart',
        bs_action_old: 'rerender_cart',
        wrapper: '.js-cart',
      };
    } else {
      render_cart_conf = {
        name: 'minicart',
        bs_action_old: 'rerender_minicart',
        wrapper: '.js-minicart',
      };
    }
  }

  //RENDER CART(BIG AND SIDEBAR) AFTER MINISHOP ACTIONS USED CONFIG BEFORE
  miniShop2.Callbacks.Cart.add.response.success = send_ajax_rerender_cart;
  miniShop2.Callbacks.Cart.remove.response.success = send_ajax_rerender_cart;
  miniShop2.Callbacks.Cart.change.response.success = send_ajax_rerender_cart;
  miniShop2.Callbacks.Cart.clean.response.success = send_ajax_rerender_cart;


  $(document).on('click', '.cart-close', function () {
    $(this).find('.ms2_form').trigger('submit');
  });

  //HANDLING NUMBER INPUTS CART/MINICART/PRODUCT CARDS
  $(document).on('click', '.js-now-submit .hand_button', function () {
    var th_parent = $(this).closest('.cart-item');
    var th_price_for_one = parseInt($(this).parents('.cart-item').attr('data-price'));
    var th_oldprice_for_one = parseInt($(this).parents('.cart-item').attr('data-oldprice'));
    var th_count = parseInt($(this).parent().find('input[type="number"]').val());
    var th_new_price_total = th_price_for_one * th_count;
    var th_new_oldprice_total = th_oldprice_for_one * th_count;
  });

  function recalc_minicart() {
    var cart_cost = 0;
    $('.js-minicart .cart-item').each(function () {
      var _this = $(this);
      var th_price_for_one = parseInt(_this.attr('data-price'));
      var th_oldprice_for_one = parseInt(_this.attr('data-oldprice'));
      var th_count = parseInt(_this.find('input[type="number"]').val());
      cart_cost += th_price_for_one * th_count;
    });
  }

  //CHECKOUT DELIVERY
  var dadata_apikey = $('.cart-container__order').attr('data-dadata-key');
  var dadata_secret = $('.cart-container__order').attr('data-dadata-secret');

  function fillFields(suggestion, changed) {
    var th_country = suggestion.data.country;
    var th_city = suggestion.data.city;
    var th_city_type = ((suggestion.data.city_type != null) ? suggestion.data.city_type : '');
    var th_region = ((suggestion.data.region != null) ? suggestion.data.region : '');
    var th_region_type_full = ((suggestion.data.region_type_full != null) ? suggestion.data.region_type_full : '');
    var th_street = ((suggestion.data.street != null) ? suggestion.data.street : '');
    var th_street_type = ((suggestion.data.street_type != null) ? suggestion.data.street_type : '');

    $("#country").val(th_country).parent(".input-box").addClass("inserted");
    $("#city").val(th_city).parent(".input-box").addClass("inserted").attr('data-name', th_city);
    $("#region").val(th_region).parent(".input-box").addClass("inserted");
    $("#index").val(suggestion.data.postal_code);
    $("#country_code").val(suggestion.data.country_iso_code);
    $("#federal").val(suggestion.data.federal_district);

    if ($(this).attr('name') == 'city') {
      var th_country = $("#country").val();
      var th_region = $("#region").val();
      var th_federal = $("#federal").val();
      var th_city = $("#city").parent().attr('data-name');
      var th_goods_count = $('.js-data-title').attr('data-totalcount');
      var th_freedeliv_value = $('.js-data-title').attr('data-freedelivery');
      var th_totalcart_cost = $('.js-data-title').attr('data-totalcartcost');
      var th_delivery = $('[name="delivery"]:checked').val();
      setTimeout(function () {
        var cart = [];
        $('.shopping-cart__goods').first().find('.cart-item').each(function () {
          cart.push({price: $(this).data('price'), title: $(this).data('pagetitle'), id: $(this).data('id')});
        })

        check_country_price(th_country, th_region, th_city, th_goods_count, th_freedeliv_value, th_totalcart_cost, cart, th_federal, th_delivery)
      }, 300);
    }
  }

  function onSelectCountry(suggestion, changed) {
    $("#country_code").val(suggestion.data.alfa2);
  }

  function removeUnactualCountries(suggestions) {
    return suggestions.filter(function (suggestion) {
      return suggestion.data.name_short !== "Украина";
    });
  }

  function removeUnactual(suggestions) {
    return suggestions.filter(function (suggestion) {
      return suggestion.data.country !== "Украина";
    });
  }

  $("#country").suggestions({
    token: dadata_apikey,
    type: "country",
    onSuggestionsFetch: removeUnactualCountries,
    onSelect: onSelectCountry,
    locations: {
      country: "*"
    }
  });

  $("#region").suggestions({
    token: dadata_apikey,
    type: "ADDRESS",
    onSuggestionsFetch: removeUnactual,
    hint: false,
    bounds: "region",
  });

  $("#city").suggestions({
    token: dadata_apikey,
    type: "ADDRESS",
    // constraints: $("#region"),
    hint: false,
    bounds: "city",
    onSuggestionsFetch: removeUnactual,
    onSelect: fillFields,
    constraints: {
      locations: {
        country: "*"
      }
    }
  });

  function check_country_price(country, region, city, goods_count, freedeliv_value, cart_cost, cart = [], federal = '', delivery = '') {
    if (country != '') {
      var data = {};
      data['bs_action_old'] = 'get_country_price';
      data['delivery'] = delivery;
      data['country'] = country;
      data['region'] = region;
      data['city'] = city;
      data['goods_count'] = goods_count;
      data['freedeliv_value'] = freedeliv_value;
      data['cart_cost'] = cart_cost;
      data['cart'] = cart;
      data['federal'] = federal

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
            var parent = $("#deliveries");
            var deliv_min = response.delivery_min_pony;
            var deliv_max = response.delivery_max_pony;

            if (response.delivery_cost == 0) {
              parent.find('.checkbox .checkbox__descr_price').text('Бесплатно');
              $('.js-result-delivery').text('Бесплатно');
            } else {
              parent.find('.checkbox .checkbox__descr_price').text(response.delivery_cost + ' р.');
              $('.js-result-delivery').text(response.delivery_cost + ' р.');
            }

            miniShop2.Order.updateDeliveries(response.deliveries, response.payments);
            miniShop2.Order.updatePayments(response.payments);

            const a = ['день', 'дня', 'дней'];

            $('.checkbox[data-delivery="2"]').find('.js-deliv-range').text(deliv_min + ' - ' + deliv_max + ' рабочих ' + declension(deliv_max, a));

            $('.js-order-total').attr('data-delivcost', response.delivery_cost);
            recalc_cart_cost();

            $('#deliveries').slideDown(300);
            $('#address').slideDown(300);
            $('#payments').slideDown(300);
            $('#certificate').slideDown(300);
            $('.js-delivery-box').slideDown(100);
            $('.js-result-box').slideDown(100);

            setTimeout(() => {
              util_first_checkbox_checked();
              switchPayments(response.payments);
            }, 200);

            if (window.kzt !== undefined) convertCurrency('delivery');
          }
        }
      });
    }
  }

  function util_first_checkbox_checked() {
    var delivery_parent = $('#deliveries');
    var payment_parent = $('#payments');

    //delivery_parent.find('input:visible:eq(0)').prop('checked', true);
    //payment_parent.find('input:visible:eq(0)').prop('checked', true);
  }

  $(document).on('change focusout', '#city, #country', function () {
    var th_country = $("#country").val();
    var th_region = $("#region").val();
    var th_federal = $("#federal").val();
    var th_city = $("#city").parent().attr('data-name');
    var th_goods_count = $('.js-data-title').attr('data-totalcount');
    var th_freedeliv_value = $('.js-data-title').attr('data-freedelivery');
    var th_totalcart_cost = $('.js-data-title').attr('data-totalcartcost');
    var th_delivery = $('[name="delivery"]:checked').val();

    var cart = [];
    $('.shopping-cart__goods').first().find('.cart-item').each(function () {
      cart.push({price: $(this).data('price'), title: $(this).data('pagetitle'), id: $(this).data('id')});
    })

    console.log('address changed');

    check_country_price(th_country, th_region, th_city, th_goods_count, th_freedeliv_value, th_totalcart_cost, cart, th_federal, th_delivery);
  });

  function check_location_delivery() {
    var th_country = $('#country').val();
    var th_region = $('#region').val();
    var th_city = $('#city').val();

    if (th_country == 'Россия') {
      if (th_region != '' && th_city != '') {
        var data = {};
        data['bs_action_old'] = 'get_available_delivery';
        data['country'] = th_country;
        data['region'] = th_region;
        data['city'] = th_city;

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
          beforeSend: function () {},
          success: function (response) {
            if (response.success) {
              var delivery_parent = $('#deliveries');
              var payment_parent = $('#payments');
              var available_courier_services = '';
              if (response.pony_available) {
                available_courier_services = available_courier_services + 'Pony, ';
              }
              if (response.cdek_available) {
                available_courier_services = available_courier_services + 'CDEK, ';
              }
              if (response.dpd_available) {
                available_courier_services = available_courier_services + 'DPD';
              }

              if (available_courier_services != '') {
                delivery_parent.find('.checkbox').hide();
                delivery_parent.find('input[id="delivery_2"]').parents('.checkbox').show();
              } else {
                delivery_parent.find('input[id="delivery_2"]').parents('.checkbox').hide();
              }

              if (response.cdek_nal_pay || response.pony_nal_pay || response.dpd_nal_pay) {
                payment_parent.find('input[id="payment_3"]').parents('.checkbox').show();
              } else {
                payment_parent.find('input[id="payment_3"]').parents('.checkbox').hide();
              }

              $('#msOrder input[name="available_courier_services"]').val(available_courier_services)
              util_first_checkbox_checked();
            }
          }
        });
      }
    }
  }

  var timer_price;
  //предварительный заказ
  $(document).find('#msOrder').on('change', '#phone', function () {
    clearTimeout(timer_price);
    timer_price = setTimeout(function () {
      send_preorder();
    }, 3000);
  });

  //предварительный заказ
  $(document).find('#msOrder').on('change', '#email', function () {
    clearTimeout(timer_price);
    timer_price = setTimeout(function () {
      send_preorder();
    }, 3000);
  });

  function send_preorder() {
  }

  //COUPONS
  if ($('#msCart').length > 0) {
    merge_bigcart_products();
    $('.js-cart-total2').text($('.js-cart-total').text());
    var goods_arr = [];
    $('.js-cart-item').each(function () {
      th_obj = {};
      th_obj.name = $(this).attr('data-pagetitle');
      th_obj.id = $(this).attr('data-id');
      th_obj.category = $(this).attr('data-category');
      th_obj.price = $(this).attr('data-price');
      th_obj.brand = 'Beauty Sleep';
      th_obj.quantity = $(this).find('input[name="count"]').val();
      goods_arr.push(th_obj);
    });

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

    $(document).on('click', '.single-product__counter .decrement, .single-product__counter .increment', function () {
      var goods_arr = [];

      $('.js-cart-item').each(function () {
        th_obj = {};
        th_obj.name = $(this).attr('data-pagetitle');
        th_obj.id = $(this).attr('data-id');
        th_obj.category = $(this).attr('data-category');
        th_obj.price = $(this).attr('data-price');
        th_obj.brand = 'Beauty Sleep';
        th_obj.quantity = $(this).find('input[name="count"]').val();
        goods_arr.push(th_obj);
      });

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
      calculate_product_price();
    });
  }

  function calculate_product_price() {
    var base_price = parseInt($('input[name=price]').val());
    var old_price = parseInt($('input[name=old_price]').val());
    var count = parseInt($('.js-product-counter').val());
    var old_price_total = (old_price ?? base_price) * count;
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
          if (parseInt(promo_table[index].count) == i) {
            var th_discount = promo_table[index].discount;
            if (th_discount.indexOf('%') != -1) {
              th_price = base_price - Math.round(base_price * (parseInt(th_discount) / 100));
            } else {
              th_price = base_price - parseInt(th_discount);
            }
          }
          if (i > parseInt(promo_table[index].count)) {
            var th_discount = promo_table[promo_count_max_index].discount;
            if (th_discount.indexOf('%') != -1) {
              th_price = base_price - Math.round(base_price * (parseInt(th_discount) / 100));
            } else {
              th_price = base_price - parseInt(th_discount);
            }
          }
        });
        new_price_total += th_price;
      }
    } else {
      new_price_total = base_price * count;
    }

    $('.js-prod-data .js-new-price').text(beautyPrice(new_price_total));
    if (old_price_total > new_price_total) {
      $('.js-prod-data .js-old-price').removeClass('hidden').text(beautyPrice(old_price_total))
    } else {
      $('.js-prod-data .js-old-price').addClass('hidden');
    }
  }


  $(document).on('click', '.shopping-cart__footer_title', function () {
    merge_minicart_products();
  });

  //on page start
  merge_minicart_products();


  if ($('.js-order-cart').length > 0) {
    merge_ordercart_products();
  }

  $(document).on('click', '.js-check-coupon [type="reset"]', function (e) {
    e.preventDefault();
    $('.js-order-cart').prepend('<div class="loading show"/>');
    var data = {};
    data.bs_action_old = 'order/reset-coupon';
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
          // location.reload()
          if (response.cart_rerendered != '' && response.rerender) {
            $('.js-order-cart').html(response.cart_rerendered);
            $('.js-cart').html(response.cart_rerendered_big);

            merge_ordercart_products();
            merge_bigcart_products();
            merge_minicart_products();
          }
        }
      },
      error: function () {
        PNotify.notice('В процессе произошла ошибка', {
          theme: 'ms2-message-error'
        });
      },
      complete: function () {
        $('.loading').remove();
      }
    });
  })

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
      data.bs_action_old = 'order/check-coupon';
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

              merge_ordercart_products();
              merge_bigcart_products();
              merge_minicart_products();
            }

            $('.js-cart-total2').text($('.js-cart-total').text());
            //$('.cart-container__code').remove();

            if (window.kzt !== undefined) convertCurrency();
            console.log(response)
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
          PNotify.notice('В процессе произошла ошибка', {
            theme: 'ms2-message-error'
          });
        },
        complete: function () {
          $('.loading').remove();
        }
      });
    }
  });

  //SET TO PHP SESSION AJAX
  function set_to_php_session(array) {
    var data = {};
    data.array = array;
    data.bs_action_old = 'util/set-to-session';

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
        PNotify.notice('В процессе произошла ошибка', {
          theme: 'ms2-message-error'
        });
      }
    });

  }

  //REMOVE FROM PHP SESSION
  function remove_from_php_session(array) {
    var data = {};
    data.array = array;
    data.bs_action_old = 'util/remove-from-session';

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
        PNotify.notice('В процессе произошла ошибка', {
          theme: 'ms2-message-error'
        });
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
  });

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
    array.push('delivery_cost');
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

    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout', {
        currency: 'RUB',
        value: $('.js-minicart-cost').text(),
      });
    }
  }

  $('button[value="cart/add"]').addClass('show');
  $('.product-bottom-panel').addClass('ready');

  function save_basket_as_order(name, sec_name, phone, email, is_update, order_id) {
    var data = {};
    data.phone = phone;
    data.email = email;
    data.is_update = is_update;
    data.order_id = order_id;
    data.name = name;
    data.sec_name = sec_name;

    data.bs_action_old = 'util/save-basket';
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
        PNotify.notice('В процессе произошла ошибка', {
          theme: 'ms2-message-error'
        });
      }
    });
  }


  //COLOR OPTIONS PRODUCT
  $(document).on('msoptionsprice_product_action', function (e, action, form, r) {
    if (action == 'modification/get' && r.success && r.data) {
      var $form = $(form);
      var mod_price = r.data.modification.price;
      var mod_old_price = r.data.modification.old_price;
      var count = $form.find('input[name="count"]').val();
      var $bottom_panel = $('.product-bottom-panel');

      /* alex. if tov rubric sale active */
      // $('.fx-product-one-msop').length > 0 &&
      if (r.data.modification.showsale == 1) {

        //$('.fx-product-one-msop').eq(0).
        if (r.data.modification.old_cost > r.data.modification.cost) {


          mod_price = r.data.modification.cost;
          mod_old_price = r.data.modification.old_cost;

          //$('.fx-product-one-msop').find('.fx-prod-new').show();
          //$('.fx-product-one-msop').find('.fx-prod-old').addClass('old');
        } else {
          //$('.fx-product-one-msop').find('.fx-prod-new').hide();
          // $('.fx-product-one-msop').find('.fx-prod-old').removeClass('old');
        }
      }


      $form.find('input[name=price]').val(mod_price);
      $form.find('input[name=old_price]').val(mod_old_price ?? '');
      if (count > 1) {
        mod_price = mod_price * count;
        mod_old_price = mod_old_price * count;
      }

      $form.find('.js-new-price').text(beautyPrice(mod_price));
      $bottom_panel.find('.js-new-price').text(beautyPrice(mod_price));

      if (mod_old_price) {
        $form.find('.js-old-price').removeClass('hidden').text(beautyPrice(mod_old_price));
        $bottom_panel.find('.js-old-price').removeClass('hidden').text(beautyPrice(mod_old_price));
        //$form.find('.pillow-preview__label.sale').text('-' + Math.round(100 - mod_price / mod_old_price * 100) + '%');
      } else {
        $form.find('.js-old-price').addClass('hidden').text('');
        $bottom_panel.find('.js-old-price').addClass('hidden').text('');
        $form.find('.pillow-preview__label.sale').hide();
        $bottom_panel.find('.pillow-preview__label.sale').hide();
      }

      if (r.data.options.size) {
        $form.find('.single-product-hints__size .title span').text(r.data.options.size);
      }

      if ($('.js-product-page').length > 0) {
        calculate_product_price();
      }
    }
  });


  apply_mods_products();

// бесполезный кусок кода
  if ($('.single-product-section__header').length > 0 && $('.slide-product__img_colors .c_button').length > 0) {
    $('.js-product-counter').change(function () {
      var th_val = $(this).val();
      $('.js-product-counter').val(th_val);
    });
  }
// end БКК
// Убрали для совместимости. перенесли пока в footerTpl.tpl
  // $(document).on('click', '.js-to-card-additional', function() {
  //     $('.single-product-section__info button[value="cart/add"]').trigger('click');
  // });

  function recalc_cart_cost() {
    var cart_cost = parseInt($('.js-order-total').attr('data-cartcost'));
    var cart_diff = parseInt($('.js-order-total').attr('data-cartdiff'));
    var deliv_cost = parseInt($('.js-order-total').attr('data-delivcost'));
    var promo_cost = parseInt($('.js-order-total').attr('data-promocost'));

    deliv_cost = !deliv_cost ? 0 : deliv_cost;
    promo_cost = !promo_cost ? 0 : promo_cost;

    var order_total = cart_cost - cart_diff + deliv_cost - promo_cost;
    var order_total_str = miniShop2.Utils.formatPrice(order_total);
    var cart_goods = parseInt($('.js-order-total').attr('data-cartcost'));
    var delivery_cost = parseInt($('.js-order-total').attr('data-delivcost'));
    var sale1_cost = parseInt($('.js-sale1').attr('data-sale1'));
    var sale2_cost = parseInt($('.js-sale2').attr('data-sale2'));

    if (!sale1_cost) {
      sale1_cost = 0;
    }

    if (!sale2_cost) {
      sale2_cost = 0;
    }

    if (!delivery_cost) {
      delivery_cost = 0;
    }


    var order_total2 = cart_goods - sale1_cost - sale2_cost + delivery_cost;
    $(miniShop2.Order.orderCost).text(miniShop2.Utils.formatPrice(order_total2));
  }

  //SHOULD BE REMOVED ON PROD
  /*
  $('.header-info').click(function() {
      if ($('.header-info').hasClass('.no-cart')){
          return;
      }
      $('.shopping-cart').addClass('active');

      var data = {};
      data.bs_action_old = 'util/get-php-session';
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
              if (!response.success) {
                  PNotify.notice(response.message, {
                      theme: 'ms2-message-error'
                  });

              }
          },
          error: function() {
              PNotify.notice('В процессе произошла ошибка', {
                  theme: 'ms2-message-error'
              });
          }
      });
  });
  */
if ($ !== undefined && $('[data-fancybox]').length > 0){
  $('[data-fancybox]').fancybox({
    loop: true
  });
}

  // переключение фоток по цвету для ПК и моб версий. Для страницы товара.
  const pillowSlides = document.querySelectorAll('.pillow-slider .swiper-slide');
  $('.single-product-section__info .c_button').click(function () {
    var th_val = $(this).attr('data-value');
    const activeSlide = document.querySelector(`.pillow-slider img[data-desc="${th_val}"]`)?.closest('.swiper-slide');
    $(this).parents('.single-product-section').find('.swiper-slide img[data-desc="' + th_val + '"]').click();
    pillowSlides.length && activeSlide && pillowSwiper.slideTo(Array.prototype.indexOf.call(pillowSlides, activeSlide), 500);
  });
  if (window.matchMedia('(max-width: 768px)').matches) {
    $('.pillow-slider').on('click', () => {
      setTimeout(() => {
        $('.pillow-preview').click();
      }, 100)
    })
  }
  // end прк фтк

  $('.btn-add-basket').click(function () {

    if (typeof fbq !== 'undefined') {
      dataLayer.push({
        'event': 'AddtoCart'
      });
      fbq('track', 'BuyBtn');
      fbq('track', 'AddToCart',
        {
          content_category: $(this).attr('data-pagetitle'),
          content_ids: [$(this).attr('data-id')],
          content_name: $(this).attr('data-pagetitle'),
          content_type: 'product',
          currency: 'RUB',
          value: $(this).attr('data-price'),
        }
      );
    }
  });

  //Работа с размерами товара
  $('.single-product-hints__size .title').on('click', function () {
    $(this).addClass('clicked');
    $(this).parent().addClass('active');
  });
  $('.single-product-hints__size label').on('click', function () {
    $(this).parent().parent().removeClass('active');
  });
  $(document).on('click', function (e) {
    var div = $('.single-product-hints__size .title');
    if (!div.is(e.target)) {
      $('.single-product-hints__size').removeClass('active');
    }
  });

  function initVideo() {
    $("video").each(function () {
      if ($(this).find("source").attr("data-src")) {
        if ($(window).width() <= 480) {
          $(this).attr("src", $(this).find("source").attr("data-src-mobile"))
        } else {
          $(this).attr("src", $(this).find("source").attr("data-src"))
        }
      }
    });
  }

  initVideo();

});
