const path = require('path');

module.exports = {
  stories: [
    '../packages/**/*.stories.(ts|js|mdx)',
  ],

  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-storysource',
  ],

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};