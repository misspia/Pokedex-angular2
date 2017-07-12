import { connect } from 'react-redux';
import * as Actions from '../pokedex.actions.js';
import List from './List.jsx';


const mapStateToProps = (state, ownProps) => {
  return { allPokemon: state.pokemon }
};

const mapDispatchToProps = (dispatch) => {
  return { 
	getAllPokemon: () => dispatch(Actions.getAllPokemon()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(List);