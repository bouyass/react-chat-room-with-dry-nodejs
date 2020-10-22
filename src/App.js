import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import LoginForm from './LoginForm'
import PrivateNavigation from './PrivateNavigation'
import CheckNavigation from './CheckNavigation'
import ChatRoom from './ChatRoom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <CheckNavigation path="/chatRoom"  component={ChatRoom}/>
          <PrivateNavigation path="/login" component={LoginForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
