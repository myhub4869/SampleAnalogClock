var weekAry = ["日", "月", "火", "水", "木", "金", "土"];
var timer;
var sec_hand;
var min_hand;
var hour_hand;
var dayArea;

function checkAltert() {
  console.log("checkAltert");
  setTimeout(function () {
    // Web Notifications APIが利用可能かチェック
    if (window.Notification && Notification.permission === 'granted') {
      // 通知を作成
      var notification = new Notification('タイマー通知', {
        body: '時間になりました！'
      });

      // 通知がクリックされた時の挙動を定義
      notification.onclick = function () {
        window.focus();
        this.close();
      };
    } else {
      // Web Notifications APIが利用できないか、許可されていない場合は、アラートを表示するなどの代替処理を行う
      alert('タイマー通知: 時間になりました！');
    }
  }, 10000); // 5000ミリ秒 = 5秒
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

function getMeta(name, content) {
  var meta;
  meta = document.createElement("meta");
  meta.setAttribute("name", name);
  meta.setAttribute("content", content);
  return meta;
}

function getClock() {
  var now = new Date();
  var degH = (now.getHours() * (360 / 12) + now.getMinutes() * (360 / 12 / 60));
  var degM = (now.getMinutes() * (360 / 60));
  var degS = (now.getSeconds() * (360 / 60));
  if (degH > 360) {
    degH -= 360;
  }
  if (degM > 360) {
    degM -= 360;
  }
  if (degS > 360) {
    degS -= 360;
  }

  hour_hand.style.transform = `rotate(${degH}deg)`;
  min_hand.style.transform = `rotate(${degM}deg)`;
  sec_hand.style.transform = `rotate(${degS}deg)`;

  var year = now.getFullYear();
  var mon = ("00" + now.getMonth()).slice(-2);
  var day = ("00" + now.getDate()).slice(-2);
  var week = weekAry[now.getDay()];

  dayArea.innerHTML = `<p>${year}.${mon}.${day}(${week})</p>`;

  if (now.getHours() >= 0 && now.getHours() <= 5) {
    document.querySelector('body').id = "morning";
  } else if (now.getHours() >= 6 && now.getHours() <= 12) {
    document.querySelector('body').id = "afternoon";
  } else if (now.getHours() >= 13 && now.getHours() <= 18) {
    document.querySelector('body').id = "evning";
  } else if (now.getHours() >= 19 && now.getHours() <= 23) {
    document.querySelector('body').id = "night";
  }

  timer = setTimeout(function () {
    getClock();
  }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
  readTextFile("./manifest.json", function (text) {
    var data = JSON.parse(text);
    var head = document.getElementsByTagName("head")[0];

    for (let [key, value] of Object.entries(data)) {
      console.log(key);
      console.log(value);
      if (key === "name") {
        head.appendChild(getMeta("apple-mobile-web-app-title", data.name));
        head.appendChild(getMeta("mobile-web-app-title", data.name));
      } else if (key === "status_bar") {
        var statusBar = (data.status_bar === "") ? "default" : data.status_bar;
        head.appendChild(getMeta("apple-mobile-web-app-status-bar-style", statusBar));
        head.appendChild(getMeta("mobile-web-app-status-bar-style", statusBar));
      } else if (key === "icons") {
        data.icons.forEach(function (element) {
          var meta = document.createElement("link");
          for (let [key, value] of Object.entries(element)) {
            meta.setAttribute(key, value);
          }
          head.appendChild(meta);
        });
      } else if (key === "serviceworker") {
        // var script;
        // script = document.createElement( "script" );
        // script.setAttribute( "src", value.src );
        // head.appendChild( script );
      } else {
        head.appendChild(getMeta(key, value));
      }
    }
    var display = (data.display === "standalone") ? "yes" : "no";
    head.appendChild(getMeta("apple-mobile-web-app-capable", display));
    head.appendChild(getMeta("mobile-web-app-capable", display));
  });

  sec_hand = document.getElementById("second");
  min_hand = document.getElementById("minutes");
  hour_hand = document.getElementById("hour");
  dayArea = document.getElementById("date");
  getClock();
});
