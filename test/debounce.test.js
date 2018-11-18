let debounce = require('../src/lib/debounce')
const assert = require('assert');
let sinon = require('sinon');

let clock;

before(function () { clock = sinon.useFakeTimers(); });
after(function () { clock.restore(); });
it("debounce test",function () {
    let callback = sinon.fake()
    let debounced = debounce(callback,200)
    debounced()
    clock.tick(200);
    assert(callback.callCount===1);


    debounced()
    clock.tick(100);
    assert(callback.callCount===1);
})