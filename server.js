'use strict'

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
//const port = process.env.PORT || 5000;
const config = require('./settings/config');

const app = express();

const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
//const app = express()
const router = express.Router()

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

/*
// Serve static files from the React app

app.use(express.static(path.join(__dirname, 'client/build')));
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.use(express.static(process.cwd() + '/public'));

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
*/

const upload = multer({
    dest:'images/', 
    limits: {fileSize: 10000000, files: 1},
    fileFilter:  (req, file, callback) => {
    
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {

            return callback(new Error('Only Images are allowed !'), false)
        }

        callback(null, true);
    }
}).single('image')

router.post('/images/upload', (req, res) => {

    upload(req, res, function (err) {

        if (err) {

            res.status(400).json({message: err.message})

        } else {

            let path = `/images/${req.file.filename}`
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
        }
    })
})

router.get('/images/:imagename', (req, res) => {

    let imagename = req.params.imagename
    let imagepath = __dirname + "/images/" + imagename
    let image = fs.readFileSync(imagepath)
    let mime = fileType(image).mime

	res.writeHead(200, {'Content-Type': mime })
	res.end(image, 'binary')
})


app.use('/', router)

app.use((err, req, res, next) => {

    if (err.code == 'ENOENT') {
        
        res.status(404).json({message: 'Image Not Found !'})

    } else {

        res.status(500).json({message:err.message}) 
    } 
})


app.listen(port);
console.log(`Bigprint listening on ${port}`);
