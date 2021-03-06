# ua-trace
A resolution of collect dom attribute and merge with config then report(multi)，monitor appears in viewport  and click event, Works in web browsers.

GET前端上报,主要解决滚动曝光及多个上报问题。

# feature
- auto encodeURIComponent value
- auto detect elm in view
- one set multi use



[demo](http://lichspace.github.io/ua-trace-demo/)

# Install
 you can get it on npm
 ```
 npm install ua-trace --save
 ```

# Setup
Node(Browserify)
```
let UAtrace = require('ua-trace')
```

Browser`umd`

```
<script src="dist/ua-trace.js"></script>
```

# Usage

The ua-trace lib do one thing, that if a element has `data-ua-trace` ,  when it appear in window or click,it value will be parse to json and merge with the config you identified

ua-trace只做一件事情，在曝光或点击的时候，把DOM里`data-ua-trace`的JSON配置与预定义的基础配置合并发送到订阅函数里

## Class UATrace(option[object],config[object])
- *option.url[requried] to report 上报地址
- option.method default [get] with image,if [post] will use sendBeacon 上报方式
- config the base config to report 基础配置


HTML
```
//Element　must has attrbute data-ua-trace
<div data-ua-trace='{"key1":"once","a":1,"b":2}'></div>

//or js react
<div data-ua-trace={JSON.stringify({"key1":"once","a":1,"b":2})}'></div>

```

JS
```
UATrace.debug()
let imageGif = '/report.gif'
let boss6014 = new UATrace({url:imageGif,method:'post'},{id:6014})
// pick your data
boss6014.subscribe((data,type)=>{
    //one key shortcut: data-ua-trace='value'
    if(typeof(data) === 'string'){
            return {yourKey:data}
    }
    // expose or click
    if(type==='expose'){
        data.expose = 'expose'
    }

    return data
    //if return false will do nothing
})
boss6014.report({name:'tangentguo'})
//when subscribed click or inview will Request URL: http://report.com?a=1&b=2&expose=expose&id=6014

```

## static UATrace.debug()
equal localStorage.setItem('debug', 'ua-trace')
-  default close
- 'close' close

## UATrace.update(config)
update your config

## UATrace.subscribe([Function(data,type)])
- `data`[immutable data] is the data-ua-trace parse to json
- `type` is [click or expose],expose only fire once
- you can pick your data by `UATrace.subscribe`, when return false do nothing

## UATrace.report(object,[type])
report with js will go throw `UATrace.subscribe`

## UATrace.reportDirect(object,[type])
report with js direct

## UATrace.update(config)

## UATrace.trigger()
when `DOMContentLoaded` `scroll` `resize`  will be trigger detect elm inview, also you can trigger with this method yourself

## priority config
配置的优先级
`subscribe return` > `data-ua-trace` > `config`

## Browser Support

| <img src="http://lichspace.github.io/ua-trace-demo/chrome.png" width="48px" height="48px" alt="Chrome logo"> | <img src="http://lichspace.github.io/ua-trace-demo/ieage.png" width="48px" height="48px" alt="Edge logo"> | <img src="http://lichspace.github.io/ua-trace-demo/firefox.png" width="48px" height="48px" alt="Firefox logo"> | <img src="http://lichspace.github.io/ua-trace-demo/IE.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="http://lichspace.github.io/ua-trace-demo/opera.png" width="48px" height="48px" alt="Opera logo"> | <img src="http://lichspace.github.io/ua-trace-demo/saferi.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Latest ✔ | Latest ✔ | Latest ✔ | 9+ ✔ | Latest ✔ | Latest ✔ |


## License

[MIT License](http://zenorocha.mit-license.org/)
