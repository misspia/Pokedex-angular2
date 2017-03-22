// https://www.youtube.com/watch?v=fD7x8hd9yE4&spfreload=10
// http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WM3SshLyvfY?

// https://docs.google.com/spreadsheets/d/1GZ56WFZEpXGlT4P5FUwOJCzNqVFfju9oFL9SP-kBwU8/edit#gid=549519719
// https://www.quora.com/How-can-I-build-a-web-scraper-to-be-undetectable

// remove schema: drop schema DBNAME cascade
// create db: create database DBNAME
// see list of all db: \l

// ISSUES
// master type table: column heading insertion

let cheerio = require('cheerio');
let request = require('request');

let pokemonList = require('./methods/pokemonList');
let evolutionChart = require('./methods/evolutionChart');
let masterTypeChart = require('./methods/masterTypeChart');
let masterMoveList = require('./methods/masterMoveList');
let masterAbilityList = require('./methods/masterAbilityList');

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';

const client = new pg.Client(connectionString);
client.connect();
 
const query = client.query(
  `
  	create schema pokedex;
  	create table pokedex.main(

  		unique_id 	varchar(10),
  		national_id integer,
  		name 		varchar(15),
  		form 		varchar(15),
  		type 		varchar[2],
  		description varchar(300)
  	);

	create table pokedex.general(
		
		unique_id 		varchar(10) PRIMARY KEY,
		species 		varchar(20),
		weight 			varchar(20),
		height 			varchar(20),
		ability 		varchar(30),
		hidden_ability 	varchar(30)
	);

	create table pokedex.moves(
		
		unique_id 	varchar(10),
		method 		varchar(20),
		name 		varchar(30),
		level 		varchar(3),
		type 		varchar[2],
		cat 		varchar(15),
		power 		integer,
		acc 		integer
	);	

	create table pokedex.evolution(
		
		unique_id 	varchar(10) PRIMARY KEY,
		stage_0 	varchar[1],
		stage_1 	varchar[10],
		stage_2 	varchar[10]
	);

	create table pokedex.base_stats(
		
		unique_id 			varchar(10) PRIMARY KEY,
		hp 					integer,
		attack 				integer,
		defence 			integer,
		special_attack 		integer,
		spedical_defence 	integer,
		speed 				integer
	);

	create table pokedex.min_stats(
		
		unique_id 			varchar(10) PRIMARY KEY,
		hp 					integer,
		attack 				integer,
		defence 			integer,
		special_attack 		integer,
		spedical_defence 	integer,
		speed 				integer
	);

	create table pokedex.max_stats(
		
		unique_id 			varchar(10) PRIMARY KEY,
		hp 					integer,
		attack 				integer,
		defence 			integer,
		special_attack 		integer,
		spedical_defence 	integer,
		speed 				integer
	);

	create table pokedex.location(
		
		unique_id 	varchar(10),
		version 	varchar(50),
		location 	varchar(50)
	);

	create table pokedex.abilities(
		
		name 		varchar(20) PRIMARY KEY,
		description varchar(500)
	);

	create table pokedex.moves_description(
		
		name 		varchar(30) PRIMARY KEY,
		description varchar(500)	
	);			
  `);
query.on('end', () => { client.end(); });


function main() {
	
	const baseUrl = "http://pokemondb.net";

	let pokemonList = pokemonList.get(baseUrl);
	// evolutionChart.get(baseUrl + '/evolution');	
	// masterTypeChart.get(baseUrl + '/type/dual');
	// masterMoveList.get(baseUrl + '/move/all');
	// masterAbilityList.get(baseUrl + '/ability');

	const query = query.client(
		
		`
			insert ` + pokemonList.something + ` pokemon.main;

		`

	);
}























