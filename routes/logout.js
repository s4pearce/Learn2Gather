var express = require('express');
var router = express.Router();
var cookie = require('cookies');

router.get('/', function(req, res) {
	var cookies = new cookie(req, res);
	var token = cookies.get("x-access-token");
	new cookie(req,res).set('x-access-token',token,{
			httpOnly: true,
			secure: false,
			expires: new Date()
		});
	res.redirect('/');
});

module.exports = router;