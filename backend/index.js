const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser') // Import jsonwebtoken library
 

const app = express();
app.use(cors());
app.use(express.json()); // Invoke express.json as a function


const db = mysql.createConnection({
    host: "localhost",
    user: "YOUR_USER",
    password: "YOUR_PASS", /* Change Pass */
    database: "YOUR_DATABASE"
});

app.get("/", (req, res) => {
    res.json("Hello backend");
});

app.get("/users", (req, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
            if (err) {
                res.status(500).send({ message: "An error occurred while logging in" });
                return;
            }
            if (result.length > 0) {
               
                res.status(200).send({ message: "Successfully logged in" });
            } else {
                res.status(401).send({ message: "Wrong username/password" });
            }
        });
});

app.post("/register", (req, res) => {
    const Name = req.body.Name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const birth = req.body.birth;
    const gender = req.body.gender;
    const height = req.body.height;
    const weight = req.body.weight;



    db.query("INSERT INTO users (name, email, username, password, DOB, gender, height, weight) VALUES (?,?,?,?,?,?,?,?)",
        [Name, email, username, password, birth, gender, height, weight],
        (err, result) => {
            if (err) {
                console.error(err);
            }
            return res.json({ message: "Successfully Registered" });
        });
});






app.listen(8000, () => {
    console.log("Listening");
});
