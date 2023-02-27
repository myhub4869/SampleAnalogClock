const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/assets/js/serviceWorker.js',
        {
          scope: '/assets/js/',
        }
      );
      console.log(registration);
      if (registration.installing) {
        console.log('Service worker installing');
        navigator.serviceWorker.register('/assets/js/serviceWorker.js').then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
          // Service Workerの登録に失敗したときの処理をここに記述します。
          console.log('ServiceWorker registration failed: ', err);
        })
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
registerServiceWorker();
