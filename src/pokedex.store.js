import { createStore } from 'redux';
import reducers from './pokedex.reducers.js';

// const initialState = { };

export default function configureStore(initialState) {
  return createStore(reducers, initialState);
}