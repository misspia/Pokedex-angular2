import PokemonList from './assets/json/pokemon.json';
import Evolutions from './assets/json/evolution.json';
import Moves from './assets/json/evolution.json';
import n35 from './assets/json/n35.json';
import n35Img from './assets/images/n35.png';

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
export const getSelectedPokemon = (id) => {
	return {
		type: 'GET_SELECTED_POKEMON',
		data: n35,//get json file based on id
		img: n35Img
	}
};



