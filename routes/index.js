var express = require('express');
var router = express.Router();

// require mongodb, which returns an object which has a property
// called MongoClient which is what we want.
// If running locally make sure your server is running. I usually have
// to something like:
var mongoClient = require('mongodb').MongoClient;


// If I am running locally then use 'mongodb://localhost:27017/test' otherwise
// look for the environment variable
var url = process.env.CUSTOMCONNSTR_MongoDB || 'mongodb://localhost:27017/test'; 


/* GET home page. */
router.get('/', function(req, res, next) {
    // ok, just for the fun of it let's add a "document" (aka a 
    // javascript object) to the database
    
    var stuffToStore = {
        name: 'John',
        kids: ['Ben', 'Leah', 'Sadhbh'],
        age: 21
    };
      
    mongoClient.connect(url, function(err, conn) {
        if(err){
            console.log(err);
            throw err;
        } else {
            conn.collection('stuff').insertOne(stuffToStore, function(err, result){
                // This callback is going to get called by the insertOne function
                // when either the insertion has been successful or not.
                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    console.log("Insertion complete");
                    conn.close();
                }
            });
            
            // Notice that I render the index page without even waiting for the db to say that 
            // it has inserted the document
            res.render('index', { title: 'MongoDB' });
        }
    });
    
    
});

router.get('/seeStuff', function(req, res, next) {
    mongoClient.connect(url, function(err, conn) {
       if (err) {
           console.log(err);
           throw err;
       } else {
           var cursor = conn.collection('stuff').find();
           cursor.toArray(function(err, docs){
              res.render('stuff', {stuff: docs}); 
           });
       }
    });
});

module.exports = router;
