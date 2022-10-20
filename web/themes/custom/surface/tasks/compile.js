// Include gulp
const { src, dest } = require('gulp');

// Include Our Plugins
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

// Export our tasks.
module.exports = {

  // Compile CSS.
  compileCSS: function() {
    return src([
      './src/patterns/**/*.css',
      './src/styleguide/*.css',
      '!./src/patterns/base/props/*.css',
      '!./src/patterns/base/elements/*.css'
    ])
      .pipe(plumber())
      .pipe(postcss())
      .pipe(rename(function(path) {
        path.dirname = '';
        path.extname = '.css';
        return path;
      }))
      .pipe(dest('./dist/css'));
  },

  // Compile JavaScript.
  compileJS: function() {
    return src(['./src/patterns/**/*.js'], { base: './' })
      .pipe(babel())
      .pipe(rename(function(path) {
        path.dirname = '';
        return path;
      }))
      .pipe(dest('./dist/js'));
  }
};
