import React, { useState } from "react";
import "./LoginForm.css";
import {Redirect} from 'react-router-dom'
import axios from 'axios'

function LoginForm() {
  const [username, setUsername] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [avatar, setAvatar] = useState(0)

  const clickHandler = () => {
      if(username.trim().length > 0){
        setValidUser(true);
        setErrorMessage('')
      }else{
        setErrorMessage('Please enter a username first')
      }
  };

  const changeHandler = (e) => {
    setUsername(e.target.value);
  };

  const secondClickHandler = () => {
        console.log(0==!avatar)
        if(avatar === 0){
            setErrorMessage('please choose your avatar first')
            console.log(errorMessage)
        }else{
            localStorage.setItem('username', username)
            localStorage.setItem('avatar', avatar)

            const  optionsConnect = {
                url:'http://localhost:8000/login',
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
                console.log(response)
                window.location.replace('/chatRoom')
            }).catch(error => console.log(error))

        }
  }

  const imageClickHandler = (e) => {
        if(avatar !== 0) document.getElementById(avatar).style.border = ''
        setAvatar(e.target.id)
        document.getElementById(e.target.id).style.border = '3px solid green'
  }

  return (
    <div className="main-container">

        

      {!validUser ? (
        <div className="form-container">
          <h1> WELCOME TO THE REACT CHAT ROOM </h1>

          {errorMessage.length > 0 ? <span className="error"><b> {errorMessage} </b></span> : ' '}
          <div className="form-section">
            <h2> Tell us your name </h2>
            <input
              className="username form-control"
              value={username}
              onChange={changeHandler}
              type="text"
              placeholder="Your username please"
            />
            <button
              id="first"
              onClick={clickHandler}
              style={{ fontSize: "1.5em" }}
              type="button"
              className="btn btn-primary"
            >
              Take me to the chat room
            </button>
          </div>
        </div>
      ) : (
        <div className="avatarChoice">
          <p> One last thing choose your avatar </p>
          <div className="avatars">
            <img onClick={imageClickHandler} id="1" src="images/avatar-1.png" />
            <img onClick={imageClickHandler} id="2" src="images/avatar-2.png" />
            <img onClick={imageClickHandler} id="3" src="images/avatar-3.png" />
            <img onClick={imageClickHandler} id="4" src="images/avatar-4.png" />
            <img onClick={imageClickHandler} id="5" src="images/avatar-5.png" />
            <img onClick={imageClickHandler} id="6" src="images/avatar-6.png" />
            <img onClick={imageClickHandler} id="7" src="images/avatar-7.png" />
            <img onClick={imageClickHandler} id="8" src="images/avatar-8.png" />
            <img onClick={imageClickHandler} id="9" src="images/avatar-9.png" />
            <img onClick={imageClickHandler} id="10" src="images/avatar-10.png" />
          </div>
          <button
            id="second"
            onClick={clickHandler}
            style={{ fontSize: "1.5em" }}
            type="button"
            className="btn btn-primary"
            onClick={secondClickHandler}
          >
            Let's go
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
