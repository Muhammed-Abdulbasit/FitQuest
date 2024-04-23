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
    user: "root",
    password: "ediong123", /* Change Pass */
    database: "fitquest"
});

app.get("/", (req, res) => {
    res.json("Hello backend");
});
// Orders the leaderboard based on XP
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users ORDER BY xp DESC', (err, data) => {
        if (err) {
            // Handle error
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'An error occurred while fetching users' });
        } else {
            // Send the fetched user data as a response
            res.json(data);
        }
    });
});
//********For Workout Log Table */
app.post("/workoutlog", (req, res) => {
    const name = req.body.name;
    const duration = req.body.duration;
    const type = req.body.type;
    const date = req.body.date;
    const userid = req.body.userid

    db.query(
        "INSERT INTO workout_log(name, duration, type, date, userid) VALUES(?, ?, ?, ?, ?)",
        [name, duration, type, date, userid],
    (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "An error occurred while entering data" });
        }
            console.log("Data Entered");
        return res.json({ result });
        }
    );
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
// Editing a workout log
app.put('/workoutlog/:id', (req, res) => {
    const id = req.params.id;
    const { name, duration, type, date } = req.body;

    db.query(
        'UPDATE workout_log SET name=?, duration=?, type=?, date=? WHERE id=?',
        [name, duration, type, date, id],
        (err, result) => {
            if (err) {
                console.error('Error updating workout log:', err);
                return res.status(500).json({ message: 'An error occurred while updating workout log' });
            }
            console.log('Workout log updated successfully');
            return res.json({ message: 'Workout log updated successfully' });
        }
    );
});

app.post("/nutritionlog", (req,res)=>{
    const name = req.body.name;
    const calorie = req.body.calorie;
    const protein = req.body.protein;
    const carbs = req.body.carbs;
    const date =req.body.date;
    const userid = req.body.userid
    db.query("INSERT INTO nutrition_log(name,calories,protein,carbohydrates,date, userid) VALUES(?,?,?,?,?,?)",
    [name, calorie, protein,carbs, date, userid],
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

app.put('/nutritionlog/:id', async (req, res) => {
    const id = req.params.id;
    const { name, calorie, protein, carbs, date } = req.body;

    db.query(
        'UPDATE nutrition_log SET name=?, calories=?, protein=?, carbohydrates=?, date=? WHERE id=?',
        [name, calorie, protein, carbs, date, id],
        (err, result) => {
            if (err) {
                console.error('Error updating nutrition log:', err);
                return res.status(500).json({ message: 'An error occurred while updating nutrition log' });
            }
            console.log('Nutrition log updated successfully');
            return res.json({ message: 'Nutrition log updated successfully' });
        }
    );
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
             const id = result[0].userid;
             const name = result[0].name;
             const username = result[0].username;
             const gender = result[0].gender;
             const height = result[0].height;
             const weight = result[0].weight;
             const dob = result[0].DOB;
             const xp = result[0].xp;
                 // Assuming the user's name is stored in the 'name' column
                const token = jwt.sign({ id, name, email, username, gender, height, weight, dob, xp}, "jwtSecertKey", { expiresIn: '1h' });
             
                res.json({ Login: true, token, id, name, email });
            } else {
                res.status(401).send({ message: "Wrong username/password" });
            }
        });
});


app.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const birth = req.body.birth;
    const gender = req.body.gender;
    const height = req.body.height;
    const weight = req.body.weight;



    db.query("INSERT INTO users (name, email, username, password, DOB, gender, height, weight) VALUES (?,?,?,?,?,?,?,?)",
        [name, email, username, password, birth, gender, height, weight],
        (err, result) => {
            if (err) {
                console.error(err);
            }
          
            return res.json({ message: "Successfully Registered" });
        });
});

// Fetches and Displays all challenges to the Challenges Screen
app.get("/challenges", (req,res)=>{
const q = 'SELECT * FROM challenges ORDER BY xp_val ASC';

db.query(q,(err, results)=>{
    if (err){
        res.status(500).json({error: 'An error occured while fetching challenges'});
    }
    else{
        res.json(results);
      }
})
})

app.put('/updateUserXP/:userId/:challengeXp', (req, res) => {
    const userId = req.params.userId;
    const challengeXp = req.params.challengeXp;

    // Update user's XP in the users table
    db.query(
        'UPDATE users SET xp = xp + ? WHERE userid = ?',
        [challengeXp, userId],
        (err, result) => {
            if (err) {
                console.error('Error updating user XP:', err);
                return res.status(500).json({ message: 'An error occurred while updating user XP' });
            }
            console.log('User XP updated successfully');
            return res.json({ message: 'User XP updated successfully' });
        }
    );
});


  //Totals all the minutes from a workout log and displays it
  app.get('/totalWorkoutMinutes', (req, res) => {
    db.query('SELECT SUM(duration) AS totalMinutes FROM workout_log', (err, result) => {
        if (err) {
            console.error('Error calculating total workout minutes:', err);
            res.status(500).json({ error: 'An error occurred while calculating total workout minutes' });
        } else {
            const totalMinutes = result[0].totalMinutes || 0;
            res.json({ totalMinutes });
        }
    });
});
// Route to fetch nutrition log entries for a specific user
app.get("/nutritionlog/:userId", (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT n.name, n.calories, n.protein, n.carbohydrates, n.date FROM nutrition_log n JOIN users u on u.userid = n.userid WHERE u.userid = ?";
    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error('Error fetching nutrition log entries:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(data);
    });
});
// Route to fetch workout log entries for a specific user
app.get("/workoutlog/:userId", (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT w.name, w.type, w.duration,w.date FROM workout_log w JOIN users u on u.userid = w.userid WHERE u.userid = ?";
    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error('Error fetching nutrition log entries:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(data);
    });
});
app.listen(8000, () => {
    console.log("Listening");
});
