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
module.exports.tripList = function(req, res, next) {    
    dbTrips.find().exec(function (err, trip){
        if (err) {
            return res.status(404);
        } else {
            return ((trip != null) ? res.status(200).send(trip) : res.status(404).send("Error"));
        }
    })    
};

// GET Trip by ID
module.exports.tripFindById = function(req, res, next) {    
    dbTrips.findById(req.params.id).exec(function (err, trip){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            return ((trip != null) ? res.status(200).send(trip) : (res.status(404).send(`ERROR: No element with ID: ${req.params.id}`)));
        }
    })
};


// POST ADD Trip /api/trips
module.exports.tripCreate = function(req, res, next) {
      dbTrips.create({        
        city: req.body.city,
        place: req.body.place,
        year: req.body.year,
        month: req.body.month,
        rating: req.body.rating,
        notes: req.body.notes
      }, function(err, trip) {
          return ((!err) ? sendJSONresponse(res, 201, trip) : res.status(404).send(err))
      });
};

module.exports.tripCreateTripTraveler = function(req, res, next) {
    
    dbTraveler.create({        
        firstname: req.body.traveler.firstname,
        lastname: req.body.traveler.lastname
      }, function(err, traveler) {
        if (err) return res.status(404).send({message: "Bad request"});
        
        dbTrips.create({
            travelers: traveler.id,        
            country: req.body.country,
            city: req.body.city,
            place: req.body.place,
            year: req.body.year,
            month: req.body.month,
            rating: req.body.rating,
            notes: req.body.notes
          }, function(err, trip) {              
              if (err) return res.status(404).send({message: "Bad request"});

              dbTraveler.findByIdAndUpdate(traveler.id, { trips: trip.id }  , function(err, res) {
                // Updated at most one doc, `res.modifiedCount` contains the number
                // of docs that MongoDB updated
                if (err) return res.status(404).send({message: "Bad request"});
              });
              return sendJSONresponse(res, 201, trip);
          });
    });    
};

// GET Find ONE
module.exports.findOneTrip = function (req, res) {
    dbTrips.findOne().populate('travelers').exec(function (err, trip) {
    if (err) return res.status(404).send(err);
    return res.status(200).send(trip);
  });
}

// DELETES ONE
module.exports.tripDeleteByID = function (req, res) {
    dbTrips.deleteOne({ _id: req.params.id }, function (err) {
        if(err) return res.status(404).send(err)
        return res.status(200).send("DELETED!")
    });
}

module.exports.tripUpdateByID = function (req, res) {
    dbTrips.findById(req.params.id).exec(function (err, tripOld){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            // Checks if no values are passed
            tripOld.travelers =  ((req.body.travelers) ? tripOld.travelers.push(req.body.travelers) : tripOld.travelers)
            tripOld.country =  ((req.body.country) ? req.body.country : tripOld.country)
            tripOld.city = ((req.body.city) ? req.body.city : tripOld.city)
            tripOld.place = ((req.body.place) ? req.body.place : tripOld.place)
            tripOld.year = ((req.body.year) ? req.body.year : tripOld.year)
            tripOld.month = ((req.body.month) ? req.body.month : tripOld.month)
            tripOld.rating = ((req.body.rating) ? req.body.rating : tripOld.rating)
            tripOld.notes = ((req.body.notes) ? req.body.notes : tripOld.notes)

            dbTrips.findByIdAndUpdate(req.params.id, tripOld, {new: true}, function(err, numberUpdated) {
                // Updated at most one doc, `res.modifiedCount` contains the number
                // of docs that MongoDB updated
                if (err) return res.status(404).send({message: "Bad request"});
                return res.status(200).send(numberUpdated);
            });            
        }
    })    
}

// PUT find by ID
module.exports.locationsUpdate = function(req, res, next) {    
    dbTrips.findById(req.params.id).exec(function (err, location){
        res
        .status(200)
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

