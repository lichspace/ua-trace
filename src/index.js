const debug = require('debug/dist/debug')('ua-trace')
let delegate = require('delegate')
let json = require('./lib/json')
let inview = require('./lib/invew')
let debounce = require('./lib/debounce')
let EventEmitter = require('events')
let Emitter = new EventEmitter()
let debugColors = require('./lib/colors')

// tool
let getDataFromDataSet = target => {
    let data = target.getAttribute('data-ua-trace')
    if (!data) {
        return debug('no data-ua-trace')
    }
    return json.parse(data)
}
let isObject = (val) => {
    return val != null && typeof val === 'object' && Array.isArray(val) === false
}
// 对象=>数组
let toPairs = obj => {
    let arr = []
    for (let key in obj) {
        arr.push([key, obj[key]])
    }
    return arr
}

class UATrace {
    constructor (option,config = {}) {
        if (!isObject(option) || !isObject(config)) {
            throw new Error('ua-trace: option and config must be object')
        }
        if (!option.url) {
            throw new Error('ua-trace: option must contain property [url]')
        }
        this.option = option
        this.config = config
    }

    static debug (close) {
        let ls = window.localStorage
        if (ls) {
            close === false ? ls.removeItem('debug') : ls.setItem('debug', 'ua-trace')
        }
    }

    static trigger () {
        show()
    }

    update (config) {
        this.config = config
    }
    // 数据接收并处理->report
    subscribe (cb) {
        Emitter.on('reportAll', (data, type) => {
            let newData = cb ? cb(data, type) : data
            newData && this.reportDirect(newData, type)
        })
    }

    report (obj, type) {
        Emitter.emit('reportAll', obj, type || 'js')
    }

    reportDirect (obj, type) {
        if (typeof (obj) === 'object') {
            let newData = { ...this.config, ...obj }
            debug(`%c report：${type || 'JS'} `, debugColors.success, newData)
            this.imageSrcGet(newData)
        }
    }

    // 过滤掉_url,下划线开头为内置变量
    objToParams (params) {
        let str = ''
        toPairs(params)
            .sort()
            .map(function (param) {
                if (param[1] !== undefined) {
                    if (str !== '') str += '&'
                    str += param[0] + '=' + encodeURIComponent(param[1])
                }
            })
        return str
    }

    imageSrcGet (obj) {
        obj._rand = new Date().getTime()
        let src = this.option.url + '?' + this.objToParams(obj)
        if (this.option.method === 'post' && window.navigator.sendBeacon) {
            window.navigator.sendBeacon(this.option.url, JSON.stringify(obj))
        } else {
            new window.Image(1, 1).src = src
        }
    }
}

let selector = '*[data-ua-trace]'
delegate(selector, 'click', function (e) {
    // console.log(e)
    let target = e.delegateTarget
    let data = getDataFromDataSet(target)
    Emitter.emit('reportAll', data, 'click')
}, false)

let show = () => {
    let elms = document.querySelectorAll(selector)
    Array.prototype.slice.call(elms).map(elm => {
        // 没曝光过，并且有data-uatrace,可见
        if (!elm.exposed && inview(elm)) {
            let data = getDataFromDataSet(elm)
            Emitter.emit('reportAll', data, 'expose')
            elm.exposed = 1
        }
    })
}

document.addEventListener('DOMContentLoaded', show)
window.addEventListener('scroll', debounce(show))
window.addEventListener('resize', debounce(show))

module.exports = UATrace
