let json = require('../src/lib/json')
const assert = require('assert');
describe("json.parse test",function () {
    it("number should parse as type Int",function () {
        assert.deepStrictEqual(json.parse("{a:1}"),{a:1})
    })
    it("single should be parse correct",function () {
        assert.deepStrictEqual(json.parse("{'a':1}"),{a:1})
    })
    it("double should be parse correct",function () {
        assert.deepStrictEqual(json.parse('{"a":1}'),{a:1})
    })
    it("string value ",function () {
        assert.deepStrictEqual(json.parse('{a:"1"}'),{a:"1"})
    })
    it("multi value ",function () {
        assert.deepStrictEqual(json.parse('{a:"1",b:12}'),{a:"1",b:12})
    })

    it("contain chinese and url",function () {
        assert.deepStrictEqual(json.parse('{a:"https://mochajs.org/",b:"阿哈"}'),{ a: 'https://mochajs.org/',b:"阿哈" })
    })

})
