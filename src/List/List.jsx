import React, { Component } from 'react';
import './sprites.png';
import './sprites.css';
import './List.css';

class List extends Component {
	componentWillMount() {		
		this.props.getAllPokemon();
	}
	componentWillReceiveProps(nextProps) {

	}
	renderSprites() {
		if(!this.props.allPokemon) return;
		return this.props.allPokemon.map((pokemon) => {
			return this.renderSprite(pokemon);			
		})
	}
	renderSprite(pokemon) {
		// {pokemon.name}
		return <li key={pokemon.unique_id} className='sprite'>
					<i className={`pki ${pokemon.unique_id}`}></i>
					<span className='nationalNo'>{pokemon.id}</span>
			</li>
	}
	render() {
		
		return <ul className='list'>
			{this.renderSprites()}
		</ul>
	}
}

export default List;
