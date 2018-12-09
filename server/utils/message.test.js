var expect = require('expect')

var {generateMessage,generateLocationMsg} = require('./message')

describe('generateMessage' , () => {
    it('should generate correct message object', ()=> {
        var from = 'Param'
        var text = "Hey"
        let res = generateMessage(from,text);
        expect(res).toMatchObject({from,text})//Equivalent of toInclude()
        expect(typeof res.createdAt).toBe('number')
    })
})
describe('generateLocationMsg' , () => {
    it('should generate correct location object', ()=> {
        let from = 'Param'
        let lat = 23
        let lon = 78
        let url = `https://www.google.com/maps?q=23,78`
        let res = generateLocationMsg(from,lat,lon);
        expect(res).toMatchObject({from , url})
        expect(typeof res.createdAt).toBe('number')
    })
})
