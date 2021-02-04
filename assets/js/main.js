var timer;
var sec_hand;
var min_hand;
var hour_hand;

function getClock() {
    var now = new Date();
    var degH = ( now.getHours() * (360 / 12) + now.getMinutes() * (360 / 12 / 60) + 90);
    var degM = ( now.getMinutes() * (360 / 60) ) + 90;
    var degS = ( now.getSeconds() * (360 / 60) ) + 90;

    sec_hand.style.transform = `rotate(${degS}deg)`;
    min_hand.style.transform = `rotate(${degM}deg)`;
    hour_hand.style.transform = `rotate(${degH}deg)`;

    timer = setTimeout(function() {
        getClock();
    }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
    sec_hand = document.getElementById( "sec_hand" );
    min_hand = document.getElementById( "min_hand" );
    hour_hand = document.getElementById( "hour_hand" );
    getClock();
});
