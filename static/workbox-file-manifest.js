importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "css/code.css",
    "revision": "f5eb821ec75659bcf7d5ce5dc803165e"
  },
  {
    "url": "css/hugo-internal-templates.css",
    "revision": "af6f1617fd1cce39ee852315e812b802"
  },
  {
    "url": "css/social-icons.css",
    "revision": "c16a8da3ca128379e94d1df7e726f58c"
  },
  {
    "url": "css/styles.css",
    "revision": "3cb09b827efa20bf03463a6cd1b4d4d8"
  },
  {
    "url": "css/tachyons.css",
    "revision": "9576797805dfbcbfe9484ba27d6bc0e3"
  },
  {
    "url": "images/avatar-2.jpg",
    "revision": "24ebe37111bee2b053c794975e8b3c0f"
  },
  {
    "url": "images/avatar.jpg",
    "revision": "24ebe37111bee2b053c794975e8b3c0f"
  },
  {
    "url": "js/app.bundle.js",
    "revision": "8bb73cec2559a96e3f1473317e28d1b5"
  },
  {
    "url": "workbox-sw.js",
    "revision": "56e7590702f51dbd6e60a8480c38a593"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
