const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST_MYSQL,
    user: process.env.DB_USER_MYSQL,
    password: process.env.DB_PASSWORD_MYSQL,
    database: process.env.DB_NAME_MYSQL,
  });

  connection.connect((err) => {
    if (err) {
      console.log("error connecting to DB");
      setTimeout(handleDisconnect, 2000);
    }
    console.log("connected to DB");
  });

  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
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
    var query = "SELECT manga.*, counter.count FROM manga ";
    query += "LEFT JOIN ( ";
    query += "SELECT manga.genre, count(manga.genre) as count FROM manga ";
    query += "GROUP BY manga.genre) counter ON counter.genre = manga.genre ";
    query += "ORDER BY counter.count DESC;";

    connection.query(query, (err, result, fields) => {
      if (err) throw err;
      res.status(200);
      res.json(result);
    });
  });

  app.get("/api/sauce/:genre", (req, res) => {
    connection.query(
      "SELECT * from manga WHERE genre = ?",
      [req.params.genre],
      (err, result, fields) => {
        if (err) throw err;
        res.status(200);
        res.json(result);
      }
    );
  });

  //insert sauce into db
  app.post("/api/add", (req, res) => {
    connection.query(
      "INSERT INTO manga (id, name, genre, link) VALUES (NULL, ?, ?, ?)",
      [req.body.name, req.body.genre, req.body.link],
      (err, result, fields) => {
        if (err) throw err;
        res.status(200);
        res.json(result);
        // console.log(result);
      }
    );
  });

  //get random sauce
  // api/random?amt=5
  app.get("/api/random", (req, res) => {
    let amt = parseInt(req.query.amt) || 1;
    let query = [
      "SELECT manga.*, (SELECT count(*) from manga) as total FROM manga",
      "ORDER BY RAND()",
      "LIMIT ?",
    ].join(" ");

    connection.query(query, [amt], (err, result, fields) => {
      if (err) throw err;
      res.status(200);
      res.json(result);
    });
  });

  //get random sauce with tag
  // api/random/shibari?amt=5
  app.get("/api/random/:genre", (req, res) => {
    let gen = req.params.genre;
    let amt = parseInt(req.query.amt) || 1;
    let query = [
      "SELECT manga.*, counter.count FROM manga",
      "LEFT JOIN (",
      "SELECT manga.genre, count(manga.genre) as count FROM manga",
      "GROUP BY manga.genre)",
      "counter ON counter.genre = manga.genre",
      "WHERE manga.genre = ?",
      "ORDER BY RAND()",
      "LIMIT ?",
    ].join(" ");

    connection.query(query, [gen, amt], (err, result, fields) => {
      if (err) throw err;
      res.status(200);
      res.json(result);
    });
  });

  //get tag list
  app.get("/api/genrelist/", (req, res) => {
    let query = [
      "SELECT genre, count(genre) as count FROM manga",
      "GROUP BY genre",
      "ORDER BY count DESC",
    ].join(" ");

    connection.query(query, (err, result, fields) => {
      if (err) throw err;
      res.status(200);
      res.json(result);
    });
  });

  app.get("/api/detail/:id", (req, res) => {
    let query = ["SELECT * FROM manga", "WHERE id = ?"].join(" ");
    let idParams = req.params.id;

    connection.query(query, [idParams], (err, result, fields) => {
      if (err) throw err;
      res.status(200);
      res.json(result);
    });
  });

  app.get("/api/delete/:id", (req, res) => {
    let query = ["DELETE FROM manga", "WHERE id = ?"].join(" ");
    let idParams = req.params.id;

    connection.query(query, [idParams], (err, result, fields) => {
      if (err) throw err;
      res.status(200);
      res.json(result);
    });
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

init();
setEndPoint();
