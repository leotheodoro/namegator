const { Client } = require('pg');

const client = new Client({
  user: 'simpl',
  password: 'sqladmin',
  host: 'localhost',
  database: 'namegator',
  port: 5432
});

client.connect();

exports.execute = function(query, values) {
  return new Promise((resolve, reject) => {
    client.query(query, values, function(err, res) {
      if(err) {
        reject(err);
      }
      resolve(res.rows);
    });
  });

}
