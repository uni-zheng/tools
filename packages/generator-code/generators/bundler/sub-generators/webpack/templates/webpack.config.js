const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = (env) => {

  env = {
    build: 'prod',
    ...env,
  };

  console.log(`Build use : ${env.build}`);

  const prodMode = env.build === 'prod';

  const config = {
    mode: prodMode ? 'production' : 'development',

    optimization: {
      splitChunks: false,
    },

    entry: './src/index.js',

    output: {
      filename: 'index.min.js',
      chunkFilename: 'index.min.js',
      path: path.resolve(__dirname, 'dist'),
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]-[hash:6].[ext]',
                outputPath: (file) => {
                  return 'resources/' + file;
                },
              },
            },
          ],
        },
      ],
    },

    devtool: 'source-map',

    plugins: [
      new WebpackManifestPlugin({
        fileName: 'compiledFile.json',
      }),
      new webpack.EnvironmentPlugin({
        build: env.build,
      }),
    ],
  };

  if (prodMode) {
    config.devtool = 'source-map';
  }

  return config;
};
