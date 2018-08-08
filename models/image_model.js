'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImagesSchema = new Schema({
    main_name: String,
    new_name: String,
    uri: {type: String, required: true}
});


ImagesSchema.statics.image_create = function (req, res){
    let newImage = new this(
        {
            main_name: req.file.originalname,
            new_name: req.file.filename,
            uri: req.file.path 
        }
    );

    newImage.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Image saved successfully')
    })
}

ImagesSchema.statics.image_read = function (){
    
}

ImagesSchema.statics.image_update = function (){
    
}

ImagesSchema.statics.image_delete = function (){
    
}


module.exports = mongoose.model('Images', ImagesSchema);


