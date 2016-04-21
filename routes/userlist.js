//Required modules
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/Learn2Gather');

/* GET Userlist html page. */

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist'); // retrieve userlist collection
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs // send client the userlist jade file, along with the collection of users
        });
    console.log(docs)});
});
module.exports = router;