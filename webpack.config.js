const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content.js',
    background: './src/background.js',
    popup: './src/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // Outputs content.js in dist/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: '.' },
        { from: 'src/popup.html', to: '.' },
        { from: 'src/options.html', to: '.' },
        { from: 'src/styles.css', to: '.' },
        { from: 'src/tokenizer.json', to: '.' },
        { from: 'src/tfjs_model', to: 'tfjs_model' },
        { from: 'src/images', to: 'images' }
      ],
    }),
  ],
  mode: 'production',
  optimization: {
    // Optional: Minimize the bundle size
    minimize: true,
  },
  resolve: {
    fallback: {
      // Include any Node.js modules that need to be polyfilled
      fs: false,
      path: false,
      crypto: false,
    },
  },
};