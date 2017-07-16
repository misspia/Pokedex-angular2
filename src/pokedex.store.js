import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Reducers from './pokedex.reducers.js';

// const initialState = { };

const loggerMiddleware = createLogger();

export default function configureStore() {
	return createStore(
		Reducers,
		applyMiddleware( thunkMiddleware, loggerMiddleware)
	);
}


// export default function configureStore(initialState) {
//   return createStore(reducer, initialState);
// }

// store.dispatch(selectSubreddit('reactjs'))
// store
//   .dispatch(fetchPosts('reactjs'))
//   .then(() => console.log(store.getState()))

// import flux from 'pico-flux';

// let State = {};

// const Store = flux.createStore({
	
// })