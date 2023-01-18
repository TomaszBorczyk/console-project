module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "./bundle.js",
    },
    mode: "development",
    devtool: "eval",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader" },
            {
                test: /\.scss?$/,
                use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            }
        ],
    },
};
