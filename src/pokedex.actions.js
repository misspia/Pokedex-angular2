import request from 'superagent';
// import axios from 'axios';
// import PokemonList from './assets/json/pokemon.json';
import Evolutions from './assets/json/evolution.json';
import Moves from './assets/json/evolution.json';
import n35 from './assets/json/n35.json';
import n35Img from './assets/images/n35.png';

// will make calls to server in the future
// const API = { 
// 	getPokemonList: () => {
// 		return request.get('./assets/json/evolution.json')
// 		.set('type', 'text/json')
// 			// .set('dataType', 'json');
// 		// return fetch('./assets/json/pokemon.json');
// 	}
// };


export const getAllPokemon = () => {
	return request.get('./assets/json/evolution.json')
		.then((res) => {
			console.log(res);
			return dispatch => {
				return {
					type: GET_ALL_POKEMON,
					data: res
				}
					
			}
		})
};
// axios('./assets/json/pokemon.json')
// 		.then((res) => {
// 			console.log('got the file!', res);
// 			return dispatch => {
// 				return {
// 					type: 'GET_ALL_POKEMON',
// 					data: res
// 				}
// 			}
// 		})
// 		.catch((err) => {
// 			console.log('ERROR :((', err);
// 		})

export const getAllEvolutions = () => {
	return {
		type: 'GET_ALL_EVOLUTIONS',
		data: Evolutions
	}
};
export const getAllMoves = () => {
	return {
		type: 'GET_ALL_MOVES',
		data: Moves
	}
};
export const getSelectedPokemon = (id) => {
	return {
		type: 'GET_SELECTED_POKEMON',
		data: n35,//get json file based on id
		img: n35Img
	}
};
// 	
// import request from 'superagent';
// import {dispatch} from 'pico-flux';

// const Actions = {
// 	getAllPokemon: () => {
// 		dispatch('GET_ALL_POKEMON');
// 	}
// }

// module.exports = Actions;