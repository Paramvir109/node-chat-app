class Users {
    constructor() {
        this.users = []
    }
    addUser(id, name, room) {
        let user = {name,id,room}
        this.users.push(user)
        return user
    
    }
    removeUser(id) {
        let removedUser = this.getUser(id)
        if(removedUser) {
            this.users = this.users.filter(function(user,index) {
                return(user.id !== id)
            })
        }
        return removedUser
        
    }
    getUser(id) {
        let ans = this.users.filter((user) =>(user.id === id))
        return ans[0]
    }
    getUserList(room) {
        let userList = this.users.filter((user) => (user.room === room))
        let userListNames = userList.map((user) => user.name)
        return userListNames
    }
    isUnique(name,room) {//Name should be unique in same room(Which is yet to be added in the room)
        let list = this.users.filter((user) => (user.room === room && user.name === name))
        if(list.length === 0) {
            return true
        }
        return false

    }
}
module.exports = {
    Users
}