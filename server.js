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
  // res.sendFile(__dirname + '/views/index.html');
  res.redirect("/api/timestamp");
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let res = {};

app.get('/api/timestamp/:date', (request, response) => {
  let date = request.params.date;
  if(date.includes('-')) {
    res.unix = new Date(date).getTime();
    res.utc = new Date(date).toUTCString();
  } else {
    date = parseInt(date);
    res.unix = new Date(date).getTime();
    res.utc = new Date(date).toUTCString();
  }
  if((!res.unix) || (!res.utc) ) {
    response.json({ error: "Invalid Date" });
  }
  response.json(res);
})

app.get("/api/timestamp", (request, response) => {
  res.unix = new Date().getTime();
  res.utc = new Date().toUTCString();

  response.json(res);
});
