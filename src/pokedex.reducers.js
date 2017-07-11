export default (state={
	current: {},
	pokemon: [],
	evolutions: [],
	moves: []
}, action) => {
	switch(action.type) {
		case 'GET_ALL_POKEMON':
			console.log('reached reducer!')
			return { ...state, pokemon: action.data };
			// break;

		case 'GET_ALL_EVOLUTIONS':
			return { ...state, evolutions: action.data };
			// break;
		
		case 'GET_ALL_MOVES':
			return { ...state, moves: action.data };
			// break;

		case 'GET_POKEMON':
			return { ...state, current: action.data };
			// break;

		default:
			console.log('ERROR: reducer not found');
			return state;
	}
}

// module.exports = Reducer;