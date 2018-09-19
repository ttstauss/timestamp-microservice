// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// third pary modules
const moment = require('moment')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/", (req, res) => {
  res.json({time: new Date()})
})

app.get("/api/timestamp/:date_string", function (req, res) {
  
  const dateString = req.params.date_string
  
  if (+dateString === +dateString) {
    console.log('number')
    const dateObj = new Date(+dateString)
    res.json({'unix': dateObj.getTime(), 'utc': dateObj.toUTCString()})
  } else if (moment(dateString).isValid()) {
    console.log('string')
    const dateObj = new Date(dateString)
    res.json({'unix': dateObj.getTime(), 'utc': dateObj.toUTCString()})
  } else {
    res.json({'error': 'Invalid Date'})
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});