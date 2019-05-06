var express = require('express');
var router = express.Router();

 
 

router.get('/', function(req, res) {
  res.render('special', { title: 'Express' });
});

module.exports = router;
