import React, { Component } from 'react';
import './ProfileCard.scss';

class ProfileCard extends Component {
	componentWillMount() {		
		this.props.getSelectedPokemon();
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.selected);
	}
	render() {
		return <div>
			ProfileCard component
			<img src={this.props.selected.img} alt=""/>
		</div>
	}
}

export default ProfileCard;
