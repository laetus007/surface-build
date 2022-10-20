'use strict';

// Include gulp
const { src, dest } = require('gulp');

// Export our tasks.
module.exports = {

  // Copy Fonts
  copyFonts: function() {
    return src([
      './src/patterns/base/fonts/**/*',
      '!./src/patterns/base/fonts/*.css'
    ])
      .pipe(dest('dist/fonts'));
  }
};
