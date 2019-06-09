const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var dbURI = 'mongodb://localhost/Mytrips';
var CosmoDBUri = "mongodb://mytrips:ttmuiPMZSKDX6vuhbyMQbpqHRE8wHedDiOp1MB7xpxyRucctYA5GTqwaODl6BwXF4ToO1m6jxEqzp9WzemzOlw==@mytrips.documents.azure.com:10255/Mytrips3?ssl=true&replicaSet=globaldb"
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// Access the mongoose-dbref module and install everything
var dbref = require("mongoose-dbref");
var utils = dbref.utils

// Install the types, plugins and monkey patches
var loaded = dbref.install(mongoose);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./trip');