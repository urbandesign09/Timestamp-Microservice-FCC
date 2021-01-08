// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


//creating an API endpoint
app.get("/api/timestamp/:date?", function (req, res) {
  const dateItem = req.params.date;
  const unixRegex = /^\d+$/g;
  const allRegex = /\d{4}[\/-]?\d{2}[\/-]?\d{2}|\d{2}[\s]?\w+[\s]?\d{4}|\d{4}[\/-]?\d{2}|^\d+$|\d{2}[\/-]?\d{2}[\/-]?\d{4}[\/-]?|\d{4}/g;

  if (unixRegex.test(dateItem)){ //this is for unix items
    const unixItem = parseInt(dateItem);
    const dateObj = new Date(unixItem);
    res.json({unix: unixItem, utc: (dateObj.toUTCString())})
  }
  else if (allRegex.test(dateItem)){ //this is for everything else
     res.json({unix: Date.parse(dateItem), utc: new Date(dateItem).toUTCString()})
  }
  else if (dateItem == undefined) { //this is for new
    res.json({unix: Date.parse(new Date()), utc: new Date().toUTCString()})
  }
  else {
    res.json({error: "Invalid Date"})
  }
   
  } //res.json({})
)


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
