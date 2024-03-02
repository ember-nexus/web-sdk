const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/EmberNexus.ts',
    mode: "production",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.release.json'
                }
            }
        ],
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
      library: 'EmberNexusWebSDK',
      libraryTarget: 'umd',
      umdNamedDefine: true
  },
  performance: {
    hints: false
  },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    keep_classnames: true,
                    keep_fnames: true,
                },
                extractComments: false,
            }),
        ],
    },
};
