import { createStore } from 'redux';
import Reducers from './pokedex.reducers.js';

const initialState = { };

export default function configureStore() {
	return createStore( Reducers, initialState);
}