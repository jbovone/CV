const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerzerPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: ["./src/main.js"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contentHash].js',
    },
    optimization: {
        minimizer: [new TerzerPlugin(), new OptimizeCssAssetsWebpackPlugin()],
    },
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new HtmlWebpackPlugin({
        template: './index.html',
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
        }
    })],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'fonts'
                    }
                },
            },
            {
                test: /\.(svg|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img'
                    }
                },
            }

        ],
    }
}
