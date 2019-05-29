var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var travelerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,        
    },
    lastname: {
        type: String,
        required: true,        
    },
    trips:[{ type: Schema.Types.ObjectId, ref: 'Trip' }],
});

var tripSchema = new mongoose.Schema({
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
    travelers: [{ type: Schema.Types.ObjectId, ref: 'Traveler' }]
});

tripSchema.index( { notes: "text" }) // Indexes the notes field to be able to search in the notes
mongoose.model('Trip', tripSchema);
mongoose.model('Traveler', travelerSchema)