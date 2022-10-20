module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-advanced-variables')(),
    require('postcss-nested')(),
    require('postcss-preset-env')({stage: 1, features: {'logical-properties-and-values': false}}),
    require('autoprefixer')(),
  ]
};
