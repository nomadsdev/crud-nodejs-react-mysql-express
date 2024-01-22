const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.get('/api/data', (req, res) => {
    db.query('SELECT * FROM data_table', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});

app.post('/api/data', (req, res) => {
    const { name, occupation, salary } = req.body;
    db.query(
      'INSERT INTO data_table (name, occupation, salary) VALUES (?, ?, ?)',
      [name, occupation, salary],
      (err, result) => {
        if (err) throw err;
        res.json({ message: 'Data added successfully', id: result.insertId });
      }
    );
});

app.put('/api/data/:id', (req, res) => {
    const { name, occupation, salary } = req.body;
    const id = req.params.id;
    db.query(
      'UPDATE data_table SET name=?, occupation=?, salary=? WHERE id=?',
      [name, occupation, salary, id],
      (err, result) => {
        if (err) throw err;
        res.json({ message: 'Data updated successfully', id });
      }
    );
});

app.delete('/api/data/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM data_table WHERE id=?', [id], (err, result) => {
      if (err) throw err;
      res.json({ message: 'Data deleted successfully', id });
    });
});

app.listen(port, () => {
    console.log('Server is running');
});