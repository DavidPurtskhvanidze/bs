function debug(str, text = "") {
  if (window.location.search.includes("debug")) {
    if (text != "") console.log(text);
    console.log(str);
  }
}

//Изменение страны или региона
(function () {
  function check_country_price(
    country,
    region,
    index,
    goods_count,
    freedeliv_value,
    cart_cost,
    products_list,
    action = "get_country_price"
  ) {
    if (country != "" || region != "") {
      var data = {
        bs_action: action,
        country: country,
        region: region,
        index: index,
        goods_count: goods_count,
        freedeliv_value: freedeliv_value,
        cart_cost: cart_cost,
        products_list: products_list,
      };

      $.ajax({
        url: location.href,
        data: data,
        type: "post",
        dataType: "json",
        success: function (response) {
          //console.log(response);
          if (response.success) {
            var deliveries = $("#deliveries"),
              payments = $("#payments"),
              delivery_cost;

            //Скрываем все способы доставки и оплаты, так как на странице выводятся абсолютно все
            deliveries.find(".checkbox").hide();
            payments.find(".checkbox").hide();

            //для кореи показываем платежку kspay
            if (country == "KR") {
              payments.find(".checkbox[data-payment=106]").show();
            }

            //Проходимся по id доставок полученых от сервера
            (function () {
              response.deliveries.forEach(function (item, i) {
                var checkbox = deliveries.find(
                    '.checkbox[data-delivery="' + item + '"]'
                  ),
                  input = checkbox.find("input");

                //Показываем только те доставки, что пришли к нам с сервака
                checkbox.show();

                //Убираем checked со всех доставок
                checkbox.removeClass("checked");
                input.removeAttr("checked");

                //По умолчанию выбираем первую доставку
                if (i == 0) {
                  delivery_cost = response.delivery_cost[i];
                  $(".js-result-delivery").text(delivery_cost);
                  input.attr("checked", "true");
                  checkbox.addClass("checked");
                }

                /*
                 * TODO: Нужно протестить на Швейцарии как это работает
                 */
                input.on("change", function (e) {
                  if (e.target.checked) {
                    delivery_cost = e.target.getAttribute("data-price");
                    $(".js-result-delivery")
                      .text(delivery_cost)
                      .attr("data-delivprice", delivery_cost);
                    setTotalCartCost(cart_cost, delivery_cost); //---------------------РЕФАКТОРИНГ---------------------------
                  }
                });

                /*
                 * TODO: Пока убрал, так как не уверен нужно ли это, нужно проверить
                 */
                // if (response.delivery_cost[i]) checkbox.find('.js-delivery-price-desc').text(response.delivery_cost[i]);
              });
            })();

            //Проходимся по платежкам полученым с сервака
            (function () {
              response.payments.forEach(function (item, i) {
                var checkbox = payments.find(
                    '.checkbox[data-payment="' + item + '"]'
                  ),
                  input = checkbox.find("input");

                //Показываем только те платежки, что пришли к нам с сервака
                checkbox.show();

                //Убираем checked со всех платежек
                checkbox.removeClass("checked");
                input.removeAttr("checked");

                //По умолчанию выбираем первую платежку
                if (i == 0) {
                  checkbox.addClass("checked");
                  input.attr("checked", "true");
                }
              });
            })();

            setTotalCartCost(cart_cost, delivery_cost);

            $("#deliveries").slideDown(300);
            $("#payments").slideDown(300);
            $(".js-delivery-box").slideDown(100);
            $(".js-result-box").slideDown(100);

            // показываем красный текст для стран не в ЕС
            country = $("#country option:selected").attr("data-code");
            switch (country) {
              case "AT":
              case "BE":
              case "BG":
              case "HR":
              case "CY":
              case "CZ":
              case "DK":
              case "EE":
              case "FI":
              case "FR":
              case "DE":
              case "GR":
              case "HU":
              case "IE":
              case "IT":
              case "LV":
              case "LT":
              case "LU":
              case "MT":
              case "NL":
              case "PL":
              case "PT":
              case "RO":
              case "SK":
              case "SI":
              case "ES":
              case "SE":
              case "GB":
                no_es = false;
                break;
              default:
                no_es = true;
            }
            if (no_es) {
              $(".no_es").fadeIn();
            } else {
              $(".no_es").fadeOut();
            }

            //Обновляем строку с НДС
            if (response.vat_sum) {
              var total_cost = +cart_cost + +delivery_cost;

              if (response.vat_plus) {
                if ($("#country").val() !== "KR") {
                  $(".js-order-total").attr(
                    "data-totalcartcost",
                    (+total_cost + +response.vat_sum).toFixed(2)
                  );
                  $(".js-order-total-cost").text(
                    (+total_cost + +response.vat_sum).toFixed(2)
                  );
                } else {
                  $(".js-order-total").attr(
                    "data-totalcartcost",
                    (+total_cost + +response.vat_sum).toFixed(0)
                  );
                  $(".js-order-total-cost").text(
                    (+total_cost + +response.vat_sum).toFixed(0)
                  );
                  $("#klarna-cart").attr(
                    "data-purchase-amount",
                    parseInt((+total_cost + +response.vat_sum) * 100)
                  );
                  try {
                    window.KlarnaOnsiteService.push({ eventName: "refresh-placements" });  
                  } catch(err) {
                    //console.log(err);
                  }
                }
              }
              $(".js-vat-sum").fadeIn();
              //console.log(response.vat_sum);
              if ($("#country").val() == "AU" || $("#country").val() == "NZ") {
                $(".js-vat-sum__cost").text(response.vat_sum);
              } else {
                $(".js-vat-sum__cost").text(
                 miniShop2.Utils.formatPrice(response.vat_sum)
                );
              }
              if (response.vat_percent > 0) {
                $(".js-vat-percent").text(response.vat_percent);
              }
              if (lexiconForJs.currency == "£") {
                document.cookie = "vat_sum=" + response.vat_sum;
              }
            }

            if (getCookie("vat_percent") == 0 && $("#country").val() != "ES") {
              $(".js-vat-sum").fadeOut();
            }
            if (
              country == "GB" &&
              (index.toUpperCase().indexOf("je".toUpperCase()) == 0 ||
                index.toUpperCase().indexOf("IM".toUpperCase()) == 0 ||
                index.toUpperCase().indexOf("GY".toUpperCase()) == 0)
            ) {
              $(".b-red-text").fadeOut();
            } else if (country == "GB") {
              $(".b-red-text").fadeIn();
            }

            if (getCookie("vat_percent") == 0 && $("#country").val() == "ES") {
              $(".js-vat-sum").html(
                '<span>VAT excluido (<span class="js-vat-percent">21</span>%):</span><span><span class="js-vat-sum__cost">- ' +
                  miniShop2.Utils.formatPrice(response.vat_sum) * -1 +
                  "</span> €</span>"
              );
            }
          } else {
            // PNotify.error('К сожалению, произошла ошибка при загрузке данных =( Пожалуйста, обратитесь к администрации сайта.')
          }
        },
        error: function () {
          // PNotify.error('К сожалению, произошла ошибка при загрузке данных =( Пожалуйста, обратитесь к администрации сайта.')
        },
      });
    }
  }

  function setTotalCartCost(cart_cost, delivery_cost) {
    if ($("#country").val() !== "KR") {
      $(".js-order-total-cost").text((+cart_cost + +delivery_cost).toFixed(2));
      $(".js-order-total").attr("data-delivcost", delivery_cost);
    } else {
      $(".js-order-total-cost").text((+cart_cost + +delivery_cost).toFixed(0));
      $(".js-order-total").attr("data-delivcost", delivery_cost);
      try {
        window.KlarnaOnsiteService.push({ eventName: "refresh-placements" });  
      } catch(err) {
        //console.log(err);
      }
      $(".js-order-total").attr("data-delivcost", delivery_cost);
    }
  }

  function calc_delivery(action) {
    var country = $("#country option:selected").attr("data-code"),
      region = $("#region option:selected").val(),
      index = $("#index").val(),
      goods_count = $(".js-order-total").attr("data-totalcount"),
      freedeliv_value = $(".js-order-total").attr("data-freedelivery"),
      cart_cost = $(".js-order-total").attr("data-cartcost"),
      products_list = productsJson;

    check_country_price(
      country,
      region,
      index,
      goods_count,
      freedeliv_value,
      cart_cost,
      products_list,
      action
    );
  }

  if ($("#country,#region").val()) {
    calc_delivery("get_country_price");
  }

  $("#country,#region").change(function (e) {
    calc_delivery(
      e.target.id == "region" ? "get_region_price" : "get_country_price"
    );
  });

  $("#index").change(function (e) {
    if ($("#region").val() != "" && $("#country").val() == "ES") {
      calc_delivery("get_country_price");
    }
    if ($("#region").val() != "" && $("#country").val() == "GB") {
      calc_delivery("get_country_price");
    }
  });
})();

