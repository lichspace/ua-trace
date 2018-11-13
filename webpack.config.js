const path = require('path');

module.exports = env=>{

    let devConfig = {};
    if(env.NODE_ENV==='development'){
        devConfig = {...{
                devtool:'inline-source-map',
                devServer: {
                    index:'index.html',
                    contentBase: ['./example','./dist']
                },
            }};
    }

    return {
        mode:env.NODE_ENV,
        entry: {index:'./src/index.js'},
        ...devConfig,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        // eslint options (if necessary)
                        configFile:'./.eslintrc.json'
                    }
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            publicPath:'/example/'
        },
    }
};