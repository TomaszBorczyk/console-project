const { join } = require('path');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "./bundle.js",
    },
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
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 3 version']
                                })
                            ]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                join(__dirname, 'src')
                            ]
                        }
                    }
                ]
            }
        ],
    },
};