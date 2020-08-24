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
    const targetRule = config.module.rules.filter(rule => {
      return rule.use && rule.use[0] && rule.use[0].loader === 'babel-loader';
    })[0];

    if (targetRule) {
      // 排除子项目中的 node_mudules 目录
      targetRule.exclude.push(
        path.resolve(__dirname, '../packages/TODO/node_modules'),
      );
    }

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