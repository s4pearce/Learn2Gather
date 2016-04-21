// Identifying required modules
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/Learn2Gather');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookie = require('cookies');
// when anyone requests to see existing study groups
router.get('/', function(req, res) {
    var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token"); // retrieve token, if possible
	var db = req.db;
    var collection = db.get('StudyGroups'); // retrieve study groups collection
    collection.find({ Available: true},{},function(e,docs){
		if (token){
			res.render('viewgroupslogged', { // display available study groups
				"StudyGroups" : docs
			});	
		}
		else if (!token) {
			res.render('viewgroups', { // display available study groups
				"StudyGroups" : docs
			});	
		}
	});
});
module.exports = router;