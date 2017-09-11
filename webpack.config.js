const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public', 'js')
  }
}
