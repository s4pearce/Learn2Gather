var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookie = require('cookies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Set our collection
    var collection = db.get('userlist');
    // find the user
	collection.findOne({Username: req.body.username}, function(err, user) {
		if (!user) {
			res.redirect("/login");
		} else if (user) {
			// check if password matches
			if (user.Password != req.body.password) {
				res.redirect("/login");
			} else {
				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, 'ilovescotchyscotch', {
					expiresIn: 86400 // expires in 24 hours
				});
				// return the information including token as JSON
				new cookie(req,res).set('x-access-token',token,{
					httpOnly: true,
					secure: false      
				});
				// https://stormpath.com/blog/nodejs-jwt-create-verify/
				// https://github.com/pillarjs/cookies
				res.redirect('/');
			}   

		}
    });
});

module.exports = router;