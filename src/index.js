let delegate = require('delegate')

let uaTrace = () => {
    console.log('aa')
}

delegate('.b', 'click', function (e) {
    let target = e.delegateTarget

}, false)

module.exports = uaTrace
