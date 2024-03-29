const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

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

//Route For User LogIn
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password =req.body.password;
  
    db.query("SELECT * FROM users WHERE email= ? AND password = ?", 
    [email,password],
     (err,result)=>{
        if (err) {
            res.send({err: err})
            }
            if(result.length > 0){
                res.send({message: "Successfully Logged In"})
                
                }
                else{
                    res.send({message: "Wrong username/password"})
                }
     });
});

app.post("/register", (req, res) => {
    const Name = req.body.Name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const birth= req.body.birth;
    const gender = req.body.gender;
    const height = req.body.height;
    const weight = req.body.weight;
    // Hash the password before storing it in the database (use bcrypt or a similar library)
    // Example: const hashedPassword = bcrypt.hashSync(password, saltRounds);

    db.query( "INSERT INTO users (name, email, username, password, DOB, gender, height, weight) VALUES (?,?, ?, ?, ?, ?, ?, ?)",
     [ Name, email, username, password, birth, gender, height, weight],
      (err, result) => {
        if (err) {
            console.error(err);
          
        }
        return res.json({ message: "Successfully Logged In" })
    });
});

app.listen(8000, () => {
    console.log("Listening");
});
