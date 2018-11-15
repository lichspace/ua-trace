const debug = require('debug')('ua-trace')
let delegate = require('delegate')
let json = require('./lib/json')
let EventEmitter = require('events')
let Emitter = new EventEmitter()
//tool
let getDataFromDataSet = target=>{
    let data = target.dataset.uatrace
    if (!data) {
        return debug('no data-uatrace')
    }
    return json.parse(data)
}
let isObject = (val) => {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
//对象=>数组
let toPairs = obj=>{
    let arr = []
    for(let key in obj){
        arr.push([key,obj[key]])
    }
    return arr
}

class UATrace {

    constructor (config) {
        if (!isObject(config)||!config['_url']){
            throw new Error('ua-trace: config object must contain property [_url]')
        }
        this.config = { ...config }
        this.init()
    }

    get version(){
        return '1.0.0'
    }

    init (){
        debug('ua_trace welcome!')
    }

    subscribe(){
        Emitter.on('ua-trace-click',data=>{
            this.report({...data,...this.config})
        })
    }

    report(obj){
        if ( typeof(obj)==='object' ){
            this.imageSrcGet({...obj,...this.config})
        }
    }

    //过滤掉_url
    objToParams(params){
        let str = '';
        toPairs(params)
            .sort()
            .map(function(param) {
                if (param[1] !== undefined&&param[0]!=='_url') {
                    if (str !== '') str += '&';
                    str += param[0] + '=' + encodeURIComponent(param[1]);
                }
            });
        return str;
    }

    imageSrcGet(obj){
        let src = this.config._url+'?'+this.objToParams(obj)
        debug(src)
        new window.Image(1,1).src = src
    }

}

delegate('.ua-trace', 'click', function (e) {
    //console.log(e)
    let target = e.delegateTarget
    let data = getDataFromDataSet(target)
    if (!data) {
        return debug('no data-uatrace')
    }
    debug(data)
    Emitter.emit('ua-trace-click',data)
}, false)


module.exports  = UATrace
