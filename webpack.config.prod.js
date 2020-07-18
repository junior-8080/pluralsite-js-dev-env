import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug:true,
  devtool:'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname,'src/vendor'),
    main: path.resolve(__dirname,'src/index')
  },
  target:'web',
  output: {
    path: path.resolve(__dirname,'dist'),
    publicPath:'/',
    filename: '[name].[chunkHash].js'
  },
  plugins: [

    //Hash the files uising MD5 so that thier na,es changes when the content changes.
    new WebpackMd5Hash(),
    //Create HTMl file that includes reference to bundle js.
    new HtmlWebpackPlugin({
      template:'src/index.html',
      minify:{
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject:true,
      // Porpertise defined here are available index.html
      trackJsToken:"15db7d53e699491d9bf85b4c91081ead",
    }),
    //use to create separate file for css.
    new ExtractTextPlugin('[name].[chunkhash].css'),
    // used to create separate bundle.
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),
    // Eliminate duplicate packages when generating bundle.
    new webpack.optimize.DedupePlugin(),
    //Minify Js.
    new webpack.optimize.UglifyJsPlugin()
  ],
    module: {
      loaders: [
        {test:/\.js$/,exclude:/node_modules/,loaders: ['babel']},
        {test:/\.css$/,loader: ExtractTextPlugin.extract('css?sourceMap')}
      ]
    }
}
