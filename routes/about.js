var express = require('express');
var router = express.Router();
var cookie = require('cookies');
// Organizing the various function calls and rerouting to the proper handles: **************************************
// (Note: If they require DB access, we provide calls to the appropriate collections here!)
/* GET home page. */
router.get('/', function(req, res, next) {
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	if (token){
		res.render('aboutlogged');
	}
	else {
		res.render('about');
	}
});

module.exports = router;