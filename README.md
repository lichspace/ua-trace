# ua-trace
A resolution of collect dom data-attr and merge with config report(multi)，Works in web browsers.

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

Browser

```
<script src="dist/ua-trace.js"></script>
```

# Usage
## new UATrace(config)
HTML
```
//must has class (.ua-trace),data-uatrace is you data to params
<div class="b ua-trace" data-uatrace='{"explore":"once","a":1,"b":2}'></div>
```

JS
```
 let boss6014 = new UATrace({_url:'http://report.com',id:6014})
 boss6014.report({name:'tangentguo'})
 //report by Image() [GET]: http://report.com?id=6014&name=tangentguo
 boss6014.subscribe()
 //when subscribed click HTML will report [GET]: http://report.com?a=1&b=2&explore=once&id=6014

```
