const { client } = require('./database'); // client for database queries
const express = require('express');
const app = express();
app.use(express.json());

// creates a new budget with id and total budget
app.post('/budget', (req, res, next) => {
    const budget = req.body;
    client.query(`INSERT INTO budget VALUES (${budget.id}, ${budget.id})`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
})

// retrieves all budgets
app.get('/budgets', (req, res, next) => {
    client.query('SELECT * FROM budget', (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
})

// creates a new envelope with id, budget_id, name, and balance
app.post('/envelope', (req, res, next) => {
    const newEnvelope = req.body;
    client.query(`INSERT INTO envelope VALUES (${newEnvelope.id}, ${newEnvelope.budget_id}, ${newEnvelope.name}, ${newEnvelope.balance})`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
})

// retrieves all envelopes
app.get('/envelopes', (req, res, next) => {
    client.query('SELECT * FROM envelope', (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
})

// retrieves an envelope by its id
app.get('/envelope/:id/', (req, res, next) => {
    const id = req.params.id;
    const budgetId = req.params.budgetid;
    client.query(`SELECT * FROM envelope WHERE id = ${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
})

// withdraws a certain amount from specified envelope
app.put('/envelope/:amount/:id', (req, res, next) => {
    const id = req.params.id;
    const amount = parseFloat(req.params.amount);
    client.query(`UPDATE envelope SET balance = (balance - ${amount}) WHERE id = ${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
})

// transfer amount from one envelope to another based on their ids
app.put('/envelopes/transfer/:to/:from/:amount', (req, res, next) => {
    const sourceId = req.params.from;
    const destinationId = req.params.to;
    const amount = parseFloat(req.params.amount);
    client.query(`UPDATE envelope SET balance = (balance - ${amount}) WHERE id = ${sourceId}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
    client.query(`UPDATE envelope SET balance = (balance + ${amount}) WHERE id = ${destinationId}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
})

// deletes a specific envelope by id
app.delete('/envelope/:id', (req, res, next) => {
    const id = req.params.id;
    client.query(`DELETE FROM envelope WHERE id = ${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
})

// deletes a specific budget by id
app.delete('/budget/:id', (req, res, next) => {
    const id = req.params.id;
    client.query(`DELETE FROM budget WHERE id = ${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        client.end;
    })
})

const PORT = 3000;
app.listen(PORT, console.log('Server listening on ' + PORT));

client.connect();