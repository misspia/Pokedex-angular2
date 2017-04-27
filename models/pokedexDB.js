// http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WM3SshLyvfY?

// https://docs.google.com/spreadsheets/d/1GZ56WFZEpXGlT4P5FUwOJCzNqVFfju9oFL9SP-kBwU8/edit#gid=549519719
// https://github.com/brianc/node-postgres/wiki/Client

// remove schema: drop schema DBNAME cascade
// create db: create database DBNAME
// see list of all db: \l

const fs = require('fs');
const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';
const client = new pg.Client(connectionString);
client.connect();

fs.readFile('./initPokemonDatabase.txt', 'utf8', (err, data) => {
	if(err) throw err;

	const query = client.query(data);	
	query.on('end', () => { client.end(); });
})


























