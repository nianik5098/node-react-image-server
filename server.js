'use strict'

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
//const port = process.env.PORT || 5000;
const config = require('./settings/config');
const app = express()
const port = process.env.PORT || 8080;

mongoose.Promise = require('bluebird');
mongoose.connect(config.dbUrl, { useMongoClient: true })
    .then(() => { // if all is ok we will be here
        console.log('Db initialized');
        
    })
    .catch(err => { // if error we will be here
        console.error('DB starting error');
        //process.exit(1);
    });


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept,' +
        'X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


// Serve static files from the React app

app.use(express.static(path.join(__dirname, 'client/build')));

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const imageRouter = require('./routes/image_route');
app.use('/images', imageRouter);

app.use(express.static(process.cwd() + '/public'));

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.use((err, req, res, next) => {

    if (err.code == 'ENOENT') {
        
        res.status(404).json({message: 'Page Not Found !'})

    } else {

        res.status(500).json({message:err.message}) 
    } 
})


app.listen(port);
console.log(`Bigprint listening on ${port}`);
