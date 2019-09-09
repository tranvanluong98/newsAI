const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          oneOf: [
            {
              resourceQuery: /^\?raw$/,
              use: [
                {
                  loader: 'style-loader', // creates style nodes from JS strings
                },
                {
                  loader: 'css-loader', // translates CSS into CommonJS
                },
                {
                  loader: 'less-loader', // compiles Less to CSS
                  options: {
                    javascriptEnabled: true,
                  },
                },
              ],
            },
            {
              use: [
                {
                  loader: 'style-loader', // creates style nodes from JS strings
                },
                {
                  loader: 'css-loader', // translates CSS into CommonJS
                  options: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                  },
                },
                {
                  loader: 'less-loader', // compiles Less to CSS
                  options: {
                    javascriptEnabled: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  });
};
