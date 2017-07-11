import React, { Component } from 'react';
import './List.scss';

class List extends Component {
	componentWillMount() {		
		const test = this.props.getAllPokemon();
		console.log('test', test)
		console.log(this.props.allPokemon);	
	}
	render() {
		return <div>list component</div>
	}
}

export default List;
