(function (window, document, $, BeautySleepConfig) {
    var BeautySleep = BeautySleep || {};

    BeautySleepConfig.callbacksObjectTemplate = function () {
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

    BeautySleep.setup = function () {
        this.actionName = 'bs_action';
        this.msCartSide = null;
        this.btn = null;
        this.form = '.bs_form';
        this.$doc = $(document);
        this.resp = null;
        this.ajaxProgress = false;

        this.sendData = {
            $form: null,
            action: null,
            formData: null
        };
    };

    BeautySleep.initialize = function () {
        BeautySleep.setup();
        BeautySleep.$doc
            .ajaxStart(function () {
                BeautySleep.ajaxProgress = true;
            })
            .ajaxStop(function () {
                BeautySleep.ajaxProgress = false;
            })
            .on('submit', BeautySleep.form, function (e) {
                e.preventDefault();
                var $form = $(this);
                BeautySleep.btn = $form.find('button');
                var action = BeautySleep.btn.attr('value');
                if (action) {
                    var formData = $form.serializeArray();
                    formData.push({
                        name: BeautySleep.btn.attr('name'),
                        value: action
                    });
                    BeautySleep.sendData = {
                        $form: $form,
                        action: action,
                        formData: formData
                    };
                    BeautySleep.controller();
                }
            })
            .on('click', BeautySleep.form + ' .' + BeautySleep.actionName, function () {
                BeautySleep.btn = $(this);
                var $form = BeautySleep.btn.closest(BeautySleep.form);
                var action = BeautySleep.btn.attr('value');
                if (action) {
                    var formData = $form.find('select, textarea, input').serializeArray();
                    formData.push({
                        name: BeautySleep.actionName,
                        value: action
                    });
                    BeautySleep.sendData = {
                        $form: $form,
                        action: action,
                        formData: formData
                    };
                    BeautySleep.controller();
                }
            });
        BeautySleep.Certificate.init();
    };

    BeautySleep.controller = function () {
        var self = this;
        switch (self.sendData.action) {
            case 'certificate/use':
                BeautySleep.Certificate.use();
                break;
            default:
                console.log('Unknown action');
                return;
        }
    };

    BeautySleep.send = function (data, callbacks){
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

        var formActionUrl = (BeautySleep.sendData.$form)
            ? BeautySleep.sendData.$form.attr('action')
            : false;
        var url = (formActionUrl)
            ? formActionUrl
            : BeautySleepConfig.actionUrl;
        var formMethod = (BeautySleep.sendData.$form)
            ? BeautySleep.sendData.$form.attr('method')
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
                BeautySleep.resp = response;
                if (response.success) {
                    $('[data-payment="20"]').hide();
                    if (response.message) {
                        miniShop2.Message.success(response.message);
                    }
                    runCallback(callbacks.response.success, BeautySleep, response);
                } else {
                    $('[data-payment="20"]').show();
                    miniShop2.Message.error(response.message);
                    runCallback(callbacks.response.error, BeautySleep, response);
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

    BeautySleep.Certificate = {
        callbacks: {
            use: BeautySleepConfig.callbacksObjectTemplate(),
            check: BeautySleepConfig.callbacksObjectTemplate(),
        },
        config: {
            el: '.ms2_order_certificate',
            order: true,
        },
        init: function () {
            miniShop2.Callbacks.add('Order.getcost.response.error', '', function(response) {
                BeautySleep.Certificate.config.order = false;
            });
            miniShop2.Callbacks.add('Order.submit.before', '', function(response) {
                $('button[value="order/submit"]').prop('disabled', false);
                miniShop2.Order.getcost();
                return BeautySleep.Certificate.config.order;
            });
            if (BeautySleepConfig.cfModeActive){
                miniShop2.Callbacks.add('Order.add.response.success', '', function(response) {
                    if (!response.data.delivery) return;
                    miniShop2.Order.updatePayments(BeautySleepConfig.cfPayments.split(','));
                });
            }
        },
        use: function () {
            var callbacks = BeautySleep.Certificate.callbacks;
            callbacks.use.response.success = function (response) {
                var val = (response.data.amount) ? '- ' + miniShop2.Utils.formatPrice(response.data.amount) : 0;
                $(BeautySleep.Certificate.config.el).text(val);
                miniShop2.Order.updatePayments(BeautySleepConfig.cfPayments.split(','));
            };
            callbacks.use.response.error = function (response) {
                $(BeautySleep.Certificate.config.el).text(0);
                miniShop2.Order.updatePayments($(miniShop2.Order.deliveryInput + ':checked').data('payments'));
            };
            BeautySleep.send(BeautySleep.sendData.formData, BeautySleep.Certificate.callbacks.use);
            miniShop2.Order.getcost();
        },
    }

    $(document).ready(function ($) {
        BeautySleep.initialize();
    });

    window.BeautySleep = BeautySleep;
})(window, document, jQuery, BeautySleepConfig);