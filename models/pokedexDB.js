// https://www.youtube.com/watch?v=fD7x8hd9yE4&spfreload=10

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE main(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });