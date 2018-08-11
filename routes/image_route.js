const express = require('express');
const imageRouter = express.Router();
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
const Jimp = require('jimp');

//const app = express()
//const router = express.Router()

const image_controller = require('../models/image_model');


const upload = multer({
    dest:'images/', 
    limits: {fileSize: 10000000, files: 1},
    fileFilter:  (req, file, callback) => {
    
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/)) {

            return callback(new Error('Only Images are allowed !'), false)
        }

        callback(null, true);
    }
}).single('image')

imageRouter.post('/upload', (req, res) => {
    console.log(req.file, "anik");
    upload(req, res, function (err) {

        if (err) {

            res.status(400).json({message: err.message})

        } else {

            let path = `/images/${req.file.filename}`
            res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
            
            //image_controller.image_create(req);
        }
    })
})

imageRouter.get('/:imagename', (req, res) => {

    let imagename = req.params.imagename
    let imagepath = __dirname + "/images/" + imagename
    let image = fs.readFileSync(imagepath)
    let mime = fileType(image).mime

	res.writeHead(200, {'Content-Type': mime })
	res.end(image, 'binary')
})


module.exports = imageRouter;
