var express = require('express');
var router = express.Router();

// Require the connection module that we wrote. We use this module
// to share the db connection object
var connection = require('../connection.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    // ok, just for the fun of it let's add a "document" (aka a 
    // javascript object) to the database
    
    var stuffToStore = {
        name: 'John',
        kids: ['Ben', 'Leah', 'Sadhbh'],
        age: 21
    };
    
    connection(function(err, db) {
    	if (err) {
    		next(err);
    	}
    	else {
    		db.collection('stuff').insertOne(stuffToStore, function(err, result){
    			// This callback is going to get called by the insertOne function
    			// when either the insertion has been successful or not.
    			if (err) {
    				next(err);
    			}
    			else {
    				console.log("Insertion complete");
    				res.render('index', { title: 'Express' });
    			}
    		})
    	}
    });
    
    
});

module.exports = router;
