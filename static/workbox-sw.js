importScripts('workbox-file-manifest.js');

workboxSW.precache([
  {
    "url": "images/about.jpg",
    "revision": "f5eb821ec75659bcf7d5ce5dc8031651"
  },
  {
    "url": "images/calendar.jpg",
    "revision": "af6f1617fd1cce39ee852315e812b801"
  },
  {
    "url": "images/cathedral.jpg",
    "revision": "c16a8da3ca128379e94d1df7e726f581"
  },
  {
    "url": "images/contact.jpg",
    "revision": "3cb09b827efa20bf03463a6cd1b4d4d1"
  },
  {
    "url": "images/moscow.jpg",
    "revision": "9576797805dfbcbfe9484ba27d6bc0e1"
  }
]);

workboxSW.router.registerRoute('https://farm5.staticflickr.com/(.*)',
workboxSW.strategies.cacheFirst({
  cacheName: 'flickr-images',
  cacheExpiration: {
    maxEntries: 20
  },
  cacheableResponse: {statuses: [0, 200]}
})
);

workboxSW.router.registerRoute('http://tachyons.io/(.*)',
workboxSW.strategies.cacheFirst({
cacheName: 'tachyons-images',
cacheExpiration: {
  maxEntries: 20
},
cacheableResponse: {statuses: [0, 200]}
})
);

// We want no more than 50 images in the cache. We check using a cache first strategy
workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
workboxSW.strategies.cacheFirst({
  cacheName: 'images-cache',
  cacheExpiration: {
    maxEntries: 50
  }
})
);

workboxSW.router.registerRoute(
  new RegExp('/'),
  workboxSW.strategies.staleWhileRevalidate(),
);