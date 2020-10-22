import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ChatRoom.css'

var socket = new WebSocket("ws://localhost:8888");

function ChatRoom() {

    const [nbrUsers, setNbrUsers] = useState(0)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const changeHandler = (e) => {
        setMessage(e.target.value)
    }

    socket.onmessage = function (event) {
        console.log(event.data)
        const message = JSON.parse(event.data)
        setMessages([...messages, message])
     }

    const sendClickHandler = (e) => {

        e.preventDefault()

        const  optionsSendMessage = {
            url:'http://localhost:8000/sendMessage',
            method:'POST',
            data: {
                'name': localStorage.getItem('username'),
                'avatar': localStorage.getItem('avatar'),
                'message': message,
                'date': new Date()
            },
            headers: {
                'Content-Type': 'text/plain'
            }
        }

        axios.request(optionsSendMessage).then((response) => {
            console.log(response)
        }).catch(error => console.log(error))
    }
    

    useEffect(() => {
        const  optionsConnect = {
            url:'http://localhost:8000/nbrUsers',
            method:'POST',
            data: {
                'name': localStorage.getItem('username'),
                'avatar': localStorage.getItem('avatar')
            },
            headers: {
                'Content-Type': 'text/plain'
            }
        }

        axios.request(optionsConnect).then((response) => {
            setNbrUsers(response.data)
        }).catch(error => console.log(error))

        const  optionsMessages = {
            url:'http://localhost:8000/getMessages',
            method:'get',
            headers: {
                'Content-Type': 'text/plain'
            }
        }
        axios.request(optionsConnect).then((response) => {
            console.log(messages)
        }).catch(error => console.log(error))

    },[])

    return (
        <div>
            <h1> COMMON CHAT ROOM </h1>
            <div className="chat-container" >
                <div className="chat-header">
                    <img src={`images/avatar-${localStorage.getItem('avatar')}.png`} />
                    <div className="subDiv"><p id="name"> {localStorage.getItem('username')} </p>
                    <p id="nbrUsers"> <b><span className="numberUsers"> {nbrUsers} </span> </b> online users </p></div>
                 </div>
                <div className="messages-container">
                    <div className="messages">
                        <div id="messages-area" className="messages-area">
                            {messages.map(item => {
                                if(item.name === localStorage.getItem('username')){
                                    return <div className="messageItem">
                                        <div className="myMessage"><p id="myTextMessage">&nbsp;&nbsp;{item.message}&nbsp;&nbsp;</p><img id="chatIcon" src={`images/avatar-${item.avatar}.png`}/></div>
                                    </div>
                                }else{
                                    return <div className="messageItem">
                                        <div className="usersMessage"><img id="chatIcon" src={`images/avatar-${item.avatar}.png`}/><p id="usersTextMessage">&nbsp;&nbsp;{item.message}&nbsp;&nbsp;</p></div>
                                    </div>
                                }
                            })}
                        </div>

                    </div>
                </div>

                <div className="typing-area">
                <img  src="images/mic.png"/><textarea value={message} onChange={changeHandler} id="textarea" />
                <div className="lastIcons"> <img  src="images/attachFile.png"/> <img  src="images/emoticon.png"/> <img onClick={sendClickHandler} src="images/send.png"/></div>
                </div>

                
            </div>
        </div>
    )
}

export default ChatRoom
