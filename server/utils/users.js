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
        let ans = this.users.filter((user,index) =>(user.id === id))
        return ans[0]
    }
    getUserList(room) {
        let userList = this.users.filter((user) => (user.room === room))
        let userListNames = userList.map((user) => user.name)
        return userListNames
    }
}
module.exports = {
    Users
}