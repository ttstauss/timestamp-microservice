// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// third pary modules
const moment = require('moment-timezone')

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
    return res.json({'unix': +moment.unix(dateString).format('x'), 'utc': moment.tz(dateString).format('ddd, D MMM YYYY HH:mm;ss z')})
  }
  
  if (moment(dateString).isValid()) {
    return res.json({'unix': +moment(dateString).format('x'), 'utc': moment.tz(dateString).format('ddd, D MMM YYYY HH:mm;ss z')})
  } else {
    return res.json({'unix': null, 'utc': 'Invalid Date'})
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});