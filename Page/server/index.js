const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql8");
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'TANer123?',
    database:'course'
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM coursename";
  db.query(sqlGet, (error, result) => {
     res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const {name, teacher, duration, description} = req.body;
  const sqlInsert = "INSERT INTO coursename(name, teacher, duration, description) VALUES(?, ?, ?, ?)";
  db.query(sqlInsert, [name, teacher, duration, description], (error, result) => {
     if (error) {
      console.log(error);
     }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const {id} = req.params;
  const sqlRemove = 
  "DELETE FROM coursename WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
     if (error) {
      console.log(error);
     }
  });
});

app.get("/api/get/:id", (req, res) => {
  const {id} = req.params;
  const sqlGet = "SELECT * FROM coursename WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
     if(error) {
      console.log(error);    
     }
     res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const {id} = req.params;
  const {name, teacher, duration, description} = req.body;
  const sqlUpdate = "UPDATE  coursename SET name = ?, teacher = ?, duration = ?, description = ? WHERE id = ?"; 
  db.query(sqlUpdate, [name, teacher, duration, description, id], (error, result) => {
     if(error) {
      console.log(error);     
     }
     res.send(result);
  });
});
app.listen(5000, () => {
  console.log('listening on port 5000')
})