# ua-trace
A resolution of collect dom attribute and merge with config then report(multi)，monitor appears in viewport  and click event, Works in web browsers.

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

The ua-trace lib do a thing, that if a element has `data-ua-trace` ,  when it appear in window or click,it value will be parse to json and merge with the config you identified

## Class UATrace(config[object])

config must has `_url` property,it will be request_

HTML
```
//Element　must has attrbute data-ua-trace
<div data-ua-trace='{"explore":"once","a":1,"b":2}'></div>
```

JS
```
 let imageGif = '/report.gif'
 let boss6014 = new UATrace({_url:imageGif,id:6014})
 boss6014.report({name:'tangentguo'})
 //Request URL: http://localhost:8080/report.gif?name=tangentguo
    boss6014.subscribe((data,type)=>{
        if(type==='expose'){
            data.expose = 'expose'
        }
        return data
        //if return false will not request
    })
  //when subscribed click or inview will Request URL: http://report.com?a=1&b=2&expose=expose&id=6014

```

## UATrace.update(config)
update your config

## UATrace.subscribe([Function(data,type)])
- `data` is the data-ua-trace parse to json
- `type` click or expose,expose only fire once
- return object or false,when false not initiate request[get]

## UATrace.report(obj)
report with js

## priority config
`subscribe return` > `data-ua-trace` > `config`

