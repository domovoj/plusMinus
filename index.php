<!DOCTYPE html>
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset = "UTF-8">
        <meta name = "viewport" content = "width=device-width, initial-scale=1.0">
        <style>
            *{margin: 0;padding: 0;}
            body{padding: 10px;}

        </style>
        <script src="jquery.js"></script>
        <script src="plusminus.js"></script>
    </head>
    <body>
        <h1>Simple Plusminus</h1>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus">
        <button type="button">
            +
        </button>
        <!--------------------->
        <h1>Plusminus with min and max values [-5;+5]</h1>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" data-min="-5" data-max="5">
        <button type="button">
            +
        </button>
        <!--------------------->
        <h1>Plusminus with step 10</h1>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" data-min="-5" data-max="50" data-step="10" value="0">
        <button type="button">
            +
        </button>
        <!--------------------->
        <h1>Plusminus with step 0.01</h1>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" data-min="-5" data-max="50" data-step="0.01" value="-5">
        <button type="button">
            +
        </button>
        <!--------------------->
        <h1>Plusminus with step with divider "|"</h1>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" data-min="-5" data-max="50" data-step="0.01" value="5" data-divider="|">
        <button type="button">
            +
        </button>
        <!--------------------->
        <h1>Plusminus without autochange count when press mousedown</h1>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" data-min="-5" data-max="50" data-step="0.01" value="5" data-divider="|" data-mouse-down-change="false">
        <button type="button">
            +
        </button>
        <!--------------------->
        <h1>Plusminus with specific buttons prev and next</h1>
        <button type="button" id="prev">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" id="specButtons" data-min="-5" data-max="50" data-step="0.01" value="5" data-divider="|" data-mouse-down-change="false">
        <button type="button" id="next">
            +
        </button>
        <!--------------------->
        <h1>Plusminus with string chain jQuery's - set</h1>
        <input type="text" class="plusMinus plus-minus" id="specButtons2" data-min="-5" data-max="50" data-step="0.01" value="5" data-divider="|" data-mouse-down-change="false">
        <div class="frame-buttons">
            <button type="button">
                -
            </button>
            <button type="button">
                +
            </button>
        </div>
        <!--------------------->
        <h1>Plusminus delay before autochange of count</h1>
        data-delay="1000"<br/>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" data-min="-5" data-max="50" data-step="0.01" value="5" data-divider="|" data-delay="1000">
        <button type="button">
            +
        </button>
        <!--------------------->
        <h1>Plusminus speed autochange of count</h1>
        data-factor="500"<br/>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" data-min="-5" data-max="50" data-step="0.01" value="5" data-divider="|" data-factor="500">
        <button type="button">
            +
        </button>
        <!--------------------->
        <h1>Plusminus specific pattern (without mark "-")</h1>
        Must check data-value which is less suitable pattern<br/>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" data-min="-5" data-max="50" data-step="0.01" value="-5" data-divider="|" data-pattern="^\d*\.{0,1}\d*$" data-value="0">
        <button type="button">
            +
        </button>
        <!--------------------->
        <h1>Plusminus callbacks</h1>
        <button type="button">
            -
        </button>
        <input type="text" class="plusMinus plus-minus" id="callbacks" data-min="-5" data-max="50" data-step="0.01" value="-4.99" data-divider="|" data-before="function(){return prompt('before element say?');}" data-after="function(opt, res){alert('Before of element says - '+res.beforeEl);}">
        <button type="button">
            +
        </button>
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
                    return prompt('before option initaialization say?');
                },
                after: function(opt, res) {
                    alert('Before of option initialization says - ' + res.before);
                }
            })
        </script>
    </body>
</html>