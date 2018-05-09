var express = require("express");
var formidable = require('express-formidable');

var Pusher = require('pusher');
var pusher = new Pusher({
  appId: '519154',
  key: '968648b6d643e9d7907f',
  secret: 'af144313e9b525c59281',
  cluster: 'eu',
  encrypted: true
});

var app = express();
app.use(express.static("public"));
app.use(formidable());

app.post('/tweet', function (req, res) {
  console.log("got request to tweet");
  pusher.trigger('my-channel', 'my-event', {
    "name": req.fields.handle,
    "message": req.fields.message
  });
  res.send('done');
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
