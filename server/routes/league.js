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

router.get("/my_leagues", (req, res) => {
  let sql = "SELECT * FROM league";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
  console.log("Show all pokemon leagues ...");
});

router.post("/bookleague", (req, res) => {
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

router.post("/deleteleague", (req, res) => {
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

router.post("/updateleague", (req, res) => {
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


module.exports = router;
