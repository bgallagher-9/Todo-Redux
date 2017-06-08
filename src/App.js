import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import TodoApp from './todoapp.js';
import './App.css';

const Home = () => (<div>Home Page</div>)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/todo">TodoApp</Link>:  Click on the items to toggle them <span className="red">red</span></li>
          </ul>
          <Route exact={true} path="/" component={Home} />
          <Route path="/todo" component={TodoApp} />

        </div>
      </Router>
    );
  }
}

export default App;
