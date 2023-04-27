const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5433,
    password: 'postgres',
    database: 'budget'
  });

client.connect();

client.query('SELECT * FROM budget', (err, res) => {
    if (err) {
        throw new Error('Query did not work');
    }
    else {
        console.log(res.rows);
    }
    client.end;
});