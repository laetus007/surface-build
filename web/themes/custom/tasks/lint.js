'use strict';

// Include gulp
const { src } = require('gulp');

// Include Our Plugins
const stylelint = require('@ronilaukkarinen/gulp-stylelint');
const eslint = require('gulp-eslint');

// Export our tasks.
module.exports = {

  // Lint CSS based on .stylelintrc.yml config.
  lintCSS: function () {
    return src(['./src/patterns/**/*.css'])
      .pipe(
        stylelint({
          reporters: [
            {
              formatter: 'string',
              console: true
            }
          ]
        })
      );
  },

  // Lint JavaScript based on .eslintrc config.
  lintJS: function() {
    return src([
      './src/patterns/**/*.js'
    ])
      .pipe(eslint())
      .pipe(eslint.format());
  }
};
