const CACHE_NAME = 'my-workshop-cache-v1';

// 6.
// var CACHE_NAME = "our-workshop-cache-v1";

const urlsToCache = [
  '/',
  '/css/tachyons.css',
  '/css/code.css',
  '/css/hugo-internal-templates.css',
  '/css/social-icons.css',
  '/images/cathedral.jpg',
  '/images/moscow.jpg'
];

// 2.
self.addEventListener('install', function(event) {
  // Perform install steps
  // console.log('Yahooooo!');
  // 3.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 4.
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         // if the resource is not found: go to network and fetch the resource from there
//         return fetch(event.request);
//       }
//     )
//   );
// });

// 5.
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        let fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(function(response) {
            // Check if we received a valid response and from our origin (type === 'basic')
            // Other types of responses: https://developer.mozilla.org/en-US/docs/Web/API/Response/type
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            let responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// 6.
// self.addEventListener('activate', function(event) {
//   console.log('Activating new service worker...');

//   const cacheWhitelist = ['our-workshop-cache-v1'];
//   const cacheName = 'my-workshop-cache-v1';

//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });