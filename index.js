const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3000;
const cors = require("cors");
require("dotenv").config();

let connection;

function init() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("connected to DB");
  });

  app.use(cors());
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

function setEndPoint() {
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to nhentai collection api v1.0",
    });
  });

  //Returns all the sauce
  app.get("/api/all", (req, res) => {
    var query = "SELECT sauce.*, counter.count FROM sauce ";
    query += "LEFT JOIN ( ";
    query += "SELECT sauce.tags, count(sauce.tags) as count FROM sauce ";
    query += "GROUP BY sauce.tags) counter ON counter.tags = sauce.tags ";
    query += "ORDER BY counter.count DESC;";

    connection.query(query, (err, result, fields) => {
      if (err) throw err;
      res.status(200);
      res.json(result);
    });

    // connection.query(
    //   "SELECT * from sauce ORDER BY tags",
    //   (err, result, fields) => {
    //     if (err) throw err;
    //     res.status(200);
    //     res.json(result);
    //   }
    // );
  });

  app.get("/api/sauce/:tags", (req, res) => {
    connection.query(
      "SELECT * from sauce WHERE tags = ?",
      [req.params.tags],
      (err, result, fields) => {
        if (err) throw err;
        res.status(200);
        res.json(result);
      }
    );
  });

  //insert sauce into db
  //body : sauce: '177013', tags:'Sad'
  app.post("/api/add", (req, res) => {
    connection.query(
      "INSERT INTO sauce (id, code, tags) VALUES (NULL, ?, ?)",
      [req.body.sauce, req.body.tags],
      (err, result, fields) => {
        if (err) throw err;
        res.status(200);
        res.send("Successfully inserted");
      }
    );
  });
}

init();
setEndPoint();
