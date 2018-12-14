var expect = require('expect')

var {isValidString} = require('./validate')

describe('isValidString', () => {
    it('should return true for valid non-space string', () => {
        let str = "Param"
        let ans = isValidString(str)
        expect(ans).toBe(true)
    })  
    it('should return false for non-string', () => {
        let str = 123
        let ans = isValidString(str)
        expect(ans).toBe(false)
    })  
    it('should return false for spaced string', () => {
        let str = "  "
        let ans = isValidString(str)
        expect(ans).toBe(false)
    })  
})