import { connect } from 'react-redux';
import * as Actions from '../pokedex.actions.js';
import ProfileCard from './ProfileCard.jsx';


const mapStateToProps = (state, ownProps) => {
  return { data: state.selected.data, img: state.selected.img }
};

const mapDispatchToProps = (dispatch) => {
  return { 
	getSelectedPokemon: () => dispatch(Actions.getSelectedPokemon())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);