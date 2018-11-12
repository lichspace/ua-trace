const path = require('path');

module.exports = env=>{

    let devConfig = {};
    if(env.NODE_ENV==='development'){
        devConfig.devtool = 'inline-source-map'
    }

    return {
        mode:env.NODE_ENV,
        entry: {index:'./src/index.js'},
        ...devConfig,
        devServer: {
            contentBase: './dist'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
                filename: '[name].js'
        }
    }
};