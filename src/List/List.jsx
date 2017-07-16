import React, { Component } from 'react';
import './List.scss';
import request from 'superagent';

class List extends Component {
	componentWillMount() {		
		// this.props.getAllPokemon();
		request.get('./assets/json/evolution.json')
			.then((res)=> {
				console.log('SUCCESS!!', res);
			})
			.catch((err)=> {
				console.log('ERROR :(', err);
			})
	}
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps.allPokemon);
		
	}
	renderSprites() {
		// return this.props.allPokemon.map((pokemon) => {
		// 	// console.log(pokemon);
		// 	return this.renderSprite(pokemon);			
		// })
	}
	renderSprite(pokemon) {
		return <li key={pokemon.unique_id}>
				{pokemon.name}
			</li>
	}
	render() {
		
		return <ul>
			{this.renderSprites()}
		</ul>
	}
}

export default List;