//Отлавливаем все ajax ответы
$(document).ajaxSuccess(function (event, xhr, settings) {
  if (settings.url == "/assets/components/msoptionsprice/action.php") {
    var json = JSON.parse(xhr.responseText);
    console.log(json.data.modification.old_price);
    $(".js-prod-data").attr("data-price", json.data.modification.price);
    $(".js-new-price").text(json.data.modification.price);
    if (json.data.modification.old_price !== undefined) {
      $(".single-product-price.js-prod-data").attr("data-old-price", json.data.modification.old_price);
      const blockWrap = $(".js-old-price").closest('.js-prod-data');
      const price  = blockWrap.find(".js-new-price");
      if(Number(json.data.modification.old_price) > 0){
        $(".js-old-price").parent().css("display", "block");
        $(".js-old-price").text(json.data.modification.old_price);
        $(price).parent().addClass('newprice');
      }else{
        $(".js-old-price").parent().css("display", "none");
        $(price).parent().removeClass('newprice');
      }
    }
    $(".js-product-counter").val(1);
  }
});

$(".js-form-review").each(function () {
  $(this).append(
    '<input type="text" name="vorg" value="" class="_vorg" style="visibility:hidden; height: 0; min-height: 0; width: 0; padding: 0; border:none;margin:0"/>'
  );
});

