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
//********For Workout Log Table */
app.post("/workoutlog", (req,res)=>{
    const name = req.body.name;
    const duration = req.body.duration;
    const type = req.body.type;
    const date =req.body.date;

    db.query("INSERT INTO workout_log(name,duration,type,date) VALUES(?,?,?,?)",
    [name, duration, type, date],
    (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "An error occurred while entering data" });
        }
        console.log("Data Entered")
        return res.json({ result });
    });
});

//General for Now
app.get("/workoutlog", (req, res) => {
    const q = "SELECT * FROM workout_log";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
//Delete a Workout from the log
app.delete('/workoutlog/:id', async (req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM workout_log WHERE id = ?", [id],
    (err,result)=>{
if(err) return res.json(err);
        return res.json("Log Data Has Been Deleted");

    }
    )
});

app.post("/nutritionlog", (req,res)=>{
    const name = req.body.name;
    const calorie = req.body.calorie;
    const protein = req.body.protein;
    const carbs = req.body.carbs;
    const date =req.body.date;

    db.query("INSERT INTO nutrition_log(name,calories,protein,carbohydrates,date) VALUES(?,?,?,?,?)",
    [name, calorie, protein,carbs, date],
    (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "An error occurred while entering data" });
        }
        console.log("Data Entered")
        return res.json({ result });
    });
});

//General for Now
app.get("/nutritionlog", (req, res) => {
    const q = "SELECT * FROM nutrition_log";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.delete('/nutritionlog/:id', async (req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM nutrition_log WHERE id = ?", [id],
    (err,result)=>{
if(err) return res.json(err);
        return res.json("Log Data Has Been Deleted");

    }
    )
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
