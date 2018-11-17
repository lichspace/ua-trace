const debug = require('debug')('ua-trace')
module.exports = {
    parse: str => {
        debug('json.pares str:', str)
        try {
            return JSON.parse(str)
        } catch (e) {
            debug("try parse json myself")
            let jsonStr = str.trim()
            if (jsonStr.substr(0, 1) === '[') {
                jsonStr = jsonStr.replace(/'/g, '"')
                return JSON.parse(jsonStr)
            }
            if (jsonStr.substr(0, 1) === '{') {
                let obj = {}
                let arr = jsonStr.slice(1, -1).split(',')
                arr.map(v => {
                    if (v) {
                        let kv = v.match(/(\w+).*:(['"]*)([^'"]*?)['"]*$/)
                        if(kv){
                            obj[kv[1]] = kv[2]?kv[3]:(kv[3]|0)
                        }
                    }
                })
                return obj
            }
            return {}
        }
    }
}
