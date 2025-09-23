$(document).ready(function() {
// комплекты.


/*$('.fx-text-open-close').on('click', function () {
    nowid = $(this).data('id');
   if ($(this).hasClass('open')){
       $('#' + nowid).hide(300);
       $(this).removeClass('open');
   } else {
       $('#' + nowid).show(300);
       $(this).addClass('open');

   }
});
    $('[id^="fx-text-small-box"]').hide(20);*/

    // systemsale-rules
   /* $.fancybox.open({
        src: '#systemsale-rules',
        opts: {
            clickSlide: false
        }
    });
    fx-open-modal
    */


    var flaggoodmodifik = 0;
    function getModyficPriceTovar(tov,idkey,obz,type){
        // tov - object
        myvar = eval(tov.data('varmodifyc'));
        console.log('TV: ',tov,idkey);
        console.log('MD: ',myvar);

        var pro_modsival = '';
        var pro_modcoval = '';
        var boxcolor = $('#' + idkey + ' .fx-product-color');
        var boxsize = $('#' + idkey + ' .fx-product-size');

        if (type == 'color'){
            pro_modcoval = obz.data('value');
            // проверять доступные размеры
            tov.find('.fx-product-size .input-parent').addClass('hidden');//.hide(1);
            for (var keya in myvar){
                el = myvar[keya];
                elsi = !boxsize.length ? '' : el['size'];
                elco = !boxcolor.length ? '' : el['color'];
                if (elsi != '' && elco == pro_modcoval) {
                    console.log('mod НАЙДЕН!',myvar[keya],elsi);
                    tov.find('.fx-product-size [value="'+elsi+'"]').parents('.input-parent').removeClass('hidden');
                    //tov.find('.fx-new-price').text(miniShop2.Utils.formatPrice(el['price']));
                    // tov.find('.fx-prod-count').data('price',el['price']);
                    // $('.fx-insert-func').find('.fx-new-price').text(miniShop2.Utils.formatPrice(el['price']));
                    //flagstop = 1;
                }
            }


        } else {
            //  // $('#complect-499v482 .fx-product-color')
            if (boxcolor.length) {
                ninput = boxcolor.find('input:checked');
                if (ninput.length) {
                    pro_modcoval = $(ninput).val();
                }
            }
        }
        if (type == 'size'){
            pro_modsival = obz.data('value');
        } else {

            if (boxsize.length) {
                ninput = boxsize.find('input:checked');
                if (ninput.length) {
                    pro_modsival = $(ninput).val();

                }
            }
        }

        var flagstop = 0;
        for (var keya in myvar){
            el = myvar[keya];
            elsi = !boxsize.length ? '' : el['size'];
            elco = !boxcolor.length ? '' : el['color'];
            if (elsi == pro_modsival && elco == pro_modcoval && flagstop == 0) {
                console.log('mod НАЙДЕН!',myvar[keya]);
                mprice = el['price'];
                tov.find('.fx-prod-count').data('price',mprice);

                if (tov.hasClass('has-mod-price')) {
                    mprice = el['price'] * (1 - (skidkadef/100)); // 0.8
                }
                tov.find('.fx-new-price').text(miniShop2.Utils.formatPrice(mprice));
                $('.fx-insert-func').find('.fx-new-price').text(miniShop2.Utils.formatPrice(mprice));
                flagstop = 1;
                flaggoodmodifik = 1;
            }
        }
        if (flagstop == 0){
            flaggoodmodifik = 0;
        }
    }


// 13500
// 363 - маска  // tv 229 у id15
// 362
// minishop: replaceKits  addGiftsToCart ???
// snippet??? rebuild_cart_with_all_promo

    $('.product-bottom-panel.forsingle').removeClass('show');

    $(window).scroll(function () {
        win_ww = $(window).width();
        isadd = 0;
        if ($(this).scrollTop() > 670) {
            $('body').addClass('panelfix');

            if (isadd == 0) {
                $('.product-bottom-panel.forsingle').addClass('show');
                isadd = 1;
            }
        } else {
            $('body').removeClass('panelfix');
            $('.product-bottom-panel.forsingle').removeClass('show');
            isadd = 0;
        }
    });


// Добавка к комплектам
// .fx-count-changer
// мега-замена, автоматическая, временная.
// $('.product-general > span').text('Стоимость:');

// комплекты + скидка 25% на второй и более товар. имеет 2 группы.
// события BeautySleepMinishop2
// promoPriceCount promoPriceCount    promoPriceCountEnabled
// снипеты rebuild_cart_with_all_promo  rebuild_order_with_all_promo (не используется)
// шаблоны ShopProduct (32)  ShopCertificate (55)


//$('.complect-nabor-list').hide();

    var $salemnozhitel = 0.85; // alex mnozh

    $('.fx-caption-line').on('click', function () {

        thislink = $(this).data('idopen');

        if ($(this).hasClass('open')) {
            $('.'+thislink).hide(100);
            $(this).removeClass('open');
        } else {
            $('.'+thislink).show(100);
            $(this).addClass('open');
        }

    });
    $('.fx-caption-line:not(.open)').each(function () {
        thislink = $(this).data('idopen');
        $('.'+thislink).hide(0);
    });
    //$('.fx-caption-line:not(.open)').trigger('click');

// otmechen c_button ---> lab-itm

    $('.fx-rubricator-wrapp').hide(1);
    var isopencontent = 0;

    $('.fx-rub-box-allsell').hide(300);

    $('.fx-open-boxall').on('click', function () {
        if ($('.fx-rub-box-allsell').hasClass('fix')){
            $('.fx-rub-box-allsell').removeClass('fix').hide(300);
        } else {
            $('.fx-rub-box-allsell').addClass('fix').show(300);
        }

    });


    $('.fx-open-complects').on('click', function () {
        // $('.fx-panel-macke-hide').hide(0);  // срытие панельки цены

        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.fx-rubricator-wrapp').hide(300);

            $('.product-bottom-panel').addClass('show');
            $('.forcomplects').removeClass('show');
        } else {

            if ($(".complect-78v75").length > 0 && $(".complect-79v76").length > 0){
                $(".complect-78v75").addClass('megasbor');
                $(".complect-79v76").addClass('megasbor');
            }

            $(this).addClass('open');

            $('.fx-rubricator-wrapp').show(300);

            let top = $('.fx-rubricator-wrapp').eq(0).offset().top - 140;
            $('html, body').animate({scrollTop: top}, 800);

            $('.product-bottom-panel').removeClass('show');
            $('.forcomplects').addClass('show');

            if ($('.fx-oneproduct-count').val() > 0) {
                prodnow = $(this).data('id');
                ahsize = '';
                ahcolor = '';
                var countnow = parseInt($('.fx-oneproduct-count').val());

                if ($('.fx-oneprod-size').find('[name="options[size]"]').length > 0){
                    ahsize = $('.fx-oneprod-size').find('[name="options[size]"]').val();
                    $('.fx-product-box[class*="v'+prodnow+'"] .cnl-info .cnl-variant-colors label[data-value*="'+ahsize+'"]').trigger('click');
                }
                if ($('.fx-oneprod-color').find(':checked').length > 0){
                    ahcolor = ($('.fx-oneprod-color').find(':checked').val()).toLowerCase();
                }

                console.log('ARO', prodnow,ahsize,ahcolor,countnow); // prodnow  ahcolor

               // nowobjecton = $('.fx-product-box[class*="v'+prodnow+'_"] .cnl-info .cnl-variant-colors input[value*="'+ahcolor+'"]');
                nowobjecton = $('.fx-product-box[class*="v'+prodnow+'"] .cnl-info .cnl-variant-colors label[data-value*="'+ahcolor+'"]');
                // Если вдруг ошибка с определением цвета, то ставим первый по порядку цвет.

                if (nowobjecton.length == 0) {
                    // Не найден
                    ahcolorw = ahcolor.charAt(0).toUpperCase() + ahcolor.slice(1)
                    nowobjecton = $('.fx-product-box[class*="v'+prodnow+'"] .cnl-info .cnl-variant-colors label[data-value*="'+ahcolorw+'"]');
                }
                if (nowobjecton.length == 0) {
                    // Не найден
                    nowobjecton = $('.fx-product-box[class*="v'+prodnow+'"] .cnl-info .cnl-variant-colors label').eq(0);
                }
                console.log('ARO-тест', ahcolor,nowobjecton); // prodnow  ahcolor

                nowobjecton.trigger('click');
                nowobject = nowobjecton.parents('.fx-product-box');
                //nowobject.find('.fx-product-imgs-color img').removeClass('hident');
                if (countnow > 1){
                    nowobject.find('.fx-prod-count').val(countnow-1);
                }
                nowobject.find('.fx-max').trigger('click');

            }

// START ORDER
            // изменение последовательности вывода товаров rubric_colors_variant
            var rubric_colors_variant_one = [];
            rubric_colors_variant.forEach(function (da,x) {
                //console.log('RCV i ', da['color'],ahcolor);
                if (ahcolor.indexOf(da['color']) >= 0) {
                    //console.log('НАШЕЛ!!! ', da,x);
                    rubric_colors_variant_one = da;
                } /*else {
                    ahcolorw = ahcolor.charAt(0).toUpperCase() + ahcolor.slice(1);
                    if (ahcolorw.indexOf(da['color']) >= 0) {
                        //console.log('НАШЕЛ!!! ', da,x);
                        rubric_colors_variant_one = da;
                    }
                }*/
            });
            //Array.isArray(rubric_colors_variant_one);
            //console.log('See ',Array.isArray(rubric_colors_variant_one),rubric_colors_variant_one);

            if (typeof rubric_colors_variant_one === 'object') {
                //console.log('RCV item',rubric_colors_variant_one );

                ruboall = [];
                ruboalltmp = [];
                for (var key in rubric_colors_variant_one) {
                    if (rubric_colors_variant_one.hasOwnProperty(key) && key.indexOf('ids') > 0) {

                        if (typeof rubric_colors_variant_one[key] === 'object') {
                            //ruboall = ruboall + rubric_colors_variant_one[key] + ',';
                            //console.log('ST ', rubric_colors_variant_one[key],key);
                            for (var pol in rubric_colors_variant_one[key]) {
                                //console.log('XN ',key, rubric_colors_variant_one[key][pol],pol);
                                ruboalltmp = rubric_colors_variant_one[key][pol].split('_');
                                ruboall.push(ruboalltmp);
                            }
                        } else {
                            if (rubric_colors_variant_one[key] != ''){
                                //console.log('STR ',key, rubric_colors_variant_one[key][pol],pol);
                                ruboalltmp = rubric_colors_variant_one[key].split('_');
                                ruboall.push(ruboalltmp);
                            }
                        }
                    }
                }

                //console.log('RCV ruboall:', ruboall);
                myorder = -500;
                for (var ki in ruboall) {
                    if (ruboall.hasOwnProperty(ki)) {
                        // ruboall[ki][0] - id
                        // ruboall[ki][1] - color

                        // toLowerCase()
                        ahcolort = ruboall[ki][1].toLowerCase().trim();
                        itnowitem = $('.fx-product-box[class*="v'+ruboall[ki][0]+'"] .cnl-info .cnl-variant-colors label[data-value*="'+ahcolort+'"]').eq(0);
                        //console.log('TEST ',ki, itnowitem,ahcolort,itnowitem);

                        if (itnowitem.length == 0) {
                            // Не найден
                            ahcolortw = ahcolort.charAt(0).toUpperCase() + ahcolort.slice(1);
                            //console.log('OTHER:', ahcolort,ahcolortw);
                            itnowitem = $('.fx-product-box[class*="v'+ruboall[ki][0]+'"] .cnl-info .cnl-variant-colors label[data-value*="'+ahcolortw+'"]').eq(0);
                        }
                        if (itnowitem.length == 0) {
                            // Не найден
                            itnowitem = $('.fx-product-box[class*="v'+ruboall[ki][0]+'"] .cnl-info .cnl-variant-colors label').eq(0);
                        }

                        itnowitem.trigger('click');
                        //console.log('ON ',ki, itnowitem,ahcolort);
                        myorder =myorder+2;
                        itnowitem.parents('.fx-product-box').css('order',myorder);


                    }
                }

                /*ruboall.forEach(function (de,xe) {
                    console.log('RCV item list', de,xe);
                });*/

            }



            //calculateProdComplect();
            if (isopencontent == 0){
                nowobject.addClass('fx-css-stayfirstalld').show(1);
                // fx-css-stayfirstalld
                isopencontent = 1;

                // слайдер
                var rubricslyder =[];
                $('.complect-nabor-list.slyder').each(function (z,x) {
                    console.log(z,x);
                    var contar = $(this);


                    contar.find('.cnl-item').addClass('swiper-slide');
                    contar.wrapInner('<div class="swiper-container fx-rubri-cntr"><div class="swiper-wrapper"></div></div>');
                    contar.append('<div class="swiper-button-prev swiper-button"></div>\n' +
                        '                <div class="swiper-button-next swiper-button"></div>');

                    var contarstart = $(this).find('.swiper-container');

                    rubricslyder[z] = new Swiper( this, {
                        slidesPerView: "auto",
                        el : '.fx-rubri-cntr',
                        spaceBetween: 0, // 2
                        watchSlidesVisibility: true,
                        lazy: { loadPrevNext: true },
                        on: {
                            init: function (rswiper) {
                                rswiper.params.navigation.prevEl = $(rswiper.el).parent().find('.swiper-button-prev')[0];
                                rswiper.params.navigation.nextEl = $(rswiper.el).parent().find('.swiper-button-next')[0];
                                rswiper.navigation.init();
                            }
                        },
                        breakpoints: {
                            575: {
                                slidesPerView: 2,
                            },
                            780: {
                                slidesPerView: 3,
                            },
                            1000: {
                                slidesPerView: 4,
                            }
                        }
                    });
                });


            }


        }








    });

    //$('.fx-product-imgs-color img').addClass('hident');
    //$('.fx-product-imgs-color').find('img:first-child').removeClass('hident');
// клик по цвету манипуляции с complect-
    $('.fx-product-color .lab-itm').on('click', function () {
        //alert('цвет');
        nowname = $(this).data('color');
       // nowpricecolor = $(this).data('colorprice'); // цена от цвета
       // $(this).parents('.fx-product-box').find('.fx-new-price').text(miniShop2.Utils.formatPrice(nowpricecolor));
        //$(this).parents('.fx-product-box').find('.fx-old-price').text(miniShop2.Utils.formatPrice(nowpricecolor));
       // $(this).parents('.fx-product-box').find('.fx-prod-count').data('price',nowpricecolor);
        mytovwrap = $(this).parents('.fx-product-box');
        mytovwrap.find('.cnl-color').text($(this).data('value'));
        mytovwrap.find('.fx-product-imgs-color img').addClass('hident');
        mytovwrap.find('.fx-product-imgs-color [data-color="'+nowname+'"]').removeClass('hident');
        console.log('nowname ', nowname);
        if ($(this).parents('.fx-product-box').find('.fx-product-imgs-color img:not(.hident)').length == 0){
            $(this).parents('.fx-product-box').find('.fx-product-imgs-color img').eq(0).removeClass('hident');
        }

        idkey = $(this).parents('.fx-product-box').attr('id'); // complect-

        getModyficPriceTovar(mytovwrap,idkey,$(this),'color');

        pro_modyfic = '';
        ninput = $(this).prev();
        if (ninput) {
            pro_modval = ninput.val();
            pro_modname = ninput.attr('name').split('_')[1];
            pro_modyfic = pro_modyfic + pro_modval;
        }
        var boxsize = $('#' + idkey + ' .fx-product-size'); //label.active
        if (boxsize.length) {
            ninput = boxsize.find('input:checked');
            //ninput.addClass('AUSHTEYN');
            if (ninput.length) {
                pro_modval = $(ninput).val();
                pro_modname = $(ninput).attr('name').split('_')[1];
                pro_modyfic = pro_modyfic + pro_modval;
            }
        }
        pro_modyfic = idkey + pro_modyfic;
        var nowcount = 0;
        complectCart.forEach(function (oba, iho) {
            //console.log('OBA klik', oba, iho, oba.modyfic, pro_modyfic);
            if (oba.modyfic == pro_modyfic) {
                nowcount = oba.count;
            }
        });
        $('#' + idkey + " .fx-prod-count").val(nowcount);

        $(this).parents('.fx-product-color').find('.lab-itm').removeClass('active');
        $(this).addClass('active');

    });


// клик по РАЗМЕРУ
    $('.fx-product-size .lab-itm-btn').on('click', function () {
        //alert('Размер');
        pro_modyfic = '';
        idkey = $(this).parents('.fx-product-box').attr('id'); // complect-

        var boxsize = $('#' + idkey + ' .fx-product-color'); //label.active
        if (boxsize.length) {
            ninput = boxsize.find('input:checked');

            if (ninput.length > 0) {
                pro_modval = $(ninput).val();
                pro_modname = $(ninput).attr('name').split('_')[1];
                pro_modyfic = pro_modyfic + pro_modval;
            }
        }
        ninput = $(this).prev();
        if (ninput) {
            pro_modval = ninput.val();
            pro_modname = ninput.attr('name').split('_')[1];
            pro_modyfic = pro_modyfic + pro_modval;
        }
        pro_modyfic = idkey + pro_modyfic;
        var nowcount = 0;

        complectCart.forEach(function (oba, iho) {
            console.log('OBA RAZZ', oba, iho, oba.modyfic, pro_modyfic);
            if (oba.modyfic == pro_modyfic) {
                nowcount = oba.count;
            }
        });
        $('#' + idkey + " .fx-prod-count").val(nowcount);

        $(this).parents('.fx-product-size').find('.lab-itm-btn').removeClass('active');
        $(this).addClass('active');

    });

    /*  if (cart_promolast_order){
          var globalcounter = cart_promolast_order ? cart_promolast_order : 1;
      } else {

      }*/
    var globalcounter = 1;
    var complectCart = [];
//плюс минус
    $('.fx-min').on('click', function () {
        $(this).parents('.fx-product-box').removeClass('selected');

        if ($(this).parents('.fx-product-box').find('.fx-product-color').length) {
            var tikcol = $(this).parents('.fx-product-box').find('.fx-product-color input:checked');
            if (!tikcol.length) {
                $.jGrowl('Вы не указали цвет.',{theme: 'ms2-message-error'}); //ms2-message-error  af-message-success
                return false;
            }
        }
        if ($(this).parents('.fx-product-box').find('.fx-product-size').length) {
            var tikcol = $(this).parents('.fx-product-box').find('.fx-product-size input:checked');
            if (!tikcol.length) {
                $.jGrowl('Вы не указали размер.',{theme: 'af-message-error'})

                return false;
            }
        }

        var tcounter = $(this).parent().find('.fx-prod-count'); // .prod-number-count
        var thisval = parseInt(tcounter.val());
        if (tcounter.data('minval')) {
            var minval = parseInt(tcounter.data('minval'));
        } else {
            var minval = 0;
        }
        if (thisval > minval) {
            $(this).removeClass('disabled');

            tcounter.val(thisval - 1);
            tcounter.trigger('change');

            keyid = $(this).parents('.fx-product-box').attr('id');
            ComplectsItemChange(keyid, 'minus');
        } else {
            $(this).addClass('disabled');
        }
        console.log('NULL', globalcounter, tcounter.data('globalcounter'));
        if (tcounter.val() == 0) {
            console.log('NULL Set');
            tcounter.data('globalcounter', '0');


            if ($(this).parents('.fx-product-box').find('.fx-product-color').length) {
                var tikcol = $(this).parents('.fx-product-box').find('.fx-product-color input:checked');
                if (!tikcol.length) {
                    return false;
                }
                tikcol.removeClass('thisadd');
            }
            if ($(this).parents('.fx-product-box').find('.fx-product-size').length) {
                var tikcol = $(this).parents('.fx-product-box').find('.fx-product-size input:checked');
                if (!tikcol.length) {
                    return false;
                }
                tikcol.removeClass('thisadd');
            }
        }

        calculateProdComplect(this);
    });

    $('.fx-max').on('click', function () {

        if ($(this).parents('.fx-product-box').find('.fx-product-color').length) {
            var tikcol = $(this).parents('.fx-product-box').find('.fx-product-color input:checked');
            if (!tikcol.length) {
                $.jGrowl('Вы не указали цвет.',{theme: 'af-message-error'})
                return false;
            }
            tikcol.addClass('thisadd');
        }
        if ($(this).parents('.fx-product-box').find('.fx-product-size').length) {
            var tikcol = $(this).parents('.fx-product-box').find('.fx-product-size input:checked');
            if (!tikcol.length) {
                $.jGrowl('Вы не указали размер.',{theme: 'af-message-error'})

                return false;
            }
            tikcol.addClass('thisadd');
        }

        // обычный вариант
        var tcounter = $(this).parent().find('.fx-prod-count');
        var maxval = parseInt(tcounter.data('maxval'));
        var thisval = parseInt(tcounter.val());
        //console.log('PLUS',maxval,thisval);
        if (thisval < maxval) {

            if (tcounter.data('globalcounter') == 0) {
                tcounter.data('globalcounter', ++globalcounter);
            }
            //console.log('NEW add ',thisval+1);
            tcounter.val(thisval + 1);
            tcounter.trigger('change');
            $(this).removeClass('disabled');
            $(this).parent().find('.fx-min').removeClass('disabled');

            keyid = $(this).parents('.fx-product-box').attr('id');
            ComplectsItemChange(keyid, 'plus');


        } else {
            $(this).addClass('disabled');
        }

        calculateProdComplect(this);
    });

    function ComplectsItemChange(idkey) {
        console.log('[ComplectsItemChange]', idkey);

        x = '#' + idkey + " .fx-prod-count"; // complect-
        pro_keyid = idkey;
        pro_id = $(x).data('id');
        pro_type = $(x).data('type');
        pro_cena = $(x).data('price') * 1;
        pro_count = $(x).val() * 1;
        pro_raz = $(x).data('razdel');
        pro_gtovidx = $(x).data('grouptovsidx');
        pro_modif = [];
        pro_order = globalcounter; // сортировка последовательности добавления
        pro_modyfic = "";
        //pro_order = $(x).data('globalcounter'); // сортировка последовательности добавления

        var boxcolor = $('#' + idkey + ' .fx-product-color'); //label.active
        if (boxcolor.length) {
            ninput = boxcolor.find('input:checked');
            pro_modval = $(ninput).val();
            //pro_modcapt = pro_modval.split('=')[0]; // может и не нужный элемент
            pro_modname = $(ninput).attr('name').split('_')[1];
            qwe = pro_modname.replace('options[', '').replace(']', '');
            pro_modif.push({'name': qwe, 'val': pro_modval});
            pro_modyfic = pro_modyfic + pro_modval;
        }
        var boxsize = $('#' + idkey + ' .fx-product-size'); //label.active
        if (boxsize.length) {
            ninput = boxsize.find('input:checked');
            pro_modval = $(ninput).val();
            //pro_modcapt = pro_modval.split('=')[0]; // может и не нужный элемент
            pro_modname = $(ninput).attr('name').split('_')[1];
            qwe = pro_modname.replace('options[', '').replace(']', '');
            pro_modif.push({'name': qwe, 'val': pro_modval});
            pro_modyfic = pro_modyfic + pro_modval;
        }
        pro_modyfic = pro_keyid + pro_modyfic;

        console.log('[ComplectsItemChange] EACH', complectCart);
        dx = -1;
        for (var i = 0; i < complectCart.length; i++) {
            if (complectCart[i]['modyfic'] == pro_modyfic) {
                dx = i;
                break;
            }
        }

        if (dx == -1) {
            // добавляем новое
            complectCart.push({
                "id": pro_id, "razdel": pro_raz, "type": pro_type, "cena": pro_cena,
                "count": pro_count, "modif": pro_modif,
                "order": pro_order,
                "targetid": pro_keyid,
                "modyfic": pro_modyfic,
                "gtovidx": pro_gtovidx
            });
        } else {
            // модифицируем
            complectCart[dx]['count'] = pro_count;
            if (complectCart[dx]['count'] == 0) {
                // remove
                complectCart[dx] = undefined;
                complectCart = complectCart.filter(function (el) {
                    return el != undefined;
                });
            }
        }

        console.log('NEW co: ', complectCart);
        return;
    }


//
    var totals_types = [];
    var array_complect = [];
    $('.fx-product-box .priceold').hide();
    $('.fx-product-box .fx-precents').hide();

// основа
    var firstcategory = -1;

    function calculateProdComplect(clc) {

        array_complect = [];
        var all_count = 0;
        var all_cost = 0;
        var all_part = [];
        console.log('pre start2', array_complect);
        // проверка на пустоту.
        var xtest = 0;
        /*$('.fx-prod-count').each(function (e,x) {
            if($(x).val()*1 > 0){
                xtest++;
            }
        });
        if (xtest == 0){
            $('.fx-price-all').text(0);
            $('.fx-prodall-counter').text(0);
            $('.fx-product-box').removeClass('selected');
            return false;
        }*/
// paremini

 // подсчитываем  по типам
        var totals_counts =[];
        complectCart.forEach(function (oba, iho) {
            console.log('OBA add', oba, iho);
            pro_type = oba.type;
            if (!array_complect[pro_type]) {
                array_complect[pro_type] = [];
            }
            if (!all_part[pro_type]) {
                all_part[pro_type] = 0;
            }
            array_complect[pro_type].push(oba);

            all_part[pro_type] = all_part[pro_type] + oba.count; // раздельный подсчет по типам.
            all_count = all_count + oba.count;
            all_cost = all_cost + (oba.cena * oba.count);

            $('#' + oba.targetid).addClass('selected');

            totals_counts[oba.gtovidx] = totals_counts[oba.gtovidx] ? totals_counts[oba.gtovidx] + oba.count : oba.count;


        });
        // ПОле ВЫБРАННО для каждой категории
        // group_tovs_idx grouptovsidx   gtovidx
        totals_counts.forEach(function (obj, ic) {
            $('.fx-summ-' + ic).text(totals_counts[ic]);
        });
        // код для: показывать плашку "Добавьте еще чтобы увидеть скидки" без учета одежды, тк ее временно отключили.

        if (all_count == 1 && totals_counts[1] == 1){
            $('.fx-rub-capt-event').show();
        } else if (all_count == 0) {
            $('.fx-rub-capt-event').show();
        } else if (all_count == 2 && totals_counts[1] == 1) {
            $('.fx-rub-capt-event').hide();
        } else if (all_count == 1 && totals_counts[5]) {
            $('.fx-rub-capt-event').show();
            $('.fx-summ-5').parents('.fx-caption-line').next('.compl-mini-descr-inlist').find('.fx-rub-capt-event').hide();
        } else if (all_count == 1 && totals_counts[2]) {
            $('.fx-rub-capt-event').show();
            $('.fx-summ-2').parents('.fx-caption-line').next('.compl-mini-descr-inlist').find('.fx-rub-capt-event').hide();
        } else if (all_count == 2 && totals_counts[2] && totals_counts[5]) {
            $('.fx-rub-capt-event').hide();
            $('.fx-summ-1').parents('.fx-caption-line').next('.compl-mini-descr-inlist').find('.fx-rub-capt-event').show();
        } else {
            $('.fx-rub-capt-event').hide();
        }

        console.log('Tsl',all_count,totals_counts, all_count <= 1, totals_counts[1] <= 1);


        $('.fx-prodall-counter').text(all_count);
        $('.fx-priceold-all').text(miniShop2.Utils.formatPrice(all_cost));

        $('.fx-prod-count').parents('.fx-product-box').find('.priceold').hide(0);
        $('.fx-prod-count').parents('.fx-product-box').find('.fx-precents').hide(0);

        $('.fx-prod-count').each(function (e, x) {
            icost = $(x).data('price');
            $(x).parents('.fx-product-box').find('.fx-new-price').text(miniShop2.Utils.formatPrice(icost))
        });

        //console.log('data',all_count,all_cost)
        // тут ajax и отправка данных. Проверяем.

        if (all_count == 0) { // если у нас 0 в рубрикаторе, не отправляем запрос. но надо. )
            $('.fx-add-allto-cart').addClass('disable');

            $('.fx-price-all').text(0); // убнуляем
            $('.fx-prodall-counter').text(0); // убнуляем
            $('.fx-complect-block-total').text(0); // убнуляем
            $('#fx-prods-complects-list').text('');

            totals_types = [];
            array_complect = [];
            complectCart = [];

            var new_price_total = 0;
            var first_tov_price_new = [];
            var totals_counts = [];

            $('.fx-product-box').find('.priceold').hide(0);
            $('.fx-product-box').find('.fx-precents').hide(0);
            $('.fx-product-box').removeClass('selected');
            $('.thisadd').removeClass('thisadd');
            $('.fx-prod-count').val(0);
            //return false;
        }
        $('.fx-add-allto-cart').removeClass('disable');


        var formik = {};
        var new_price_total = 0; //
        var new_price_cart_total = 0; //
        var outi = '';
        formik['ms2_action'] = 'cart/items/recalc';
        formik['ctx'] = 'web';
        formik['tovars'] = JSON.stringify(array_complect);
        //console.log('ajax go', formik['tovars']);
        $.ajax({
            type: "POST",
            url: 'assets/custom/api.php',
            data: formik,
            dataType: "json",
            success: function (data) {
                console.log('ajax good', data);
                if (data.error == 0) {

                    if (data.tovs == null){return false;}

                    var qwe = Object.keys(data.tovs).map(function(key) {
                        return data.tovs[key];
                    });


                    var tovs_chek_sale = Object.keys(data.showsale).map(function(key) {
                        return data.showsale[key];
                    });
                    var first_tov_price_new = [];
                    var price_all = [];
                    var coun_all = [];
                    var allselected = [];
                    var minpriceshow = 999999;
                    var maxpriceshow = 0;
                    var tmp_tovs_cart = 0;
                    var tmp_tovs_rubric = 0;
                    console.log('[ tovs_chek_sale ]', tovs_chek_sale);
                    qwe.forEach(function (obj, inx) {
                        console.log('[ obj ]', obj,inx);

                        if (!obj.targetid) {
                            console.log('YPS ',obj);
                            tmp_tovs_cart = 1; // флаг наличия товаров в корзине

                            new_price_cart_total = new_price_cart_total+(obj.price*obj.count);

                        } else {
                            tmp_tovs_rubric = 1; // флаг наличия товаров в рубрикаторе

                            //allselected.push([obj.targetid,obj.modyfic,obj.options]);
                            if (!allselected[obj.modyfic]) {
                                allselected[obj.modyfic] = [];
                                allselected[obj.modyfic]['cost'] = obj.cost*1;
                                allselected[obj.modyfic]['count'] = obj.count*1;
                                allselected[obj.modyfic]['base_price'] = obj.base_price;
                                //allselected[obj.modyfic]['targetid'] = obj.targetid;
                            } else {
                                allselected[obj.modyfic]['cost'] = allselected[obj.modyfic]['cost'] + (obj.cost*1);
                                allselected[obj.modyfic]['count'] = allselected[obj.modyfic]['count'] + (obj.count*1);
                                allselected[obj.modyfic]['base_price'] = obj.base_price;
                            }


                            if (obj.second == '') {
                                first_tov_price_new[obj.id] = obj.price;
                            }

                            if (!coun_all[obj.id]) {
                                price_all[obj.id] = 0;
                                coun_all[obj.id] = 0;
                            }
                            minpriceshow = minpriceshow >= obj.base_price ? obj.base_price : minpriceshow;
                            maxpriceshow = maxpriceshow <= obj.base_price ? obj.base_price : maxpriceshow;
                            new_price_total = new_price_total+(obj.price*obj.count);
                            coun_all[obj.id] = coun_all[obj.id] + obj.count;
                            price_all[obj.id] =  price_all[obj.id] + (obj.price*obj.count);


                        }

                    });

                    //new_price_total = new_price_total -new_price_cart_total;

                    if (tmp_tovs_cart == 1 && tmp_tovs_rubric == 1) {
                        maxpriceshow = rubric_maxipriceforall;
                    }

                    // проверяем условия по отображению корзина-руьрикатор
                    //if (data.info == 4516) {};
                        if (tmp_tovs_cart == 1 && tmp_tovs_rubric ==0) {

                            $('.fx-add-allto-cart').addClass('disable');

                            $('.complect-nabor-list:not(.complect-views-all) input[data-type="1"]').each(function (ei, xi) {
                                // first_tov_price_new
                                pro_id = $(xi).data('id');
                                icost = $(xi).data('price');
                                irazdel = $(xi).data('razdel');
                                console.log('INFO1 ',tovs_chek_sale.indexOf(irazdel));

                                if (tovs_chek_sale.indexOf(irazdel) >= 0){
                                    // $(x).parents('.fx-product-box').find('.priceold').addClass('SECOND2');
                                    // есть скидка. отображаем скидку
                                    // icostx = $(x).data('price') * $salemnozhitel; // alex mnozh
                                    // $(x).parents('.fx-product-box').find('.priceold').show(0);
                                    icostx = $(xi).data('price');
                                    console.log('INFO2 ',icostx);
                                    if ($(xi).data('price') <= data.maxprice) {
                                        icostx = $(xi).data('price') * $salemnozhitel; // alex mnozh
                                        $(xi).parents('.fx-product-box').find('.priceold').show(0);
                                        $(xi).parents('.fx-product-box').find('.fx-precents').show(0);
                                    }

                                } else {

                                    // $(x).parents('.fx-product-box').find('.priceold').addClass('SECOND3');
                                    // нет скидки. скрываем старую
                                    icostx = $(xi).data('price');
                                    console.log('INFO3 ',icostx);
                                    $(xi).parents('.fx-product-box').find('.priceold').hide(0);
                                    $(xi).parents('.fx-product-box').find('.fx-precents').hide(0);
                                }

                                $(xi).parents('.fx-product-box').find('.fx-new-price').text(miniShop2.Utils.formatPrice(Math.round(icostx)));
                                $(xi).parents('.fx-product-box').find('.fx-old-price').text(miniShop2.Utils.formatPrice(icost));

                            });


                            return false;
                        }




                    //console.log('SELERO ',tovs_chek_sale,allselected);
                    //console.log('MIN RICE ',minpriceshow,maxpriceshow);

                    //console.log('FIR ',price_all,coun_all);
                    totals_types = [ , '1'];
                    // уже посчитано все. По типам модифицируемся. Показываем что-то скрываем.
                    totals_types.forEach(function (obj, ic) {

                        if (totals_types[ic] > 0) {
                            $('input[data-type="' + ic + '"]').parents('.fx-product-box').find('.priceold').hide(0);
                            $('input[data-type="' + ic + '"]').parents('.fx-product-box').find('.fx-precents').hide(0);

                            // complect-nabor-list:not(.complect-views-all)
                            $('.complect-nabor-list:not(.complect-views-all) input[data-type="' + ic + '"]').each(function (e, x) {
                                // first_tov_price_new
                                pro_id = $(x).data('id');
                                icost = $(x).data('price');
                                var irazdel = $(x).data('razdel');

                                xmnozhka = 1;
                                xmnozhka = $salemnozhitel; // alex mnozh
                                //console.log('ajax ontypes_',e,x,first_tov_price_new, first_tov_price_new[pro_id],price_all,price_all[pro_id]);
                                //console.log('ajax ontypes_',allselected);

                                // есть другой товар - показываем скидки всем.
                                //$(x).parents('.fx-product-box').find('.priceold').show(0);



                                //console.log('_first_tov_price_new', first_tov_price_new);
                                if (first_tov_price_new[pro_id] > 0) {
                                    // Если товар перебираемый имеет id = с добавленным id.
                                    var thiselmt = 0;
                                    var objmodyfic = '';
                                    //console.log('ЕСТЬ ГЛАВНЫЙ', first_tov_price_new);
                                    qwe.forEach(function (oba,ica) {
                                        //console.log('allselected11', oba,ica);
                                        if ($(x).parents('.fx-product-box').hasClass(oba.targetid)){
                                            thiselmt = 1;
                                            objmodyfic = oba.modyfic;
                                        }
                                    })
                                    if (thiselmt == 1) {
                                        // Модификация именно этого товара.
                                        // allselected[objmodyfic]['cost']/allselected[objmodyfic]['count'];

                                        //icostx = price_all[pro_id]/coun_all[pro_id]; //first_tov_price_new[pro_id];
                                        icostx = allselected[objmodyfic]['cost']/allselected[objmodyfic]['count'];

                                       // $(x).parents('.fx-product-box').find('.priceold').addClass('FIRSTT'); // log

                                        if (icostx <= $(x).data('price')) {
                                            //if (allselected[objmodyfic]['count'] >= 1) {
                                            //    console.log('[ selecteD ]', allselected[objmodyfic]);
                                            //    icostx = allselected[objmodyfic]['base_price'] * $salemnozhitel; // alex mnozh
                                            //}
                                            //icostx = icostx * $salemnozhitel; // alex mnozh
                                         //   $(x).parents('.fx-product-box').find('.priceold').addClass('FIRSTT3');


                                           if (irazdel == 31) {
                                                como = 2;
                                            } else {
                                                como = 1;
                                            }


                                           /* como = 2;
                                            tmptovs_chek_sale = '31';
                                            if (tovs_chek_sale.indexOf(irazdel) >= 0){
                                                como = 1;
                                            }*/


                                            // if (tmp_tovs_cart == 1 && tmp_tovs_rubric == 1) {
                                             //}
                                            if (allselected[objmodyfic]['count'] >= como) {
                                                icostx = allselected[objmodyfic]['base_price'] * $salemnozhitel; // alex mnozh
                                                $(x).parents('.fx-product-box').find('.priceold').show(0);
                                                $(x).parents('.fx-product-box').find('.fx-precents').show(0);
                                            }

                                            /*if (allselected[objmodyfic]['count'] == 1) {
                                                icostx = icostx * $salemnozhitel; // alex mnozh
                                            }*/

                                        } else {
                                           // $(x).parents('.fx-product-box').find('.priceold').addClass('FIRSTT4');
                                            $(x).parents('.fx-product-box').find('.priceold').hide(0);
                                            $(x).parents('.fx-product-box').find('.fx-precents').hide(0);
                                        }


                                       // if ($(x).val() < 2) {
                                            //$(x).parents('.fx-product-box').find('.priceold').hide(0);
                                       // }
                                    } else {
                                        // если товар id тот но модификация другая.
                                        // берем его реальную цену
                                       // $(x).parents('.fx-product-box').find('.priceold').addClass('SECOND');
                                        if (tovs_chek_sale.indexOf(irazdel) >= 0){
                                           // $(x).parents('.fx-product-box').find('.priceold').addClass('SECOND2');
                                            // есть скидка. отображаем скидку
                                           // icostx = $(x).data('price') * $salemnozhitel; // alex mnozh
                                           // $(x).parents('.fx-product-box').find('.priceold').show(0);
                                            icostx = $(x).data('price');
                                            if ($(x).data('price') <= maxpriceshow) {
                                                icostx = $(x).data('price') * $salemnozhitel; // alex mnozh
                                                $(x).parents('.fx-product-box').find('.priceold').show(0);
                                                $(x).parents('.fx-product-box').find('.fx-precents').show(0);
                                            }

                                        } else {
                                           // $(x).parents('.fx-product-box').find('.priceold').addClass('SECOND3');
                                            // нет скидки. скрываем старую
                                            icostx = $(x).data('price');
                                            $(x).parents('.fx-product-box').find('.priceold').hide(0);
                                            $(x).parents('.fx-product-box').find('.fx-precents').hide(0);
                                        }


                                    }

                                } else {
                                    // Если товар перебираемый отличный от добавленного:

                                    if (tovs_chek_sale.indexOf(irazdel) >= 0){
                                        // есть скидка. отображаем скидку
                                        icostx = $(x).data('price');
                                        //$(x).parents('.fx-product-box').find('.priceold').hide(0);
                                        if ($(x).data('price') <= maxpriceshow) {
                                            icostx = $(x).data('price') * $salemnozhitel; // alex mnozh
                                            $(x).parents('.fx-product-box').find('.priceold').show(0);
                                            $(x).parents('.fx-product-box').find('.fx-precents').show(0);
                                        }

                                    } else {
                                        // нет скидки. скрываем старую
                                        icostx = $(x).data('price');
                                        $(x).parents('.fx-product-box').find('.priceold').hide(0);
                                        $(x).parents('.fx-product-box').find('.fx-precents').hide(0);
                                    }

                                    //icostx = $(x).data('price') * xmnozhka;
                                }


                                //maxpriceshow



                                /*if ($(x).data('price') <= maxpriceshow) {
                                    icostx = $(x).data('price') * $salemnozhitel; // alex mnozh

                                    if (icostx < $(x).data('price')) {
                                        $(x).parents('.fx-product-box').find('.priceold').show(0);
                                    } else {
                                        $(x).parents('.fx-product-box').find('.priceold').hide(0);
                                    }

                                    //$(x).parents('.fx-product-box').find('.priceold').show(0);
                                } else {
                                    icostx = $(x).data('price');
                                    if (icostx < $(x).data('price')) {
                                        $(x).parents('.fx-product-box').find('.priceold').show(0);
                                    } else {
                                        $(x).parents('.fx-product-box').find('.priceold').hide(0);
                                    }
                                    //$(x).parents('.fx-product-box').find('.priceold').hide(0);
                                }*/

                                $(x).parents('.fx-product-box').find('.fx-new-price').text(miniShop2.Utils.formatPrice(Math.round(icostx)));
                               // $(x).parents('.fx-product-box').find('.fx-new-price').text(Math.round(icostx)+1);
                                $(x).parents('.fx-product-box').find('.fx-old-price').text(miniShop2.Utils.formatPrice(icost));


                            });
                        }
                    });


                    console.log('all',all_count,all_cost,new_price_total);
                    if (all_cost == new_price_total) {
                        $('.my-old-price').addClass('hidden');
                    } else {
                        $('.my-old-price').removeClass('hidden');
                    }
                    $('.fx-price-all').text(miniShop2.Utils.formatPrice(new_price_total)); // новая цена

// добавление в область вы выбрали
                    console.log('selel ',allselected);

                    $('#fx-prods-complects-list').text(''); // чистим

                    qwe.forEach(function (obj, inx) {
                        //([obj.targetid,obj.modyfic,obj.options]);
                        if (!obj.targetid){return;}
                        console.log('OOO ', obj, inx, obj.options.color);
                        stroka = '';
                        if (obj.options.color)
                            //stroka = 'Цвет: ' + obj.options.color;
                            stroka = '' + obj.options.color;
                        if (obj.options.size) {
                            if (obj.options.color) stroka = stroka + '<br>';
                            stroka = stroka + 'Размер: ' + obj.options.size;
                        }

                        var stoplonger = 0;
                        $('#fx-prods-complects-list .fx-product-box').each(function () {
                            if ($(this).data('modyfic') == obj.modyfic) {
                                stoplonger++;
                            }
                        });

                        if (stoplonger > 0) {
                            return;
                        }

                         /*if (.hasClass('.cnl-item')){
                             $('#fx-prods-complects-list [data-modyfic="'+obj.modyfic+'"].fx-product-box').addClass('HUGOOO');
                             return;
                         }*/




                        nuro = $('#' + obj.targetid).clone();
                        nuro.attr('id','');
                        nuro.attr('style','');
                        nuro.find('.cnl-colors').remove();
                        nuro.find('.fx-product-color').remove();
                        //nuro.find('.cnl-info-head').after('<div class="cnl-colors">'+stroka+'</div>');
                        nuro.find('.cnl-info-head .cnl-title .cnl-color').html(stroka);


                        nuro.find('.fx-prod-count').data('havecolor',obj.options.color);
                        nuro.find('.fx-prod-count').data('havesize',obj.options.size);
                        nuro.find('.fx-min').addClass('fx-have-min').removeClass('fx-min');
                        nuro.find('.fx-max').addClass('fx-have-max').removeClass('fx-max');
                        // obj.modyfic

                        // фотки
                        kolvo = nuro.find('.fx-product-imgs-color img').length;
                        nuro.find('.fx-product-imgs-color img').addClass('hident');
                        nuro.find('.fx-product-imgs-color img[data-colorname="'+obj.options.color+'"]').removeClass('hident');
                        if (kolvo == 1) {
                            nuro.find('.fx-product-imgs-color img').removeClass('hident');
                        }
                        // цена и кол-во
                        nuro.find('.fx-prod-count').val(allselected[obj.modyfic]['count']);
                        prodprice = allselected[obj.modyfic]['cost']/allselected[obj.modyfic]['count'];
                        nuro.find('.fx-new-price').text(miniShop2.Utils.formatPrice(prodprice));

                        //console.log('SRAVNN ', prodprice, obj.price, obj.base_price, obj.modyfic,obj.price < obj.base_price);
                       /* setTimeout( function () {
                            if (prodprice < obj.base_price){
                                console.log('SRAVNN SHOW ' );
                                nuro.find('.priceold').show(0);
                                nuro.find('.fx-precents').show(0);
                            } else {
                                console.log('SRAVNN HIDE ' );
                                nuro.find('.priceold').hide(0);
                                nuro.find('.fx-precents').hide(0);
                            }

                        },50);*/
                        //if (obj.price < obj.base_price){
                        /*if (prodprice < obj.base_price){
                            console.log('SRAVNN SHOW ' );
                            nuro.find('.priceold').show(0);
                            nuro.find('.fx-precents').show(0);
                        } else {
                            console.log('SRAVNN HIDE ' );
                            nuro.find('.priceold').addClass('ALEX').hide(1);
                            nuro.find('.fx-precents').addClass('FELIX').hide(1);
                        }*/

                        nuro.appendTo('#fx-prods-complects-list');
                        nuro.data('modyfic',obj.modyfic);

                        nuro.on('click', '.fx-have-max', function (e) {
                            //console.log('END ',obj,e);
                            qcolor = $(this).parent('.fx-count-changer').find('.fx-prod-count').data('havecolor');
                            qsize = $(this).parent('.fx-count-changer').find('.fx-prod-count').data('havesize');
                            $('#'+obj.targetid).find('[data-value="'+qcolor+'"].lab-itm').trigger('click');
                            $('#'+obj.targetid).find('[data-value="'+qsize+'"].lab-itm-btn').trigger('click');
                            $('#'+obj.targetid).find('.fx-max').trigger('click');
                        });

                        nuro.on('click', '.fx-have-min', function (e) {
                            //console.log('END ',obj,e);
                            qcolor = $(this).parent('.fx-count-changer').find('.fx-prod-count').data('havecolor');
                            qsize = $(this).parent('.fx-count-changer').find('.fx-prod-count').data('havesize');
                            $('#'+obj.targetid).find('[data-value="'+qcolor+'"].lab-itm').trigger('click');
                            $('#'+obj.targetid).find('[data-value="'+qsize+'"].lab-itm-btn').trigger('click');
                            $('#'+obj.targetid).find('.fx-min').trigger('click');
                        });

                    });
                    // Дублируем цикл, ибо так работает стабильно.
                     qwe.forEach(function (obj, inx) {
                         //console.log('REDY: ',obj, inx);
                         kvaka = $('.complect-nabor-list.complect-views-all .fx-product-box.'+obj.targetid);
                         //console.log('DDDDD ',  obj.price, obj.base_price, obj.modyfic,obj.price < obj.base_price);
                         if (obj.price < obj.base_price){
                             //console.log('SRAVNN SHOW ' );
                             kvaka.find('.priceold').show(0);
                             kvaka.find('.fx-precents').show(0);
                         } else {
                             //console.log('SRAVNN HIDE ' );
                             kvaka.find('.priceold').hide(0);
                             kvaka.find('.fx-precents').hide(0);
                         }
                     });

                    console.log('END ');
    /*nuro = $(this).parents('.fx-product-box').clone();
    nuro.attr('id','');
    nuro.appendTo('#fx-prods-complects-list');*/

                    //


                    // Для выбранных эл-ов.

                    var contary = $('#fx-prods-complects-list');
                    contary.find('.cnl-item').addClass('swiper-slide');
                    contary.wrapInner('<div class="swiper-container fx-rubriko-cntr"><div class="swiper-wrapper"></div></div>');
                    contary.append('<div class="swiper-button-prev swiper-button"></div>\n' +
                        '                <div class="swiper-button-next swiper-button"></div>');

                    rubricslyder22 = new Swiper( this, {
                        slidesPerView: "auto",
                        el : '.fx-rubriko-cntr',
                        spaceBetween: 19,
                        watchSlidesVisibility: true,
                        lazy: { loadPrevNext: true },
                        on: {
                            init: function (rswiper) {
                                rswiper.params.navigation.prevEl = $(rswiper.el).parent().find('.swiper-button-prev')[0];
                                rswiper.params.navigation.nextEl = $(rswiper.el).parent().find('.swiper-button-next')[0];
                                rswiper.navigation.init();
                            }
                        },
                        breakpoints: {
                            440: {
                              //  slidesPerView: 1,
                                spaceBetween: 15,
                            },
                            575: {
                              //  slidesPerView: 2,
                                spaceBetween: 12,
                            },
                            780: {
                               // slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            1000: {
                                //slidesPerView: 3,
                            }
                        }
                    });


                    //








                } else {
                    alert(data.msg);
                }
            }
        });

    }


// Добавляем товары рубрикатора в корзину
    $('.fx-add-allto-cart').on('click', function () {

        if( $(this).hasClass('disable')){return false;}

        $(this).addClass('disable');

        if ($('.fx-prodall-counter').text() == '0') {
            $.jGrowl('Вы не указали количество в комплектах.',{theme: 'af-message-error'})

            let top = $('.fx-rubricator-wrapp').eq(0).offset().top - 140;
            $('html, body').animate({scrollTop: top}, 800);

            //$('.fx-open-complects').trigger('click');

        } else {
            /*PNotify.notice({
                title : 'Добавлено. <a href="https://bs.tytweb.ru/basket">перейти в корзину</a>',

            });*/

            //console.log('tp', totals_types);
            //console.log('tp', array_complect);

            var formik = {};
            var outi = '';
            formik['ms2_action'] = 'cart/items/add';
            formik['ctx'] = 'web';
            formik['firstcategory'] = firstcategory;
            formik['tovars'] = JSON.stringify(array_complect);
            //console.log('tp', formik['tovars']);
            $.ajax({
                type: "POST",
                url: 'assets/custom/api.php',
                data: formik,
                dataType: "json",
                success: function (data) {
                    if (data.error == 0) {
                        console.log('[ADD Products]', data.msg,data);



                        $('.ms2_total_count').text(data.total_count ?? 0); //
                        $('#msMiniCart').addClass('full'); 

                        console.log('[ADD Products total]', data.total_count);
                        $('.fx-complect-block-total').text(0); // убнуляем
                        $('#fx-prods-complects-list').text('');
                        $('.fx-price-all').text(0); // убнуляем

                        $('.my-old-price').addClass('hidden');
                        $('.fx-priceold-all').text(0); // убнуляем

                        $('.fx-prodall-counter').text(0); // убнуляем

                        totals_types = [];
                        array_complect = [];
                        complectCart = [];
                        var new_price_total = 0;
                        var first_tov_price_new = [];
                        var totals_counts = [];

                        $('.fx-product-box').find('.priceold').hide(0);
                        $('.fx-product-box').find('.fx-precents').hide(0);
                        $('.fx-product-box').removeClass('selected');
                        $('.thisadd').removeClass('thisadd');

                        $('.fx-prod-count').val(0);

                        var datay = {
                            'as_action': 'render_cart',
                            'tpl': 'tplCartSide'
                        };
                        AyrisSilk.Cart.get(datay);

                    } else {
                        alert(data.msg);
                    }
                }
            });

        }
        console.log('Add All to cart');
        // fx-prodall-counter - всего количество.
        return false;
    });

    // разовая проверка цены - убираем дорогие товары
    var optimodyfigdooing = 1;
    $(document).on('msoptionsprice_product_action', function (e, action, form, r) {
        if (action == 'modification/get' && r.success && r.data) {
            if ($('.fx-open-complects').length > 0 && optimodyfigdooing == 1) {
                $('.product-mini-complects .fx-product-box').each(function (obj, inx) {
                    awer = ($(this).find('.fx-old-price').data('baseprice')) * 1;
                    qwer = r.data.modification.price * 1;
                    if (rubric_maxipriceforall > 0) {
                        qwer = rubric_maxipriceforall;
                    }

                    if (awer > qwer) {
                        // текущий товар мы должны так же показать. Но это не работает. оставлено так, чтобы в будущем при изменении логики получения
                        // цены на странице товара могли помнить об этом нюансе и сделать корректно.
                        // тк класс текущего выбора у нас ставится поже, то мы его там и будем обратно показывать.
                        if ($(this).hasClass('fx-css-stayfirstalld')){
                        } else {
                            $(this).hide(1);
                        }
                    }
                });
                optimodyfigdooing = 0;
            }
        }
    });

// END Комплекты

});