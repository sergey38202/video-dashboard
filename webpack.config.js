const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.s[ac]ss$/i, // SCSS Modules
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
              sourceMap: true, // Enable source maps if needed
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i, // Global SCSS
        exclude: /\.module\.s[ac]ss$/, // Exclude SCSS modules
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/, // CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    static: {
      directory: path.join(__dirname, 'public'),
      staticOptions: {
        extensions: ['js', 'wasm'],
      },
    },
  },
};
