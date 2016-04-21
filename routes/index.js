var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookie = require('cookies');

/* GET home page. */
router.get('/', function(req, res) {
   // check header or url parameters or post parameters for token
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, 'ilovescotchyscotch', function(err, decoded) {      
			if (err) {
				res.render('index', { title: 'Learn2Gather Home' });
			} else {
				res.render('userhome', { decoded });
			}
		});
	}
	else {
		res.render('index');
	}
});
module.exports = router;