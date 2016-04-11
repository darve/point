
'use strict';

/**
 * Sort the star indexes in order of which is highest
 */

var
    data = require('../data/x.js'),
    jf = require('jsonfile'),
    Vec = require('../modules/Vec.js'),

    temp = [],
    sortable = [],
    res = [];

for ( var i = 0, l = data.length; i < l; i +=2 ) {
    temp.push(new Vec(data[i], data[i+1]));
}

for ( var i in temp ) {
    sortable.push([temp[i].index, temp[i].distance]);
}

temp.sort(function(a,b) {
    return a.y - b.y;
});

for ( var i in temp ) {
    res.push(temp[i].x);
    res.push(temp[i].y);
}

jf.writeFile('../data/lowest.js', res, function(err) {
    console.log(err);
});
