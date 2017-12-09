/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

'use strict';

const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const mergeStream = require('merge-stream');
const polymerBuild = require('polymer-build');
const babel = require('gulp-babel');
const PolymerProject = require('polymer-build').PolymerProject;
const config = require('./polymer.json');

const polymerProject = new PolymerProject(config);


const buildDirectory = 'static/polymer-elements/dist';
const destDirectory = 'static/polymer-elements/dist';

// Additional plugins can be used to optimize your source files after splitting.
// Before using each plugin, install with `npm i --save-dev <package-name>`
const htmlMinifier = require('gulp-html-minifier');

/**
 * Waits for the given ReadableStream
 */
function waitFor(stream) {
  return new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
}

function build() {
  return new Promise((resolve, reject) => {

    let sourceStreamSplitter = new polymerBuild.HtmlSplitter();
    let htmlStreamSplitter = new polymerBuild.HtmlSplitter();

    console.log(`Deleting ${buildDirectory} directory...`);
    del([buildDirectory])
      .then(() => {

        let sourcesStream = polymerProject.sources()
          .pipe(sourceStreamSplitter.split())
          .pipe(gulpif(/\.js$/, babel( {
            presets: [
              ["env", {
                "modules": false,
                "target": {"browsers": [">1%"]}
              }]
            ],
            compact: true,
            babelrc: false
          })))
          .pipe(gulpif(/\.html$/, htmlMinifier({
            "collapseWhitespace": true,
            "conservativeCollapse": true
          })))
          .pipe(sourceStreamSplitter.rejoin());

        let dependenciesStream = polymerProject.dependencies()
          .pipe(htmlStreamSplitter.split())
          .pipe(gulpif(/\.js$/, babel( {
            presets: [
              ["env", {
                "modules": false,
                "target": {"browsers": [">1%"]}
              }]
            ],
            compact: true,
            babelrc: false
          })))
          .pipe(gulpif(/\.html$/, htmlMinifier({
            "collapseWhitespace": true,
            "conservativeCollapse": true
          })))
          .pipe(htmlStreamSplitter.rejoin());

        let buildStream = mergeStream(sourcesStream, dependenciesStream)
          .once('data', () => {
            console.log('Analyzing build dependencies...');
          });

        buildStream = buildStream.pipe(polymerProject.bundler())
          .pipe(gulpif(function (file) {
            return file.relative === 'dist/app/index.html';
          }, gulp.dest('./')))
          .pipe(gulpif(function (file) {
              return file.relative === 'dist/reader/reader.html';
          }, gulp.dest('./'), gulp.dest(destDirectory)));

        return waitFor(buildStream);
      })
      .then(() => {
        console.log('Build complete!');
        resolve();
      });
  });
}

gulp.task('polymer', build);
