self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
});
 
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});
 
// サービスワーカー有効化に必須
self.addEventListener('fetch', function(event) {});

self.addEventListener('push', function(event) {
  console.log('Push Notification received', event);
  var title = 'Push Notification';
  var options = {
    body: event.data.text(),
    icon: '/images/icon.png',
    badge: '/images/badge.png',
    actions: [
      {action: 'open', title: 'Open'},
      {action: 'dismiss', title: 'Dismiss'}
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('バイブレーションの例', {
          body: 'ブンブン! ブンブン!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}
