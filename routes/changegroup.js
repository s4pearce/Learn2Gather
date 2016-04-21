// Declaring required modules
var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/Learn2Gather');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookie = require('cookies');
// When user requests to GET the page...
router.get('/', function(req,res){
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	var user = jwt.decode(token, 'ilovescotchyscotch');
	var db = req.db;
	var username = user.Username // must be defined outside of query because .find() method will reject any period(.)s
	var collection = db.get('StudyGroups'); // retrieve study groups collection
    collection.findById(req.query.groupid.toString(),function(e,group){
		console.log("found group")
		if (group.Owner==username){
			res.render('changegroup', { // If they own the group, allow them to change details
				"group" : group
			});
		}
		else{ // Otherwise, inform them that they cannot see groups that they aren't in!
			res.render('error', { Message: "Sorry, you cannot change anything in this group because you didn't make it!" })
		}
	});
	
});
// When user POSTs to change study group information...
router.post('/', function(req,res){
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	var user = jwt.decode(token, 'ilovescotchyscotch');
	var db = req.db;
	var studyGroups = db.get('StudyGroups'); // retrieve list of study groups
	studyGroups.findById(req.body.groupid.toString(), function(e, group){
		if (req.body.Subject){ 
			group.Subject = req.body.Subject;
		};
		if (req.body.TopicsCovered){ 
			group.TopicsCovered = req.body.TopicsCovered;
		};
		if (req.body.Date){ 
			group.Date = req.body.Date;
		};
		if (req.body.Time){ 
			group.Time = req.body.Time;
		};
		if (req.body.UntilWhen){ 
			group.UntilWhen = req.body.UntilWhen;
		};
		if (req.body.Location){ 
			group.Location = req.body.Location;
		};
		if (req.body.GroupLimit){ 
			group.GroupLimit = req.body.GroupLimit;
		};
		if (req.body.Comments){ 
			group.Comments = req.body.Comments;
		};
		studyGroups.updateById(req.body.groupid.toString(), {$set: group}); // update the study group with new information
	});
	res.redirect('/mygroups'); // When successful, reload mygroups page
});
module.exports = router;
