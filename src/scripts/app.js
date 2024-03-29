
'use strict';

var
    Vec     = require('./modules/Vec'),
    M       = require('./modules/Math'),
    Utils   = require('./modules/Utils'),
    gfx     = require('./modules/Graphics'),
    Lad     = require('./modules/Lad'),
    Parse   = require('./modules/Parse'),
    PIXI    = require('pixi'),
    $       = require('jquery');
    // data    = require('./data/lowest');


(function(win, doc, c) {

    var stage,
        renderer,
        w = win.innerWidth,
        h = win.innerHeight,
        ev = {
            pageX: 0.1,
            pageY: 0.1
        },

        a = new Vec(0, 0),
        b = new Vec(0, 0),

        framecount = 1,
        index = 0,
        colourindex = 0,

        // These are all used for the main rendering loop
        now,
        then = Date.now(),
        interval = 1000/60,
        delta,

        data = [],
        colours = [],

        lads = [],
        layers = {};

    function ColorLuminance(hex, lum) {

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }

        return rgb;
    }

    function newLayer(colour) {
        layers[colour] = new PIXI.Container();
        layers[colour].position.x = 0;
        layers[colour].position.y = 0;
        layers[colour].width = window.innerWidth;
        layers[colour].height = window.innerHeight;
        stage.addChild(layers[colour]);
    }

    function render() {
        window.requestAnimationFrame(render);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            framecount++;
            then = now - (delta % interval);

            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            if ( index < (data.length) ) addLad();
            // console.log(ev.pageX);
            lads.forEach(function(lad, i) {

                lad.tick(ev.pageX, ev.pageY);

                if (!lad.awake()) {

                }

                // if ( framecount % 30 === 0 && framecount > 160 ) {
                //     var px = parseInt(lad.sprite.position.x, 10),
                //         py = parseInt(lad.sprite.position.y, 10),
                //         xlad = lad.sprite.position.x + M.rand(-5, 5),
                //         ylad = lad.sprite.position.y + M.rand(-5, 5);

                //     lad.queue('position', {
                //         speed: 60 + (Math.round(i / 20)),
                //         easing: 'easeInBack',
                //         end: {
                //             pos: {
                //                 x: xlad,
                //                 y: ylad
                //             }
                //         }
                //     });
                //     lad.queue('position', {
                //         speed: 60 + (Math.round(i / 20)),
                //         easing: 'easeInBack',
                //         end: {
                //             pos: {
                //                 x: px,
                //                 y: py
                //             }
                //         }
                //     });
                // }
            });

            renderer.render(stage);
        }
    }

    function addLad() {
        // var s = Math.floor(Math.random() * 8) + 10;
        var s = 16;

        var lad = new Lad({
            sprite: new PIXI.Sprite.fromImage('/assets/img/circle-white.png'),
            name: 'lad',
            viewscale: 1,
            offset: 0,
            initial: {
                pos: new Vec(w/2, h/2),
                // pos: new Vec(M.rand(0, w), M.rand(0, h)),
                width: s, height: s,
                rotation: 0,
                alpha: 1
            },
            original: {
                pos: new Vec(parseInt(data[index], 10)+0.1, parseInt(data[index+1], 10)+0.1),
                // width: Math.floor(Math.random() * 8) + 32, height: Math.floor(Math.random() * 8) + 32
                width: s, height: s,
                rotation: 1,
                alpha: Math.random()
            }
        });

        index += 2;

        lad.sprite.tint = colours[colourindex];
        lads.push(lad);

        if ( !(colours[colourindex] in layers) ) {
            newLayer(colours[colourindex]);
        }

        layers[colours[colourindex]].addChild(lad.sprite);

        lad.home('easeOutElastic', 60 + (Math.round(index / 20)));
        colourindex++;
    }

    function init() {

        stage = new PIXI.Container();
        renderer = new PIXI.WebGLRenderer(w, h, {
            view: c,
            backgroundColor: 0xF3F3F3,
            antialias: true
        });

        $(document).on('mousemove', function(e) {
            ev.pageX = e.pageX;
            ev.pageY = e.pageY;
        });

        $(document).on('click', function(e) {
            lads.forEach(function(v, i) {

                var xlad = v.sprite.position.x + M.rand(-5, 5),
                    ylad = v.sprite.position.y + M.rand(-5, 5);

                // debugger;

                v.queue('position', {
                    speed: 60 + (Math.round(i / 20)),
                    easing: 'easeInBack',
                    end: {
                        pos: {
                            x: xlad,
                            y: ylad
                        }
                    }
                });
            });
        });

        // for ( var i = 0, l = data.length; i < l; i+= 2) {
        // }

        // setTimeout(function() {
        //     lads.forEach(function(v, i) {

        //     });
        // }, 1000);

        // Start the rendering loop wahey oh yeah
        Parse.build('/assets/img/x.png').then(function(d) {
            data = d.lads;
            colours = d.colours;
            render();
        });

    }

    $(init);

})(window,document,document.querySelectorAll('canvas')[0]);
