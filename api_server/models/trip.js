var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
    traveler: String,
    country: String,
    city: String,
    place: String,
    year: Number,
    month: String,
    rating: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    notesText: String,
});

mongoose.model('Trip', tripSchema);