const createTables = 
  `
  	create schema pokedex;
  	create table pokedex.main(

  		unique_id  	text PRIMARY KEY,
  		national_id  integer,
  		name 	 	text,
  		form 	 	text		
  	);

	create table pokedex.general(
		
		unique_id  		text,
		species  		text,
		weight 	 		text,
		height 	 		text
	);
	
	create table pokedex.abilities(
		
		unique_id  	text,
		ability  		text
	);

	create table pokedex.description(
		unique_id  		text,
		version  		text,
		description  	text
	);

	create table pokedex.moves(
		
		unique_id 	  	text,
		method 		text,
		level 		  	text,
		name 		  	text,		
		type 		  	text,
		category 		text,
		power 		  	text,
		accuracy 	 	text
	);	

	create table pokedex.evolutions(
		
		base  	text,
		stage0  	text,
		stage1  	text,
		stage2  	text,
		condition 	text
	);

	create table pokedex.base_stats(
		
		unique_id  			text,
		hp 		 		integer,
		attack 	 			integer,
		defence  			integer,
		special_attack  		integer,
		spedical_defence  		integer,
		speed 			 	integer
	);

	create table pokedex.min_stats(
		
		unique_id 		 	text,
		hp 				 integer,
		attack 			 	integer,
		defence 		 	integer,
		special_attack 	 		integer,
		spedical_defence  		integer,
		speed 			 	integer
	);

	create table pokedex.max_stats(
		
		unique_id 		 	text,
		hp 				 	integer,
		attack 			 	integer,
		defence 		 	integer,
		special_attack 	 	integer,
		spedical_defence  	integer,
		speed 			 	integer
	);
	
	create table pokedex.training(
		unique_id  		text,
		ev_yield 	 	text,		
		catch_rate 	 	text,
		base_happiness  	text,
		base_exp 		 text,
		growth_rate  	text,
		egg_groups 	 	text
	);

	create table pokedex.types(
		unique_id  	text,
		type 	 	text
	);

	create table pokedex.location(
		
		unique_id  	text,
		version  	text,
		location  	text
	);

	create table pokedex.abilities_description(
		
		name 	 	text,
		pokemon  	integer,
		description  text,
		generation   integer
	);

	create table pokedex.moves_description(
		
		name  	 		text,
		type  	 		text,
		category 	 	text,
		power 	  	 	text,
		accuracy      	text,
		pp            	text,
		tm            	text,
		effect        	text,
		probability   	text
	);

	create table pokedex.types_chart(
		defence  	text,
		normal 	 	integer,
		fire 	 	integer,
		water 	 	integer,
		electric  	integer,
		grass 	 	integer,
		ice 	 	integer,
		fighting  	integer,
		poison 	 	integer,
		ground 	 	integer,
		flying 	 	integer,
		psychic	 	integer,
		bug 	 	integer,
		rock 	 	integer,
		ghost 	 	integer,
		dragon 	 	integer,
		dark 	 	integer,
		steel 	 	integer,
		fairy 	 	integer
	);		
	
`

exports.tables = createTables;