var sAgGlobalFunctions = {
  merge_minicart_products: function () {
    $(".js-minicart .shopping-cart__goods .cart-item").each(function () {
      var th_id = $(this).attr("data-id");
      var th_option = $(this).attr("data-option");

      if (
        $(
          '.js-minicart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]'
        ).length > 1
      ) {
        var th_tot_count = 0;
        var th_tot_count_promo = 0;
        var th_tot_price = 0;
        var th_tot_oldprice = 0;

        $(
          '.js-minicart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]'
        ).each(function (index) {
          th_tot_count += parseFloat($(this).attr("data-count"));
          th_tot_price +=
            parseFloat($(this).attr("data-count")) *
            parseFloat($(this).attr("data-price"));
          th_tot_oldprice +=
            parseFloat($(this).attr("data-count")) *
            parseFloat($(this).attr("data-oldprice"));

          if (index != 0) {
            th_tot_count_promo += parseFloat($(this).attr("data-count"));
          }
        });

        $(
          '.js-minicart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]:not(:first)'
        ).remove();
        $(
          '.js-minicart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]:first'
        )
          .find('.single-product__counter input[type="number"]')
          .val(th_tot_count)
          .attr("data-promogoods-count", th_tot_count_promo);

        if (
          lexiconForJs.currency == "US$" ||
          lexiconForJs.currency == "£" ||
          lexiconForJs.currency == "C$" ||
          lexiconForJs.currency == "A$"
        ) {
          $(
            '.js-minicart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-new-price")
            .addClass("newprice")
            .text(
              lexiconForJs.currency +
                " " +
                miniShop2.Utils.formatPrice(th_tot_price)
            );
          $(
            '.js-minicart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-old-price")
            .show()
            .text(
              lexiconForJs.currency +
                " " +
                miniShop2.Utils.formatPrice(th_tot_oldprice)
            );
        } else {
          $(
            '.js-minicart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-new-price")
            .addClass("newprice")
            .text(
              miniShop2.Utils.formatPrice(th_tot_price) +
                " " +
                lexiconForJs.currency
            );
          $(
            '.js-minicart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-old-price")
            .show()
            .text(
              miniShop2.Utils.formatPrice(th_tot_oldprice) +
                " " +
                lexiconForJs.currency
            );
        }
      }
    });
  },
  setShopCartBodyHeight: function () {
    var heightFoot = $(".shopping-cart .shopping-cart__footer").outerHeight();
    $(".shopping-cart")
      .find(".shopping-cart-card")
      .css("height", "calc(100% - " + heightFoot + "px)");
  },
  merge_ordercart_products: function () {
    $(".js-order-cart .shopping-cart__goods .cart-item").each(function () {
      var th_id = $(this).attr("data-id");
      var th_option = $(this).attr("data-option");

      if (
        $(
          '.js-order-cart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]'
        ).length > 1
      ) {
        var th_tot_count = 0;
        var th_tot_price = 0;
        var th_tot_oldprice = 0;
        var th_tot_count_promo = 0;

        $(
          '.js-order-cart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]'
        ).each(function (index) {
          th_tot_count += parseFloat($(this).attr("data-count"));
          th_tot_price +=
            parseFloat($(this).attr("data-count")) *
            parseFloat($(this).attr("data-price"));
          th_tmp_oldcost = $(this).attr("data-oldprice");
          if ($(this).attr("data-oldprice")*1 == 0){
            th_tmp_oldcost = $(this).attr("data-price");
          }
          th_tot_oldprice +=
            parseFloat($(this).attr("data-count")) *
            parseFloat(th_tmp_oldcost);
          if (index != 0) {
            th_tot_count_promo += parseFloat($(this).attr("data-count"));
          }
        });

        $(
          '.js-order-cart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]:not(:first)'
        ).remove();
        $(
          '.js-order-cart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]:first'
        )
          .find(".js-ordercart-count")
          .text(th_tot_count)
          .attr("data-promogoods-count", th_tot_count_promo);

        if (
          lexiconForJs.currency == "US$" ||
          lexiconForJs.currency == "£" ||
          lexiconForJs.currency == "C$" ||
          lexiconForJs.currency == "A$"
        ) {
          $(
            '.js-order-cart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-new-price2")
            .addClass("newprice")
            .text(
              lexiconForJs.currency +
                " " +
                miniShop2.Utils.formatPrice(th_tot_price)
            );
          $(
            '.js-order-cart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-old-price")
            .show()
            .text(
              lexiconForJs.currency +
                " " +
                miniShop2.Utils.formatPrice(th_tot_oldprice)
            );
        } else {
          $(
            '.js-order-cart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-new-price2")
            .addClass("newprice")
            .text(
              miniShop2.Utils.formatPrice(th_tot_price) +
                " " +
                lexiconForJs.currency
            );
          $(
            '.js-order-cart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-old-price")
            .show()
            .text(
              miniShop2.Utils.formatPrice(th_tot_oldprice) +
                " " +
                lexiconForJs.currency
            );
        }
      }
    });
  },
  merge_bigcart_products: function () {
    // Слияние товаров в большой корзине.
    $("#msCart .shopping-cart__goods .cart-item").each(function () {
      var th_id = $(this).attr("data-id");
      var th_option = $(this).attr("data-option");

      if (
        $(
          '#msCart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]'
        ).length > 1
      ) {
        var th_tot_count = 0;
        var th_tot_price = 0;
        var th_tot_oldprice = 0;
        var th_tot_count_promo = 0;

        $(
          '#msCart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]'
        ).each(function (index) {
          th_tot_count += parseFloat($(this).attr("data-count"));
          th_tot_price +=
            parseFloat($(this).attr("data-count")) *
            parseFloat($(this).attr("data-price"));
          th_tot_oldprice +=
            parseFloat($(this).attr("data-count")) *
            parseFloat($(this).attr("data-oldprice"));

          if (index != 0) {
            th_tot_count_promo += parseFloat($(this).attr("data-count"));
          }
        });

        $(
          '#msCart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]:not(:first)'
        ).remove();
        $(
          '#msCart .shopping-cart__goods .cart-item[data-id="' +
            th_id +
            '"][data-option="' +
            th_option +
            '"]:first'
        )
          .find('.cart-item__info_cont input[type="number"]')
          .val(th_tot_count)
          .attr("data-promogoods-count", th_tot_count_promo);

        if (
          lexiconForJs.currency == "US$" ||
          lexiconForJs.currency == "£" ||
          lexiconForJs.currency == "C$" ||
          lexiconForJs.currency == "A$"
        ) {
          $(
            '#msCart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-new-price2")
            .addClass("newprice")
            .text(
              lexiconForJs.currency +
                " " +
                miniShop2.Utils.formatPrice(th_tot_price)
            );
          $(
            '#msCart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-old-price")
            .show()
            .text(
              lexiconForJs.currency +
                " " +
                miniShop2.Utils.formatPrice(th_tot_oldprice)
            );
        } else {
          $(
            '#msCart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-new-price2")
            .addClass("newprice")
            .text(
              miniShop2.Utils.formatPrice(th_tot_price) +
                " " +
                lexiconForJs.currency
            );
          $(
            '#msCart .shopping-cart__goods .cart-item[data-id="' +
              th_id +
              '"][data-option="' +
              th_option +
              '"]:first'
          )
            .find(".js-old-price")
            .show()
            .text(
              miniShop2.Utils.formatPrice(th_tot_oldprice) +
                " " +
                lexiconForJs.currency
            );
        }
      }
    });
  },
  apply_mods_products: function () {
    $(".js-rec-prod-colors").each(function () {
      if ($(this).find(".c_button").length > 0) {
        var th_mod = $(this).find(".c_button:eq(0)").attr("data-value");

        if (th_mod) {
          $(this)
            .parents(".js-product-box")
            .find('form input[name="options[color]"]')
            .val(th_mod);
        }
      }
    });

    $(".js-bigproduct-color").each(function () {
      if ($(this).find(".c_button").length > 0) {
        var th_mod = $(this).find(".c_button:eq(0)").attr("data-value");

        if (th_mod) {
          $(this)
            .parents("form")
            .find('input[name="options[color]"]')
            .val(th_mod);
        }
      }
    });

    $(".js-cartproduct-color").each(function () {
      if ($(this).find(".c_button").length > 0) {
        var th_mod = $(this).find(".c_button:eq(0)").attr("data-value");

        if (th_mod) {
          $(this)
            .parents(".js-product-box")
            .find('form input[name="options[color]"]')
            .val(th_mod);
        }
      }
    });
  },
  //Функция ререндера миникорзины
  send_ajax_rerender_minicart: function () {
    var $minicart = $(".js-minicart");

    if ($minicart[0] == undefined) return;

    var data = {};
    data["bs_action"] = "rerender_minicart";
    $minicart.prepend('<div class="loading show"/>');

    $.ajax({
      url: [location.protocol, "//", location.host, location.pathname].join(""),
      data: data,
      type: "post",
      async : false,
      dataType: "json",
      success: function (response) {
        if (response.success) {
          if (
            !$(".shopping-cart").hasClass("active") &&
            $("#msCart").length == 0
          ) {
            $(".shopping-cart").addClass("active");
            $("html,body").addClass("noscroll");
          }

          $minicart.html(response.minicart);
          sAgGlobalFunctions.merge_minicart_products();
          sAgGlobalFunctions.setShopCartBodyHeight();
          price = $(".js-minicart-cost").text().split(" ").join("");
          $(".js-product-color .c_button.active").click();
          $("#klarna-cart").attr("data-purchase-amount", parseInt(price) * 100);
          try {
            window.KlarnaOnsiteService.push({ eventName: "refresh-placements" });  
          } catch(err) {
            //console.log(err);
          }
        }
      },
      complete: function () {
        $(".loading").remove();
      },
    });
  },
  //Функция ререндера корзины
  send_ajax_rerender_cart: function () {
    var $cart = $(".js-cart");

    if ($cart[0] == undefined) return;

    $cart.prepend('<div class="loading show"/>');
    var data = {};
    data["bs_action"] = "rerender_cart";

    $.ajax({
      url: [location.protocol, "//", location.host, location.pathname].join(""),
      data: data,
      type: "post",
      async : false,
      dataType: "json",
      success: function (response) {
        if (response.success) {
          $cart.html(response.cart);
          $(".js-cart-total2").text($(".js-cart-total").text());

          sAgGlobalFunctions.merge_ordercart_products();
          sAgGlobalFunctions.merge_bigcart_products();
          sAgGlobalFunctions.merge_minicart_products();
          sAgGlobalFunctions.apply_mods_products();
          price = $(".js-minicart-cost").text().split(" ").join("");
          $("#klarna-cart").attr("data-purchase-amount", parseInt(price) * 100);
          try {
            window.KlarnaOnsiteService.push({ eventName: "refresh-placements" });  
          } catch(err) {
            //console.log(err);
          }
        }
      },
      complete: function () {
        $(".loading").remove();
      },
    });
  },
};

try {
  $(document).ready(function () {
      
    miniShop2.Callbacks.add('Order.submit.response.success', 'orders_submit_ok', function (response) {
    	if ($('#payments [name="payment"]:checked').val() == 2) {
    		payment_type = "PayPal";
    	}
    	if ($('#payments [name="payment"]:checked').val() == 103) {
    		payment_type = "Stripe";
    	}
    	if ($('#payments [name="payment"]:checked').val() == 104) {
    		payment_type = "Sezzle";
    	}
    	if ($('#payments [name="payment"]:checked').val() == 105) {
    		payment_type = "Klarna";
    	}
    	if ($('#payments [name="payment"]:checked').val() == 106) {
    		payment_type = "KSPay";
    	}
    	if ($('#payments [name="payment"]:checked').val() == 107) {
    		payment_type = "Afterpay";
    	}
    
    	window.dataLayer = window.dataLayer || [];
    	dataLayer.push({
    		event: 'order_created',
    		event_id: 'e10',
    		shipping_tier: localStorage.shipping_tier,
    		payment_type: payment_type,
    		order_id: 'unknown',
    		value: $(".js-order-total-cost").text(),
    		try_number_to_order: '1_try'
    
    	});
    });  
      
      
    //Добавление в корзину
    miniShop2.Callbacks.add("Cart.add.before", "rerenderMinicart", function () {
      $(".js-order-cart").prepend('<div class="loading show"/>');
      $(".js-minicart").prepend('<div class="loading show"/>');
      $(".js-cart").prepend('<div class="loading show"/>');
      return true;
    });
    miniShop2.Callbacks.add(
      "Cart.add.response.success",
      "rerenderMinicart",
      function () {
        sAgGlobalFunctions.send_ajax_rerender_minicart();
        sAgGlobalFunctions.send_ajax_rerender_cart();
        price = $(".js-minicart-cost").text().split(" ").join("");
        $(".js-product-color .c_button.active").click();
        $("#klarna-cart").attr("data-purchase-amount", parseInt(price) * 100);
        try {
          window.KlarnaOnsiteService.push({ eventName: "refresh-placements" });  
        } catch(err) {
          //console.log(err);
        }
        return true;
      }
    );

    //Изменение кол-ва товаров
    miniShop2.Callbacks.add(
      "Cart.change.before",
      "rerenderMinicart",
      function () {
        $(".js-order-cart").prepend('<div class="loading show"/>');
        $(".js-minicart").prepend('<div class="loading show"/>');
        $(".js-cart").prepend('<div class="loading show"/>');
        return true;
      }
    );
    miniShop2.Callbacks.add(
      "Cart.change.response.success",
      "rerenderMinicart",
      function () {
        sAgGlobalFunctions.send_ajax_rerender_minicart();
        sAgGlobalFunctions.send_ajax_rerender_cart();
        price = $(".js-minicart-cost").text().split(" ").join("");
        $(".js-product-color .c_button.active").click();
        $("#klarna-cart").attr("data-purchase-amount", parseInt(price) * 100);
        try {
          window.KlarnaOnsiteService.push({ eventName: "refresh-placements" });  
        } catch(err) {
          //console.log(err);
        }
        return true;
      }
    );

    //Удаление товаров
    $(document).on("click", ".js-remove-product", function () {
      $(this).find(".ms2_form").trigger("submit"); // Триггерим отправку формы при клике на крестик, без этого не отправляет
    });
    miniShop2.Callbacks.add(
      "Cart.remove.before",
      "rerenderMinicart",
      function () {
        $(".js-order-cart").prepend('<div class="loading show"/>');
        $(".js-minicart").prepend('<div class="loading show"/>');
        $(".js-cart").prepend('<div class="loading show"/>');
        return true;
      }
    );
    miniShop2.Callbacks.add(
      "Cart.remove.response.success",
      "rerenderMinicart",
      function () {
        sAgGlobalFunctions.send_ajax_rerender_minicart();
        sAgGlobalFunctions.send_ajax_rerender_cart();
        price = $(".js-minicart-cost").text().split(" ").join("");
        $(".js-product-color .c_button.active").click();
        $("#klarna-cart").attr("data-purchase-amount", parseInt(price) * 100);
        try {
          window.KlarnaOnsiteService.push({ eventName: "refresh-placements" });  
        } catch(err) {
          //console.log(err);
        }
        return true;
      }
    );
  });
} catch (error) {
  console.error(error);
}

//Отображаем сообщение при неверном zip
$(document).ready(function () {
  try {
    miniShop2.Callbacks.add(
      "Order.add.ajax.done",
      "custom_validator",
      function (response) {
        if (response.responseJSON.data.region) {
          $("#index").trigger("change");
          return true;
        }
        if (!response.responseJSON.data.index) return true;

        var $message = $("#index").next("label");
        if (response.responseJSON.success) {
          $message.text("");
          $message.hide(0);
          $(".submit-order").removeAttr("disabled");
          $(".submit-order").css({
            opacity: 1,
          });
        } else {
          $message.text(lexiconForJs.incorrectZip);
          $message.show(0);
          $(".submit-order").attr("disabled", "disabled");
          $(".submit-order").css({
            opacity: 0.5,
          });
        }
        return false;
      }
    );
  } catch (error) {
    console.error(error);
  }
});

//Фискальный адрес
(function () {
  try {
    var check = document.querySelector(".js-use-bulling input"),
      fields = document.querySelector(".js-billing-address");

    if (fields == null || check == null) return;

    function toggleFields(show) {
      if (show) {
        $("#billing_region").val("");
        $("#billing_city").val("");
        $("#billing_street").val("");
        $("#billing_building").val("");
        $("#billing_index").val("");

        fields.style.display = "block";
      } else {
        $("#billing_country").val($("#country").val());
        $("#billing_region").val($("#region").val());
        $("#billing_city").val($("#city").val());
        $("#billing_street").val($("#street").val());
        $("#billing_building").val($("#building").val());
        $("#billing_index").val($("#index").val());

        fields.style.display = "none";
      }
    }

    toggleFields(false);

    check.addEventListener("change", function () {
      if (this.checked) {
        toggleFields(false);
      } else {
        toggleFields(true);
      }
    });
  } catch (error) {
    console.error(error);
  }
})();

//Меню выбора страны и языка
try {
  (function () {
    if ($(window).width() < 1023) {
      // Подключаем стиль для мобильных
      $(".b-switchSelect__title").click(function () {
        $(this).next(".b-switchSelect__list").slideToggle();
      });
    }

    // Попап выбора языка

    // if (getCookie("geoIpApi") != "true") {
    //   $(".pp__mailing--country").addClass("show");
    //   $("html,body").addClass("noscroll");
    //   setCookie("geoIpApi", "true");
    // }
  })();
} catch (error) {
  console.error(error);
}

let viewProduct = [];
let out = "Shop";

$(function () {
    
    $(".shop-section__goods_content .goods-grid a").click(
        function() {
            dataLayer.push({ ecommerce: null })
            dataLayer.push({
                'event': 'addEcommerce_interaction',
                'ecommerce_step':'productClick',
                'ecommerce_param':'Shop',
                'ecommerce': {
                    'currencyCode': $(this).attr("data-currency"),
                    'click': {
                        'actionField': {
                            'list': 'Shop'
                        },
                        'products': [{
                            'name': $(this).attr("data-name"),
                            'id': $(this).attr("data-id"),  
                            'price': $(this).attr("data-price"),                     
                            'currency': $(this).attr("data-currency"),              
                            'category': $(this).attr("data-category"),        
                            'brand': "Sleep&Glow",
                            'position': 1                                                                        
                        }]
                    }
                }
            });
        }
    )
    
    
    $(".js-minicart .single-product-section__other-products a").click(
        function() {
            dataLayer.push({ ecommerce: null })
            dataLayer.push({
                'event': 'addEcommerce_interaction',
                'ecommerce_step':'productClick',
                'ecommerce_param':'Shopping cart panel',
                'ecommerce': {
                    'currencyCode': $(this).attr("data-currency"),
                    'click': {
                        'actionField': {
                            'list': 'Shop'
                        },
                        'products': [{
                            'name': $(this).attr("data-name"),
                            'id': $(this).attr("data-id"),  
                            'price': $(this).attr("data-price"),                     
                            'currency': $(this).attr("data-currency"),              
                            'category': $(this).attr("data-category"),        
                            'brand': "Sleep&Glow",
                            'position': 1                                                                        
                        }]
                    }
                }
            });
        }
    )
    
    
    
    $(".beauty-landing .product-section a, .shop-silk-store.shop-silk-landing .shop-section a").click(
        function() {
            dataLayer.push({ ecommerce: null })
            dataLayer.push({
                'event': 'addEcommerce_interaction',
                'ecommerce_step':'productClick',
                'ecommerce_param':'Shopping cart panel',
                'ecommerce': {
                    'currencyCode': $(this).attr("data-currency"),
                    'click': {
                        'actionField': {
                            'list': $(this).attr("data-list")
                        },
                        'products': [{
                            'name': $(this).attr("data-name"),
                            'id': $(this).attr("data-id"),  
                            'price': $(this).attr("data-price"),                     
                            'currency': $(this).attr("data-currency"),              
                            'category': $(this).attr("data-category"),        
                            'brand': "Sleep&Glow",
                            'position': 1                                                                        
                        }]
                    }
                }
            });
        }
    )
    
    
     $(".add-products-page .cart-section .slide-product__img a").click(
        function() {
            dataLayer.push({ ecommerce: null })
            dataLayer.push({
                'event': 'addEcommerce_interaction',
                'ecommerce_step':'productClick',
                'ecommerce_param':'Shopping cart panel',
                'ecommerce': {
                    'currencyCode': $(this).attr("data-currency"),
                    'click': {
                        'actionField': {
                            'list': 'other products in basket'
                        },
                        'products': [{
                            'name': $(this).attr("data-name"),
                            'id': $(this).attr("data-id"),  
                            'price': $(this).attr("data-price"),                     
                            'currency': $(this).attr("data-currency"),              
                            'category': $(this).attr("data-category"),        
                            'brand': "Sleep&Glow",
                            'position': 1                                                                        
                        }]
                    }
                }
            });
        }
    )    
    
    
    
    
    
    
  switch (window.location.pathname) {
    case "/the-silk-collection":
      out = "Landing the silk collection";
      break;
    case "/omnia":
      out = "Landing omnia";
      break;
    case "/aula":
      out = "Landing aula";
      break;
    case "/silk-pillow-bra":
      out = "Landing silk pillow bra";
      break;
    case "/weighted-blankets-page":
      out = "Landing weighted blanket";
      break;
    case "/add-other-products-for-a-perfect-sleep":
      out = "Other products in cart page";
      break;
  }

  switch (window.location.search) {
    case "?category=2053":
      out = "Shop - category additional pillowcases";
      break;
    case "?category=2069":
      out = "Shop - category special offers";
      break;
  }

  if (window.location.pathname.indexOf("product/") > 0) {
    out = "product-section";
  }

  setCookie("out", out, { path: "/" });



miniShop2.Callbacks.add('Order.submit.response.success', 'orders_submit_ok', function (response) {
	if ($('#payments [name="payment"]:checked').val() == 2) {
                		payment_type = "PayPal";
                	}
                	if ($('#payments [name="payment"]:checked').val() == 103) {
                		payment_type = "Stripe";
                	}
                	if ($('#payments [name="payment"]:checked').val() == 104) {
                		payment_type = "Sezzle";
                	}
                	if ($('#payments [name="payment"]:checked').val() == 105) {
                		payment_type = "Klarna";
                	}
                	if ($('#payments [name="payment"]:checked').val() == 106) {
                		payment_type = "KSPay";
                	}
                	if ($('#payments [name="payment"]:checked').val() == 107) {
                		payment_type = "Afterpay";
                	}
                
                	window.dataLayer = window.dataLayer || [];
                	dataLayer.push({
                		event: 'order_created',
                		event_id: 'e10',
                		shipping_tier: localStorage.shipping_tier,
                		payment_type: payment_type,
                		order_id: 'unknown',
                		value: $(".js-order-total-cost").text(),
                		try_number_to_order: '1_try'
                	});
                	return true;
});  


  $(".swiper-slide a").on("click", function (e) {
    let id = $(this).closest("div.swiper-slide").data("id");
    setCookie("click_product", id, { path: "/" });
    setCookie("click_product_out", out, { path: "/" });
  });
  sendDataLayer(viewProduct);
  $(document).on("mousemove", function () {
    sendDataLayer(viewProduct);
  });
  $(document).on("touchstart click", function () {
    sendDataLayer(viewProduct);
  });
});

function inArray(needle, haystack) {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
}

function sendDataLayer(products) {
  if ($("[data-viewproduct]").length > 0) {
    func = false;
    showproducts = [];
    $("[data-viewproduct]").each(function (i, e) {
      if (inArray($(e).data("viewproduct"), viewProduct) === false) {
        if ($(e).visible()) {
          products.push($(e).data("viewproduct"));
          showproducts.push($(e).data("viewproduct"));
          if ($(e).data("out") != undefined) out = $(e).data("out");
          func = true;
        }
      }
    });

    showproducts = showproducts.join(",");

    if (func) {
      let data = {};
      data.out = out;
      data.viewProduct = showproducts;
      data.bs_action = "util/view-product";
      $.ajax({
        url: [location.protocol, "//", location.host, location.pathname].join(
          ""
        ),
        data: data,
        type: "post",
        dataType: "json",
        success: function (data) {
          dataLayer.push({ ecommerce: null });
          dataLayer.push({
            event: "addEcommerce_noninteraction",
            ecommerce_step: "productImpression",
            ecommerce_param: data.response.out,
            ecommerce: {
              currencyCode: data.response.currency,
              impressions: data.response.product_impression,
            },
          });
          debug(data.response, "sendDataLayer");
        },
        error: function (error) {
          debug(error.responseText, "error sendDataLayer");
        },
      });
    }
  }
}

function addToCart(product, from = null, count = null) {
  let data = {};
  data.out = out;
  data.js_product = product;
  data.bs_action = "util/add-product";
  console.log(from);
  console.log(product);
  if (from == "add-product-from-minicart") {
      data.quantity = 1;
  } else if (from == "add-product-from-cart") {
      data.quantity = 1;
  } else if (from == "add-product-from-product-page") {
      data.quantity = count;
  } else if (from == "add-other-products-cart") {
      data.quantity =  count;
  }
  console.log(data);
  setTimeout(function () {
    $.ajax({
      url: [location.protocol, "//", location.host, location.pathname].join(""),
      data: data,
      type: "post",
      dataType: "json",
      success: function (data) {
        dataLayer.push({ ecommerce: null });
        dataLayer.push({
          event: "addEcommerce_noninteraction",
          ecommerce_step: "addToCart",
          ecommerce_param: data.response.out,
          ecommerce: {
            currencyCode: data.response.currency,
            add: {
              products: data.response.product_add_impression,
            },
          },
        });
        debug(data.response, "addToCart");
      },
      error: function (error) {
        debug(error.responseText, "error addToCart");
      },
    });
  }, 100);
}

function removeFromCart(product, params = null) {
    console.log(product);
  let data = {};
  data.js_product = product;
  if (params.from == "remove-product-from-minicart-close-btn" || params.from == "remove-product-from-cart-close-btn") {
      data.bs_action = "util/full-remove-product";
      data.variant = params.variant.split("#");
      data.variant = data.variant[0].split("=");
       data.variant = data.variant[0];
      data.count = params.count;
  } else {
      data.bs_action = "util/remove-product";
       data.variant = params.variant.split("#");
       data.variant = data.variant[0].split("=");
       data.variant = data.variant[0];
  }
  $.ajax({
    url: [location.protocol, "//", location.host, location.pathname].join(""),
    data: data,
    type: "post",
    dataType: "json",
    success: function (data) {
      dataLayer.push({ ecommerce: null });
      dataLayer.push({
        event: "addEcommerce_interaction",
        ecommerce_step: "removeFromCart",
        ecommerce: {
          currencyCode: data.response.currency,
          remove: {
            products: data.response.product_remove_impression,
          },
        },
      });
      debug(data.response, "removeFromCart");
    },
    error: function (error) {
      debug(error.responseText, "error removeFromCart");
    },
  });
}

function runFunc(obj, params = {}) {
  debug(params, "runFunc params");
  console.log(obj);
  test = obj;
  count = null;
  if (params.from == "add-product-from-product-page") {
      count = $($(obj).parent()).find("input").val();
  }
  addToCart($(obj).data("id"), params.from, count);
  twq("event", "tw-o2zp8-occ2z", {});
  /*ttq.track('AddToCart', {
    value: $(obj).data("price"),
    currency: $(obj).data("currency"),
    content_id: $(obj).data("id"),
    content_type: 'product'
  },
  {event_id: Date.now()});*/
}

function runFuncPlus(obj, params = {}) {
  console.log(params.from);
  console.log(obj);
  test = obj;
  debug(params, "runFuncrunFuncPlus params");
  addToCart($(obj).closest(".cart-item").data("id"), params.from);
  twq("event", "tw-o2zp8-occ2z", {});
  ttq.track('AddToCart');
}

function runFuncMinus(obj, params = {}) {
    $(this).attr("onclick","");
    console.log(obj);
    test = obj;
  debug(params, "runFuncMinus params");
  params.count = $(obj).closest(".cart-item").data("count");
  params.variant = $(obj).closest(".cart-item").data("option");
   //remove-product-from-minicart-close-btn
   console.log("УДАЛЕНИЕ ");
   console.log(params);
   console.log($(this).attr("onclick"));
  removeFromCart($(obj).closest(".cart-item").data("id"), params);
}



function runFuncMod(obj) {
        if (localStorage.first_mod == "first") {
            localStorage.setItem("first_mod", "second");
            return true;
        }
         return true;
        let data = {};
        console.log("modification clicked");
          data.js_product = $(obj).attr("data-id");
          data.bs_action = "util/color-product";
          data.variant = $(obj).attr("data-color");
          console.log(data);
          setTimeout(function () {
            $.ajax({
              url: [location.protocol, "//", location.host, location.pathname].join(""),
              data: data,
              type: "post",
              dataType: "json",
              success: function (data) {
                  newtest = data;
                dataLayer.push({ ecommerce: null });
                dataLayer.push({
                  event: "addEcommerce_interaction",
                  ecommerce_step: "productClick",
                  ecommerce_param: "Product page",
                  ecommerce: {
                    currencyCode: data.response.currency,
                    click: {
                      actionField : {
                        list: 'Change product modification'  
                      },    
                      products: newtest.response.product_impression[0],
                    },
                  },
                });
                debug(data.response, "error change variant");
              },
              error: function (error) {
                debug(error.responseText, "error change variant");
              },
            });
          },1000);
    }

function openCart() {
  history.back();
}

// $(".img.pp_").on("click", function() {
//   $(".pp__patent-preview .popup-content .img").hide();
//   $(".pp__patent-preview .popup-content .img[data-patent="+$(this).data('img')+"]").show();
// });
