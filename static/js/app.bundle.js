!function(n){function t(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};t.m=n,t.c=r,t.i=function(n){return n},t.d=function(n,r,e){t.o(n,r)||Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:e})},t.n=function(n){var r=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(r,"a",r),r},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="",t(t.s=1)}([function(n,t){},function(n,t,r){"use strict";var e=r(0);!function(n){n&&n.__esModule}(e)}]);

// IntersectionObserver
// const images = document.querySelectorAll('img');
const images = document.querySelectorAll('[lazy-load]');

// const config = {};

const config = {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 0px',
  threshold: 0
};

// The observer for the images on the page
let observer = new IntersectionObserver(onIntersection, config);

images.forEach(image => {
  observer.observe(image);
});

function onIntersection(entries) {
  // entries of type IntersectionObserverEntry
  entries.forEach(entry => {
    // 1. console.log(entry);
    // Are we in viewport?
    if (entry.intersectionRatio > 0) {
      // Stop watching and load the image
      observer.unobserve(entry.target);
      // console.log(`Image ${entry.target.src} is in the viewport!`);
      preloadImage(entry.target);
    }
  });
}

function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) {
    return;
  }
  img.src = src;
}