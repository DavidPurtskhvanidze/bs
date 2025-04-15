// direction vertical
// swiper-slide

const fxProductPicsSlider = new Swiper('#fxProductPicsSlider', {
    speed: 300,
    spaceBetween: 2,
    slidesPerView: 1,
    centeredSlides: true,
    direction : 'vertical', // horizontal
    el : '.fx-image-scrl',
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
            direction : 'horizontal',
        },
        // when window width is >= 767px
        992: {
            direction : 'vertical',

        },

    }
});

$(document).ready(function() {

    // СЃС‚СЂР°РЅРёС†Р° РїСЂРѕРґСѓРєС‚Р°
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


        nowcolor = $('.fx-prodmodif-name-matrix .product-color input:checked').eq(0).val();// ?? elm.val();
        nowsize = $('.fx-prodmodif-name-matrix .product-size input:checked').eq(0).val();
        console.log('N color: ',nowcolor);
        console.log('N size: ',nowsize);
        if (elm.data('type') == 'color') {
            name = elm.parent().attr('title');
            $('.fx-modific-color-name').text(name);

            $('.fx-prodmodif-name-matrix .product-size .fx-modific-eve-label').addClass('checkbox_disabled').find('input').attr('disabled', true);
            myimages = [];
            flagfind = 0;
            for (var keya in modyfdata){
                row = modyfdata[keya];
                //console.log('row3: ',row,nowcolor);
                if (row['color'] == nowcolor) {
                    if (flagfind == 0) {
                        myimages = row['images'];
                        console.log('rowРљРљ: ',row['images'],myimages);
                        flagfind = 1;
                    }
                    $('.fx-prodmodif-name-matrix .product-size input[value="'+row['size']+'"]').parents('label').removeClass('checkbox_disabled').find('input').attr('disabled', false);
                    //console.log('mod РќРђР™Р”Р•Рќ2!',row,myimages);
                }
            }
            $('.fx-prodmodif-name-matrix .product-size input:not(disabled)').eq(0).trigger('click');
            console.log('images3: ',myimages);
            if (myimages.length > 0) {
                myimages.sort((a, b) => (a.rank*1) > (b.rank*1) ? 1 : -1);
                console.log('images-sort: ',myimages);
                // images
                // Р±РµСЂРµРј РїРµСЂРІСѓСЋ С„РѕС‚РєСѓ
                $('.fx-inputimage-one').val(myimages[0]['url']);

                fxProductPicsSlider.removeAllSlides();
                for (var keyimg in myimages){
                    //console.log('img РќРђР™Р”Р•Рќ!',myimages[keyimg]);
                    templcontent = document.querySelector('#fxProductPicsSliderTemplate').content.cloneNode(true);
                    $(templcontent).find('.product-picture-full-img-link').attr('data-rank',myimages[keyimg]['rank']); // rank
                    $(templcontent).find('.product-picture-full-img-link').attr('href',myimages[keyimg]['url']); // key
                    $(templcontent).find('.product-picture__img').attr('src',myimages[keyimg]['url']); // key
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
                console.log('mod РќРђР™Р”Р•Рќ!',modyfdata[keya]);
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
    $('.fx-prodmodif-name-matrix .product-color .fx-modific-eve-label').eq(0).find('input').trigger('click');

    // РћР±СЂР°Р±РѕС‚РєР° СЃРѕР±С‹С‚РёР№ РєР°С‚Р°Р»РѕРіР°

    //  $(document).ready(function() { })
    //SET CONFIG FOR RENDER CART BEFORE MINISHOP ACTIONS
    miniShop2.Callbacks.add('Cart.add.before', '', function () {

        // Р•СЃР»Рё Сѓ РЅР°СЃ РµСЃС‚СЊ РјРѕРґРёС„РёРєР°С†РёРё РІРѕРѕР±С‰Рµ.
        if ($('.fx-prodmodif-name-matrix').length > 0){
            nowcolor = $('.fx-prodmodif-name-matrix .product-color input:checked').eq(0).val();// ?? elm.val();
            nowsize = $('.fx-prodmodif-name-matrix .product-size input:checked').eq(0).val();
            if (!nowcolor && !nowsize) {
                /*alert('РќРµ РІС‹Р±СЂР°Р»Рё РґР°РЅРЅС‹Рµ');*/
                miniShop2.Message.error('РќРµ РІС‹Р±СЂР°Р»Рё С†РІРµС‚ РёР»Рё СЂР°Р·РјРµСЂ Сѓ С‚РѕРІР°СЂР°');
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
    miniShop2.Callbacks.add('Cart.change.response.success', 'cart_cu_cha', check_ms2_action_elementx);

    //miniShop2.Callbacks.add('Cart.remove.before', '', check_ms2_action_elementx);
    //miniShop2.Callbacks.add('Cart.clean.before', '', check_ms2_action_elementx);

    function check_ms2_action_elementx(resp) {
        console.log('ADD ',resp);
        //resp.message = ''; // РѕС‡РёСЃС‚РєР° СЃС‚Р°РЅРґР°СЂС‚РЅРѕРіРѕ СѓРІРµРґРѕРјР»РµРЅРёСЏ
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
            miniShop2.Message.error('РћС€РёР±РєР° СЃРµСЂРІРµСЂР° РїСЂРё РґРѕР±Р°РІР»РµРЅРёРё С‚РѕРІР°СЂР°.');
        }

        //  С„СѓРЅРєС†РёСЏ РїРµСЂРµСЃС‡РµС‚РѕРІ РґР°РЅРЅС‹С… РїСЂРё РЅРѕРІРѕРј СЃС‚Р°С‚СѓСЃРµ РєРѕСЂР·РёРЅС‹. add chande remove.

        // fxMiniCartListItem - С€Р°Р±Р»РѕРЅ
        // fx-minicart-wrap-list -  РєРѕРЅС‚РµР№РЅРµСЂ
        // fx-cart-insert-itm - СЌР»РµРјРµРЅС‚
        $('#fx-minicart-wrap-list').html('');
        cartpsevdo = resp['data']['cart'];
        console.log('RESP',cartpsevdo);

        templid = 'fxMiniCartListItem';
        for(var itx in cartpsevdo) {
            console.log('new',cartpsevdo[itx]);
            templcontent = document.querySelector('#'+templid).content.cloneNode(true);
            $(templcontent).find('.fx-cart-insert-itm').attr('id',itx);
            $(templcontent).find('.fx-cart-insert-key').val(itx); // inputs
            $(templcontent).find('.fx-cart-insert-uri').attr('href',cartpsevdo[itx]['uri']); // inputs
            $(templcontent).find('.fx-cart-insert-pagetitle').text(cartpsevdo[itx]['pagetitle']); // inputs
            $(templcontent).find('.fx-cart-insert-img').attr('src',cartpsevdo[itx]['img']); // inputs
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
        // РћС‚РєСЂС‹С‚РёРµ РєРѕСЂР·РёРЅС‹. Р•СЃР»Рё РЅСѓР¶РЅРѕ СЂР°СЃРєРѕРјРµРЅС‚РёСЂРѕРІР°С‚СЊ.
        //$('[data-sidebar-open-button="cartSidebar"]').trigger('click');

    }

    // С‚СЂРёРіРіРµСЂ РєР»РёРєР° РЅР° РєРЅРѕРїРєРµ
    $('.fx-trigger-form-order').on('click', function () {
        $('#msOrder').trigger('submit');
    });

    // minishop2

    //  СЃС‡РµС‚С‡РёРє РєРѕР»-РІР° С‚РѕРІР°СЂРѕРІ.

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
            miniShop2.Message.error('РњРёРЅРёРјР°Р»СЊРЅС‹Р№ Р·Р°РєР°Р· РїРѕ СЌС‚РѕРјСѓ С‚РѕРІР°СЂСѓ ' + maxval + ' С€С‚.');
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
            miniShop2.Message.error('РњРёРЅРёРјР°Р»СЊРЅС‹Р№ Р·Р°РєР°Р· РїРѕ СЌС‚РѕРјСѓ С‚РѕРІР°СЂСѓ ' + minval + ' С€С‚.');
            //$.fancybox.open('РњРёРЅРёРјР°Р»СЊРЅС‹Р№ Р·Р°РєР°Р· РїРѕ СЌС‚РѕРјСѓ С‚РѕРІР°СЂСѓ ' + minval + ' С€С‚.');
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
        miniShop2.Message.error('РЎСЂР°Р±РѕС‚РєР°!');
        $(this).addClass('good');

        e.preventDefault();
        var coup_val = $(this).find('input[name="coupon_val"]').val();
        //$('.js-order-cart').prepend('<div class="loading show"/>');

        if (!coup_val || coup_val == '') {
            $(this).find('input[name="coupon_val"]').addClass('error');
        } else {
            $('#msCart').prepend('<div class="loading show"/>');
            $(this).find('input[name="coupon_val"]').removeClass('error');
            var data = {};
            data.coupon = coup_val;
            data.action = 'cupon/check';
            $.ajax({
                url: 'assets/custom/api.php',
                data: data,
                type: 'post',
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        console.log('kupon: ',response.cart_status);

                        miniShop2.Cart.status(response.cart_status);
                        //cart_refresh_one({'data' : response.cart_status});


                        if (response.cart_psevdo != '' && response.rerender) {
                            //$('.js-order-cart').html(response.cart_psevdo);
                            //$('.js-cart').html(response.cart_psevdo);

                            //merge_ordercart_products();
                            //merge_bigcart_products();
                            //merge_minicart_products();
                        }
                        console.log('kupon: ','ok');

                        // $('.js-cart-total2').text($('.js-cart-total').text());
                        //$('.cart-container__code').remove();

                        // if(window.kzt !== undefined) convertCurrency();
                        //$('.cart-container__code .js-promocode-error').text('');
                    } else {
                        /* PNotify.notice(response.message, {
                             theme: 'ms2-message-error'
                         });*/
                        // $(this).find('input[name="coupon_val"]').addClass('error');
                        // $('.cart-container__code .js-promocode-error').text(response.message);
                    }
                },
                error: function() {
                    $(this).find('input[name="coupon_val"]').addClass('error');
                    /*PNotify.notice('Р’ РїСЂРѕС†РµСЃСЃРµ РїСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°', {
                        theme: 'ms2-message-error'
                    });*/
                },
                complete: function() {
                    $('.loading').remove();
                }
            });
        }



        return false;
    })

})
//fx-modific-eve-label