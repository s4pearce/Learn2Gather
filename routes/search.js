//Declaring required modules
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/Learn2Gather');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookie = require('cookies');
// When user requests to GET search page, render it
router.get('/', function(req, res) {
	res.render('search');
});
// When user sends the  POST request to search existing groups...
router.post('/', function(req, res) {
	var query = {};
	if (req.body.Subject){ // If they add a subject to the field, add it to query
		query.Subject = req.body.Subject; 
	}
	else if (req.body.Date) { // If they add a date to the field, add it to query
		query.Date = req.body.Date;
	}
	else if (req.body.Time) { // If they add a time to the field, add it to query
		query.Time = req.body.Time;
	}
	else if (req.body.Location) { // If they add a Location to the field, add it to query
		query.Location = req.body.Location;
	}
	query.Available = true; // add available field to query so the search only finds study groups that are available to join
	var db = req.db;
	var collection = db.get('StudyGroups'); //retrieve the collection of study groups
	collection.find(query, function(err, docs){ // plug in the user's query into the monk API
		res.render('viewgroups', {"StudyGroups": docs}); // use the viewgroups page to let users see/join search results
	});
});
module.exports = router;