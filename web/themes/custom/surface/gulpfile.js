'use strict';

// Include gulp helpers.
const { series, parallel, watch } = require('gulp');

// Include Pattern Lab and config.
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/core')(config);

// Include BroswerSync.
const server = require('browser-sync').create();

// Include Our tasks.
const { cleanCSS, cleanFonts, cleanImages, cleanJS } = require('./tasks/clean');
const { copyFonts } = require('./tasks/copy');
const { compressAssets } = require('./tasks/compress');
const { lintCSS, lintJS } = require('./tasks/lint');
const { compileCSS, compileJS } = require('./tasks/compile');
const { prettyCSS } = require('./tasks/prettify');
const { minifyCSS, minifyJS } = require('./tasks/minify');
const { combineCSS, combineJS } = require('./tasks/combine');

// Clean all directories.
exports.clean = parallel(cleanCSS, cleanFonts, cleanImages, cleanJS);

// Copy all fonts.
exports.copy = copyFonts;

// Compress Assets.
exports.compress = compressAssets;

// Lint Our CSS and JS
exports.lint = parallel(lintCSS, lintJS);

// Compile Our CSS and JS
exports.compile = parallel(compileCSS, compileJS);

// Prettify Our CSS
exports.prettify = prettyCSS;

// Combine Our CSS and JS
exports.combine = parallel(combineCSS, combineJS);

// Minify Our CSS and JS
exports.minify = parallel(minifyCSS, minifyJS);

// Start browsersync server.
function serve(done) {
  // See https://browsersync.io/docs/options for more options.
  server.init({
    // We want to serve both the patternlab directory, so it gets
    // loaded by default AND three directories up which is the
    // Drupal core directory. This allows urls that reference
    // Drupal core JS files to resolve correctly.
    // i.e. /core/misc/drupal.js
    server: ['./patternlab/', '../../../'],
    notify: false,
    open: false
  });
  done();
}

// Start Pattern Lab build watch process.
function watchPatternlab(done) {
  patternlab
    .build({
      cleanPublic: config.cleanPublic,
      watch: true
    })
    .then(() => {
      done();
    });
}

// Build Pattern Lab.
function buildPatternlab(done) {
  patternlab
    .build({
      cleanPublic: config.cleanPublic,
      watch: false
    })
    .then(() => {
      done();
    });
}

// Watch CSS and JS files for changes.
function watchFiles() {
  watch(
    [
      './src/patterns/**/**/*.css',
      './src/styleguide/**/*.css'
    ],
    series(parallel(lintCSS, compileCSS), combineCSS, (done) => {
      server.reload('*.css');
      done();
    })
  );

  watch(
    './src/patterns/**/**/*.js',
    series(
      parallel(cleanJS, lintJS, compileJS), combineJS, (done) => {
        server.reload('*.js');
        done();
      }
    )
  );

  watch(
    './src/patterns/**/**/*{.png,.jpg,.svg}',
    series(
      parallel(compressAssets), (done) => {
        server.reload('*{.png,.jpg,.svg,.html}');
        done();
      }
    )
  );

  watch(
    './src/patterns/**/**/*{.twig,.yml}',
    series(
      parallel(buildPatternlab), (done) => {
        server.reload('*{.html}');
        done();
      }
    )
  );

  // Reload the browser after patternlab updates.
  patternlab.events.on('patternlab-build-end', () => {
    server.reload('*.html');
  });
}

// Watch task that runs a browsersync server.
exports.watch = series(
  parallel(cleanCSS, cleanJS),
  parallel(copyFonts),
  parallel(compressAssets),
  parallel(lintCSS, lintJS),
  parallel(compileCSS, compileJS),
  parallel(combineCSS, combineJS),
  series(watchPatternlab, serve, watchFiles)
);

// Build task that prepares everything for deployment.
exports.release = series(
  parallel(cleanCSS, cleanJS),
  parallel(copyFonts),
  parallel(compressAssets),
  parallel(lintCSS, lintJS),
  parallel(compileCSS, compileJS),
  parallel(prettyCSS),
  parallel(combineCSS, combineJS),
  parallel(minifyCSS, minifyJS),
  parallel(buildPatternlab)
);
