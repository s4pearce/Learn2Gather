// Identifying Required Modules
var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookie = require('cookies');
var monk = require('monk');
var db = monk('localhost:27017/Learn2Gather');
// When a user requests to join a group:
router.post('/', function(req, res) {
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token"); // retrieve user token, if possible
	if (token) { // if token exists, let them join the group
		var user = jwt.decode(token);
		var db = req.db;
		var collection = db.get('StudyGroups'); // retrieve study groups collection
		collection.findById(req.body.groupid.toString(),function(e,group){
			//Log-checking for error below:
			//console.log(user.Username);
			//console.log(Array.isArray(group.Members));
			//console.log(user.Username in group.Members);
			if (user.Username in group.Members) { // CURRENTLY BROKEN, always returns false ?????
				res.redirect('/viewgroups'); // If the user is already part of the group, redirect them to the viewgroups page
			}
			else{ // otherwise, add user to group
				group.Members.push(user.Username);
				if (group.Members.length==group.GroupLimit){ // If the group has now reached its limit, make the group unavailable for other users
					group.Available = false;
				}
				collection.updateById(req.body.groupid.toString(), {$set: group}); // Update the study group
				var users = db.get('userlist'); // retrieve users collection
				users.findOne({"Username": user.Username}, function(e, foundUser){
					foundUser.GroupsJoined.push(req.body.groupid); // Add the sudy group to user's list of groups (will not update token, but causes no problems because we process database)
					users.updateById(foundUser._id, {$set: foundUser}); // update the user's information
					res.redirect('/mygroups'); // redirect the user to the page that shows their joined groups
				});
			}
		});
	}
	else { // if token doesn't exist, then they aren't a user and must log in to join the group!
		res.redirect('/login');
	}
});
module.exports = router;