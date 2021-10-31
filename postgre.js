const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();
const { Pool, Client } = require("pg");

let connection;

function handleDisconnect() {
  connection = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
  });

  connection.connect((err) => {
    if (err) {
      console.log("error connecting to DB");
      console.log(err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("connected to DB");
    }
  });

  connection.on("error", function (err) {
    console.log("db error, retrying", err);
    handleDisconnect();
  });
}

function init() {
  handleDisconnect();

  app.use(express.static(path.join(__dirname, "client/build")));
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

    connection.query(query, (err, result) => {
      if (err) throw err;
      res.status(200);
      res.json(result.rows);
    });
  });

  app.get("/api/sauce/:tags", (req, res) => {
    connection.query(
      "SELECT * from sauce WHERE tags = ?",
      [req.params.tags],
      (err, result) => {
        if (err) throw err;
        res.status(200);
        res.json(result.rows);
      }
    );
  });

  //insert sauce into db
  //body : sauce: '177013', tags:'Sad'
  app.post("/api/add", (req, res) => {
    connection.query(
      "INSERT INTO sauce (id, code, tags) VALUES (NULL, ?, ?)",
      [req.body.code, req.body.tags],
      (err, result) => {
        if (err) throw err;
        res.status(200);
        res.json(result.rows);
      }
    );
  });

  //get random sauce
  // api/random?amt=5
  app.get("/api/random", (req, res) => {
    let amt = parseInt(req.query.amt) || 1;
    let query = [
      "SELECT sauce.*, (SELECT count(*) from sauce) as total FROM sauce",
      "ORDER BY RAND()",
      "LIMIT ?",
    ].join(" ");

    connection.query(query, [amt], (err, result) => {
      if (err) throw err;
      res.status(200);
      res.json(result.rows);
    });
  });

  //get random sauce with tag
  // api/random/shibari?amt=5
  app.get("/api/random/:tags", (req, res) => {
    let tag = req.params.tags;
    let amt = parseInt(req.query.amt) || 1;
    let query = [
      "SELECT sauce.*, counter.count FROM sauce",
      "LEFT JOIN (",
      "SELECT sauce.tags, count(sauce.tags) as count FROM sauce",
      "GROUP BY sauce.tags)",
      "counter ON counter.tags = sauce.tags",
      "WHERE sauce.tags = ?",
      "ORDER BY RAND()",
      "LIMIT ?",
    ].join(" ");

    connection.query(query, [tag, amt], (err, result) => {
      if (err) throw err;
      res.status(200);
      res.json(result.rows);
    });
  });

  //get tag list
  app.get("/api/taglist/", (req, res) => {
    let query = [
      "SELECT tags, count(tags) as count FROM sauce",
      "GROUP BY tags",
      "ORDER BY count DESC",
    ].join(" ");

    connection.query(query, (err, result) => {
      if (err) throw err;
      res.status(200);
      res.json(result.rows);
    });
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

init();
setEndPoint();
