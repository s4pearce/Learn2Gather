var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/Learn2Gather');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookie = require('cookies');

router.get('/', function(req,res){
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	var user = jwt.decode(token, 'ilovescotchyscotch');
	res.render('settings', user);

});

router.post('/changepassword',function(req, res){
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	var user = jwt.decode(token, 'ilovescotchyscotch');
	var users = db.get('userlist'); // retrieve study groups collection
	if (req.body.newPassword == "" || req.body.confirmPassword == ""){
		res.redirect('/settings')
	}
	else {
		users.findOne({"Username": user.Username}, function(e, foundUser){
			if (req.body.newPassword==req.body.confirmPassword){
				foundUser.Password = req.body.newPassword;
				users.updateById(foundUser._id.toString(), {$set: foundUser});
				var updatedtoken = jwt.sign(foundUser, 'ilovescotchyscotch', {
						expiresIn: 86400 // expires in 24 hours
					});
				new cookie(req,res).set('x-access-token',updatedtoken,{
					httpOnly: true,
					secure: false      
				});
			};
			res.redirect('/settings');
		});
	}
});
	
router.post('/changeemail',function(req, res){
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	var user = jwt.decode(token, 'ilovescotchyscotch');
	var users = db.get('userlist'); // retrieve study groups collection
	if (req.body.newEmail==""){
		res.redirect('/settings');
	}
	else{
		users.findOne({"Username": user.Username}, function(e, foundUser){
			foundUser.Email = req.body.newEmail;
			users.updateById(foundUser._id.toString(), {$set: foundUser});
			var updatedtoken = jwt.sign(foundUser, 'ilovescotchyscotch', {
					expiresIn: 86400 // expires in 24 hours
				});
			new cookie(req,res).set('x-access-token',updatedtoken,{
				httpOnly: true,
				secure: false      
			});
			res.redirect('/settings');
		});	
	}
	
});
module.exports = router;