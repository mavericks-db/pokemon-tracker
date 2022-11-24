require("dotenv").config();
const express = require("express");
const app = express();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Create Database
// app.get('/createdb', (req, res) => {
//   let sql = "CREATE DATABASE IF NOT EXISTS pokemon_tracker";
//   db.query(sql, (err, result) => {
//     if(err) {
//       throw err;
//     }
//     console.log('Database created...');
//   })
//   res.send('Database created')
// });

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected ...");
  let sql =
    "CREATE TABLE IF NOT EXISTS pokemon (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, attack INT NOT NULL, defense INT NOT NULL, speed INT NOT NULL, UNIQUE (name))";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("Table created ....");
  });
});

app.get("/", (req, res) => {
  res.send("Pokemon table is created ...");
});

app.get("/createpokemon", (req, res) => {
  let pokemon = `('Pikachu', 'lightning', 10, 15, 5)`;
  let sql = `INSERT INTO pokemon (name, type, attack, defense, speed) VALUES ${pokemon}`;
  db.query(sql, pokemon, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("1 pokemon recorded");
  });
  res.send("1 pokemon recorded");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started in https://127.0.0.1:${process.env.PORT}`);
});
