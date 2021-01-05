const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/",(req,res) =>
{
    res.send("Hii your server is working");
})
app.listen(PORT, (req,res) => console.log("Server Started"));