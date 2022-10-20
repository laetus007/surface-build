// Include gulp
const { src, dest } = require('gulp');

// Include Our Plugins
const prettier = require('gulp-prettier');
const plumber = require('gulp-plumber');

// Export our tasks.
module.exports = {

  // Compile CSS.
  prettyCSS: function() {
    return src(['./dist/css/*.css'])
      .pipe(plumber())
      .pipe(prettier({ editorconfig: true }))
      .pipe(dest('./dist/css'));
  }
};
