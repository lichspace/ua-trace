const path = require('path');

module.exports = env=>{

    let devConfig = {};
    if(env.NODE_ENV==='development'){
        devConfig = {...{
                devtool:'inline-source-map',
                devServer: {
                    index:'index.html',
                    contentBase: './example'
                },
            }};
    }

    return {
        mode:env.NODE_ENV,
        entry: {"ua-trace":'./src/index.js'},
        ...devConfig,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        // eslint options (if necessary)
                        fix:true,
                        configFile:'./.eslintrc.json'
                    }
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            library:'UATrace',
            libraryTarget:'umd'
        },
    }
}