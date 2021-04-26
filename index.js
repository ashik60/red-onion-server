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
    res.send(
        '<h1 style="color: green; text-align:center">Red Onion Restaurant Server Working</h1>'
    );
});

client.connect((err) => {
    const foods = client.db('red-onion-restaurant').collection('foods');
    const features = client.db('red-onion-restaurant').collection('features');
    const orders = client.db('red-onion-restaurant').collection('orders');

    // Get all food
    app.get('/foods', (req, res) => {
        foods.find().toArray((err, documents) => {
            res.send(documents);
        });
    });

    // Get single food detail
    app.get('/food/:id', (req, res) => {
        const id = +req.params.id;
        foods.find({ id }).toArray((err, documents) => {
            res.send(documents[0]);
        });
    });

    // Find all features
    app.get('/features', (req, res) => {
        features.find().toArray((err, documents) => {
            res.send(documents);
        });
    });

    // Post a order
    app.post('/submitorder', (req, res) => {
        const order = req.body;
        console.log(data);
        orders.insertOne(order).then((result) => {
            console.log('Inserted order', result.insertedCount);
            res.send(result.insertedCount > 0);
        });
    });

    // Following are methods used once to add data
    app.post('/addfoods', (req, res) => {
        const food = req.body;
        console.log(food);
        foods.insertMany(food).then((result) => {
            console.log('Inserted order', result.insertedCount);
            res.send(result.insertedCount > 0);
        });
    });

    app.post('/addfeatures', (req, res) => {
        const feature = req.body;
        console.log(feature);
        features.insertMany(feature),
            (rej, result) => {
                if (rej) {
                    res.status(500).send('Filed to inset');
                } else {
                    res.send(result.insertedCount > 0);
                }
            };
    });

    if (err) console.log(err);
});

app.listen(port, console.log(`Server listening to http://localhost:${port} `));
