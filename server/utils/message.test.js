var expect = require('expect')

var {generateMessage} = require('./message')

describe('generateMessage' , () => {
    it('should generate correct message object', ()=> {
        var from = 'Param'
        var text = "Hey"
        let res = generateMessage(from,text);
        expect(res).toMatchObject({from,text})//Equivalent of toInclude()
        expect(typeof res.createdAt).toBe('number')
    })
})
