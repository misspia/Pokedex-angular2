import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import Store from './pokedex.store.js';

import './index.css';

import { connect } from 'react-redux';
import Actions from './pokedex.actions.js';

// #7
// https://scotch.io/tutorials/build-a-bookshop-with-react-redux-i-react-redux-flow

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}



ReactDOM.render(
	<Provider store={Store}><App /></Provider>,
	 document.getElementById('root'));
registerServiceWorker();
