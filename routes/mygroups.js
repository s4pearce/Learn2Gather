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
    collection.find({"Members": {$all: [username]}},{},function(e,docs){
		if (docs){
			res.render('mygroups', { // If they are part of study groups, render the page and list them
				"StudyGroups" : docs
			});
		}
		else{ // Otherwise, inform them that they cannot see groups that they aren't in!
			res.render('error', {Message: "You are currently part of no groups! Click 'View Groups' above to see what is available."})
		}
	});
})
// What hapens when the user POSTs a request to remove a group
router.post('/', function(req, res){
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	var user = jwt.decode(token, 'ilovescotchyscotch'); // grabbing user information from their cookie
	var db = req.db;
	var users = db.get('userlist'); // retrieve list of users
	users.findOne({"Username": user.Username}, function(e, foundUser){ // find the user and drop the group from user's GroupsJoined data
		var indexvalue = foundUser.GroupsJoined.indexOf(user.Username);
		console.log(indexvalue);
		foundUser.GroupsJoined = foundUser.GroupsJoined.slice(0, indexvalue).concat(foundUser.GroupsJoined.slice(indexvalue+1));
		users.updateById(foundUser._id.toString(), {$set: foundUser}); // update user data
	});
	var studyGroups = db.get('StudyGroups'); // retrieve list of study groups
	studyGroups.findById(req.body.groupid.toString(), function(e, group){
		if (group.Owner==user.Username){ // If the user leaving is the actual group, remove the entire group
			studyGroups.remove({"_id": req.body.groupid.toString()}) // remove study group
		}
		else { // Otherwise, remove the user from the group (and remove the group from their data)
			var indexvalue = group.Members.indexOf(user.Username);
			group.Members = group.Members.slice(0, indexvalue).concat(group.Members.slice(indexvalue+1));
			if (group.Members.length<group.GroupLimit){ // If the group is not full now, now make it available to join
				group.Available = true;
			}
			studyGroups.updateById(req.body.groupid.toString(), {$set: group});	// update study group
		}
	res.redirect('/mygroups'); // When successful, reload mygroups page
	});
});
module.exports = router;