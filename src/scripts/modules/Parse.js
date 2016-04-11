
var Q       = require('q'),
    Vec     = require('./Vec');

module.exports = (function() {

    'use strict';

    var api = {},
        config = {},

        cv = document.getElementById('parse'),
        cx = cv.getContext('2d'),

        img,
        imgdata,

        reds = [],
        blues = [],
        greens = [],
        alphas = [],
        lads = [],

        density = 12,
        scale = 1,
        c = 0,
        momentum = 100;

    function buildImage(d) {

        var p = 0;

        // x & y and eventual dimenions
        for ( var y = 0, yl = d.width; y < yl; y+=density ) {
            for ( var x = 0, xl = d.height; x < xl; x+=density ) {

                // Add colours to their arrays
                reds[c] = d.data[p];
                greens[c] = d.data[p+1];
                blues[c] = d.data[p+2];
                alphas[c] = d.data[p+3];

                // add positions
                if ( reds[c] === 0 ) {
                    lads.push(((config.width / 2)-(d.width/2))+x);
                    lads.push(((config.height / 2)-(d.height/2))+y);
                }

                p += (4 * density);
                c++;
            }
            p = (y * d.width) * 4;
        }
        return lads;
    }

    api.build = function (src) {
        var deferred = new Q.defer();
        config.width = window.innerWidth;
        config.height = window.innerHeight;

        cv.width = config.width;
        cv.height = config.height;
        img = new Image();

        img.onload = function(e){
            cx.drawImage(this, 0, 0);
            deferred.resolve(
                buildImage(
                    cx.getImageData(
                        0, 0, this.width, this.height
                    )
                )
            );
        };

        img.src = src;
        return deferred.promise;
    };

    return api;

    // bants.render = function() {

    //     bants.bg();
    //     // Move the vec dots closer to their end positions
    //     for ( var i = 0, l = c; i < l; i++ ) {

    //         var to = new Vec( dotsX[i], dotsY[i] ),
    //             from = new Vec( vecX[i], vecY[i] ),
    //             distance = from.minusNew( to ).magnitude(),
    //             mouse = new Vec( ev.pageX, ev.pageY );

    //         if ( from.isCloseTo( mouse, 120 ) ) {
    //             var angle = mouse.minusNew( from ).normalise();
    //             from.minusEq( angle.multiplyEq(10) );
    //             vecX[i] = from.x;
    //             vecY[i] = from.y;

    //         } else if ( !from.equals(to) ) {
    //             var angle = to.minusNew( from ).normalise();
    //             from.plusEq( angle.multiplyEq(distance/60) );

    //             if ( !from.isCloseTo( mouse, 120) ) {
    //                 vecX[i] = from.x;
    //                 vecY[i] = from.y;
    //             }
    //         }
    //     }

    //     // Draw the dots
    //     for ( var i = 0, l = c; i < l; i++ ) {
    //         cx.fillStyle = 'rgba(' + reds[i] + ',' + greens[i] + ',' + blues[i] + ',1)';
    //         cx.fillRect( vecX[i], vecY[i], density, density );
    //     }
    // };

})();
