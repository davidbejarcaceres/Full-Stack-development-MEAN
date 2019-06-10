/* GET 'Add review' page */
var trips = require("../models/trip");
var mongoose = require("mongoose");
var dbTrips = mongoose.model("Trip");
var dbTraveler = mongoose.model("Traveler");
var multer = require("multer");
const fs = require('fs');
const pathPublicServer = "C:/Users/Public/node/meanFinal/public/";
var travelersUploads = pathPublicServer +'images/tripsImages';
var imagesBulk = pathPublicServer + "images";
const path = require('path');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);    
};

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const travelerID = (req.params.id) ? req.params.id : "userID";
        const tripID = (req.params.idTrip) ? req.params.id : "anyTrip";
        var folderexsits = fs.existsSync(travelersUploads + "/" + travelerID)
        if (folderexsits) {
            console.log("Folder exists");
            folderUpload = travelersUploads + "/" + travelerID;
        } else{
            console.log("NO FOLDER FOR THAT USER!");
            fs.mkdirSync(travelersUploads + "/" + travelerID);
            folderUpload = travelersUploads + "/" + travelerID;
        }
      cb(null, folderUpload)
    },
    filename: function(req, file, callback) {
        console.log(file)
        const travelerID = (req.params.id) ? req.params.id : "userID";
        const tripID = (req.params.idTrip) ? req.params.id : "anyTrip";
        if (req.params.idTrip) {
            callback(null, tripID +  '-' + Date.now() + path.extname(file.originalname))
        } else {
            callback(null, file.originalname +  '-' + Date.now() + path.extname(file.originalname))
        }        
    }
  });

// SET STORAGE
var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        const travelerID = (req.params.id) ? req.params.id : "userID";
        const tripID = (req.params.idTrip) ? req.params.id : "tripID";
        var folderexsits = fs.existsSync(travelersUploads + "/" + travelerID)
        if (folderexsits) {
            console.log("Folder exists");
            folderUpload = travelersUploads + "/" + travelerID;
        } else{
            console.log("NO FOLDER FOR THAT USER!");
            fs.mkdirSync(travelersUploads + "/" + travelerID);
            folderUpload = travelersUploads + "/" + travelerID;
        }
      cb(null, imagesBulk)
    },
    filename: function(req, file, callback) {
        console.log(file)
        const travelerID = (req.params.id) ? req.params.id : "userID";
        const tripID = (req.params.idTrip) ? req.params.id : "tripID";
        callback(null, "img"+  '-' + Date.now() + path.extname(file.originalname))
    }
  });

   

// GET ALL TRIPS: api/trips
module.exports.tripList = function(req, res, next) {    
    dbTrips.find().exec(function (err, trip){
        if (err) {
            return res.status(404);
        } else {
            return ((trip != null) ? res.status(200).send(trip) : res.status(404).send("Error"));
        }
    })    
};

// GET Trip by ID: /api/trips/:id?
module.exports.tripFindById = function(req, res, next) {    
    dbTrips.findById(req.params.id).exec(function (err, trip){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            return ((trip != null) ? res.status(200).send(trip) : (res.status(404).send(`ERROR: No element with ID: ${req.params.id}`)));
        }
    })
};

// GET all travelers from one trip: /api/trips/:id?/travelers
module.exports.tripTravelers = function(req, res, next) {    
    dbTrips.findById(req.params.id).populate('travelers').exec(function (err, trip) {
        if (err) return res.status(404).send(err);
        return res.status(200).send(trip.travelers);
      });
};

// /api//trips/all/:query?
// Search for a trip in DB with a query, probably intensive task for the server
module.exports.findInDB = function(req, res, next) {
    var yearTrip = 0;    
    ( isNaN(parseInt(req.params.query)) == true ) ? yearTrip = 0 : yearTrip = parseInt(req.params.query)

    dbTrips.find({$or:[{country: req.params.query}, {notes: req.params.query} , {city: req.params.query}, {place: req.params.query}, {month: req.params.query}, {year: yearTrip}]}).exec(function (err, trips) {
        if (err) return res.status(404).send(err);
        // Searches also in notes
        dbTrips.find({$text: { $search: req.params.query}}).exec(function (err, addedByNotes) {
            if (err) return res.status(404).send(err);
            // If query found in notes, then add those elements to the list
            if (addedByNotes.length != 0) trips.push(addedByNotes);
            return res.status(200).send(trips);
          });
      });
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

//POST Creates Traveler + Trip at the same time: /api/tripTraveler
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
                // Find the object in Database and Updates
                dbTraveler.findByIdAndUpdate(traveler.id, { trips: trip.id }  , function(err, res) {
                if (err) return res.status(404).send({message: "Bad request"});
                });
              return sendJSONresponse(res, 201, trip);
          });
    });    
};

// GET FIND ONE: api/trips/one
module.exports.findOneTrip = function (req, res) {
    dbTrips.findOne().populate('travelers').exec(function (err, trip) {
    if (err) return res.status(404).send(err);
    return res.status(200).send(trip);
  });
}

// DELETES TRIP BY ID: /api/trips/:id?
module.exports.tripDeleteByID = function (req, res) {
    dbTrips.deleteOne({ _id: req.params.id }, function (err) {
        if(err) return res.status(404).send(err)
        return res.status(200).send("DELETED!")
    });
}

