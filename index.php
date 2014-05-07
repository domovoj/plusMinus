<!DOCTYPE html>
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset = "UTF-8">
        <meta name = "viewport" content = "width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="bootstrap-theme.css"/>
        <script src="jquery.js"></script>
        <script src="plusminus.js"></script>
    </head>
    <body>
        <form class="form-inline" role="form" style="padding: 20px">
            <h3>Simple Plusminus</h3>
            <button type="button" class="btn btn-primary btn-sm" disabled="disabled">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus with min and max values [-5;+5]</h3>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" data-min="-5" data-max="5">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus with step 10</h3>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" data-min="-5" data-max="50" data-step="10" value="0">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus with step 0.01</h3>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" data-min="-5" data-max="50" data-step="0.01" value="-5">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus with step with custom divider - "|"</h3>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" data-min="-5" data-max="50" data-step="0.01" value="5" data-divider="|">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus without autochange count when press mousedown</h3>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" data-min="-5" data-max="50" data-step="0.01" value="5" data-mouse-down-change="false">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus with specific buttons prev and next</h3>
            <button type="button" id="prev" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" id="specButtons" data-min="-5" data-max="50" data-step="0.01" value="5">
            <button type="button" id="next" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus with string chain jQuery's - set</h3>
            <input type="text" class="plusMinus plus-minus form-control input-sm" id="specButtons2" data-min="-5" data-max="50" data-step="0.01" value="5">
            <span class="frame-buttons">
                <button type="button" class="btn btn-primary btn-sm">
                    -
                </button>
                <button type="button" class="btn btn-primary btn-sm">
                    +
                </button>
            </span>
            <!--------------------->
            <h3>Plusminus delay before autochange of count</h3>
            data-delay="1000"<br/>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" data-min="-5" data-max="50" data-step="0.01" value="5" data-delay="1000">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus speed autochange of count</h3>
            data-factor="500"<br/>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" data-min="-5" data-max="50" data-step="0.01" value="5" data-factor="500">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus specific pattern (without mark "-")</h3>
            Must check data-value which is less suitable pattern<br/>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" data-min="-5" data-max="50" data-step="0.01" value="-5" data-divider="|" data-pattern="^\d*\.{0,1}\d*$" data-value="0">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus callbacks</h3>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" id="callbacks" data-min="-5" data-max="50" data-step="0.01" value="-4.99" data-before="function(){return prompt('before change. Before element say?');}" data-after="function(opt, res){alert('after change. After of element says - '+res.beforeEl);}">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
            <!--------------------->
            <h3>Plusminus change value on hover</h3>
            <button type="button" class="btn btn-primary btn-sm">
                -
            </button>
            <input type="text" class="plusMinus plus-minus form-control input-sm" id="hover" data-min="-5" data-max="50" data-step="0.01" value="-4.99">
            <button type="button" class="btn btn-primary btn-sm">
                +
            </button>
        </form>
        <?php
        ?>
        <script type="text/javascript">
            $('.plusMinus').plusMinus();
            
            $('#specButtons').plusMinus({
                prev: $('#prev'),
                next: $('#next')
            });
            $('#specButtons2').plusMinus({
                prev: 'next().children(:eq(0))',
                next: 'next().children(:eq(1))'
            });

            $('#callbacks').plusMinus({
                before: function() {
                    return prompt('before change. Before option initaialization say?');
                },
                after: function(opt, res) {
                    alert('after change. After option initaialization say - ' + res.before);
                }
            });
            $('#hover').plusMinus({
                mouseenter: function(input, type) {
                    var iH = setInterval(function() {
                        input.plusMinus(type);
                    }, 500)
                    return iH;
                },
                mouseleave: function(input, type, res) {
                    clearInterval(res);
                }
            });
        </script>
    </body>
</html>