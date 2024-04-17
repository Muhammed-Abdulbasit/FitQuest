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

// app.get("/users", (req, res) => {
//     const q = "SELECT * FROM users";
//     db.query(q, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });
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
                const id = result[0].id;
const token = jwt.sign({id}, "jwtSecertKey", {expiresIn: 300});

               res.json({Login: true, token, result});
            } else {
                res.status(401).send({ message: "Wrong username/password" });
            }
        });
});
const verifyJwt = (req,res,next) =>{
    const token = req.headers["access-token"];
    if(!token){
        return res.json('Need a token');
    }else{
        jwt.verify(token,"jwtSecertKey", (err, decoded)=>{
            if(err){
                res.json("Not Authentificated")
            }else{
                req.userid = decoded.id;
                next();
            }
        } )
    }
}
app.get('/checkauth',verifyJwt ,(req, res)=>{
    return res.json("Authenticated")
})
app.get('/user', verifyJwt, (req, res) => {
    // Assuming req.userid contains the user ID extracted from the JWT token
    const userId = req.userid;
    
    // Query the database to fetch user information based on the user ID
    db.query('SELECT * FROM users WHERE userid = ?', userId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while fetching user information' });
      } else {
        // Assuming the result is an object representing the user
        res.status(200).json(result[0]);
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



// Assuming you have a GET endpoint to retrieve user information
app.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    // Query the database for user information based on userId
    // Replace this with your database query logic
    db.query('SELECT * FROM users WHERE userid = ?', userId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while fetching user information' });
      } else {
        res.status(200).json(result[0]); // Assuming the result is an object representing the user
      }
    });
  });
  app.get('/user', verifyJwt, (req, res) => {
    const userId = req.userid; // Extract user ID from JWT token

    db.query('SELECT * FROM users WHERE id = ?', userId, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while fetching user information' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]); // Send user information as JSON response
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      }
    });
  });


app.listen(8000, () => {
    console.log("Listening");
});