// PUT UPDATES TRIP: /api/trips/:id?
module.exports.tripUpdateByID = function (req, res) {
    var idTrip = req.params.id;
    console.log(idTrip);
    dbTrips.findById(req.params.id).exec(function (err, tripOld){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            // Checks if no values are passed
            //tripOld.travelers =  ((req.body.travelers) ? tripOld.travelers.push(req.body.travelers) : tripOld.travelers)
            tripOld.country =  ((req.body.country) ? req.body.country : tripOld.country)
            tripOld.city = ((req.body.city) ? req.body.city : tripOld.city)
            tripOld.place = ((req.body.place) ? req.body.place : tripOld.place)
            tripOld.year = ((req.body.year) ? req.body.year : tripOld.year)
            tripOld.month = ((req.body.month) ? req.body.month : tripOld.month)
            tripOld.rating = ((req.body.rating) ? req.body.rating : tripOld.rating)
            tripOld.notes = ((req.body.notes) ? req.body.notes : tripOld.notes)

            dbTrips.findByIdAndUpdate(req.params.id, tripOld, {new: true}, function(err, updatedTrip) {
                if (err) return res.status(404).send({message: "Bad request"});
                return res.status(200).send(updatedTrip);
            });            
        }
    })    
}

// Uploads an image to the server and links to the traveler and the trip
module.exports.uploadImage = function (req, res) {
    const travelerID = (req.params.id) ? req.params.id : "userID";
    console.log(req.body);
    let upload = multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.webp') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function(err) {
        res.end('File has uploaded')
    })
}


// Travelers add image to his bulkfolder no trip linked to the image
module.exports.uploadImageBulk = function (req, res) {
    if (!req.params.id) return res.status(404).send({message: "No traveler with that id"});
    console.log(req.body);
    let upload = multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function(err) {
        res.end('File has uploaded')
    })
}

// Uploads an image to the server and links to the traveler and the trip
module.exports.travelerUploadsImage = function (req, res) {
    const travelerID = (req.params.id) ? req.params.id : "userID";
    console.log(req.body);
    let upload = multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function(err) {
        res.end('File has uploaded')
    })
}


// GET List of images of the traveler
module.exports.getImagesURLs = function (req, res, next) {
    var list= [];
    dbTraveler.findById(req.params.id).populate('trips').exec(function (err, traveler){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            if(traveler == null) return res.status(404).send(`ERROR: No element with ID: ${req.params.id}`);
            
            const travelerID = (req.params.id) ? req.params.id : null;
            const tripID = (req.params.idTrip) ? req.params.id : null;
            var folderexsits = fs.existsSync(travelersUploads + "/" + travelerID)

            if (!folderexsits) return res.status(404).send(list);

            folderImages = travelersUploads + "/" + travelerID;
            console.log(folderImages);

            fs.readdir(folderImages, { withFileTypes: true },  (err, images) => {
                images.forEach(imageName => {
                    pathImage = folderImages + "/" + imageName.name;
                    list.push(pathImage);
                });
                res.status(200).send(list)
              });
        }

    })
};

// GET List of images of the traveler
module.exports.getImagesNames = function (req, res, next) {
    var listNames= [];
    dbTraveler.findById(req.params.id).populate('trips').exec(function (err, traveler){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            if(traveler == null) return res.status(404).send(`ERROR: No element with ID: ${req.params.id}`);
            
            const travelerID = (req.params.id) ? req.params.id : null;
            const tripID = (req.params.idTrip) ? req.params.id : null;
            var folderexsits = fs.existsSync(travelersUploads + "/" + travelerID)

            if (!folderexsits) return res.status(404).send(listNames);

            folderImages = travelersUploads + "/" + travelerID;
            console.log(folderImages);

            fs.readdir(folderImages, { withFileTypes: true },  (err, images) => {
                images.forEach(imageName => {
                    listNames.push(imageName.name);
                });
                res.status(200).send(listNames)
              });
        }
    })
};


// GET List of images of the traveler
module.exports.getImageFileFromTraveler = function (req, res, next) {
    var list= [];
    var imageName= req.params.nameImage;
    dbTraveler.findById(req.params.id).populate('trips').exec(function (err, traveler){
        if (err) {
            return res.status(404).send({message: "Bad request"});
        } else {
            if(traveler == null) return res.status(404).send(`ERROR: No element with ID: ${req.params.id}`);
            
            const travelerID = (req.params.id) ? req.params.id : null;
            const tripID = (req.params.idTrip) ? req.params.id : null;
            var folderexsits = fs.existsSync(travelersUploads + "/" + travelerID)

            if (!folderexsits) return res.status(404).send(list);

            folderImages = travelersUploads + "/" + travelerID + "/";
            console.log(folderImages);
            /* GET Logo. */
            res.sendFile( folderImages + imageName);
        }
    })
};


// Uploads an image to the server and links to the traveler and the trip
module.exports.uploadImageBucket = function (req, res) {
    console.log(req.body);
    let upload = multer({
        storage: storage2,
        fileFilter: function(req, file, callback) {
            let ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function(err) {
        res.end('File has uploaded')
    })
}


// Uploads an image to the server and links to the traveler and the trip
module.exports.deletesImage = function (req, res) {
    if(!req.body.img) res.send("No image found").status(404)
    var  pathImage = (req.body.img).toString();
    var deleteUpToChar = 0;
    for (let index = 0; index < pathImage.length; index++) {
       console.log(pathImage[index]);
       if (pathImage[index] === "i" && pathImage[index+1] === "m" && pathImage[index+2] === "a" && pathImage[index+3] === "g" && pathImage[index+4] === "e" && pathImage[index+5] === "s" && pathImage[index+6] === "/") {
        var deleteUpToChar = index;
       }
    }
    var fileNAME = pathImage.slice(deleteUpToChar+7, pathImage.length);
    var startPath = "C:/Users/Public/node/meanFinal/public/images/tripsImages"

    fromDir(startPath, fileNAME, res);
}



// Recursive method to search files in directory
function fromDir(startPath,filter, res){
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }
    var files= fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);
            
            fs.unlink(filename, callback =>  {
                console.log(callback);
            });
            res.send("OK").status(200);
        };
    };
};