module.exports = function (cfg) {
  const dev = cfg.env === 'development';

  return {
    map: dev ? { inline: true } : false,
    plugins: [
      require('postcss-nested'),
      require('postcss-sort-media-queries'),
      require('autoprefixer'),
      require('postcss-import'),
      dev ? null : require('cssnano')({ preset: 'default' }),
    ],
  };
};
