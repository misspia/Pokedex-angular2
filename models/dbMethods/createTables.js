const createTables = 
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

	create table pokedex.types(
		defence 	varchar(20),
		normal 		integer,
		fire 		integer,
		water 		integer,
		electric 	integer,
		grass 		integer,
		ice 		integer,
		fighting 	integer,
		poison 		integer,
		ground 		integer,
		flying 		integer,
		psychic		integer,
		bug 		integer,
		rock 		integer
		ghost 		integer,
		dragon 		integer,
		dark 		integer,
		steel 		integer,
		fairy 		integer
	);			
  



exports.createTables = createTables;