// https://www.youtube.com/watch?v=fD7x8hd9yE4&spfreload=10
// http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WM3SshLyvfY?

// https://docs.google.com/spreadsheets/d/1GZ56WFZEpXGlT4P5FUwOJCzNqVFfju9oFL9SP-kBwU8/edit#gid=549519719

// remove schema: drop schema DBNAME cascade
// create db: create database DBNAME
// see list of all db: \l

// ISSUES
// moves: unique_id doesnt work as primary key, repeated for each  move category
// evolution: use first stage as unique id repeat table entry for each pkm in evolution fammily?
// master type table: column heading insertion



const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';

const client = new pg.Client(connectionString);
client.connect();
 
const query = client.query(
  `
  	create schema pokedex;
  	create table pokedex.main(

  		primary_key integer PRIMARY KEY,
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
		
		unique_id varchar(10) PRIMARY KEY

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
		
		unique_id varchar(10) PRIMARY KEY,
		red_blue_yellow 		varchar[20],
		gold_silver 			varchar[20],
		crystal 				varchar[20],
		ruby_sapphire 			varchar[20],
		firered_leafgreen 		varchar[20],
		emerald 				varchar[20],
		diamond_pearl 			varchar[20],
		platnium 				varchar[20],
		heartgold_soulsilver 	varchar[20],
		black_white 			varchar[20],
		black2_white2 			varchar[20],
		x_y 					varchar[20],
		omegaruby_alphasapphire varchar[20],
		sun_moon 				varchar[20]
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
























