const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
let envelopes = []; // individual budget envelopes (groceries, gas, clothing, etc)
let totalBudget = 0; // total budget user is willing to spend

// sets the total budget
app.post('/totalBudget', (req, res, next) => {
    const budget = req.body.budget;
    if (budget > 0) { // total budget must be a positive number
        totalBudget = budget;
        res.sendStatus(201);
    }
    else {
        res.status(404).send('Budget not valid');
    }
    next();
})

// creates a new envelope with name and money and adds it to the budget
app.post('/envelope', (req, res, next) => {
    const newEnvelope = req.body;
    if (!newEnvelope) {
        res.status(404).send('Envelope not valid');
    }
    else if (newEnvelope.money > totalBudget) { // new envelope must be within total budget
        res.status(404).send('Budget of envelope exceeds total budget');
    }
    else {
        envelopes.push(newEnvelope);
        res.sendStatus(201);
    }
    next();
})

// retrieves all envelopes
app.get('/envelopes', (req, res, next) => {
    res.send(envelopes);
    next();
})

// retrieves an envelope by its name and total budget
app.get('/envelope/:name', (req, res, next) => {
    const name = req.params.name;
    const found = envelopes.find(envelope => envelope.name === name);
    if (found) {
        res.send({found, 'Total budget': totalBudget});
    }
    else {
        res.status(404).send('Envelope with such name not found');
    }
})

// withdraws a certain amount from specified envelope
app.put('/envelope/:name/:amount', (req, res, next) => {
    const name = req.params.name;
    const amount = req.params.amount;
    const found = envelopes.find(envelope => envelope.name === name);
    if (found) {
        if (found.money >= amount) {
            found.money -= amount;
            res.send({found, 'Transaction': 'successful'})
        }
        else {
            res.status(404).send('Amount to withdraw exceeds money in envelope');
        }
    }
    else {
        res.status(404).send('Envelope with such name not found');
    }
})

const PORT = 3000;
app.listen(PORT, console.log('Server listening on ' + PORT));