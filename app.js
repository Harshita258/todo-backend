require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/connection');
const todosRouter = require('./routes/todos');


const app = express();


app.use(cors());
app.use(bodyParser.json());


// Connect to DB
connectDB();


// Routes
app.use('/todos', todosRouter);
app.use('/agenda', todosRouter); // agenda handled in controller by query date


// Health check
app.get('/', (req, res) => res.send({ status: 'ok' }));


// Error handler simple
app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
