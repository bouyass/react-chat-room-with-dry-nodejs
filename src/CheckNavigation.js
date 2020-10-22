import React from 'react'
import IsLoggedIn from './IsloogedIN'
import LoginForm from './LoginForm'
import {Redirect, Route} from 'react-router-dom'

function CheckNavigation({component: Component, ...rest}) {

    const loggedIn  = IsLoggedIn.isLoggedIn()

    return (
        <Route
            {...rest}
            render={props=> loggedIn.length > 0 ? 
                    <Component {...props}/> : 
                    <Redirect to={{ pathname: '/login'}} />
            }
        />
    )
}

export default CheckNavigation
