
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


(function(win, doc, c) {

    var stage,
        renderer,
        w = win.innerWidth,
        h = win.innerHeight,

        // These are all used for the main rendering loop
        now,
        then = Date.now(),
        interval = 1000/60,
        delta,

        lads = [],
        layer = new PIXI.Container();

        layer.position.x = 0;
        layer.position.y = 0;
        layer.width = window.innerWidth;
        layer.height = window.innerHeight;

    function render() {
        window.requestAnimationFrame(render);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);
            lads.forEach(function(lad, i) {
                lad.tick();
            });
            renderer.render(stage);
        }
    }

    function init() {

        stage = new PIXI.Container();
        renderer = new PIXI.WebGLRenderer(w, h, {
            view: c,
            backgroundColor: 0xFFFFFF,
            antialias: true
        });

        Parse.build('/assets/img/x-small.png').then(function(res){
            for ( var i = 0, l = res.length; i < l; i+= 2) {

                var lad = new Lad({
                    sprite: new PIXI.Sprite.fromImage('/assets/img/circle.png'),
                    name: 'lad',
                    viewscale: 1,
                    offset: 0,
                    initial: {
                        pos: new Vec(w/2, h/2),
                        width: 24, height: 24,
                        rotation: 0,
                        alpha: 0
                    },
                    original: {
                        pos: new Vec(parseInt(res[i], 10), parseInt(res[i+1], 10)),
                        width: 24, height: 24,
                        rotation: 0,
                        alpha: 1
                    }
                });

                lads.push(lad);
                stage.addChild(lad.sprite);
            }

            setTimeout(function() {
                lads.forEach(function(v, i) {
                    v.home('easeOutElastic', Math.random() * 300);
                });
            }, 1000);
        });
        stage.addChild(layer);

        // Start the rendering loop wahey oh yeah
        render();
    }

    $(init);

})(window,document,document.querySelectorAll('canvas')[0]);
