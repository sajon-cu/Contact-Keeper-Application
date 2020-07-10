import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// For State Management Using Context API
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

// Components
import Navbar from './components/layout/Navbar';
import About from './components/pages/About'
import Home from './components/pages/Home'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';


function App() {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
      <Router>
        <div className="App">
          <Navbar />
          <div className='container'>
            <Alerts />
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
            </Switch>
          </div>
        </div>
      </Router>
      </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
