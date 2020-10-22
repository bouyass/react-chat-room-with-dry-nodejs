import React from 'react'
import IsLoggedIn from './IsloogedIN'
import { Route , Redirect } from 'react-router-dom'
import ChatRoom  from './ChatRoom'

function PrivateNavigation({component: Component, ...rest}) {

    const loggedIn  = IsLoggedIn.isLoggedIn()
    return (
        <Route
            {...rest}
            render={props=> loggedIn.length === 0 ? 
                    <Component {...props}/> : 
                    <Redirect to={{ pathname: '/chatRoom'}} />
            }
        />
    )
}

export default PrivateNavigation
