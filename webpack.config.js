var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'prod.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!style-loader!css-loader!postcss-loader!sass-loader',
            'sass': 'vue-style-loader!style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      // {
      //   test: /\.(scss|css)$/,
      //   use: [
      //     {loader: "style-loader"}, 
      //     {loader: "css-loader"}, 
      //     {loader: 'postcss-loader'},
      //     {loader: "sass-loader",
      //       // options: {
      //       //     includePaths: ["absolute/path/a", "absolute/path/b"]
      //       // }
      //     }
      //   ]
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name].[ext]?[hash]',
          publicPath: 'dist/',
          // outputPath: 'dist/imgs/',
        }
      },
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url?limit=10000&mimetype=image/svg+xml'
      // },
      // { 
      //   test: /\.(woff|woff2|eot|ttf|svg)$/, 
      //   loader: 'file-loader?limit=100000' 
      // }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  //module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
