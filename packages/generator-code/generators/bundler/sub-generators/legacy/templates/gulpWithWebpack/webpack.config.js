const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {

  console.log(`Build use : ${env.build}`);

  const prodMode = env.build === 'prod';

  const config = {
    mode: prodMode ? 'production' : 'development',

    optimization: {
      splitChunks: false,
    },

    output: {
      filename: '[name].min.js',
      chunkFilename: '[name].min.js',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('autoprefixer')(),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
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

    devtool: 'cheap-module-eval-source-map',

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
      }),
      new ManifestPlugin({
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
