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

    it("contain chinese",function () {
        assert.deepStrictEqual(json.parse('{a:"你好中国",b:"阿哈"}'),{ a: '你好中国',b:"阿哈" })
    })
})
