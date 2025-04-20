const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors');

const app = express(); // ✅ Moved this here
const port = 5000;

app.use(cors());
app.use(express.json());

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);
app.use('/api/note', require('./routes/note'));

app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
