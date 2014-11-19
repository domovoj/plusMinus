/*plugin plusminus*/
(function ($, isTouch) {
    if (!Array.prototype.indexOf)
        Array.prototype.indexOf = function (obj, start) {
            for (var i = (start || 0); i < this.length; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
    var methods = {
        destroy: function () {
            var input = $(this),
                    data = input.data('plusMinus');
            if (data) {
                var btns = $([]);
                if (data.next) {
                    data.next.data('plusminusDisabled') ? data.next.attr('disabled', 'disabled') : data.next.removeAttr('disabled');
                    btns = btns.add(data.next);
                }
                if (data.prev) {
                    data.prev.data('plusminusDisabled') ? data.prev.attr('disabled', 'disabled') : data.prev.removeAttr('disabled');
                    btns = btns.add(data.prev);
                }
                if (btns)
                    btns.off('mouseenter.' + $.plusMinus.nS).off('mouseleave.' + $.plusMinus.nS).off('click.' + $.plusMinus.nS).off('mouseup.' + $.plusMinus.nS).off('mousedown.' + $.plusMinus.nS).removeData('plusMinus').removeClass('plusMinus-disabled plusMinus-enabled');
                input.val(data.bval).off('input.' + $.plusMinus.nS).removeData('plusMinus');
            }
            return input;
        },
        init: function (options) {
            options = options || {};
            if (this.length > 0) {
                var settings = $.extend({}, $.plusMinus.dP, options);
                return this.each(function () {
                    var input = $(this),
                            data = input.data();

                    methods.destroy.call(input);
                    var opt = $.extend({}, settings, data);

                    opt.next = typeof opt.next === 'string' ? methods._checkBtn.call(input, opt.next.split('.')) : opt.next;
                    opt.prev = typeof opt.prev === 'string' ? methods._checkBtn.call(input, opt.prev.split('.')) : opt.prev;
                    opt.bval = +input.val();
                    opt.callbacks = {
                        before: {
                            beforeG: $.plusMinus.dP.before,
                            before: options.before,
                            beforeEl: eval('(' + data.before + ')')
                        },
                        after: {
                            afterG: $.plusMinus.dP.after,
                            after: options.after,
                            afterEl: eval('(' + data.after + ')')
                        }
                    };
                    delete opt.before;
                    delete opt.after;
                    var dP = {
                        input: input
                    };

                    if (opt.mouseDownChange)
                        dP.interval = [];
                    if (opt.next)
                        opt.next.data('plusMinus', $.extend({next: true}, dP)).data('plusminusDisabled', opt.next.is(':disabled') ? true : false);
                    if (opt.prev)
                        opt.prev.data('plusMinus', $.extend({next: false}, dP)).data('plusminusDisabled', opt.prev.is(':disabled') ? true : false);

                    input.data('plusMinus', opt);

                    methods.testNumber.call(input, true);
                    var inputJS = $(this).get(0);
                    if ("onpropertychange" in inputJS)
                        inputJS.onpropertychange = function () {
                            if (event.propertyName === "value")
                                methods.testNumber.call(input);
                        };
                    else
                        input.on('input.' + $.plusMinus.nS, function (e) {
                            methods.testNumber.call($(this));
                        });

                    var btns = $([]);
                    if (opt.next)
                        btns = btns.add(opt.next);
                    if (opt.prev)
                        btns = btns.add(opt.prev);

                    if (btns && opt.mouseenter)
                        btns.on('mouseenter.' + $.plusMinus.nS, function (e) {
                            var $this = $(this);
                            $this.data('plusMinus').resMouseEnter = opt.mouseenter.call($this, input, $this.data('plusMinus').next ? 'plus' : 'minus');
                        });
                    if (btns && opt.mouseleave)
                        btns.on('mouseleave.' + $.plusMinus.nS, function (e) {
                            var $this = $(this);
                            opt.mouseleave.call($this, input, $this.data('plusMinus').next ? 'plus' : 'minus', $this.data('plusMinus').resMouseEnter);
                        });
                    btns.on('click.' + $.plusMinus.nS, function (e) {
                        methods._changeCount.call(this, $(this).data('plusMinus'));
                    }).on('mouseup.' + $.plusMinus.nS, function (e) {
                        if (!isTouch)
                            input.focus();
                    });
                    if (opt.mouseDownChange) {
                        btns.on('mousedown.' + $.plusMinus.nS, function (e) {
                            var _self = this,
                                    obj = $(_self).data('plusMinus');
                            obj.interval[0] = setTimeout(function () {
                                obj.interval[1] = setInterval(function () {
                                    methods._changeCount.call(_self, obj);
                                }, opt.factor);
                            }, opt.delay);
                            $(window).off('mouseup.' + $.plusMinus.nS).on('mouseup.' + $.plusMinus.nS, function (e) {
                                clearTimeout(obj.interval[0]);
                                clearInterval(obj.interval[1]);
                            });
                        });
                    }
                });
            }
            return this;
        },
        plus: function () {
            var input = $(this),
                    next = input.data('plusMinus').next;
            methods._changeCount.call(next, next.data('plusMinus'));
            return input;
        },
        minus: function () {
            var input = $(this),
                    prev = input.data('plusMinus').prev;
            methods._changeCount.call(prev, prev.data('plusMinus'));
            return input;
        },
        getValue: function (val) {
            var input = $(this),
                    data = input.data('plusMinus');
            return methods._valS(val !== undefined ? val : input.val().replace(data.sufix ? data.sufix : '', '').replace(data.prefix ? data.prefix : '', ''), data.divider);
        },
        setValue: function (val, ins, noChange) {
            var input = $(this),
                    data = input.data('plusMinus');

            var valF = methods._valF(data.precision || !methods._isNumber(val) || !methods._isNumber(val.toString()[val.toString().length - 1]) ? val : parseFloat(val), data.divider);

            var cP = methods._getCursorPosition.call(input);
            function _change() {
                input.val((data.prefix ? data.prefix : '') + valF + (data.sufix ? data.sufix : ''));
                if (!ins)
                    cP = input.val().toString().length + 1;
                methods._setCursorPosition.call(input, cP - ((data.val ? data.val.toString().length : null) === val.toString().length ? 1 : 0), noChange);
                data.val = +val;
            }
            if (!noChange && data.val !== val) {
                var resB = {},
                        resBA = [];
                for (var i in data.callbacks.before)
                    if (data.callbacks.before[i]) {
                        resB[i] = data.callbacks.before[i].call(input, data);
                        resBA.push(resB[i]);
                    }
                input.trigger('before.' + $.plusMinus.nS, data);
                if ($.inArray(false, resBA) === -1 || resBA.length === 0) {
                    _change();
                    input.trigger('after.' + $.plusMinus.nS, data);
                    if (!noChange)
                        for (var i in data.callbacks.after)
                            if (data.callbacks.after[i])
                                data.callbacks.after[i].call(input, data, resB);
                }
            }
            else
                _change();

            if (data.prev && !methods._nextValue.call(input, +val, false).toString().match(data.pattern))
                methods._disabled.call(data.prev);
            if (data.next && !methods._nextValue.call(input, +val, true).toString().match(data.pattern))
                methods._disabled.call(data.next);

            return val;
        },
        testNumber: function (start) {
            var input = $(this),
                    val = methods.getValue.call(input),
                    data = input.data('plusMinus');
            if (data.next)
                methods._enabled.call(data.next);
            if (data.prev)
                methods._enabled.call(data.prev);

            if (val !== undefined && !val.toString().match(data.pattern)) {
                if (data.val !== undefined && data.val.toString().match(data.pattern))
                    val = data.val;
                else
                    val = data.value;
            }
            if (val && val.toString().match(data.pattern)) {
                if (val <= data.min) {
                    val = data.min;
                    methods._disabled.call(data.prev);
                }
                if (val >= data.max) {
                    val = data.max;
                    methods._disabled.call(data.next);
                }
            }
            methods.setValue.call(input, val, true, start);

            return input;
        },
        enable: function () {
            var $this = $(this),
                    data = $this.data('plusMinus');
            if (data.next && data.next.data('plusminusDisabledC') !== undefined && data.next.data('plusminusDisabledC') === false)
                data.next.removeAttr('disabled').removeClass('plusMinus-disabled');
            if (data.prev && data.prev.data('plusminusDisabledC') !== undefined && data.prev.data('plusminusDisabledC') === false)
                data.prev.removeAttr('disabled').removeClass('plusMinus-disabled');
            return $this.removeAttr('disabled').removeClass('plusMinus-disabled').addClass('plusMinus-enabled');
        },
        disable: function () {
            var $this = $(this),
                    data = $this.data('plusMinus');
            if ($this.hasClass('plusMinus-disabled'))
                return $this;
            if (data.next) {
                if (data.next.is(':disabled'))
                    data.next.data('plusminusDisabledC', true);
                else
                    data.next.data('plusminusDisabledC', false);
            }
            if (data.prev) {
                if (data.prev.is(':disabled'))
                    data.prev.data('plusminusDisabledC', true);
                else
                    data.prev.data('plusminusDisabledC', false);
            }
            return $this.removeClass('plusMinus-enabled').add(data.next).add(data.prev).attr('disabled', 'disabled').addClass('plusMinus-disabled');
        },
        _valF: function (val, divider) {
            return val.toString().indexOf('.') === -1 ? val : val.toString().replace('.', divider);
        },
        _valS: function (val, divider) {
            return val.toString().indexOf(divider) === -1 ? val : val.toString().replace(divider, '.');
        },
        _setCursorPosition: function (pos, change) {
            if (!isTouch && !change)
                this.each(function () {
                    this.select();
                    try {
                        this.setSelectionRange(pos, pos);
                    } catch (err) {
                    }

                });
            return this;
        },
        _getCursorPosition: function () {
            var el = $(this).get(0),
                    pos = 0;
            if ('selectionStart' in el) {
                pos = el.selectionStart;
            } else if ('selection' in document) {
                el.focus();
                var Sel = document.selection.createRange();
                Sel.moveStart('character', -el.value.length);
                pos = Sel.text.length - document.selection.createRange().text.length;
            }
            return pos;
        },
        _nextValue: function (value, next) {
            var input = $(this),
                    data = input.data('plusMinus'),
                    lZeroS = data.step.toString().split('0').length - 1;

            return (value + (next ? data.step : -data.step)).toFixed(lZeroS);
        },
        _changeCount: function (opt) {
            var el = $(this),
                    data = opt.input.data('plusMinus'),
                    limit = opt.next ? data.max : data.min,
                    curVal = +methods.getValue.call(opt.input),
                    lZeroS = data.step.toString().split('0').length - 1,
                    nextVal = methods._nextValue.call(opt.input, curVal, opt.next);

            if (!opt.next) {
                var difVal = +((data.precision ? (curVal - data.min) % data.step : parseFloat((curVal - data.min) % data.step)).toFixed(lZeroS));

                if (difVal > 0)
                    nextVal = curVal - difVal;
                if (difVal < 0)
                    nextVal = data.min;
                nextVal = (+nextVal).toFixed(lZeroS);
            }

            if (nextVal <= limit && opt.next || nextVal >= limit && !opt.next) {
                methods._enabled.call(opt.next ? data.prev : data.next);
                methods.setValue.call(opt.input, nextVal, true);
            }
            else if (data.overflow)
                methods.setValue.call(opt.input, opt.next ? data.min : data.max, true);

            methods._setCursorPosition.call(opt.input, opt.input.val().length);

            if ((nextVal === limit && opt.next || nextVal === limit && !opt.next) && !data.overflow)
                methods._disabled.call(el);
            return el;
        },
        _enabled: function () {
            return $(this).removeAttr('disabled').removeClass('plusMinus-disabled').addClass('plusMinus-enabled');
        },
        _disabled: function () {
            var $this = $(this),
                    data = $this.data('plusMinus');
            if (data && data.interval) {
                clearTimeout(data.interval[0]);
                clearInterval(data.interval[1]);
            }
            return $this.attr('disabled', 'disabled').addClass('plusMinus-disabled').removeClass('plusMinus-enabled');
        },
        _checkBtn: function (type) {
            var btn = $(this),
                    regS = '',
                    regM = '';
            $.each(type, function (i, v) {
                regS = v.match(/\(.*\)/);
                if (regS !== null) {
                    regM = regS['input'].replace(regS[0], '');
                    regS = regS[0].substring(1, regS[0].length - 1);
                }
                if (regS === null)
                    regM = v;
                btn = btn[regM](regS);
            });
            return btn;
        },
        _isNumber: function (number) {
            return !isNaN(parseFloat(number)) && isFinite(number);
        }
    };
    $.fn.plusMinus = function (method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on $.plusMinus');
        }
    };
    $.plusMinusInit = function () {
        this.nS = 'plusMinus';
        this.method = function (m) {
            if (!/_/.test(m))
                return methods[m];
        };
        this.methods = function () {
            var newM = {};
            for (var i in methods) {
                if (!/_/.test(i))
                    newM[i] = methods[i];
            }
            return newM;
        };
        this.dP = {
            prev: 'prev()',
            next: 'next()',
            step: 1,
            factor: 50,
            delay: 200,
            value: 0,
            pattern: /^-{0,1}\d*\.{0,1}\d*$/,
            divider: '.',
            min: -Infinity,
            max: Infinity,
            mouseDownChange: true,
            precision: false,
            before: null,
            after: null,
            prefix: null,
            sufix: null,
            overflow: false
        };
        this.setParameters = function (options) {
            $.extend(this.dP, options);
        };
    };
    $.plusMinus = new $.plusMinusInit();
    $(document).ready(function () {
        $('[data-rel="plusMinus"]').plusMinus();
    });
})($, document.createTouch !== undefined);
/*/plugin plusminus end*/