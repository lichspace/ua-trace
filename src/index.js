const debug = require('debug/dist/debug')('ua-trace')
let delegate = require('delegate')
let json = require('./lib/json')
let inview = require('./lib/invew')
let debounce = require('./lib/debounce')
let EventEmitter = require('events')
let Emitter = new EventEmitter()
let imageElement = new window.Image(1,1)
let debugColors = require('./lib/colors')

//tool
let getDataFromDataSet = target=>{
    let data = target.getAttribute('data-ua-trace')
    if (!data) {
        return debug('no data-ua-trace')
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
    }

    static version(){
        return '1.0.0'
    }

    static debug(close){
        let ls = window.localStorage
        if(ls){
            close===false?ls.removeItem('debug'):ls.setItem('debug','ua-trace')
        }
    }

    update(config){
        this.config = config
    }
    //数据接收并处理->report
    subscribe(cb){
        Emitter.on('reportAll',(data,type)=>{
            if(!isObject(data)) {
                console.warn('【ua-trace】data-ua-trace value cont parse to json')
            }
            let newData = cb?cb(data,type):data
            newData&&this.report(newData,type)
        })
    }

    report(obj,type){
        if ( typeof(obj)==='object' ){
            let newData = {...this.config,...obj}
            debug(`%c report：${type||'JS'} `,debugColors.success,newData)
            this.imageSrcGet(newData)
        }
    }

    //过滤掉_url,下划线开头为内置变量
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
        obj._rand = new Date().getTime()
        let src = this.config._url+'?'+this.objToParams(obj)
        imageElement.src = src
    }

}
let selector = '*[data-ua-trace]'
delegate(selector, 'click', function (e) {
    //console.log(e)
    let target = e.delegateTarget
    let data = getDataFromDataSet(target)
    Emitter.emit('reportAll',data,'click')
}, false)

let show = ()=>{
    let elms = document.querySelectorAll(selector)
    Array.prototype.slice.call(elms).map(elm=>{
        //没曝光过，并且有data-uatrace,可见
        if(!elm.exposed&&inview(elm)){
            let data = getDataFromDataSet(elm)
            Emitter.emit('reportAll',data, 'expose')
            elm.exposed = 1
        }
    })
}

setTimeout(show,10)
window.addEventListener('scroll', debounce(show));


module.exports  = UATrace
