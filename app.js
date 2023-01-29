const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '100mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));

// app.use(morgan('combined', { stream: logger.stream }));

app.get(`/`, (req, res) => {
    res.send("Le server s'excute normalement 😋!!!");
});

module.exports = app;