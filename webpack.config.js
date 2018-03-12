const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'dev') {
    console.log('run dev!')
    module.exports = require('./config/webpack.dev.conf.js')
}
if (TARGET === 'prod') {
    console.log('run prod!')
    module.exports = require('./config/webpack.prod.conf.js')
}

