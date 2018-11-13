let delegate = require('delegate')

let uaTrace = () => {
    console.log('aa11111')
}
console.log(734343)
delegate('.b', 'click', function (e) {
    let target = e.delegateTarget
    console.log(target)
}, false)

module.exports = uaTrace
