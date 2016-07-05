/**
 * Created by yeting on 16/6/23.
 */

module.exports = {
  entry: './index.js',
  output: {
    path: process.cwd(),
    filename: 'build.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime', 'typecheck', 'syntax-flow', 'transform-flow-strip-types'],
      },
    }, {
      test: /\.html$/,
      name: 'mandrillTemplates',
      loader: 'raw!html-minify',
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    }, {
      test: /\.svg$/,
      loader: 'svg-sprite',
      query: {
        name: '[name]',
        prefixize: true,
      },
    }],
  },
};
