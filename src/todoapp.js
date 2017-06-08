import React, { Component } from 'react';
import $ from 'jquery';
import { store, actions } from './store.js';
import './App.css';

const bucketId = "4ad1ca83-07c1-499b-9c86-e69676d374ee"

class TodoApp extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    // this.unsub =
    store.subscribe(() => this.setState(store.getState()));
      this.getNewItem();
      console.log('mounted?')
  }

  // componentWillUnmount() {
  //   this.unsub();
  // }

  createNewItem(todoText) {
    $.ajax({
      url: `https://spiffy-todo-api.herokuapp.com/api/item?bucketId=${bucketId}`,
      method: 'POST',
      data: {
        text: todoText
      }
    })
    .done((data) => {
       this.getNewItem()
     });
   }

  getNewItem() {
    $.ajax({
      url: `https://spiffy-todo-api.herokuapp.com/api/items?bucketId=${bucketId}`
    })
    .done((data) => {
      store.dispatch(Object.assign({}, actions.GET_ITEMS, { items: data.items }));
    });
  }

  removeNewItem(id, evt) {
    evt.stopPropagation();
    $.ajax({
      url: `https://spiffy-todo-api.herokuapp.com/api/item/${id}?bucketId=${bucketId}`,
      method: 'DELETE'
    })
    .done((data) => {
      this.getNewItem();
    })
  }

  handleKeyUp(keyCode) {
    if (keyCode === 13) {
      this.createNewItem(this.state.todovalue);
      store.dispatch(Object.assign({}, actions.RETURN_CLEAR));
    }
  }

  handleChange(evt) {
    store.dispatch(Object.assign({}, actions.INPUT_CHANGE, { value: evt.target.value }));
  }

  toggleItem(id) {
    $.ajax({
      url: `https://spiffy-todo-api.herokuapp.com/api/item/${id}/togglestatus?bucketId=${bucketId}`,
      method: 'POST'})
    .done((data) => { this.getNewItem(); })
  }

  render() {
    let todoItems = this.state.items.map((x) => {
      const className = x.isComplete ? 'complete' : 'not-complete';
      return <li
              className={className}
              key={x.id}
              onClick={() => this.toggleItem(x.id)}
              >
              {x.text}
              <button onClick={(evt) => this.removeNewItem(x.id, evt)}>Delete</button>
            </li> })

    return(
      <div>
        <input
          value={this.state.todovalue}
          onKeyUp={(evt) => this.handleKeyUp(evt.keyCode)}
          onChange={(evt) => this.handleChange(evt)}
          />
        <ol>
          {todoItems}
        </ol>
      </div>
    );
  }
}

export default TodoApp;
