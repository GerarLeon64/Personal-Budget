const { client } = require('./database'); // client for database queries
const express = require('express');
const app = express();
app.use(express.json());

// creates a new budget with id and total budget
// works
app.post('/budget', (req, res) => {
    const id = req.body.id;
    const total = req.body.total;
    client.query(`INSERT INTO budget (id, total) VALUES (${id}, ${total})`,
      (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
})

// retrieves all budgets
// works
app.get('/budget', (req, res, next) => {
    client.query('SELECT * FROM budget', (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
})

// deletes a specific budget by id
// works
app.delete('/budget/:id', (req, res, next) => {
    client.query('DELETE FROM budget WHERE id = ?', [req.params.id], (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
})
// creates a new envelope with id, budget_id, name, and balance
// work
app.post('/envelope', (req, res) => {
    const id = req.body.id;
    const budget_id = req.body.budget_id;
    const name = req.body.name;
    const balance = req.body.balance;
    client.query(`INSERT INTO envelope VALUES (${id}, ${budget_id}, '${name}', ${balance})`, 
    (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
})

// retrieves all envelopes
// works
app.get('/envelope', (req, res, next) => {
    client.query('SELECT * FROM envelope', (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
})

// retrieves an envelope by its id
app.get('/envelope/:id/', (req, res, next) => {
    const id = req.params.id;
    client.query(`SELECT * FROM envelope WHERE id = ${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
})

// withdraws a certain amount from specified envelope
// works
app.put('/envelope/:amount/:id', (req, res, next) => {
    const id = req.params.id;
    const amount = parseFloat(req.params.amount);
    const balance = client.query(`SELECT balance FROM envelope WHERE id = ${id}`);
    const newBalance = parseFloat(balance) - amount;
    client.query(`UPDATE envelope SET balance = ${newBalance} WHERE id = ${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
})

// deletes a specific envelope by id
// works
app.delete('/envelope/:id', (req, res, next) => {
    const id = req.params.id;
    client.query(`DELETE FROM envelope WHERE id = ${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
})

// retrieves all transactions
// works
app.get('/transaction', (req, res) => {
    client.query('SELECT * FROM transaction', (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
    })
})

// creates a transaction between two envelopes based on their ids
// works
app.post('/transaction/:id/:to/:from/:amount', (req, res, next) => {
    const sourceId = req.params.from;
    const destinationId = req.params.to;
    const amount = parseFloat(req.params.amount);
    const balanceOfDest = client.query(`SELECT balance FROM envelope WHERE id = ${destinationId}`);
    const newBalanceOfDest = parseFloat(balanceOfDest) + amount;
    client.query(`UPDATE envelope SET balance = ${newBalanceOfDest} WHERE id = ${destinationId}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
    const balanceOfSource = client.query(`SELECT balance FROM envelope WHERE id = ${sourceId}`);
    const newBalanceOfSource = parseFloat(balanceOfSource) - amount;
    client.query(`UPDATE envelope SET balance = ${newBalanceOfSource} WHERE id = ${sourceId}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
    const transactionId = req.params.id; 
    client.query(`INSERT INTO transaction VALUES (${transactionId}, 'now', ${amount}, ${destinationId}, ${sourceId})`,
    (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })

})

// deletes a specific transaction by id
// works
app.delete('/transaction/:id', (req, res, next) => {
    const id = req.params.id;
    client.query(`DELETE FROM transaction WHERE id = ${id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err);
        }
        client.end;
    })
})
const PORT = 3000;
app.listen(PORT, console.log('Server listening on ' + PORT));

client.connect();