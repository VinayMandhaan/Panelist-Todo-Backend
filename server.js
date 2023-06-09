const express = require("express");
const connectDB = require("./config/db");
const path = require('path')

var cors = require("cors");
const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(
    express.json({
        extended: false,
    })
);
app.use(cors());

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/task', require('./routes/api/task'))
app.use('/api/project', require('./routes/api/project'))
app.use('/api/shared', require('./routes/api/shared'))




app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});