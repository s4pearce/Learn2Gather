// Identify required modules
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/Learn2Gather');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookie = require('cookies');
// when user requests to make a group
router.get('/', function(req, res) {
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token"); // retrieve token, if possible
	if (token) { // if the token exists
		jwt.verify(token, 'ilovescotchyscotch', function(err, decoded) { // verify that user credentials are good     
			if (err) {
				res.render('login', {"notlogged": true}); // if verification goes wrong, redirect to login and notify user of bad login credentials
			} else {
				if (req.statusCode==302){ // if user was redirected from another page, that means that something went wrong.
					res.render('error', {Message: "Something went wrong, and the group could not be made. Please try again."})
				}
				else{
					res.render('makeagroup') // if everything is good, render the makeagroup page
				}
				
			};
		});
	}
	else {
		res.render('login', {"notlogged": true}); // if there is no token, user must log in to make a group!
	}
});
// When user POSTs the form to make a group...
router.post('/', function(req, res) {
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	var user = jwt.decode(token); // retrieve and decode user's token
    var db = req.db;
	var available = true; // variable for showing if a studygroup is available
	if (req.body.GroupLimit < 2){ // if the group's limit is too small, no one can join
		available = false;
	};
	var today = new Date(); 
	if (Number(req.body.Date.slice(0,4)) < today.getFullYear()){ 
		res.redirect("/makeagroup"); // redirect to the makeagroup to indicate error
	};
	if (Number(req.body.Date.slice(5,7)) < today.getMonth()){
		res.redirect("/makeagroup"); // redirect to the makeagroup to indicate error
	};
	// Troubleshooting print statements for the error below
	//console.log(Number(req.body.Date.slice(8,10)));
	//console.log(today.getDay());
	//console.log(Number(req.body.Date.slice(8,10)) < Number(today.getDay()));
	if (Number(req.body.Date.slice(8,10)) < Number(today.getDay())){
		res.redirect("/makeagroup"); // redirect to the makeagroup to indicate error
	};		
	var weekly = false;
	var untilwhen = req.body.Date;
	if (req.body.Weekly){ // if weekly checkbox was checked
		Weekly = true;
		UntilWhen = req.body.UntilWhen; // then also add the UntilWhen field
		if (req.body.UntilWhen < req.body.Date){
			res.redirect("/makeagroup")
		}
	};
	var comments = ""
	if (req.body.Comments) {
		comments = req.body.Comments // If user chose to add comments, include them
	};
	var collection = db.get('StudyGroups'); // retrieve study groups collection
	collection.insert({ // insert all of the group data specified
		"Subject" : req.body.Subject,
		"Members" : new Array(user.Username),
		"Location" : req.body.Location,
		"Time" : req.body.Time,
		"Date" : req.body.Date,
		"GroupLimit" : req.body.GroupLimit,
		"TopicsCovered" : req.body.TopicsCovered,
		"Weekly" : weekly,
		"UntilWhen" : untilwhen,
		"Comments" : comments,
		"Available" : available,
		"Owner" : user.Username
	}, function (err, doc) {
		if (err) {
			// If it failed, return error
			res.redirect(302, "/makeagroup");
		}
		else {
			// else forward to the user's groups so they can see that the group has been added
			res.redirect("/mygroups");
		};
	});	
});
module.exports = router;