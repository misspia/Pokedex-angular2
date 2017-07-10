import { createStore } from 'redux';
import reducers from '.pokedex.reducers.js';

const initialState = {

};

const store = createStore(reducers, initialState);

module.exports = store;