module.exports = {
  "globDirectory": "static/",
  "globPatterns": [
    "**/*.{js,css,png,jpg}"
  ],
  "swDest": "static/workbox-file-manifest.js",
  "globIgnores": [
    "../workbox-cli-config.js",
    "bower_components/**/*",
    "sw.js",
    "pwabuilder-sw.js"
  ]
};
