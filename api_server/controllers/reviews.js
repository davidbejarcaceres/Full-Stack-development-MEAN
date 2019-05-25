/* GET 'Add review' page */
var locations = require("../models/locations");
var mongoose = require("mongoose");
var loc = mongoose.model("Location");
var bodyParser = require("body-parser");


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// GET ALL Reviews
module.exports.reviewsList = function(req, res, next) {    
    loc.find().exec(function (err, location){
        
        var comentarios =  [] ;

        location.forEach(element => {
            comentarios.push(element.reviews)
        });
        
        res
        .status(200)
        .send(comentarios);
    })
};

module.exports.reviewsReadOne = function(req, res) {
    console.log("Getting single review");
    if (req.params && req.params.locationid && req.params.reviewid) {
      loc
        .findById(req.params.locationid)
        .select('name reviews')
        .exec(
          function(err, location) {
            console.log(location);
            var response, review;
            if (!location) {
              sendJSONresponse(res, 404, {
                "message": "locationid not found"
              });
              return;
            } else if (err) {
              sendJSONresponse(res, 400, err);
              return;
            }
            if (location.reviews && location.reviews.length > 0) {
              review = location.reviews.id(req.params.reviewid);
              if (!review) {
                sendJSONresponse(res, 404, {
                  "message": "reviewid not found"
                });
              } else {
                response = {
                  location: {
                    name: location.name,
                    id: req.params.locationid
                  },
                  review: review
                };
                sendJSONresponse(res, 200, response);
              }
            } else {
              sendJSONresponse(res, 404, {
                "message": "No reviews found"
              });
            }
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "Not found, locationid and reviewid are both required"
      });
    }
  };

// Creates new Review
module.exports.reviewsCreate = function(req, res, next) {    
    loc
        .findById(req.params.id)
        //.select('name')
        .exec(  
          function(err, location) {
            if (err) {
              sendJSONresponse(res, 400, err);
            } else {
                var newReview = {                    
                    author: req.body.author,
                    rating: parseInt(req.body.rating),
                    reviewText: req.body.reviewText
                  };

                // location.reviews.push({
                //     newReview
                // });

                doAddReview(req, res, location);


                console.log(location.reviews);
                
                
            }   
                
          })

    // loc.findById(req.params.id).exec(function (err, location){
    //     if (err) {
    //         return res.status(404).send({message: "Bad request"});
    //     } else {
    //         if (location != null) {
                
    //             var newReview = {                    
    //                 author: req.body.author,
    //                 rating: req.body.rating,
    //                 reviewText: req.body.reviewText,
    //                 createdOn: req.body.createdOn
    //             };

                
                
    //             return res.status(200).send(location.reviews);
    //         } else{
    //             return res.status(404).send("No hay elemento location con ese Id");
    //         }
    //     }
    // })
};

// GET ALL POSTS
module.exports.reviewsFindById = function(req, res, next) {    
    loc.findById(req.params.id).exec(function (err, location){
        res
        .status(200)
        .send("Id si se encuentra");
    })
};

// GET Updates
module.exports.reviewsUpdate = function(req, res, next) {    
    loc.update(req.params.id).exec(function (err, location){
        res
        .status(200)
        .send("Actualizado");
    })
};

// GET Find ONE
module.exports.findOne = function(req, res, next) {    
    loc.findOne().exec(function (err, location){
        res
        .status(200)
        .send(location.reviews);
    })
};




// Código Original de la asignatura


