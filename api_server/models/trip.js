var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var travelerSchema = new mongoose.Schema({
    trips:[{ type: Schema.Types.ObjectId, ref: 'Trip' }],
    firstname: {
        type: String,
        required: true,        
    },
    lastname: {
        type: String,
        required: true,        
    }
});

var tripSchema = new mongoose.Schema({
    travelers: [{ type: Schema.Types.ObjectId, ref: 'Traveler' }],
    country: String,
    city: String,
    place: {
        type: String,
        required: true,        
    },
    year: {
        type: Number,
        required: false,
        min: 0,
        max: 2100
    },
    month: String,
    rating: {
        type: Number,
        required: false,
        min: 0,
        max: 10
    },
    notes: String,
});


mongoose.model('Trip', tripSchema);
mongoose.model('Traveler', travelerSchema)