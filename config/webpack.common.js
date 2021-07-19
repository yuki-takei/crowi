/**
 * @author: Yuki Takei <yuki@weseek.co.jp>
 */
const webpack = require('webpack');

/*
 * Webpack Plugins
 */
const WebpackAssetsManifest = require('webpack-assets-manifest');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const helpers = require('../src/lib/util/helpers');

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = (options) => {
  return {
    mode: options.mode,
    entry: Object.assign({
      'js/boot':                      './src/client/js/boot',
      'js/app':                       './src/client/js/app',
      'js/admin':                     './src/client/js/admin',
      'js/nologin':                   './src/client/js/nologin',
      'js/legacy':                    './src/client/js/legacy/crowi',
      'js/legacy-presentation':       './src/client/js/legacy/crowi-presentation',
      'js/plugin':                    './src/client/js/plugin',
      'js/ie11-polyfill':             './src/client/js/ie11-polyfill',
      'js/hackmd-agent':              './src/client/js/hackmd-agent',
      'js/hackmd-styles':             './src/client/js/hackmd-styles',
      // styles
      'styles/style-app':             './src/client/styles/scss/style-app.scss',
      'styles/style-presentation':    './src/client/styles/scss/style-presentation.scss',
      // themes
      'styles/theme-default':         './src/client/styles/scss/theme/default.scss',
      'styles/theme-nature':          './src/client/styles/scss/theme/nature.scss',
      'styles/theme-mono-blue':       './src/client/styles/scss/theme/mono-blue.scss',
      'styles/theme-future':          './src/client/styles/scss/theme/future.scss',
      'styles/theme-kibela':          './src/client/styles/scss/theme/kibela.scss',
      'styles/theme-halloween':       './src/client/styles/scss/theme/halloween.scss',
      'styles/theme-christmas':          './src/client/styles/scss/theme/christmas.scss',
      'styles/theme-wood':          './src/client/styles/scss/theme/wood.scss',
      'styles/theme-island':      './src/client/styles/scss/theme/island.scss',
      'styles/theme-antarctic':      './src/client/styles/scss/theme/antarctic.scss',
      'styles/theme-spring':         './src/client/styles/scss/theme/spring.scss',
      'styles/theme-hufflepuff':         './src/client/styles/scss/theme/hufflepuff.scss',
      // styles for external services
      'styles/style-hackmd':          './src/client/styles/hackmd/style.scss',
    }, options.entry || {}), // Merge with env dependent settings
    output: Object.assign({
      path: helpers.root('public'),
      publicPath: '/',
      filename: '[name].bundle.js',
    }, options.output || {}), // Merge with env dependent settings
    externals: {
      // require("jquery") is external and available
      //  on the global var jQuery
      jquery: 'jQuery',
      emojione: 'emojione',
      hljs: 'hljs',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: ((options.resolve && options.resolve.modules) || []).concat([helpers.root('node_modules')]),
      alias: {
        '@root': helpers.root('/'),
        '@commons': helpers.root('src/lib'),
        '@client': helpers.root('src/client'),
        '@tmp': helpers.root('tmp'),
        '@alias/logger': helpers.root('src/lib/service/logger'),
        // replace bunyan
        bunyan: 'browser-bunyan',
      },
    },
    module: {
      rules: options.module.rules.concat([
        {
          test: /.jsx?$/,
          exclude: {
            test:    helpers.root('node_modules'),
            exclude: [ // include as a result
              { test: helpers.root('node_modules', 'growi-plugin-') },
              helpers.root('node_modules/growi-commons'),
              helpers.root('node_modules/codemirror/src'),
            ],
          },
          use: [{
            loader: 'babel-loader?cacheDirectory',
          }],
        },
        {
          test: /locales/,
          loader: '@alienfast/i18next-loader',
          options: {
            basenameAsNamespace: true,
          },
        },
        /*
         * File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader',
        },
        /* File loader for supporting fonts, for example, in CSS files.
        */
        {
          test: /\.(eot|woff2?|svg|ttf)([?]?.*)$/,
          use: 'null-loader',
        },
      ]),
    },
    plugins: options.plugins.concat([

      new WebpackAssetsManifest({ publicPath: true }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),

      // ignore
      new webpack.IgnorePlugin(/^\.\/lib\/deflate\.js/, /markdown-it-plantuml/),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      new LodashModuleReplacementPlugin({
        flattening: true,
      }),

      new webpack.ProvidePlugin({ // refs externals
        jQuery: 'jquery',
        $: 'jquery',
      }),

    ]),

    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    optimization: {
      namedModules: true,
      splitChunks: {
        cacheGroups: {
          style_commons: {
            test: /\.(sc|sa|c)ss$/,
            chunks: (chunk) => {
              // ignore patterns
              return chunk.name != null && !chunk.name.match(/style-|theme-|legacy-presentation/);
            },
            name: 'styles/style-commons',
            minSize: 1,
            priority: 30,
            enforce: true,
          },
          commons: {
            test: /(src|resource)[\\/].*\.(js|jsx|json)$/,
            chunks: (chunk) => {
              // ignore patterns
              return chunk.name != null && !chunk.name.match(/boot/);
            },
            name: 'js/commons',
            minChunks: 2,
            minSize: 1,
            priority: 20,
          },
          vendors: {
            test: /node_modules[\\/].*\.(js|jsx|json)$/,
            chunks: (chunk) => {
              // ignore patterns
              return chunk.name != null && !chunk.name.match(/boot|legacy-presentation|ie11-polyfill|hackmd-/);
            },
            name: 'js/vendors',
            minSize: 1,
            priority: 10,
            enforce: true,
          },
        },
      },
      minimizer: options.optimization.minimizer || [],
    },
    performance: options.performance || {},
    stats: options.stats || {},
  };
};
