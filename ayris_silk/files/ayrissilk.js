(function (window, document, $, AyrisSilkConfig) {
    var AyrisSilk = AyrisSilk || {};

    AyrisSilkConfig.callbacksObjectTemplate = function () {
        return {
            before: [],
            response: {
                success: [],
                error: []
            },
            ajax: {
                done: [],
                fail: [],
                always: []
            }
        }
    };

    AyrisSilk.setup = function () {
        this.actionName = 'as_action';
        this.msCartSide = null;
        this.btn = null;
        this.form = '.as_form';
        this.$doc = $(document);
        this.resp = null;
        this.ajaxProgress = false;

        this.sendData = {
            $form: null,
            action: null,
            formData: null
        };
    };

    AyrisSilk.initialize = function () {
        AyrisSilk.setup();
        AyrisSilk.$doc
            .ajaxStart(function () {
                AyrisSilk.ajaxProgress = true;
            })
            .ajaxStop(function () {
                AyrisSilk.ajaxProgress = false;
            })
            .on('submit', AyrisSilk.form, function (e) {
                e.preventDefault();
                var $form = $(this);
                AyrisSilk.btn = $form.find('button');
                var action = AyrisSilk.btn.attr('value');
                if (action) {
                    var formData = $form.serializeArray();
                    formData.push({
                        name: AyrisSilk.btn.attr('name'),
                        value: action
                    });
                    AyrisSilk.sendData = {
                        $form: $form,
                        action: action,
                        formData: formData
                    };
                    AyrisSilk.controller();
                }
            })
            .on('click', AyrisSilk.form + ' .' + AyrisSilk.actionName, function () {
                AyrisSilk.btn = $(this);
                var $form = AyrisSilk.btn.closest(AyrisSilk.form);
                var action = AyrisSilk.btn.attr('value');
                if (action) {
                    var formData = $form.find('select, textarea, input').serializeArray();
                    formData.push({
                        name: AyrisSilk.actionName,
                        value: action
                    });
                    AyrisSilk.sendData = {
                        $form: $form,
                        action: action,
                        formData: formData
                    };
                    AyrisSilk.controller();
                }
            });
        AyrisSilk.Certificate.init();
    };

    AyrisSilk.controller = function () {
        var self = this;
        switch (self.sendData.action) {
            case 'use_promocode':
                AyrisSilk.Promocode.check();
                break;
            case 'certificate/use':
                AyrisSilk.Certificate.use();
                break;
            default:
                console.log('Unknown action');
                return;
        }
    };

    AyrisSilk.send = function (data, callbacks){
        var runCallback = function (callback, bind) {
            if (typeof callback == 'function') {
                return callback.apply(bind, Array.prototype.slice.call(arguments, 2));
            }
            else if (typeof callback == 'object') {
                for (var i in callback) {
                    if (callback.hasOwnProperty(i)) {
                        var response = callback[i].apply(bind, Array.prototype.slice.call(arguments, 2));
                        if (response === false) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };

        // callback before
        if (runCallback(callbacks.before) === false) {
            return;
        }

        var formActionUrl = (AyrisSilk.sendData.$form)
            ? AyrisSilk.sendData.$form.attr('action')
            : false;
        var url = (formActionUrl)
            ? formActionUrl
            : AyrisSilkConfig.actionUrl;
        var formMethod = (AyrisSilk.sendData.$form)
            ? AyrisSilk.sendData.$form.attr('method')
            : false;
        var method = (formMethod)
            ? formMethod
            : 'post';
        var config = {
            url: url,
            type: method,
            data: data,
            dataType: "json",
            cache: false,
            async: false,
            success : function(response) {
                AyrisSilk.resp = response;
                if (response.success) {
                    if (response.message) {
                        miniShop2.Message.success(response.message);
                    }
                    runCallback(callbacks.response.success, AyrisSilk, response);
                } else {
                    miniShop2.Message.error(response.message);
                    runCallback(callbacks.response.error, AyrisSilk, response);
                }
            }
        };
        if (data instanceof FormData){
            config['processData'] = false;
            config['contentType'] = false;
        }
        var xhr = $.ajax(config)
        .done(function() {
        })
        .fail(function() {
        })
        .always(function() {
            $('.loading').remove();
        });
    };

    AyrisSilk.Cart = {
        callbacks: {
            get: AyrisSilkConfig.callbacksObjectTemplate(),
        },
        get: function (data){
            AyrisSilk.send(data, AyrisSilk.Cart.callbacks.get);
            response = AyrisSilk.resp;

            switch (response.data.cart) {
                case 'cart_side':
                    if (!AyrisSilk.msCartSide){
                        AyrisSilk.msCartSide = $(response.data.html).on('click', '.overlay, .btn-close', function (){
                            unscroll(false);
                            AyrisSilk.msCartSide.removeClass('active').delay(750).hide(0, function(){
                                AyrisSilk.msCartSide.remove();
                                AyrisSilk.msCartSide = null;
                            });
                        });
                        unscroll();
                        $('body').append(AyrisSilk.msCartSide);
                        $('.js-select-side').select2({
							placeholder: 'ВЫБРАТЬ РАЗМЕР',
							minimumResultsForSearch: Infinity
						});
                        AyrisSilk.msCartSide.show().addClass('active');
                    } else {
                        AyrisSilk.msCartSide.find('.wrapper')[0].outerHTML = $(response.data.html).find('.wrapper')[0].outerHTML;
                    }
                    AyrisSilk.msCartSide.find('.add-products form').each(function (){
                        msOptionsPrice.Product.action('modification/get', this);
                    });
                    initSetImageFromColor();
                    initSpinner();
                    break;
                case 'cart':
                    $('body').find('#msCart')[0].outerHTML = response.data.html;
                    msOptionsPrice.initialize.call();
                    initSpinner();
                    break;
                default:
                    break;
            }
        }
    }

    AyrisSilk.Promocode = {
        callbacks: {
            check: AyrisSilkConfig.callbacksObjectTemplate(),
        },
        check: function () {
            AyrisSilk.send(AyrisSilk.sendData.formData, AyrisSilk.Promocode.callbacks.check);
            var errorEl = AyrisSilk.sendData.$form.find('.input span');
            if (!AyrisSilk.resp.success && AyrisSilk.resp.message){
                errorEl.html(AyrisSilk.resp.message);
            } else {
                if (AyrisSilk.resp.data.cart ===  'cart'){
                    $('body').find('#msCart')[0].outerHTML = AyrisSilk.resp.data.html;
                    initSpinner();
                    $.fancybox.open({ src: '#promo_success' });
                    setTimeout(() => $.fancybox.close('all'), 1500);
                }
                errorEl.html('');
            }
        }
    }

    AyrisSilk.Certificate = {
        callbacks: {
            use: AyrisSilkConfig.callbacksObjectTemplate(),
            check: AyrisSilkConfig.callbacksObjectTemplate(),
        },
        config: {
            el: '.ms2_order_certificate',
            order: true,
        },
        init: function () {
            miniShop2.Callbacks.add('Order.getcost.response.error', '', function(response) {
                AyrisSilk.Certificate.config.order = false;
            });
            miniShop2.Callbacks.add('Order.submit.before', '', function(response) {
                $('button[value="order/submit"]').prop('disabled', false);
                miniShop2.Order.getcost();
                return AyrisSilk.Certificate.config.order;
            });
            if (AyrisSilkConfig.cfModeActive){
                miniShop2.Callbacks.add('Order.add.response.success', '', function(response) {
                    if (!response.data.delivery) return;
                    miniShop2.Order.updatePayments(AyrisSilkConfig.cfPayments.split(','));
                });
            }
        },
        use: function () {
            var callbacks = AyrisSilk.Certificate.callbacks;
            callbacks.use.response.success = function (response) {
                var val = (response.data.amount) ? '-' + miniShop2.Utils.formatPrice(response.data.amount) : 0;
                $(AyrisSilk.Certificate.config.el).text(val);
                miniShop2.Order.updatePayments(AyrisSilkConfig.cfPayments.split(','));
            };
            callbacks.use.response.error = function (response) {
                miniShop2.Order.updatePayments($('[name=delivery]').data('payments'));
            };
            AyrisSilk.send(AyrisSilk.sendData.formData, AyrisSilk.Certificate.callbacks.use);
            miniShop2.Order.getcost();
        },
    }

    $(document).ready(function ($) {
        AyrisSilk.initialize();
    });

    window.AyrisSilk = AyrisSilk;
})(window, document, jQuery, AyrisSilkConfig);

$(window).on('load', function () {

    miniShop2.Callbacks.add('Cart.add.before', '', check_ms2_action_element);
    miniShop2.Callbacks.add('Cart.remove.before', '', check_ms2_action_element);
    miniShop2.Callbacks.add('Cart.change.before', '', check_ms2_action_element);
    miniShop2.Callbacks.add('Cart.clean.before', '', check_ms2_action_element);

    function check_ms2_action_element(){
        if (miniShop2.sendData.$form.closest('#msCart.container').length > 0){
            update_cart_conf = {
                tpl: 'tplCart'
            };
        } else {
            update_cart_conf = {
                tpl: 'tplCartSide'
            };
        }
    }

    miniShop2.Callbacks.Cart.add.response.success = updateCart;
    miniShop2.Callbacks.Cart.add.response.success = updateCart;
    miniShop2.Callbacks.Cart.remove.response.success = updateCart;
    miniShop2.Callbacks.Cart.change.response.success = updateCart;
    miniShop2.Callbacks.Cart.clean.response.success = updateCart;

    function updateCart(){
        var data = {
            'as_action': 'render_cart',
            'tpl': update_cart_conf.tpl,
            'idpageofnow' : idpage_ofnow ?? 0
        };
        AyrisSilk.Cart.get(data);
    }

});