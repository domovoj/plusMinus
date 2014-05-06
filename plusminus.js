/*plugin plusminus*/
(function($, isTouch) {
    var methods = {
        destroy: function() {
            var $this = $(this),
                    data = $this.data('plusMinus');
            if (data) {
                data.next.add(data.prev).off('mouseover.' + $.plusMinus.nS).off('click.' + $.plusMinus.nS).off('mouseup.' + $.plusMinus.nS).off('mousedown.' + $.plusMinus.nS).removeData('plusMinus');
                $this.off('keyup.' + $.plusMinus.nS).off('keypress.' + $.plusMinus.nS).removeData('plusMinus');
            }
            return $this;
        },
        init: function(options) {
            options = options || {};
            if (this.length > 0) {
                var settings = $.extend({}, $.plusMinus.dP, options);
                return this.each(function() {
                    var input = $(this),
                            data = input.data();
                    methods.destroy.call(input);
                    var opt = {};
                    for (var i in $.plusMinus.dP)
                        opt[i] = methods._checkProp.call([i], data, settings);
                    opt.next = typeof opt.next === 'string' ? methods._checkBtn.call(input, opt.next.split('.')) : opt.next;
                    opt.prev = typeof opt.prev === 'string' ? methods._checkBtn.call(input, opt.prev.split('.')) : opt.prev;
                    opt.callbacks = {
                        before: {
                            beforeG: $.plusMinus.dP.before,
                            before: options.before,
                            beforeEl: eval('(' + data.before + ')'),
                        },
                        after: {
                            afterG: $.plusMinus.dP.after,
                            after: options.after,
                            afterEl: eval('(' + data.after + ')')
                        }
                    };
                    delete opt.before;
                    delete opt.after;
                    input.data('plusMinus', opt);
                    methods.testNumber.call(input, true);
                    $(this).on('keypress.' + $.plusMinus.nS, function(e) {
                        methods.testNumber.call(input);
                    }).on('keyup.' + $.plusMinus.nS, function(e) {
//                        if (methods.SC)
//                            methods.testNumber.call(input);
                    });
                    if (settings.hover)
                        opt.next.add(opt.prev).on('mouseover.' + $.plusMinus.nS, function(e) {
                            settings.hover(e, $(this), input, $(this).is(opt.next) ? 'next' : 'prev');
                        });
                    var dP = {
                        input: input
                    };
                    if (opt.mouseDownChange)
                        dP.interval = [];
                    opt.next.data('plusMinus', $.extend({next: true}, dP));
                    opt.prev.data('plusMinus', $.extend({next: false}, dP));
                    opt.next.add(opt.prev).on('click.' + $.plusMinus.nS, function(e) {
                        methods._changeCount.call(this, $(this).data('plusMinus'));
                    }).on('mouseup.' + $.plusMinus.nS, function(e) {
                        if (!isTouch)
                            input.focus();
                    });
                    if (opt.mouseDownChange) {
                        opt.next.add(opt.prev).on('mousedown.' + $.plusMinus.nS, function(e) {
                            var _self = this,
                                    obj = $(_self).data('plusMinus');
                            obj.interval[0] = setTimeout(function() {
                                obj.interval[1] = setInterval(function() {
                                    methods._changeCount.call(_self, obj);
                                }, opt.factor);
                            }, opt.delay);
                        });
                        $(window).on('mouseup.' + $.plusMinus.nS, function(e) {
                            clearTimeout(opt.next.data('plusMinus').interval[0]);
                            clearInterval(opt.next.data('plusMinus').interval[1]);
                            clearTimeout(opt.prev.data('plusMinus').interval[0]);
                            clearInterval(opt.prev.data('plusMinus').interval[1]);
                        });
                    }
                });
            }
            return this;
        },
        plus: function() {
            var $this = $(this),
                    next = $this.data('plusMinus').next;
            methods._changeCount.call(next, next.data('plusMinus'));
            return $this;
        },
        minus: function() {
            var $this = $(this),
                    prev = $this.data('plusMinus').prev;
            methods._changeCount.call(prev, prev.data('plusMinus'));
            return $this;
        },
        getValue: function() {
            var $this = $(this),
                    data = $this.data('plusMinus'),
                    val = $this.val();
            return val.toString().indexOf(data.divider) === -1 ? val : val.toString().replace(data.divider, '.');
        },
        setValue: function(val, noChange) {
            var $this = $(this),
                    data = $this.data('plusMinus');
            val = val.toString().indexOf('.') === -1 ? val : val.toString().replace('.', data.divider);
            function _change() {
                $this.val(val).data('val', val);
            }
            if (!noChange) {
//                    var resB = {},
//                            resBA = [];
//                    for (var i in data.callbacks.before)
//                        if (data.callbacks.before[i]) {
//                            resB[i] = data.callbacks.before[i].call($this, data);
//                            resBA.push(resB[i]);
//                        }
//                    if ($.inArray(false, resBA) === -1 || resBA.length === 0) {
                _change();
//                        if (!noChange)
//                            for (var i in data.callbacks.after)
//                                if (data.callbacks.after[i])
//                                    data.callbacks.after[i].call($this, data, resB);
                //   }
            }
            else
                _change();
            return $this;
        },
        testNumber: function(start) {
            var input = $(this),
                    val = methods.getValue.call(input),
                    data = input.data('plusMinus');
            methods._enabled.call(data.next.add(data.prev));
            setTimeout(function() {
                console.log(val.toString().match(data.pattern))
                if (methods.getValue.call(input).toString().match(data.pattern))
                    methods.setValue.call(input, methods.getValue.call(input), start);
                else if (val.toString().match(data.pattern))
                    methods.setValue.call(input, val, start);
                else if (data.val && data.val.toString().match(data.pattern))
                    methods.setValue.call(input, data.val, start);
                else
                    methods.setValue.call(input, data.value, start);
                methods.checkMinMax.call(input, start);
            }, 0);
            return input;
        },
        checkMinMax: function(start) {
            var input = $(this),
                    val = methods.getValue.call(input),
                    data = input.data('plusMinus');
            if (val && +val <= data.min) {
                methods.setValue.call(input, data.min, start);
                methods._disabled.call(data.prev);
            }
            if (val && +val >= data.max) {
                methods.setValue.call(input, data.max, start);
                methods._disabled.call(data.next);
            }
            return input;
        },
        _nextValue: function(value, next) {
            var $this = $(this),
                    data = $this.data('plusMinus'),
                    val = next ? data.max : data.min,
                    lZeroS = data.step.toString().split('0').length - 1,
                    nextVal = +((isNaN(value) ? (data.min.toString() === "-Infinity" ? 0 : data.min) : value) + (next ? data.step : -data.step)).toFixed(lZeroS);
            if (!next && val !== -Infinity)
                nextVal = nextVal - (+((nextVal - val) % data.step).toFixed(lZeroS) === 0 ? 0 : +((nextVal - val) % data.step).toFixed(lZeroS) - data.step);
            nextVal = +nextVal.toFixed(lZeroS);
            return nextVal;
        },
        _changeCount: function(opt) {
            var el = $(this),
                    data = opt.input.data('plusMinus'),
                    obtn = opt.next ? data.prev : data.next,
                    val = opt.next ? data.max : data.min;
            var nextVal = methods._nextValue.call(opt.input, parseFloat(methods.getValue.call(opt.input)), opt.next);
            if (nextVal <= val && opt.next || nextVal >= val && !opt.next) {
                methods._enabled.call(obtn);
                methods.setValue.call(opt.input, nextVal);
                var pattern = methods._nextValue.call(opt.input, nextVal, opt.next).toString().match(data.pattern);
                if (nextVal === val || !pattern)
                    methods._disabled.call(el);
            }
            else if (opt.interval)
                methods._disabled.call(el);
            return el;
        },
        _enabled: function() {
            return $(this).removeAttr('disabled').removeClass('plusMinus-disabled').addClass('plusMinus-enabled');
        },
        _disabled: function() {
            var $this = $(this),
                    data = $this.data('plusMinus');
            if (data && data.interval) {
                clearTimeout(data.interval[0]);
                clearInterval(data.interval[1]);
            }
            return $this.attr('disabled', 'disabled').addClass('plusMinus-disabled').removeClass('plusMinus-enabled');
        },
        _checkBtn: function(type) {
            var btn = $(this),
                    regS = '',
                    regM = '';
            $.each(type, function(i, v) {
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
        _checkProp: function(elSet, opt) {
            var prop = this[0];
            if (!isNaN(parseFloat($.plusMinus.dP[prop])) && isFinite($.plusMinus.dP[prop]))
                return +((elSet[prop] !== undefined && elSet[prop] !== null ? elSet[prop].toString() : elSet[prop]) || (opt[prop] !== undefined && opt[prop] !== null ? opt[prop].toString() : opt[prop]));
            if ($.plusMinus.dP[prop] !== undefined && $.plusMinus.dP[prop] !== null && ($.plusMinus.dP[prop].toString().toLowerCase() === 'false' || $.plusMinus.dP[prop].toString().toLowerCase() === 'true'))
                return elSet[prop] !== undefined && elSet[prop] !== null ? ((/^true$/i).test(elSet[prop].toString().toLowerCase())) : (/^true$/i).test(opt[prop].toString().toLowerCase());
            else
                return elSet[prop] || (opt[prop] ? opt[prop] : false);
        }
    };
    $.fn.plusMinus = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on $.plusMinus');
        }
    };
    $.plusMinusInit = function() {
        this.nS = 'plusMinus';
        this.method = function(m) {
            if (!/_/.test(m))
                return methods[m];
        };
        this.methods = function() {
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
            before: null,
            after: null
        };
        this.setParameters = function(options) {
            $.extend(this.dP, options);
        };
    };
    $.plusMinus = new $.plusMinusInit();
})($, 'ontouchstart' in document.documentElement);
/*/plugin plusminus end*/