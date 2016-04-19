var express = require('express');
var router = express.Router();
var resume = require('../controllers/resume');

/* GET home page. */
router.get('/', function(req, res, next) {
   res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>上传html简历</p>'
    + '<p>Image: <input type="file" name="file" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');
});


router.post('/',function(req,res,next){
    
    resume.postResume(req,res,next);

});




module.exports = router;





