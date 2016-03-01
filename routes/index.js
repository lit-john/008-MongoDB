var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // ok, just for the fun of it let's add a "document" (aka a 
    // javascript object) to the database
    
    var stuffToStore {
        name: 'John',
        kids: ['Ben', 'Leah', 'Sadhbh'],
        age: 21
    };
    
    
    res.render('index', { title: 'Express' });
});

module.exports = router;
