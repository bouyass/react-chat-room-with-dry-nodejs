var http = require('http')
var ws = require('ws')
var chat = require('./chat')
var publicIp = require('public-ip');
var cors  = require('cors')




var wss = new ws.Server({port:8888})

wss.on('connection', function(ws){
    chat.saveUserWS(ws)
})

var app = http.createServer(function(req, res) {

    var ipAddress = '';

    const promise1 = publicIp.v4()

    promise1.then((response) => {
        ipAddress = response

        let data = ''

    req.on('data', function(chunk) {
        data += chunk
    })

    req.on('end', function(){
        console.log('request to '+ req.url)
        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'})

        if(req.url === '/login'){
            user = JSON.parse(data)
            user.hostname = ipAddress
            res.write(chat.login(user).toString())
        }

        if(req.url === '/logout'){
            res.write(chat.logout(JSON.parse(data)).toString())
        }

        if(req.url === '/sendMessage'){
            msg = JSON.parse(data)
            msg.hostname = ipAddress
            chat.sendMessage(msg)
            res.write('message sent')
        }

        if(req.url === '/nbrUsers'){
            res.write(chat.getNbrUsers().toString())
        }

        res.end()
    })

        
    }).catch((error)=> {
        console.log(error)
    })

})


app.set

app.listen(8000, function(){
    console.log("listening on port 8000")
})