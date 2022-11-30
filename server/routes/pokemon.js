const express = require("express");
let router = express.Router();
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

router.get("/my_pokemons", (req, res) => {
  let sql = "SELECT * FROM pokemon";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
  console.log("Show all pokemons ...");
});

router.post("/selectpokemon", (req, res) => {
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

router.post("/createpokemon", (req, res) => {
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

router.delete("/removepokemon", (req, res) => {
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

module.exports = router;
