// stonesun.js
var GameManager = require('./GameManager.js')();

var passtime = function() {
    GameManager.incDate();
    setTimeout(passtime, 3000);
}

$(window).load(GameManager.init);
setTimeout(passtime, 3000);
