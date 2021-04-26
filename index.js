const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

const uri = process.env.DB_PATH;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center;">Red Onion Restaurant Server Working</h1>');
});

app.connect((err) => {
    if (err) console.log(err);
});
