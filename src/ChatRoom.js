import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ChatRoom.css'

function ChatRoom() {

    const [nbrUsers, setNbrUsers] = useState(0)
    const [message, setMessage] = useState('')

    let socket = new WebSocket("ws://localhost:8888");

    socket.onmessage = function (event) {
       console.log(JSON.parse(event.data)); 
    }

    const changeHandler = (e) => {
        setMessage(e.target.value)
    }

    const sendHandler = () => {

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
            window.location.replace('/chatRoom')
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
    })

    return (
        <div>
            <h1> COMMON CHAT ROOM </h1>
            <div className="chat-container" >
                <div className="messages-container">
                    <p> {nbrUsers} users onine</p>
                    <div className="messages">
                        <h4>Messages</h4>

                    </div>
                </div>

                <div className="typing-area">
                    <textarea value={message} onChange={changeHandler} id="textarea" />
                </div>

                <button onClick={sendHandler}> Send </button>
            </div>
        </div>
    )
}

export default ChatRoom
