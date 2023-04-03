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
})

// app.post('/envelope', (req, res, next) => {
//     const newEnvelope = req.body;

// })

const PORT = 3000;
app.listen(PORT, console.log('Server listening on ' + PORT));