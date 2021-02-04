var timer;
var sec_hand;
var min_hand;
var hour_hand;

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getMeta( name, content ) {
    var meta;
    meta = document.createElement( "meta" );
    meta.setAttribute( "name", name );
    meta.setAttribute( "content", content );
    return meta;
}

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
    readTextFile( "./manifest.webmanifest", function( text ) {
        var data = JSON.parse(text);
        var head = document.getElementsByTagName("head")[0];
        head.appendChild( getMeta( "apple-mobile-web-app-title", data.name ) );
        head.appendChild( getMeta( "mobile-web-app-title", data.name ) );

        var display = ( data.display === "standalone" ) ? "yes" : "no";
        head.appendChild( getMeta( "apple-mobile-web-app-capable", display ) );
        head.appendChild( getMeta( "mobile-web-app-capable", display ) );

        var statusBar = ( data.status_bar === "" ) ? "default" : data.status_bar;
        head.appendChild( getMeta( "apple-mobile-web-app-status-bar-style", statusBar ) );
        head.appendChild( getMeta( "mobile-web-app-status-bar-style", statusBar ) );

        data.icons.forEach(function(element){
            var meta = document.createElement( "link" );
            for (let [key, value] of Object.entries(element)) {
                meta.setAttribute( key, value );
            }
            head.appendChild( meta );
        });
    });

    sec_hand = document.getElementById( "sec_hand" );
    min_hand = document.getElementById( "min_hand" );
    hour_hand = document.getElementById( "hour_hand" );
    getClock();
});