/* POST a new review, providing a locationid */
/* /api/locations/:locationid/reviews */
module.exports.reviewsCreate2 = function(req, res) {
    if (req.params.locationid) {
      loc
        .findById(req.params.locationid)
        .select('reviews')
        .exec(
          function(err, location) {
            if (err) {
              sendJSONresponse(res, 400, err);
            } else {
              doAddReview(req, res, location);
            }
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "Not found, locationid required"
      });
    }
  };
  
  
  var doAddReview = function(req, res, location) {
    if (!location) {
      sendJSONresponse(res, 404, "locationid not found");
    } else {
      location.reviews.push({
        author: req.body.author,
        rating: req.body.rating,
        reviewText: req.body.reviewText
      });
      location.save(function(err, location) {
        var thisReview;
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          updateAverageRating(location._id);
          thisReview = location.reviews[location.reviews.length - 1];
          sendJSONresponse(res, 201, thisReview);
        }
      });
    }
  };
  
  var updateAverageRating = function(locationid) {
    console.log("Update rating average for", locationid);
    loc
      .findById(locationid)
      .select('reviews')
      .exec(
        function(err, location) {
          if (!err) {
            doSetAverageRating(location);
          }
        });
  };
  
  var doSetAverageRating = function(location) {
    var i, reviewCount, ratingAverage, ratingTotal;
    if (location.reviews && location.reviews.length > 0) {
      reviewCount = location.reviews.length;
      ratingTotal = 0;
      for (i = 0; i < reviewCount; i++) {
        ratingTotal = ratingTotal + location.reviews[i].rating;
      }
      ratingAverage = parseInt(ratingTotal / reviewCount, 10);
      location.rating = ratingAverage;
      location.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Average rating updated to", ratingAverage);
        }
      });
    }
  };
  
  module.exports.reviewsUpdateOne = function(req, res) {
    if (!req.params.locationid || !req.params.reviewid) {
      sendJSONresponse(res, 404, {
        "message": "Not found, locationid and reviewid are both required"
      });
      return;
    }
    loc
      .findById(req.params.locationid)
      .select('reviews')
      .exec(
        function(err, location) {
          var thisReview;
          if (!location) {
            sendJSONresponse(res, 404, {
              "message": "locationid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (location.reviews && location.reviews.length > 0) {
            thisReview = location.reviews.id(req.params.reviewid);
            if (!thisReview) {
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              thisReview.author = req.body.author;
              thisReview.rating = req.body.rating;
              thisReview.reviewText = req.body.reviewText;
              location.save(function(err, location) {
                if (err) {
                  sendJSONresponse(res, 404, err);
                } else {
                  updateAverageRating(location._id);
                  sendJSONresponse(res, 200, thisReview);
                }
              });
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No review to update"
            });
          }
        }
    );
  };
  
  module.exports.reviewsReadOne = function(req, res) {
    console.log("Getting single review");
    if (req.params && req.params.locationid && req.params.reviewid) {
      loc
        .findById(req.params.locationid)
        .select('name reviews')
        .exec(
          function(err, location) {
            console.log(location);
            var response, review;
            if (!location) {
              sendJSONresponse(res, 404, {
                "message": "locationid not found"
              });
              return;
            } else if (err) {
              sendJSONresponse(res, 400, err);
              return;
            }
            if (location.reviews && location.reviews.length > 0) {
              review = location.reviews.id(req.params.reviewid);
              if (!review) {
                sendJSONresponse(res, 404, {
                  "message": "reviewid not found"
                });
              } else {
                response = {
                  location: {
                    name: location.name,
                    id: req.params.locationid
                  },
                  review: review
                };
                sendJSONresponse(res, 200, response);
              }
            } else {
              sendJSONresponse(res, 404, {
                "message": "No reviews found"
              });
            }
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "Not found, locationid and reviewid are both required"
      });
    }
  };
  
  // app.delete('/api/locations/:locationid/reviews/:reviewid'
  module.exports.reviewsDeleteOne = function(req, res) {
    if (!req.params.locationid || !req.params.reviewid) {
      sendJSONresponse(res, 404, {
        "message": "Not found, locationid and reviewid are both required"
      });
      return;
    }
    loc
      .findById(req.params.locationid)
      .select('reviews')
      .exec(
        function(err, location) {
          if (!location) {
            sendJSONresponse(res, 404, {
              "message": "locationid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (location.reviews && location.reviews.length > 0) {
            if (!location.reviews.id(req.params.reviewid)) {
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              location.reviews.id(req.params.reviewid).remove();
              location.save(function(err) {
                if (err) {
                  sendJSONresponse(res, 404, err);
                } else {
                  updateAverageRating(location._id);
                  sendJSONresponse(res, 204, null);
                }
              });
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No review to delete"
            });
          }
        }
    );
  };