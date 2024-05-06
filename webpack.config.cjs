const path = require('path');

module.exports = {
  entry: './src/EmberNexus.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    }
  },
  performance: {
    hints: false
  }
};
