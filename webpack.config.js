module.exports = {
    module: {
        rules: [{
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
            }
            },
            {
                enforce: "pre",
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: ["source-map-loader"]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devtool: "source-map"
};