const express = require('express');
const apiRouter = express.Router();

const Profiles = require('../model/Profiles');

apiRouter.route('/profiles')
    .get(function(req, res) {
        Profiles.find(function(err, profiles) {
            if (err)
                res.send(err);
            res.json(profiles);
        });
    })
    .post(function(req, res) {
        const profile = new Profiles();
        profile.name = req.body.name;
        profile.email = req.body.email;
        profile.password = req.body.password;

        console.log(profile);

        profile.save(function(err, doc) {
            if (err)
                res.send(err);
            res.json(doc);
        });
    });



module.exports = apiRouter;