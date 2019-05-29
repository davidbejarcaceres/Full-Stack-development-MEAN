var express = require('express');
var router = express.Router();

var ctrlMyTrips = require('../controllers/trips');
var ctrlTravelers = require('../controllers/travelers');

/* TRIPS end-points */
router.get('/trips/one', ctrlMyTrips.findOneTrip);
router.get('/trips', ctrlMyTrips.tripList);
router.get('/trips/:id?', ctrlMyTrips.tripFindById);
router.get('/trips/:id?/travelers', ctrlMyTrips.tripTravelers);
router.get('/trips/all/:query?', ctrlMyTrips.findInDB);
router.post('/trips', ctrlMyTrips.tripCreate);
router.post('/tripTraveler', ctrlMyTrips.tripCreateTripTraveler); // Sepcial method to add Traveler and Trip at the same time to DB
router.put('/trips/:id?', ctrlMyTrips.tripUpdateByID);
router.delete('/trips/:id?', ctrlMyTrips.tripDeleteByID);

/* TRAVELERS end-points */
router.get('/travelers', ctrlTravelers.travelersList);
router.get('/travelers/:id?/trips', ctrlTravelers.travelerTrips);
router.get('/travelers/one', ctrlTravelers.findOneTraveler);
router.get('/travelers/first', ctrlTravelers.findFirstInDB);
router.get('/travelers/:id?', ctrlTravelers.travelerById);
router.get('/travelers/all/:query?', ctrlTravelers.findInDB);
router.post('/travelers', ctrlTravelers.travelerCreate);
router.post('/travelers/:id?/trips', ctrlTravelers.travelerAddsTrip); // Traveler adds a new trip to his list of trips
router.delete('/travelers/:id?/trips/:idTrip?', ctrlTravelers.travelerDeletesTrip); // Traveler deletes trip from his list of trips
router.put('/travelers/:id?/trips/:idTrip?', ctrlTravelers.travelerUpdatesTrip); // Traveler Updates a trip
router.put('/travelers/:id?', ctrlTravelers.travelerUpdateByID);
router.delete('/travelers/:id?', ctrlTravelers.travelerDeleteByID);


/* UPLOAD IMAGES end-points, Images stored in ../public/images */
router.post('/trips/:id?/images/:idTrip?', ctrlMyTrips.uploadImage); // Traveler add images to the trip
router.post('/trips/:id?/images', ctrlMyTrips.uploadImageBulk); // Traveler add images with no trip
router.post('/images', ctrlMyTrips.uploadImageBucket); // Traveler add images to the trip
router.put('/images', ctrlMyTrips.deletesImage); // Traveler add images to the trip
router.get('/travelers/:id?/images/url', ctrlMyTrips.getImagesURLs);
router.get('/travelers/:id?/images/names', ctrlMyTrips.getImagesNames);
router.get('/travelers/:id?/images/:nameImage?', ctrlMyTrips.getImageFileFromTraveler);





module.exports = router;