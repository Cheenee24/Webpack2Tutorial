var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin= require('clean-webpack-plugin');
/**this plugin will take the css code the put to separate css file**/
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname,'dist'),//use path because we need an absolute path
    filename: 'bundle.js',
    // publicPath: '/dist'
  },
  module:{
    /**to add rules in a modules**/
    rules:[
      {
        test: /\.js$/,
        /**we use long hand to define the loader options**/
        use:[
          {
            loader: 'babel-loader',
            options:{
              presets:['es2015']
            }
          }
        ]
      },
      {
        /**check if scss file**/
        test: /\.scss$/,
        /**
        * loader: to add a single loader
        * use: to add multiple loaders
        * note: it is very important to reverse the order of the loader
        *       because the last loader will be load first
        **/
        use: extractPlugin.extract({
          use:['css-loader','sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    /**this plugins is to clean or empty the specified folder**/
    new CleanPlugin(['dist'])
    // /**this plugins is to minfied the bundle code**/
    // new webpack.optimize.UglifyJsPlugin({
    //   //...
    // })

  ]
}
