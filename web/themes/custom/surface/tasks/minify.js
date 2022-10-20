'use strict';

// Include gulp
const { src, dest } = require('gulp');

// Include Our Plugins.
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean-css');

// Export our tasks.
module.exports = {

  // Minify CSS
  minifyCSS: function() {
    return src('./dist/css/all.css', {"allowEmpty": true})
      .pipe(clean())
      .pipe(rename('all.min.css'))
      .pipe(dest('dist/css'));
  },

  // Minify JavaScript
  minifyJS: function() {
    return src('./dist/js/all.js', {"allowEmpty": true})
      .pipe(uglify())
      .pipe(rename('all.min.js'))
      .pipe(dest('dist/js'));
  }
};
