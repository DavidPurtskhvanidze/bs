// direction vertical
// swiper-slide


const fxProductPicsSlider = new Swiper('#fxProductPicsSlider', {
    speed: 300,
    spaceBetween: 2,
    slidesPerView: 1,
    centeredSlides: true,
    direction : 'vertical', // horizontal
    el : '.fx-image-scrl',
    autoHeight : true,
    freeMode: {
        enabled: true,
       // sticky: true,
    },
    mousewheel: {
        enabled: true,
        releaseOnEdges: true,
    },
    /*  scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
      },*/
    navigation: {
        nextEl: '#fxProductPicsSlider .swiper-button-next',
        prevEl: '#fxProductPicsSlider .swiper-button-prev',
    },
    pagination: {
        el: '#fxProductPicsSlider .swiper-pagination',
        clickable : true
    },
    breakpoints: {
        // when window width is >= 767px
        320: {
            //autoHeight : true,
            direction : 'horizontal',
            freeMode: {
                enabled: false,
                // sticky: true,
            },
        },
        // when window width is >= 767px
        992: {
            direction : 'vertical',

        },

    }
});

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
var loadpage = 0; // признак первичной загрузки фоток.
$(document).ready(function() {

    // страница продукта
    $('.fx-old-price').parent().hide();

    $('.fx-modific-eve-label input').on('click', function () {
       elm = $(this);
        modyfdata = {};
        //console.log('EL ',elm.closest('.fx-prodmodif-name-matrix'));
       if (elm.closest('.fx-prodmodif-name-matrix').length > 0){
           myname = elm.closest('.fx-prodmodif-name-matrix').data('name');
           modyfdata = eval(myname);
          // console.log('MD: ',modyfdata);
       }

       /*var urlpr = getUrlVars();
       if (urlpr['mod'] && urlpr['mod'] != '' && loadpage == 0) {
           nowcolor = decodeURI(urlpr['mod']);
           loadpage = 1;
       } else {}*/
           nowcolor = $('.fx-prodmodif-name-matrix .product-color input:checked').eq(0).val();// ?? elm.val();

        //console.log('nowcolor: ',nowcolor);

       nowsize = $('.fx-prodmodif-name-matrix .product-size input:checked').eq(0).val();
        console.log('N color: ',nowcolor);
        console.log('N size: ',nowsize);
       if (elm.data('type') == 'color') {
           name = elm.parent().attr('title');
           $('.fx-modific-color-name').text(name);

           stroka = window.location.pathname;
           //window.history.replaceState(null,"", stroka + '?mod=' + nowcolor);
           const searchParams = new URLSearchParams(window.location.search);
           searchParams.set('mod', nowcolor);
           window.history.replaceState(null,"", stroka + '?' + searchParams.toString());


           $('.fx-prodmodif-name-matrix .product-size .fx-modific-eve-label').addClass('checkbox_disabled').find('input').attr('disabled', true);
           myimages = [];
           flagfind = 0;
           for (var keya in modyfdata){
               row = modyfdata[keya];
               //console.log('row3: ',row,nowcolor);
               if (row['color'] == nowcolor) {
                   if (flagfind == 0) {
                       myimages = row['images'];
                       console.log('rowКК: ',row['images'],myimages);
                       flagfind = 1;
                   }
                   $('.fx-prodmodif-name-matrix .product-size input[value="'+row['size']+'"]').parents('label').removeClass('checkbox_disabled').find('input').attr('disabled', false);
                   //console.log('mod НАЙДЕН2!',row,myimages);
               }
           }
           $('.fx-prodmodif-name-matrix .product-size input:not(disabled)').eq(0).trigger('click');
           console.log('images3: ',myimages);
           if (myimages.length > 0) {
               myimages.sort((a, b) => (a.rank*1) > (b.rank*1) ? 1 : -1);
               console.log('images-sort: ',myimages);
               // images
               // берем первую фотку
               $('.fx-inputimage-one').val(myimages[0]['url']);

               fxProductPicsSlider.removeAllSlides();
               for (var keyimg in myimages){
                   //console.log('img НАЙДЕН!',myimages[keyimg]);
                   templcontent = document.querySelector('#fxProductPicsSliderTemplate').content.cloneNode(true);
                   $(templcontent).find('.product-picture-full-img-link').attr('data-rank',myimages[keyimg]['rank']); // rank
                   $(templcontent).find('.product-picture-full-img-link').attr('href',myimages[keyimg]['url'].replaceAll('item2x/','')); // key
                   $(templcontent).find('.product-picture__img').attr('src',myimages[keyimg]['url'].replaceAll('item2x/','')); // key
                   $(templcontent).find('.fx-product-mobile-srcset').attr('srcset',myimages[keyimg]['url']); // key
                   //$(templcontent).find('.product-picture__img').data('offer-id',myimages[keyimg]['id']); // key
                   fxProductPicsSlider.appendSlide(templcontent);
               }
           }

       } else {

       }

       // find cost
        var flagstop = 0;
        for (var keya in modyfdata){
            row = modyfdata[keya];
            //elsi = !boxsize.length ? '' : row['size'];
            //elco = !boxcolor.length ? '' : row['color'];
            if (row['size'] == nowsize && row['color'] == nowcolor && flagstop == 0) {
                console.log('mod НАЙДЕН!',modyfdata[keya]);
                mprice = row['price'];
                //mprice = row['old_price'];

                $('.fx-new-price').text(miniShop2.Utils.formatPrice(mprice));
                oldprice_tmp = row['old_price'] == '' ? 0 : row['old_price'];
                if (oldprice_tmp > 0) {
                    $('.fx-old-price').parent().show();
                    $('.fx-old-price').text(miniShop2.Utils.formatPrice(oldprice_tmp));
                } else {
                    $('.fx-old-price').parent().hide();
                }


                //tov.find('.fx-prod-count').data('price',mprice);
               /* if (tov.hasClass('has-mod-price')) {
                    mprice = el['price'] * 0.8;
                }*/

                flagstop = 1;
            }
        }



    });
    var urlpr = getUrlVars();
    if (urlpr['mod'] && urlpr['mod'] != '' && loadpage == 0) {
        nowcolor = decodeURI(urlpr['mod']);
        loadpage = 1;
        console.log('Load ',nowcolor,nowcolor.replaceAll('+',' '));
        nowcolor = nowcolor.replaceAll('+',' ');
        if ($('.fx-prodmodif-name-matrix .product-color .fx-modific-eve-label').find('input[value="'+nowcolor+'"]').length > 0){
            $('.fx-prodmodif-name-matrix .product-color .fx-modific-eve-label').find('input[value="'+nowcolor+'"]').trigger('click');
        } else {
            $('.fx-prodmodif-name-matrix .product-color .fx-modific-eve-label').eq(0).find('input').trigger('click');
        }

    } else {
        //console.log('Fall ',urlpr['mod']);
        $('.fx-prodmodif-name-matrix .product-color .fx-modific-eve-label').eq(0).find('input').trigger('click');
    }

   // $('.fx-prodmodif-name-matrix .product-color .fx-modific-eve-label').eq(0).find('input').trigger('click');

    // Обработка событий каталога

    //  $(document).ready(function() { })
    //SET CONFIG FOR RENDER CART BEFORE MINISHOP ACTIONS
    miniShop2.Callbacks.add('Cart.add.before', '', function () {

        // Если у нас есть модификации вообще.
        if ($('.fx-prodmodif-name-matrix').length > 0){
            nowcolor = $('.fx-prodmodif-name-matrix .product-color input:checked').eq(0).val();// ?? elm.val();
            nowsize = $('.fx-prodmodif-name-matrix .product-size input:checked').eq(0).val();
            if (!nowcolor && !nowsize) {
                /*alert('Не выбрали данные');*/
                miniShop2.Message.error('Не выбрали цвет или размер у товара');
                return false;
            }
        }


    });
    /*miniShop2.Callbacks.add('Cart.add.response.success', '', function (response,qwe) {
        miniShop2.Message.success('');
        console.log('jj',response,qwe);
        check_ms2_action_elementx(response);
    });*/
    miniShop2.Callbacks.add('Cart.add.response.success', 'cart_cu_add', check_ms2_action_elementx);
    //miniShop2.Callbacks.add('Cart.remove.response.success', 'cart_cu_rem', cart_refresh_one);
    miniShop2.Callbacks.add('Cart.change.response.success', 'cart_cu_cha', check_ms2_action_element_change);

    //miniShop2.Callbacks.add('Cart.remove.before', '', check_ms2_action_elementx);
    //miniShop2.Callbacks.add('Cart.clean.before', '', check_ms2_action_elementx);
    function check_ms2_action_element_change(resp) {
        console.log('Change ',resp);
        resp['message'] = 'alex';
    }


    function check_ms2_action_elementx(resp) {
        console.log('ADD ',resp);
        //resp.message = ''; // очистка стандартного уведомления
        if (resp && resp.success == true) {

            tmpimg = $('.fx-inputimage-one').val();
            console.log('ADD2 ',tmpimg);
            $('#addedToaster').find('.added-toaster__picture-img').attr('src',tmpimg);
            /*const box = document.getElementById("addedToaster");
            box.classList.add("active");*/

            $('#addedToaster').addClass('active');
            setTimeout(() => {
                // box.classList.remove("active");
                $('#addedToaster').removeClass('active');
            }, 5000);

        } else {
            miniShop2.Message.error('Ошибка сервера при добавлении товара.');
        }

        //  функция пересчетов данных при новом статусе корзины. add chande remove.

        // fxMiniCartListItem - шаблон
        // fx-minicart-wrap-list -  контейнер
        // fx-cart-insert-itm - элемент
        $('#fx-minicart-wrap-list').html('');
        cartpsevdo = resp['data']['cart'];
        console.log('RESP',cartpsevdo); // ['properties']

        templid = 'fxMiniCartListItem';
        for(var itx in cartpsevdo) {
            console.log('new',cartpsevdo[itx]);
            templcontent = document.querySelector('#'+templid).content.cloneNode(true);
            $(templcontent).find('.fx-cart-insert-itm').attr('id',itx);
            $(templcontent).find('.fx-cart-insert-key').val(itx); // inputs
            $(templcontent).find('.fx-cart-insert-uri').attr('href',cartpsevdo[itx]['properties']['uri']); // inputs
            $(templcontent).find('.fx-cart-insert-pagetitle').text(cartpsevdo[itx]['properties']['pagetitle']); // inputs
            $(templcontent).find('.fx-cart-insert-img').attr('src',cartpsevdo[itx]['properties']['cart_img']); // inputs
            $(templcontent).find('.fx-cart-insert-count').text(cartpsevdo[itx]['count']); // inputs

            $(templcontent).find('.fx-cart-insert-color').parent().addClass('hidden');
            $(templcontent).find('.fx-cart-insert-size').parent().addClass('hidden');

            if (cartpsevdo[itx]['options']['color'] && cartpsevdo[itx]['options']['color'].length > 0) {
                tcolor = cartpsevdo[itx]['options']['color'];
                $(templcontent).find('.fx-cart-insert-color').text(tcolor); // .replace('_',' ')
                $(templcontent).find('.fx-cart-insert-color').parent().removeClass('hidden');
            }
            if (cartpsevdo[itx]['options']['size'] && cartpsevdo[itx]['options']['size'].length > 0) {
                tsize = cartpsevdo[itx]['options']['size'];
                $(templcontent).find('.fx-cart-insert-size').text(tsize); // .replace('_',' ')
                $(templcontent).find('.fx-cart-insert-size').parent().removeClass('hidden');
            }


            $('#fx-minicart-wrap-list').prepend(templcontent); // .append()

        }
        // Открытие корзины. Если нужно раскоментировать.
        //$('[data-sidebar-open-button="cartSidebar"]').trigger('click');

    }

    // триггер клика на кнопке
    $('.fx-trigger-form-order').on('click', function () {
       $('#msOrder').trigger('submit');
    });

    // minishop2

    //  счетчик кол-ва товаров.

    $('.fx-counter-min').on('click', function(){
        var tcounter = $(this).parent().find('.fx-counter-input');
        var thisval = tcounter.val()*1;
        if (tcounter.data('minval')){
            var minval = tcounter.data('minval')*1;
        } else {
            var minval = 1;
        }

        if (thisval > minval) {
            $(this).removeClass('disabled');
            tcounter.val(thisval-1);
            tcounter.trigger('change');
        } else {
            $(this).addClass('disabled');
        }
    });

    $('.fx-counter-pls').on('click', function(){
        var tcounter = $(this).parent().find('.fx-counter-input');
        var maxval = tcounter.data('maxval')*1;
        var thisval = tcounter.val()*1;
        if (thisval < maxval) {
            tcounter.val(thisval+1);
            tcounter.trigger('change');
            $(this).removeClass('disabled');
            $(this).parent().find('.fx-counter-min').removeClass('disabled');
        } else {
            miniShop2.Message.error('Минимальный заказ по этому товару ' + maxval + ' шт.');
            $(this).addClass('disabled');
        }

    });
    $('.fx-counter-input').on('change', function(){
        var maxval = $(this).data('maxval')*1;
        var thisval = $(this).val()*1;

        if ($(this).data('minval')){
            var minval = $(this).data('minval')*1;
        } else {
            var minval = 1;
        }
        if (thisval < minval) {
            $(this).val(minval).focus();
            miniShop2.Message.error('Минимальный заказ по этому товару ' + minval + ' шт.');
            //$.fancybox.open('Минимальный заказ по этому товару ' + minval + ' шт.');
        }


        if (isNaN(thisval)) {
            $(this).val(1).focus();
        }
        if (thisval > maxval) {
            $(this).val(maxval).focus();
        }
    });


    // promiki
        $('.fx-promo-exist').on('submit', function (e) {
           // miniShop2.Message.error('Сработка!');

            e.preventDefault();
            //var coup_val = $(this).find('input[name="coupon_val"]').val();
            var coup_val = $(this).find('input').val();
            //$('.js-order-cart').prepend('<div class="loading show"/>');
            var thisa = $(this);
            if (!coup_val || coup_val == '') {
                $(this).find('input').addClass('error');
            } else {
                //$('#msCart').prepend('<div class="loading show"></div>');
                $(this).find('input').removeClass('error');
                var data = {};
                data.coupon = coup_val;
                if ($(this).hasClass('good')){
                    data.action = 'cupon/reset';
                } else {
                    data.action = 'cupon/check';
                }

                $.ajax({
                    url: 'assets/custom/api.php',
                    data: data,
                    type: 'post',
                    dataType: 'json',
                    success: function(response) {
                        if (response.success) {
                            if (thisa.hasClass('good')){
                                // обнуляем
                                miniShop2.Message.info('Промокод успешно удален.');
                                console.log("Обнуляем-с");
                                thisa.removeClass('good');
                                thisa.find('input').val('');
                            } else {
                                // применяем
                                miniShop2.Message.success('Промокод успешно применен.');
                                thisa.addClass('good');
                                console.log('Применяем-с: ',response.cart_status);
                            }
                            miniShop2.Cart.status(response.cart_status);
                            cartpsevdo = response.cart;
                            for(var itx in cartpsevdo) {
                                console.log('change',cartpsevdo[itx]);
                                $('#'+cartpsevdo[itx]['key'] + ' .ms2_price_one').text(miniShop2.Utils.formatPrice(cartpsevdo[itx]['price']));
                            }

                        } else {
                            miniShop2.Message.error(response.message);
                           /* PNotify.notice(response.message, {
                                theme: 'ms2-message-error'
                            });*/
                           // $(this).find('input[name="coupon_val"]').addClass('error');
                           // $('.cart-container__code .js-promocode-error').text(response.message);
                        }
                    },
                    error: function() {
                        $(this).find('input').addClass('error');
                        /*PNotify.notice('В процессе произошла ошибка', {
                            theme: 'ms2-message-error'
                        });*/
                    },
                    complete: function() {
                        //$('.loading').remove();
                    }
                });
            }



            return false;
        })

})
//fx-modific-eve-label
