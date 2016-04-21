var express = require('express');
var router = express.Router();

/* GET New User page. */
router.get('/', function(req, res) { // signup here is the name of the handler
    res.render('signup', { title: 'Add New User' }); // looks up file in view called signup
});

/* POST to Add User Service */
router.post('/', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var username = req.body.username;
	var password =  req.body.password;
	var fname = req.body.fname;
	var lname = req.body.lname;
    var useremail = req.body.email;

    // Set our collection
    var collection = db.get('userlist');

    // Submit to the DB
	collection.find({"Username" : username}, function(err, user){
		if (user.length >= 1) {
			res.render('error', {Message: "That user name is taken! Please go back and try a different username."})
		}
		else {
			collection.insert({
				"Username" : username,
				"Password": password,
				"Fname": fname,
				"Lname": lname,
				"Email" : useremail,
				"GroupsJoined" : []
			}, function (err, doc) {
				if (err) {
					// If it failed, return error
					res.send("There was a problem adding the information to the database.");
				}
				else {
					// And forward to success page... later it will go to settings. thsi is for troubleshooting atm.
					res.redirect("login");
				}
			});	
		}
	});
});

module.exports = router;