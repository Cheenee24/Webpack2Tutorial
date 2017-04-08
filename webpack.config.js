var path = require('path');
var webpack = require('webpack');
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
    publicPath: '/dist'
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
        /**check if css file**/
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
      }
    ]
  },
  plugins:[
    extractPlugin
    // /**dis plugins is to minfied the bundle code**/
    // new webpack.optimize.UglifyJsPlugin({
    //   //...
    // })

  ]
}
