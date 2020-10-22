var users = []
var usersWS = []
var messages = []

const login = function(user){
    console.log(user)
    users.push(user)
    return users.length
}

const logout = function(user){
    users.forEach((item, index) => {
        if (user.name === item.name && user.hostname === item.hostname){
            users.splice(index,0)
            return users.length
        }
    })
}

const sendMessage = function(message){
    messages.push(message)
    usersWS.forEach(item => {
        item.send(JSON.stringify(message))
    })
}

const saveUserWS = function(ws){
    usersWS.push(ws)
}

const getNbrUsers = function(){
    return users.length
}

module.exports = {
    login: login, 
    logout: logout,
    sendMessage: sendMessage,
    saveUserWS: saveUserWS,
    getNbrUsers: getNbrUsers
}