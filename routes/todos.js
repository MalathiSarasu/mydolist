const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all tasks
router.get('/todos', (req, res) => {
    let sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a task
router.post('/todos', (req, res) => {
    let task = { description: req.body.description };
    let sql = 'INSERT INTO tasks SET ?';
    db.query(sql, task, (err, result) => {
        if (err) throw err;
        res.sendStatus(201);
    });
});

// Update a task
router.put('/todos/:id', (req, res) => {
    let sql = `UPDATE tasks SET description = '${req.body.description}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Delete a task
router.delete('/todos/:id', (req, res) => {
    let sql = `DELETE FROM tasks WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

module.exports = router;
