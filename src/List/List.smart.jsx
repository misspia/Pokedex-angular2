import { connect } from 'react-redux';
import * as Actions from '../pokedex.actions.js';
import List from './List.jsx';


const mapStateToProps = (state, ownProps) => {
  return { allPokemon: state.pokemon, selected: state.selected }
};

const mapDispatchToProps = (dispatch) => {
  return { 
	getAllPokemon: () => dispatch(Actions.getAllPokemon()),
	select: (id) => dispatch(Actions.getSelectedPokemon(id))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(List);