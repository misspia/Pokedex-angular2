export default (state={
	selected: {},
	pokemon: [],
	evolutions: [],
	moves: []
}, action) => {
	switch(action.type) {
		case 'GET_ALL_POKEMON':
			return { ...state, pokemon: action.data };

		case 'GET_ALL_EVOLUTIONS':
			return { ...state, evolutions: action.data };
		
		case 'GET_ALL_MOVES':
			return { ...state, moves: action.data };

		case 'GET_SELECTED_POKEMON':
			return { ...state, selected: { data: action.data, img: action.img} };

		default:
			console.log('ERROR: reducer not found');
			return state;
	}
}