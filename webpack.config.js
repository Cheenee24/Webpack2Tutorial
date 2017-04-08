var path = require('path');
var webpack = require('webpack');

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
        /**check if css file**/
        test: /\.css$/,
        /**
        * loader: to add a single loader
        * use: to add multiple loaders
        * note: it is very important to reverse the order of the loader
        *       because the last loader will be load first
        **/
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins:[
    /**dis plugins is to minfied the bundle code**/
    new webpack.optimize.UglifyJsPlugin({
      //...
    })

  ]
}
