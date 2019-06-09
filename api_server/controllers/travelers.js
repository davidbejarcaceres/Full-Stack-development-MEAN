/* GET 'Add review' page */
var trips = require("../models/trip");
var mongoose = require("mongoose");
var dbTrips = mongoose.model("Trip");
var dbTraveler = mongoose.model("Traveler");
const fs = require('fs');
const path = require('path');


const pathPublicServer = "C:/Users/Public/node/meanFinal/public/";
var travelersUploads = pathPublicServer +'images/tripsImages';

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);    
};

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

// Traveler Adds a trip to his/her list of trips
module.exports.travelerAddsTrip = function(req, res, next) {    
    dbTraveler.findById(req.params.id).populate('trips').exec(function (err, traveler){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            if (traveler == null) return res.status(404).send(`ERROR: No element with ID: ${req.params.id}`);
            // Creates the new trip
            dbTrips.create({
                travelers: traveler.id, // Asigns the traveler to the new trip    
                country: req.body.country,
                city: req.body.city,
                place: req.body.place,
                year: req.body.year,
                month: req.body.month,
                rating: req.body.rating,
                notes: req.body.notes
              }, function(err, trip) {              
                    if (err) return res.status(404).send({message: "Bad request"});
                    // Adds the trip to the traveler list of trips
                    traveler.trips.push(trip.id);
                    dbTraveler.findByIdAndUpdate(traveler.id, {trips: traveler.trips}, {new: true} , function(err, updatedElement) {
                        if (err) return res.status(404).send({message: "Bad request"});
                        return res.status(201).send("Trip Added!");
                    });                  
              });
        }
    })
};

// Traveler UPDATES a trip from his list of trips
module.exports.travelerUpdatesTrip = function(req, res, next) {
    var idTraveler = req.params.id;
    dbTraveler.findById(req.params.id).populate('trips').exec(function (err, traveler){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            if (traveler == null) return res.status(404).send(`ERROR: No traveler with ID: ${req.params.id}`);
            
            dbTrips.findById(req.params.idTrip).exec(function (err, tripOld){
                if (err) {
                    return res.status(404).send({message: "Bad request"});
                } else {
                    if (tripOld == null) return res.status(404).send(`ERROR: No trip with ID: ${req.params.idTrip}`);

                    // Checks if no values are passed and updates
                    tripOld.country =  ((req.body.country) ? req.body.country : tripOld.country)
                    tripOld.city = ((req.body.city) ? req.body.city : tripOld.city)
                    tripOld.place = ((req.body.place) ? req.body.place : tripOld.place)
                    tripOld.year = ((req.body.year) ? req.body.year : tripOld.year)
                    tripOld.month = ((req.body.month) ? req.body.month : tripOld.month)
                    tripOld.rating = ((req.body.rating) ? req.body.rating : tripOld.rating)
                    tripOld.notes = ((req.body.notes) ? req.body.notes : tripOld.notes)
        
                    dbTrips.findByIdAndUpdate(req.params.idTrip, tripOld, {new: true}, function(err, updatedTrip) {
                        if (err) return res.status(404).send({message: "Bad request"});
                        return res.status(200).send(updatedTrip);
                    });            
                }
            })
        }
    })
};

// Traveler Deletes a trip from his list of trips
module.exports.travelerDeletesTrip = function(req, res, next) {    
    dbTraveler.findById(req.params.id).populate('trips').exec(function (err, traveler){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            if (traveler == null) return res.status(404).send(`ERROR: No traveler with ID: ${req.params.id}`);
            // Deletes the trip from trips
            for (let index = 0; index < traveler.trips.length; index++) {
                const element = traveler.trips[index];
                if (element.id == req.params.idTrip){
                    traveler.trips.splice(index, 1);
                    console.log("deleting...");
                    break;
                }
            };

            // Saves the player with the changes
            dbTraveler.findByIdAndUpdate(traveler.id, {trips: traveler.trips}, {new: true} , function(err, updatedElement) {
                if (err) return res.status(404).send({message: "Bad request"});
                return res.status(200).send("Trip Deleted!");
            });  
        }
    })
};

// Search for a traveler in DB
module.exports.findInDB = function(req, res, next) {
    dbTraveler.find({$or:[{firstname: req.params.query}, {lastname: req.params.query}]}).exec(function (err, travelers) {
        if (err) return res.status(404).send(err);
        return res.status(200).send(travelers);
      });
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

// GET FIRST Traveler in DB
module.exports.findFirstInDB = function (req, res) {
    dbTraveler.find().populate('trips').exec(function (err, traveler) {
    if (err) return res.status(404).send(err);
    return res.status(200).send(traveler[0]);
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