const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const swaggerJsdoc = require("swagger-jsdoc");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const pokemon = require("./routes/pokemon");
const league = require("./routes/league");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/pokemon", pokemon);
app.use("/api/league", league);

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

// Create Database
app.get("/createdb", (req, res) => {
  let sql = `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`;
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
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started in http://${process.env.HOST}:${process.env.PORT}`);
});
