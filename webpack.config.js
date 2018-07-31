module.exports = {
    entry: "./src/bootstrap.tsx",
    output: {
        filename: "./bundle.js",
    },
    devtool: "eval",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],
    },
};