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

let pokemonList = require('./scraperMethods/pokemonList');
let evolutionChart = require('./scraperMethods/evolutionChart');
let masterTypeChart = require('./scraperMethods/masterTypeChart');
let masterMoveList = require('./scraperMethods/masterMoveList');
let masterAbilityList = require('./scraperMethods/masterAbilityList');

const createTables = require('./dbMethods/createTables.js');
let insert = require('./dbMethods/insertions.js');

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';

const client = new pg.Client(connectionString);
client.connect();
 

 const query = client.query();

initQuery.on('end', () => {cliend.end(); });
// query.on('end', () => { client.end(); });

























