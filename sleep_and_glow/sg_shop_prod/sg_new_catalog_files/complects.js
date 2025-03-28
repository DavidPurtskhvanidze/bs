$(document).ready(function() {
// комплекты.


// 13500
// 363 - маска  // tv 229 у id15
// 362
// minishop: replaceKits  addGiftsToCart ???
// snippet??? rebuild_cart_with_all_promo

  /*  $('.product-bottom-panel.forsingle').removeClass('show');

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
    });*/


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
    $('.complect-head-name:not(.open) + .complect-nabor-list').hide();

    $('.complect-head-name').on('click', function () {
        if ($(this).hasClass('open')) {
            $(this).next('.complect-nabor-list').hide(100);
            $(this).removeClass('open');
        } else {
            $(this).next('.complect-nabor-list').show(100);
            $(this).addClass('open');
        }

    });

// otmechen c_button ---> lab-itm

    // $('.product-mini-complects').hide(1);
    var isopencontent = 0;
    $('.fx-open-complects').on('click', function () {
        // $('.fx-panel-macke-hide').hide(0);  // срытие панельки цены

        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.product-mini-complects').hide(300);

            //$('.product-bottom-panel').addClass('show');
            $('.forcomplects').removeClass('fx-active');
        } else {
            $(this).addClass('open');

            $('.product-mini-complects').show(300);

            setTimeout(function () {
                win_ww = $(window).width();
                topy = 0;
                if (win_ww < 767){
                    topy = $('.product-mini-complects').offset().top - 40; // dfg
                } else {
                    topy = $('.product-mini-complects').offset().top - 140; // dfg
                }
                $('html, body').animate({scrollTop: topy}, 600);
            },200);

            //$('.product-bottom-panel').removeClass('show');
            $('.forcomplects').addClass('fx-active');

            if ($('.js-product-counter').val() != 0) {
                prodnow = $(this).data('id');
                var countnow = parseInt($('.js-product-counter').val());
                $('.fx-prod-count[data-id="' + prodnow + '"]').val(countnow);
                // $('.js-product-counter').val(0);
            }
            //calculateProdComplect();
            if (isopencontent == 0) {
                isopencontent = 1;
                if ($('.fx-prod-count[value="1"]').length) {
                    $('.fx-prod-count[value="1"]').each((i, el) => {
                        let keyid = $(el).parents('.fx-product-box').attr('id');
                        $('#' + keyid).addClass('fx-css-stayfirstalld');
                        console.log('OKE', $(this));
                        var boxcolor = $('#' + keyid + ' .fx-product-color'); //label.active
                        if (boxcolor.length) {
                            boxcolor.find('input:first').trigger('click');
                        }
                        var boxsize = $('#' + keyid + ' .fx-product-size'); //label.active
                        if (boxsize.length) {
                            boxsize.find('input:first').trigger('click');
                        }
                        $('#' + keyid + ' .fx-prod-count').val(0);
                        $('#' + keyid + ' .fx-max').trigger('click');
                    })


                    //ComplectsItemChange(keyid);
                   // calculateProdComplect();
                }
            }


        }
    });

    //$('.fx-product-imgs-color img').addClass('hident');
    //$('.fx-product-imgs-color').find('img:first-child').removeClass('hident');
// клик по цвету
    $('.fx-product-color .lab-itm').on('click', function () {
        //alert('цвет');
        nowname = $(this).data('color');
        $(this).parents('.fx-product-box').find('.fx-product-imgs-color img').addClass('hident');
        $(this).parents('.fx-product-box').find('.fx-product-imgs-color [data-color="'+nowname+'"]').eq(0).removeClass('hident');
        console.log('nowname ', nowname);

        idkey = $(this).parents('.fx-product-box').attr('id');
        pro_modyfic = '';
        ninput = $(this).prev();
        if (ninput) {
            pro_modval = ninput.val();
            pro_modname = ninput.attr('name').split('_')[1];
            pro_modyfic = pro_modyfic + pro_modval;
        }
        var boxsize = $('#' + idkey + ' .fx-product-size'); //label.active
        console.log('bZ_ ', boxsize);
        if (boxsize.length) {
            ninput = boxsize.find('input:checked');
            console.log('bZ_ ', ninput.length);
            ninput.addClass('AUSHTEYN');
            if (ninput.length) {
                pro_modval = $(ninput).val();
                pro_modname = $(ninput).attr('name').split('_')[1];
                pro_modyfic = pro_modyfic + pro_modval;
            }
        }
        pro_modyfic = idkey + pro_modyfic;
        var nowcount = 0;
        complectCart.forEach(function (oba, iho) {
            console.log('OBA ', oba, iho, oba.modyfic, pro_modyfic);
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
        idkey = $(this).parents('.fx-product-box').attr('id');

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
            pro_customprice = $(this).data('customprice');
            pro_modyfic = pro_modyfic + pro_modval;
            //console.log('FRED2', pro_customprice);
            if (pro_customprice && pro_customprice > 0){
                $('#' + idkey + " .fx-prod-count").data('price',pro_customprice);
                $('#' + idkey + " .fx-new-price").text(pro_customprice);
                if ($('#' + idkey + " .priceold").css('display') == 'block') {
                    $('#' + idkey + " .fx-new-price").text(miniShop2.Utils.formatPrice(pro_customprice*0.8));
                    $('#' + idkey + " .fx-old-price").text(pro_customprice);
                }
            }

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
                PNotify.error({
                    title: locrubricator['nocolor'] ?? 'Вы не указали цвет.',
                })
                return false;
            }
        }
        if ($(this).parents('.fx-product-box').find('.fx-product-size').length) {
            var tikcol = $(this).parents('.fx-product-box').find('.fx-product-size input:checked');
            if (!tikcol.length) {
                PNotify.error({
                    title: locrubricator['nosize'] ?? 'Вы не указали Размер.',
                })
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

        $('.fx-add-allto-cart').removeClass('disable');

        if ($(this).parents('.fx-product-box').find('.fx-product-color').length) {
            var tikcol = $(this).parents('.fx-product-box').find('.fx-product-color input:checked');
            if (!tikcol.length) {
                PNotify.error({
                    title: locrubricator['nocolor'] ?? 'Вы не указали цвет.',
                })
                return false;
            }
            tikcol.addClass('thisadd');
        }
        if ($(this).parents('.fx-product-box').find('.fx-product-size').length) {
            var tikcol = $(this).parents('.fx-product-box').find('.fx-product-size input:checked');
            if (!tikcol.length) {
                PNotify.error({
                    title: locrubricator['nosize'] ?? 'Вы не указали Размер.',
                })
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

        x = '#' + idkey + " .fx-prod-count";
        pro_keyid = idkey;
        pro_id = $(x).data('id');
        pro_type = $(x).data('type');
        pro_cena = $(x).data('price') * 1;
        pro_count = $(x).val() * 1;
        pro_raz = $(x).data('razdel');
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
                "count": pro_count,
                "modif": pro_modif,
                "order": pro_order,
                "targetid": pro_keyid,
                "modyfic": pro_modyfic
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

        $('#fx-prods-complects-list').text('');
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


        complectCart.forEach(function (oba, iho) {
            console.log('OBA ', oba, iho);
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

        });


        $('.fx-prodall-counter').text(all_count);
        $('.fx-priceold-all').text(miniShop2.Utils.formatPrice(all_cost));


        /*if (array_complect[1][0] === undefined) {
            console.log('EZHHH',array_complect);

        }*/
        //array_complect[1].length = 0;
        console.log('preA allcounts', array_complect, all_part);

        /*array_complect.forEach(function (obj,inx) {
            console.log('all',inx, all_part[inx]);
        });*/
//        return false;

        var setparentmini = [];
        var set20percent = []; // для тех кому 20%.
        var isminikityt = []; // маски всякие
        var isnormalprods = []; // Нормальные продукты
        // скидка для товаров. подсчет. пришли товары
        if (promo_types_table && promo_types_table != '') {
            //var tab = promo_types_table;
            var setalldiscount = [];

            array_complect.forEach(function (obj, inx) {
                //console.log('all_inx',inx, array_complect[inx]);
                // all_part[inx] - текущее кол-во шт.

                //if (array_complect[inx].length) {}


                var tmp_count = all_part[inx]; // кол-во по типам
                var promo_count_arr = [];
                $.each(promo_types_table[inx], function (index) {
                    promo_count_arr.push(promo_types_table[inx][index].count)
                })
                var promo_count_max = Math.max.apply(null, promo_count_arr);
                var promo_count_max_index = promo_count_arr.indexOf(promo_count_max.toString());
                var setdiscount = '0';
                //console.log('max',promo_count_max, promo_count_max_index,promo_count_arr);
                // 1. если кол-во товаров = какому то варианту по скидке:
                $.each(promo_types_table[inx], function (index) {
                    if (parseInt(promo_types_table[inx][index].count) == tmp_count) {
                        setdiscount = promo_types_table[inx][index].discount;
                        return false;
                    }
                });
                $.each(promo_types_table[inx], function (index) {
                    if (promo_types_table[inx][index].paremini){
                        setparentmini[inx] = promo_types_table[inx][index].paremini;
                        return false;
                    }
                });
                // 20% action замена pare20pr на paremini
                $.each(promo_types_table[inx], function (index) {
                    if (promo_types_table[inx][index].paremini){
                        set20percent[inx] = promo_types_table[inx][index].paremini;
                        return false;
                    }
                });
                // end 20% action

                if (promo_count_max <= tmp_count && setdiscount == '0') {
                    setdiscount = promo_types_table[inx][promo_count_max_index].discount;
                }
                var setrazdel = 0;
                if (promo_types_table[inx][promo_count_max_index]['first_cat']) {
                    setrazdel = promo_types_table[inx][promo_count_max_index]['first_cat'];
                }
                console.log('idx2',setrazdel,inx);
                setalldiscount[inx] = {"disco": setdiscount, "count": promo_count_max};


                // сортируем по цене, чтобы от большего к меньшему.

                // setparentmini[inx]
                //isminikityt = 0;
                // Для мелочевки - типа если они были первыми то не делаем скидку на дорогие товары. Убираем пока.
              /*  if (setparentmini[inx]?.length){
                    array_complect[inx].forEach(function (a, b) {
                        if (setparentmini[inx].includes(a.razdel)){
                            isminikityt[inx] = 1;
                            $iko = 1000;
                            if (array_complect[inx][b].order > $iko){
                                $iko = 0;
                            }
                            array_complect[inx][b].order = array_complect[inx][b].order+$iko;
                        } else {
                            isnormalprods[inx] = 1;
                        }
                    });
                }*/
// сортировка только по цене - отключаем.
            /*    array_complect[inx].sort(function (a, b) {
                    // сортировка по цене от большей к меньшей.
                    if (a.cena > b.cena) {
                        return -1;
                    }
                    if (a.cena < b.cena) {
                        return 1;
                    }
                    return 0;
                });*/

// сортировка по очередности добавления
                array_complect[inx].sort(function (a, b) {
                    // сортировка по очередности
                    if (a.order > b.order) {
                        return 1;
                    }
                    if (a.order < b.order) {
                        return -1;
                    }
                    return 0;
                });

                var myindex = -1;
                if (setrazdel > 0) {
                    for (var i = 0; i < array_complect[inx].length; i++) {
                        console.log('BHA ',array_complect[inx][i].razdel,setrazdel);
                        // setrazdel - Один id
                        //  array_complect[inx][i].razdel - может иметь 1 и более разделов обьединенных
                        myrazdels = " "+array_complect[inx][i].razdel;
                        if (myrazdels.indexOf(setrazdel) >= 0) {
                            firstcategory = setrazdel;
                            array_complect[inx][i].order = 0;
                            myindex = i;
                            console.log('alex RAZDEL YEST',setrazdel);
                            break;
                        }
                    }
                    //var xtmp= array_complect[inx];
                    //array_complect[inx][0] = xtmp[myindex];
                    if (myindex == -1) {
                        //console.log('alex RAZDEL NETY',setrazdel);
                        array_complect[inx].sort(function (a, b) {
                            // сортировка по цене от большей к меньшей.
                            if (a.cena > b.cena) {
                                return -1;
                            }
                            if (a.cena < b.cena) {
                                return 1;
                            }
                            return 0;
                        });
                    } else {
                        if (isminikityt[inx] == 0) {
                            var xtmp = [];
                            xtmp[0] = array_complect[inx][myindex];
                            array_complect[inx].forEach(function (bez, ki) {
                                if (ki != myindex) {
                                    xtmp.push(array_complect[inx][ki]);
                                }
                            });
                            array_complect[inx] = xtmp;
                        } else {
                            array_complect[inx].sort(function (a, b) {
                                // сортировка по ORDER от большей к меньшей.
                                if (a.order > b.order) {
                                    return 1;
                                }
                                if (a.order < b.order) {
                                    return -1;
                                }
                                return 0;
                            });
                        }
                    }

                }
// END сортировка по очередности добавления

            });


            console.log('discount', setalldiscount, array_complect);

        }

        // return false;

        var new_price_total = 0;
        var first_tov_price_new = [];
        var totals_counts = [];
        totals_types = [];

        $('.fx-complect-block-total').text(0);

        array_complect.forEach(function (obj, inx) {
            console.log('ariu', obj, inx);

            // array_complect[inx] массив
            // setalldiscount[inx]  скидка
            setdiscount = setalldiscount[inx]['disco'];
            var first_tov_cost = 0;

            var iko = setalldiscount[inx]['count'] - 1;//1; // Не учитываем 1 шт у дорогого первого товара

            array_complect[inx].forEach(function (obj, index) {
                console.log('aaar', array_complect[inx]);


                all_price = 0;
                var tosale = array_complect[inx][index].count;
                var th_price = array_complect[inx][index].cena;
                totals_counts[obj['razdel']] = totals_counts[obj['razdel']] ? totals_counts[obj['razdel']] + array_complect[inx][index].count : array_complect[inx][index].count;
                totals_types[array_complect[inx][index].type] = totals_types[array_complect[inx][index].type] ? totals_types[array_complect[inx][index].type] + array_complect[inx][index].count : array_complect[inx][index].count;
                //$('[data-id="'+array_complect[inx][index].id+'"]').parents('.fx-product-box')


                if (iko == 1) {
                    tosale = 0;
                    if (array_complect[inx][index].count > 1) {
                        tosale = array_complect[inx][index].count - 1;
                    }
                    new_price_total += th_price;
                    first_tov_cost = th_price;
                    iko = 0;
                    // индикация

                    $('input[data-type="' + array_complect[inx][index].type + '"]').parents('.fx-product-box').find('.priceold').hide(0);
                    $('input[data-type="' + array_complect[inx][index].type + '"]').parents('.fx-product-box').find('.fx-precents').hide(0);

                }
                outskid = setdiscount;
                if (set20percent[inx] && set20percent[inx].includes(array_complect[inx][index].razdel)){
                    outskid = '20%';
                }

                if (outskid.indexOf('%') != -1) {
                    all_price = th_price - miniShop2.Utils.formatPrice(th_price * (parseInt(outskid) / 100)); // all_price = th_price - Math.round(th_price * (parseInt(setdiscount) / 100));
                } else {
                    all_price = th_price - (parseInt(outskid));
                }

                if (first_tov_cost > 0) {

                    item_total = all_price * tosale + first_tov_cost;
                    first_tov_price_new[array_complect[inx][index].id] = miniShop2.Utils.formatPrice(item_total / array_complect[inx][index].count);

                    // first_tov_rice_new = Math.round(item_total/array_complect[inx][index].count);
                    //first_tov_id = array_complect[inx][index].id;
                    // $('input[data-id="'+array_complect[inx][index].id+'"]').parents('.fx-product-box').find('.fx-new-price').text(price_new);
                    // $('input[data-id="'+array_complect[inx][index].id+'"]').parents('.fx-product-box').find('.fx-old-price').text(th_price);

                    first_tov_cost = 0;
                }

                //$('input[data-type="'+array_complect[inx][index].type+'"]').parents('.fx-product-box').find('.fx-new-price').text(price_new);
                //$('input[data-type="'+array_complect[inx][index].type+'"]').parents('.fx-product-box').find('.fx-old-price').text(th_price);

                new_price_total += all_price * tosale;
                // цена товара без скидки: new_price_total
                // цена этого же товара в рамках итерации  all_price * tosale


            });

        });
        //console.log('total',new_price_total);
        //console.log('each_count',totals_counts);
        //console.log('each_types',totals_types);

        totals_counts.forEach(function (obj, ic) {
            $('.fx-summ-' + ic).text(totals_counts[ic]);
        });

        $('.fx-prod-count').parents('.fx-product-box').find('.priceold').hide(0);
        $('.fx-prod-count').parents('.fx-product-box').find('.fx-precents').hide(0);

        $('.fx-prod-count').each(function (e, x) {
            icost = $(x).data('price');
            $(x).parents('.fx-product-box').find('.fx-new-price').text(miniShop2.Utils.formatPrice(icost));
        })

        totals_types.forEach(function (obj, ic) {

            /*$('input[data-type="'+ic+'"]').each(function (e,x) {
                icost = $(x).data('price');
                $(x).parents('.fx-product-box').find('.fx-new-price').text(icost)
            })*/

            if (totals_types[ic] > 0) {
                $('input[data-type="' + ic + '"]').parents('.fx-product-box').find('.priceold').show(0);
                $('input[data-type="' + ic + '"]').parents('.fx-product-box').find('.fx-precents').show(0);

                $('input[data-type="' + ic + '"]').each(function (e, x) {
                    // first_tov_price_new
                    pro_id = $(x).data('id');
                    icost = $(x).data('price');
                    irazdel = $(x).data('razdel');
                    xmnozhka = 1;

                    /*if (isminikityt[ic] == 1 && isnormalprods[ic] == 1){
                        // в корзине все есть. показываем скидки всем товарам.
                    } else*/
                    if (!isnormalprods[ic] && isminikityt[ic] == 1){
                        // есть только мелоч товаров. отображаем скидки только для них.
                        if (setparentmini[ic] && setparentmini[ic].includes(irazdel)){
                            // показываем только маски
                            $(x).parents('.fx-product-box').find('.priceold').show(0);
                            $(x).parents('.fx-product-box').find('.fx-precents').show(0);
                            xmnozhka = 0.8;
                            // promo_types_table[1]['pare20pr']
                            if (set20percent[ic] && set20percent[ic].includes(irazdel)){
                                xmnozhka = 0.8;
                            }
                        } else {
                            $(x).parents('.fx-product-box').find('.priceold').hide(0);
                            $(x).parents('.fx-product-box').find('.fx-precents').hide(0);
                            xmnozhka = 1;
                        }
                    } else {
                        // есть другой товар - показываем скидки всем.
                        $(x).parents('.fx-product-box').find('.priceold').show(0);
                        $(x).parents('.fx-product-box').find('.fx-precents').show(0);

                        if (ic == 2) {
                            xmnozhka = 0.8;
                        } else {
                            xmnozhka = 0.8;
                        }

                        if (set20percent[ic] && set20percent[ic].includes(irazdel)){
                            xmnozhka = 0.8;
                        }

                    }

                    if (first_tov_price_new[pro_id] > 0) {
                        icostx = first_tov_price_new[pro_id];
                        if ($(x).val() < 2) {
                            $(x).parents('.fx-product-box').find('.priceold').hide(0);
                            $(x).parents('.fx-product-box').find('.fx-precents').hide(0);
                        }
                    } else {
                        icostx = $(x).data('price') * xmnozhka;
                    }
                    $(x).parents('.fx-product-box').find('.fx-new-price').text(miniShop2.Utils.formatPrice(icostx)); // Math.round
                    $(x).parents('.fx-product-box').find('.fx-old-price').text(miniShop2.Utils.formatPrice(icost));
                    if (xmnozhka != 1) {
                        $(x).parents('.fx-product-box').find('.fx-precents').text(Math.round((1 - xmnozhka) * 100) + '%');
                    }

                });
            }
        });

        //console.log('all',array_complect,all_count,all_cost,new_price_total);
        if (all_cost == new_price_total) {
            $('.my-old-price').addClass('hidden');
        } else {
            $('.my-old-price').removeClass('hidden');
        }
        $('.fx-price-all').text(miniShop2.Utils.formatPrice(new_price_total)); // новая цена
    }


// Добавляем товары рубрикатора в корзину
    $('.fx-add-allto-cart').on('click', function () {

        if( $(this).hasClass('disable')){return false;}

        $(this).addClass('disable');

        if ($('.fx-prodall-counter').text() == '0') {
            PNotify.error({
                title: locrubricator['nocomplect'] ?? 'Вы не указали количество в комплектах.',
                stack: {
                    dir1: 'down',
                    firstpos1: 25,
                    modal: false,
                    maxOpen: Infinity
                }
            })

            let top = $('.product-mini-complects').offset().top - 140;
            $('html, body').animate({scrollTop: top}, 800);

            //$('.fx-open-complects').trigger('click');

        } else {
            /*PNotify.notice({
                title : 'Добавлено. <a href="https://qqq.qqq/basket">перейти в корзину</a>',

            });*/

           /* PNotify.success({
                title: 'Добавлено. ',
                text: '<a href="https://qqq.qqq/basket">перейти в корзину</a>',
                textTrusted: true,
                stack: {
                    dir1: 'down',
                    firstpos1: 25,
                    modal: false,
                    maxOpen: Infinity
                }
            });*/
            //var


            console.log('tp', totals_types);
            console.log('tp', array_complect)

// {"0":{"count":"1","id":"20","options":"[]"},
// "1":{"count":"1","id":"21","options":"[]"},
// "2":{"count":"0","id":"22","options":"[]"}}

            var formik = {};
            var outi = '';
            formik['ms2_action'] = 'cart/items/add';
            formik['ctx'] = miniShop2Config.ctx ?? 'web'; // Надо передать текукщий контекст.
            formik['firstcategory'] = firstcategory;
            formik['tovars'] = JSON.stringify(array_complect);
            console.log('tp', formik['tovars']);
            $.ajax({
                type: "POST",
                url: 'assets/custom/api.php',
                data: formik,
                dataType: "json",
                success: function (data) {

                    $('.fx-add-allto-cart').removeClass('disable');

                    if (data.error == 0) {
                        console.log('[ADD Products]', data.msg);
                        //$('[data-target="#basket"]').trigger('click');
                        //$('.mod-cart').trigger('click');

                        //$('.mod-cart').trigger('click'); //js-minicart
                        //$('.js-minicart').trigger('click'); //js-minicart


                        /*$('.js-order-cart').prepend('<div class="loading show"/>');
                        $('.js-minicart').prepend('<div class="loading show"/>');
                        $('.js-cart').prepend('<div class="loading show"/>');*/

                        sAgGlobalFunctions.send_ajax_rerender_minicart();
                        miniShop2.Cart.status(data);


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
                        calculateProdComplect();

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

// END Комплекты



    /*
    *       быстрый просмотр.
    * */

    // fx-fastesee
    // assets/custom/api.php?ctx=web&ms2_action=rubri/getone&tovid=272

    $(document).on('click', '.fx-fastsee', function () {
        var iddoc = $(this).data('id'); // id товара
        var idtarget = $(this).parents('.fx-product-box').attr('id');
        var datacolors = $(this).parents('.fx-product-box').find('.cnl-info').clone();
        datacolors.find('.cnl-title').remove();
        datacolors.find('[type="radio"]').remove();
        var allcodeq = 'assets/custom/api.php?ctx=web&ms2_action=rubri/getone&tovid='+iddoc;//?ctx=web&ms2_action=rubri/getone&tovid=272';

        $.fancybox.open({
            src  : allcodeq,
            type : 'ajax',
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
                afterLoad : function( instance, current ) {
                    var galleryThumbs = new Swiper('.fx-prod-one-gallery-nav', {
                        spaceBetween: 10,
                        slidesPerView: 4,
                        freeMode: true,
                        watchSlidesVisibility: true,
                        watchSlidesProgress: true,
                    });
                    var galleryTop = new Swiper('.fx-prod-one-gallery', {
                        spaceBetween: 10,
                        navigation: {
                            nextEl: '.fx-prod-one-gallery .swiper-button-next',
                            prevEl: '.fx-prod-one-gallery .swiper-button-prev',
                        },
                        thumbs: {
                            swiper: galleryThumbs
                        },
                        breakpoints: {
                            768: {
                                navigation: {
                                    nextEl: '.fx-prod-one-gallery .swiper-button-next',
                                    prevEl: '.fx-prod-one-gallery .swiper-button-prev',
                                }
                            },
                        }
                    });

                    datacolors.appendTo('.fx-insert-func');

                    // синхронизация кол-ва
                    $('#'+idtarget+' .fx-prod-count').on('change', function () {
                        $('.fx-insert-func .fx-prod-count').eq(0).val($(this).val());
                    });
                    $('.fx-insert-func .lab-itm').removeClass('selected');

                    var ispresscolor = 0;
                    var ispresssize = 0;

                    $('#'+idtarget+' .cnl-variant-colors .thisadd').each(function (v,b) {
                        myid = $(b).attr('id');
                        $('.fx-insert-func [for="'+myid+'"]').addClass('selected');
                    });

                    $('<div class="rub_msgm_info remove_good">'+locrubricator['deleted']+'</div><div class="rub_msgm_info add_good">'+locrubricator['added']+'</div><div class="rub_msgm_info change_good">'+locrubricator['changed']+'</div>').appendTo('.fx-insert-func .cnl-count');
                    $('<div class="error-message-info">'+locrubricator['nocolor']+'</div>').appendTo('.fx-insert-func .fx-product-color');
                    $('<div class="error-message-info">'+locrubricator['nosize']+'</div>').appendTo('.fx-insert-func .fx-product-size');

                    // кнопки + и минус
                    // цвет
                    if ($('.fx-insert-func .fx-product-color').length >0){
                        $('.fx-insert-func .lab-itm.active').each(function (v,b) {
                            ispresscolor =1;
                        });
                    } else {
                        ispresscolor = 1;
                    }

                    // размер
                    if ($('.fx-insert-func .fx-product-size').length >0){
                        $('.fx-insert-func .lab-itm-btn.active').each(function (v,b) {
                            ispresssize = 1;
                        });
                    } else {
                        ispresssize = 1;
                    }

                    //$('.fx-insert-func .lab-itm')
                    var minusmytime = 0;
                    var timerminus;
                    $('.fx-insert-func').on('click', '.fx-min', function () {
                        nowcount = $('.fx-insert-func .fx-prod-count').eq(0).val(); // сколько сейчас Шт.
                        if (nowcount == 0) {return false;}
                        $('#'+idtarget+' .fx-min').trigger('click');
                        if (ispresscolor == 0) {
                            $('.fx-insert-func .fx-product-color').addClass('error');
                            return false;
                        }
                        if (ispresssize == 0) {
                            $('.fx-insert-func .fx-product-size').addClass('error');
                            return false;
                        }


                        if ($('.rub_msgm_info.remove_good').hasClass('ok')) {
                            clearTimeout(timerminus);
                            $('.rub_msgm_info.remove_good').addClass('okout');
                            $('.rub_msgm_info.remove_good').removeClass('ok');
                            minusmytime = 300;
                        } else {
                            minusmytime = 0;
                        }
                        setTimeout(function () {
                            $('.rub_msgm_info.remove_good').removeClass('okout');
                            $('.rub_msgm_info.remove_good').addClass('ok');
                        },minusmytime);

                        myhtml = $('#'+idtarget+' .box-price').html();
                        $('.fx-insert-func .box-price').html(myhtml);

                        // цвет
                        $('.fx-insert-func .lab-itm').removeClass('selected');
                        $('#'+idtarget+' .cnl-variant-colors .thisadd').each(function (v,b) {
                            console.log(v,b);
                            myid = $(b).attr('id');
                            $('.fx-insert-func [for="'+myid+'"]').addClass('selected');
                        });

                        timerminus = setTimeout(function () {
                            $('.rub_msgm_info.remove_good').removeClass('ok');
                            $('.rub_msgm_info.remove_good').addClass('okout');
                            setTimeout(function () {
                                $('.rub_msgm_info.remove_good').removeClass('okout');
                                minusmytime = 0;
                            },300);
                        },1500);
                    });

                    var plusmytime = 0;
                    var timerplus;
                    var barabashka; // element plus
                    $('.fx-insert-func').on('click', '.fx-max', function () {
                        $('#'+idtarget+' .fx-max').trigger('click');

                        if (ispresscolor == 0) {
                            $('.fx-insert-func .fx-product-color').addClass('error');
                            return false;
                        }
                        if (ispresssize == 0) {
                            $('.fx-insert-func .fx-product-size').addClass('error');
                            return false;
                        }
                        barabashka = $('.rub_msgm_info.add_good');

                        if (barabashka.hasClass('ok')) {
                            clearTimeout(timerplus);
                            barabashka.addClass('okout');
                            barabashka.removeClass('ok');
                            plusmytime = 300;
                        } else {
                            plusmytime = 0;
                        }
                        setTimeout(function () {
                            barabashka.removeClass('okout');
                            barabashka.addClass('ok');
                        },plusmytime);

                        myhtml = $('#'+idtarget+' .box-price').html();
                        $('.fx-insert-func .box-price').html(myhtml);

                        // цвет
                        $('.fx-insert-func .lab-itm').removeClass('selected');
                        $('#'+idtarget+' .cnl-variant-colors .thisadd').each(function (v,b) {
                            console.log(v,b);
                            myid = $(b).attr('id');
                            $('.fx-insert-func [for="'+myid+'"]').addClass('selected');
                        });

                        timerplus = setTimeout(function () {
                            barabashka.removeClass('ok');
                            barabashka.addClass('okout');
                            setTimeout(function () {
                                barabashka.removeClass('okout');
                            },300);
                        },1500);

                    });
                    // кнопки цвета
                    $('.fx-insert-func').on('click', '.lab-itm', function () {
                        ispresscolor =1;
                        $('.fx-insert-func .fx-product-color').removeClass('error');

                        $(this).parents('.cnl-variant-colors').find('.lab-itm').removeClass('active');
                        $(this).addClass('active');
                        myfor = $(this).attr('for');
                        mycol = $(this).data('value'); // тут формат: Голубой=#d3dcee
                        $('#'+idtarget+' [for="'+myfor+'"]').trigger('click');

                        tindo = $('.fx-prod-one-gallery-nav [data-color="'+mycol+'"]').eq(0).index();
                        galleryTop.slideTo(tindo, 400);

                        $('.fx-insert-func .fx-prod-count').eq(0).val($('#'+idtarget+' .fx-prod-count').val());

                    });
                    // кнопки размера
                    $('.fx-insert-func').on('click', '.lab-itm-btn', function () {
                        ispresssize = 1;
                        $('.fx-insert-func .fx-product-size').removeClass('error');
                        $(this).parents('.cnl-variant-colors').find('.lab-itm-btn').removeClass('active');
                        $(this).addClass('active');
                        myfor = $(this).attr('for');
                        $('#'+idtarget+' [for="'+myfor+'"]').trigger('click');

                        $('.fx-insert-func .fx-prod-count').eq(0).val($('#'+idtarget+' .fx-prod-count').val());

                    });

                },
                beforeClose : function( instance, current ) {

                }
            },

        });
        return false;
    });

    /*
    *   END    быстрый просмотр.
    * */

});
