import PokemonList from './assets/json/pokemon.json';
import Evolutions from './assets/json/evolution.json';
import Moves from './assets/json/evolution.json';

// will make calls to server in the future
// const API = { };


export const getAllPokemon = () => {
	return {
		type: 'GET_ALL_POKEMON',
		data: PokemonList
	}
};
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
export const getPokemonProfile = (id) => {
	return {
		type: 'GET_POKEMON',
		data: '',//get json file based on id
	}
};



// const Actions = {
// 	getAllPokemon: () => {
// 		return {
// 			type: 'GET_ALL_POKEMON',
// 			data: PokemonList
// 		}
// 	},
// 	getAllEvolutions: () => {
// 		return {
// 			type: 'GET_ALL_EVOLUTIONS',
// 			data: Evolutions
// 		}
// 	},
// 	getAllMoves: () => {
// 		return {
// 			type: 'GET_ALL_MOVES',
// 			data: Moves
// 		}
// 	},
// 	getPokemonProfile: (id) => {
// 		return {
// 			type: 'GET_POKEMON',
// 			data: '',//get json file based on id
// 		}
// 	}
// };
// module.exports = Actions;




