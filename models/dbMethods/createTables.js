const createTables = 
  `
  	create schema pokedex;
  	create table pokedex.main(

  		unique_id  	varchar(10) PRIMARY KEY,
  		national_id  integer,
  		name 	 	varchar(15),
  		form 	 	varchar(15)		
  	);

	create table pokedex.general(
		
		unique_id  		varchar(10),
		species  		varchar(20),
		weight 	 		varchar(20),
		height 	 		varchar(20)
	);
	
	create table pokedex.abilities(
		
		unique_id  	varchar(10),
		ability  	varchar(30)
	);

	create table pokedex.description(
		unique_id  		varchar(10),
		version  		varchar(50),
		description  	varchar(300)
	);

	create table pokedex.moves(
		
		unique_id 	  	varchar(10),
		method 		  	varchar(20),
		level 		  	varchar(3),
		name 		  	varchar(30),		
		type 		  	varchar(15),
		category 		varchar(15),
		power 		  	varchar(15),
		accuracy 	 	varchar(15)
	);	

	create table pokedex.evolutions(
		
		base  	varchar(10),
		stage0  	varchar(10),
		stage1  	varchar(10),
		stage2  	varchar(10),
		condition 	varchar(30)
	);

	create table pokedex.base_stats(
		
		unique_id  			varchar(10),
		hp 		 			integer,
		attack 	 			integer,
		defence  			integer,
		special_attack  		integer,
		spedical_defence  	integer,
		speed 			 	integer
	);

	create table pokedex.min_stats(
		
		unique_id 		 	varchar(10),
		hp 				 	integer,
		attack 			 	integer,
		defence 		 	integer,
		special_attack 	 	integer,
		spedical_defence  	integer,
		speed 			 	integer
	);

	create table pokedex.max_stats(
		
		unique_id 		 	varchar(10),
		hp 				 	integer,
		attack 			 	integer,
		defence 		 	integer,
		special_attack 	 	integer,
		spedical_defence  	integer,
		speed 			 	integer
	);
	
	create table pokedex.training(
		unique_id  		varchar(10),
		ev_yield 	 	varchar(40),		
		catch_rate 	 	varchar(40),
		base_happiness  	varchar(40),
		base_exp 		 varchar(40),
		growth_rate  	varchar(40),
		egg_groups 	 	varchar(40)
	);

	create table pokedex.types(
		unique_id  	varchar(10),
		type 	 	varchar(20)
	);

	create table pokedex.location(
		
		unique_id  	varchar(10),
		version  	varchar(50),
		location  	varchar(50)
	);

	create table pokedex.abilities_description(
		
		name 	 	varchar(20),
		pokemon  	integer,
		description  varchar(500),
		generation   integer
	);

	create table pokedex.moves_description(
		
		name  	 		varchar(30),
		type  	 		varchar(10),
		category 	 	varchar(10),
		power 	  	 	varchar(10),
		accuracy      	varchar(10),
		pp            	varchar(10),
		tm            	varchar(6),
		effect        	varchar(500),
		probability   	varchar(10)
	);

	create table pokedex.types_chart(
		defence  	varchar(40),
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