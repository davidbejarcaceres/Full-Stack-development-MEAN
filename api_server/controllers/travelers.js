/* GET 'Add review' page */
var trips = require("../models/trip");
var mongoose = require("mongoose");
var dbTrips = mongoose.model("Trip");
var dbTraveler = mongoose.model("Traveler");
var bodyParser = require("body-parser");
var Schema = mongoose.Schema;



var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);    
};


module.exports.helloWord = function (req, res) {
    return res.status(200).send("Hi from NodeJS");
}

// GET ALL TRIPS
module.exports.travelersList = function(req, res, next) {    
    dbTraveler.find().exec(function (err, traveler){
        if (err) {
            return res.status(404);
        } else {
            return ((traveler != null) ? res.status(200).send(traveler) : res.status(404).send("Error"));
        }
    })    
};

// GET Trip by ID
module.exports.travelerById = function(req, res, next) {    
    dbTraveler.findById(req.params.id).populate('trips').exec(function (err, traveler){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            return ((traveler != null) ? res.status(200).send(traveler) : (res.status(404).send(`ERROR: No element with ID: ${req.params.id}`)));
        }
    })
};

// POST ADD Trip /api/trips
module.exports.travelerCreate = function(req, res, next) {
    dbTraveler.create({        
        firstname: req.body.firstname,
        lastname: req.body.lastname
      }, function(err, traveler) {
            return ((!err) ? sendJSONresponse(res, 201, traveler) : res.status(404).send(err))
        });
};

// GET Find ONE
module.exports.findOneTraveler = function (req, res) {
    dbTraveler.findOne().populate('trips').exec(function (err, traveler) {
    if (err) return res.status(404).send(err);
    return res.status(200).send(traveler);
  });
};

// GET ALL TRIPS FROM a TRAVELER BY ID
module.exports.travelerTrips = function (req, res, next) {
    dbTraveler.findById(req.params.id).populate('trips').exec(function (err, traveler){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            return ((traveler != null) ? res.status(200).send(traveler.trips) : (res.status(404).send(`ERROR: No element with ID: ${req.params.id}`)));
        }
    })
};

module.exports.travelerUpdateByID = function (req, res) {
    dbTraveler.findById(req.params.id).exec(function (err, travelerOld){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            // Checks if no values are passed
            travelerOld.trips =  ((req.body.trips) ? travelerOld.trips.push(req.body.trips) : travelerOld.trips)
            travelerOld.firstname =  ((req.body.firstname) ? req.body.firstname : travelerOld.firstname)
            travelerOld.lastname = ((req.body.lastname) ? req.body.lastname : travelerOld.lastname)

            dbTraveler.findByIdAndUpdate(req.params.id, travelerOld, {new: true}, function(err, travelerUpdated) {
                if (err) return res.status(404).send({message: "Bad request"});
                return res.status(200).send(travelerUpdated);
            });            
        }
    })    
}

// DELETES ONE
module.exports.travelerDeleteByID = function (req, res) {
    dbTraveler.deleteOne({ _id: req.params.id }, function (err) {
        if(err) return res.status(404).send(err)
        return res.status(200).send("DELETED!")
    });
}

// PUT find by ID
module.exports.locationsUpdate = function(req, res, next) {    
    dbTrips.findById(req.params.id).exec(function (err, location){
        res
        .status(20)
        .send(location);
    })
};

// PUT find by ID
module.exports.locationsDelete = function(req, res, next) {    
    dbTrips.findById(req.params.id).exec(function (err, location){
        res
        .status(204)
        .send(location);
    })
};