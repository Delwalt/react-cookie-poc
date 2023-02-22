var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 6069;

app.use(cookieParser());

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/with/test", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(403);
  }

  return res.sendStatus(200);
});


app.get('/with', function(req, res) {
    
    let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: false, // The cookie only accessible by the web server
        signed: false, // Indicates if the cookie should be signed
    }
    res.cookie('token', 'secret', options) 
    res.sendfile("index.html");
});

app.get('/without', function(req, res) {
    console.log("GET From SERVER");
    res.sendfile("index.html");
});




app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
