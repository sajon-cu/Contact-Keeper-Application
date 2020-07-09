import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// For State Management Using Context API
import ContactState from './context/contact/ContactState';

// Components
import Navbar from './components/layout/Navbar';
import About from './components/pages/About'
import Home from './components/pages/Home'

function App() {
  return (
    <ContactState>
      <Router>
        <div className="App">
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/about' component={About}/>
            </Switch>
          </div>
        </div>
      </Router>
    </ContactState>
  );
}

export default App;
