const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');

app.use(express.json());

connectDB();

app.get("/",(req,res) =>
{
    res.send("Hii your server is working");
});

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));



app.listen(PORT, (req,res) => console.log("Server Started"));