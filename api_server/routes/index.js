var express = require('express');
var router = express.Router();

var ctrlMyTrips = require('../controllers/trips');
var ctrlTravelers = require('../controllers/travelers');

/* trips pages */
router.get('/trips/helloWorld', ctrlMyTrips.helloWord);
router.get('/trips/one', ctrlMyTrips.findOneTrip);
router.get('/trips', ctrlMyTrips.tripList);
router.get('/trips/:id?', ctrlMyTrips.tripFindById);
router.post('/trips', ctrlMyTrips.tripCreate);
router.delete('/trips/:id?', ctrlMyTrips.tripDeleteByID);
router.put('/trips/:id?', ctrlMyTrips.tripUpdateByID);
router.post('/tripTraveler', ctrlMyTrips.tripCreateTripTraveler);


/* trips pages */
router.get('/travelers', ctrlTravelers.travelersList);
router.get('/travelers/:id?/trips', ctrlTravelers.travelerTrips);
router.get('/travelers/one', ctrlTravelers.findOneTraveler);
router.post('/travelers', ctrlTravelers.travelerCreate);
router.get('/travelers/:id?', ctrlTravelers.travelerById);
router.delete('/travelers/:id?', ctrlTravelers.travelerDeleteByID);
router.put('/travelers/:id?', ctrlTravelers.travelerUpdateByID);
// router.post('/travelers', ctrlTravelers.tripCreate);


module.exports = router;



