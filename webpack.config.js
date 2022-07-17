const path = require('path')

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './vm/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vm.js'
    }
}