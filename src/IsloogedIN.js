var IsLoggedIn = (function(){

    var isLoggedIn = function(){
        return localStorage.getItem('username')  
    }

    return {
        isLoggedIn : isLoggedIn
    }

})()


export default IsLoggedIn