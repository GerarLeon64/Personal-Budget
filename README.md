# Personal-Budget
An API representing a budget based on envelope budgeting principles. Users can enter their salary and create, read, update, and delete budgets, envelopes, and transactions between envelopes.

Implemented using PostgreSQL, Express.js, Javascript, and Node.js.

# Budget Endpoints
- post `/budget` Creates a new budget with specificed id and total
- get `/budget` Retrieves all budgets in the database
- delete `/budget/:id` Deletes a budget based on id

# Envelope Endpoints
- post `/envelope` Creates a new envelope with id, budget_id, name, and balance
- get `/envelope` Retrieves all envelopes from the database
- get `/envelope/:id` Retrieves a specific envelope by id
- put `/envelope/:amount/:id` Withdraws a certain amount from envelope based on id
- delete `/envelope/:id` Deletes an envelope based on id

# Transaction Endpoints
- get `/transaction` Retrieves all transactions
- post `/transaction/:id/:to/:from/:amount` Creates a new transaction between two envelopes based on their ids
- delete `/transaction/:id` Deletes a transaction by id
