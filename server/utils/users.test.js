var expect = require('expect')

var {Users} = require('./users')

describe('Users', () => {
    let users
    beforeEach(() => {
        users = new Users()
        users.users = [{
            id : '1',
            name : 'Param',
            room : 'Ok'
        },
        {
            id : '2',
            name : 'Kunal',
            room : 'KO'
        },
        {
            id : '3',
            name : 'Dv',
            room : 'Ok'
        }]
    })
    it('should add new user', () => {
        let user = {
            id : '123',
            name : "Param",
            room : "abc"
        }
        let resUser = users.addUser(user.id,user.name,user.room)
        expect(users.users.length).toBe(4)
    })
    it('should return names of user in a room', () => {
        let resUser = users.getUserList('Ok')
        expect(resUser).toEqual(['Param','Dv'])
    })
    it('should remove a user', () => {
        let id = '1'
        let removedUser = users.removeUser(id)
        expect(removedUser.id).toBe(id)
        expect(users.users.length).toBe(2)
    })
    it('should not remove a user', () => {
        let id = '11'
        let removedUser = users.removeUser(id)
        expect(removedUser).toBeFalsy()
        expect(users.users.length).toBe(3)
    })
    it('should return a user', () => {
        let id = '1'
        let user = users.getUser(id)
        expect(user.id).toBe(id)
        
    })
    it('should not return a user', () => {
        let id = '99'
        let user = users.getUser(id)
        expect(user).toBeFalsy()
    })
    it('should return true for unique user to be added', () => {
        let name = 'Ish'
        let ans = users.isUnique(name,'Ok')
        expect(ans).toBe(true)
    })
    it('should return false for non-unique user to be added', () => {
        let name = 'Dv'
        let ans = users.isUnique(name,'Ok')
        expect(ans).toBe(false)
    })

})