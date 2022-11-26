require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const mysql = require("mysql2");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Create Database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE IF NOT EXISTS pokemon_tracker";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Database created...");
  });
  res.send("Database created");
});

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
    console.log("Pokemon Table created ....");
  });
  let sql2 =
    "CREATE TABLE IF NOT EXISTS league (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, terrain VARCHAR(255) NOT NULL, date DATE NOT NULL, slots INT NOT NULL, maxstats INT NOT NULL, jsonPokemon JSON DEFAULT NULL)";
  db.query(sql2, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("League Table created ...");
  });
  // let sql3 =
  //   "CREATE TABLE IF NOT EXISTS league_pokemon (lgid INT NOT NULL, FOREIGN KEY (lgid) REFERENCES league(id) ON DELETE CASCADE, pokemon VARCHAR(255) NOT NULL)";
  // db.query(sql3, (err, result) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(result);
  //   console.log("League_Pokemon Join Table created ...");
  // });
});

app.get("/", (req, res) => {
  res.send("Pokemon and League tables are created ...");
});

// Routes for pokemon
app.get("/api/my_pokemons", (req, res) => {
  let sql = "SELECT * FROM pokemon";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
  console.log("Show all pokemons ...");
});

app.post("/api/selectpokemon", (req, res) => {
  let { pokemon } = req.body;
  let sql = "SELECT attack, defense, speed FROM pokemon WHERE name = ?";
  db.query(sql, pokemon, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
  console.log("Show stats of selected pokemon ...");
});

app.post("/api/createpokemon", (req, res) => {
  let { name, type, attack, defense, speed } = req.body;
  let sql =
    "INSERT INTO pokemon (name, type, attack, defense, speed) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, type, attack, defense, speed], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("1 pokemon recorded");
  });
  res.send({ message: "1 pokemon recorded" });
});

app.post("/api/removepokemon", (req, res) => {
  let { id } = req.body;
  console.log(id);
  let sql = "DELETE FROM pokemon WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("1 pokemon removed");
  });
  res.send({ message: "1 pokemon removed" });
});

// Routes for league
app.get("/api/my_leagues", (req, res) => {
  let sql = "SELECT * FROM league";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
  console.log("Show all pokemon leagues ...");
});

app.post("/api/bookleague", (req, res) => {
  let { title, location, terrain, date, slots, maxstats } = req.body;
  let sql =
    "INSERT INTO league (title, location, terrain, date, slots, maxstats) VALUES (?, ?, ?, ?, ? , ?)";
  db.query(
    sql,
    [title, location, terrain, date, slots, maxstats],
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      console.log("1 pokemon league booked");
    }
  );
  res.send({ message: "1 pokemon league booked" });
});

app.post("/api/deleteleague", (req, res) => {
  let { id } = req.body;
  console.log(id);
  let sql = "DELETE FROM league WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("1 pokemon league deleted");
  });
  res.send({ message: "1 pokemon league deleted" });
});

app.post("/api/updateleague", (req, res) => {
  let { selectedPokemons, id } = req.body;
  let sql = `UPDATE league set jsonPokemon = '${JSON.stringify(
    selectedPokemons
  )}' WHERE id = ?`;
  db.query(sql, id, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("1 pokemon league updated");
  });
  res.send({ message: "1 pokemon league updated" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started in https://127.0.0.1:${process.env.PORT}`);
});
