import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import List from './List/List.smart.jsx';
import './index.css';

import configureStore from './pokedex.store.js';
const store = configureStore();



// #7
// https://scotch.io/tutorials/build-a-bookshop-with-react-redux-i-react-redux-flow

class App extends Component {
  render() {
    return (
      <div className="App">
        <List/>
      </div>
    );
  }
}



ReactDOM.render(
	<Provider store={store}><App /></Provider>,
	 document.getElementById('root'));
registerServiceWorker();
