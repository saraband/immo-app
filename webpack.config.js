module.exports = {
  entry: ['babel-polyfill', './src/browser/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      Components: __dirname + '/src/browser/components',
      Actions: __dirname + '/src/browser/actions',
      Reducers: __dirname + '/src/browser/reducers',
      Utils: __dirname + '/src/utils'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2', 'stage-0'],
            plugins: ["transform-class-properties"]
          }
        }
      },
      {
        test:  /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {}
        }
      }
    ]
  },
  stats: {
    warnings: false
  },
  devtool: 'inline-source-map'
};