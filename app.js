//alert('hello');

const moment = require('moment')

const start = new Date();

setInterval(function(){
    var timeElmt = document.getElementById("time");
    timeElmt.innerHTML = moment(start).fromNow();
}, 1000 );
