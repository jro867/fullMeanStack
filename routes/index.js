var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});

router.param('comment', function(req, res, next, id) { //THIS IS TO GET ONE AT THE TIME
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next(); //goes back to line 32
  });
});

router.get('/comments/:comment', function(req, res) { //THIS IS TO GET ONE AT THE TIME
  res.json(req.comment);
});

router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){ //next comes back in here and since comment as a model has an upvote method then
    //we can call the upvote from here
    if (err) { return next(err); }
    res.json(comment);
  });
});
module.exports = router;
