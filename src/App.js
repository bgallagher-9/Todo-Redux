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
            <li><Link to="/todo">TodoApp</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
          <Route exact={true} path="/" component={Home} />
          <Route path="/todo" component={TodoApp} />

        </div>
      </Router>
    );
  }
}
// <Route path="/gallery" component={Gallery} />

export default App;
