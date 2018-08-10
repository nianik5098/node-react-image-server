'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImagesSchema = new Schema({
    main_name: String,
    new_name: String,
    uri: {type: String, required: true}
});


ImagesSchema.statics.image_create = function (req){
    //console.log("ashlam", req.file.originalname)
    const newImage = new this(
        {
            main_name: req.file.originalname,
            new_name: req.file.filename,
            uri: req.file.path 
        }
    );
    //console.log("ashlam1", req.file.filename)
    newImage.save(function (err) {
        //console.log("ashlam2")
        if (err) {
            console.log("ashlam3")
            return next(err);
        }
        //res.send('Image saved successfully')
        //console.log("ashlam4")
    })
}

ImagesSchema.statics.image_read = function (){
    
}

ImagesSchema.statics.image_update = function (){
    
}

ImagesSchema.statics.image_delete = function (){
    
}


module.exports = mongoose.model('Images', ImagesSchema);


