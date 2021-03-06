// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// dialog
const projectId = 'lucie-30cd4'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'deezsessionnuts';
const query = 'hello';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: 'DEEZNUT GADDEEMM',
      languageCode: languageCode,
    },
  },
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

var dbName = 'Lucie';

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run(`CREATE TABLE ${dbName} (dream TEXT)`);
    console.log(`New table ${dbName} created!`);
    
    // insert default dreams
    db.serialize(function() {
      db.run(`INSERT INTO ${dbName} (dream) VALUES ("Find and count some sheep"), ("Climb a really tall mountain"), ("Wash the dishes")`);
    });
  }
  else {
    console.log(`Database "${dbName}" ready to go!`);
    db.each(`SELECT * from "${dbName}"`, function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});

// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + '/views/index.html');
// });

// // endpoint to get all the dreams in the database
// // currently this is the only endpoint, ie. adding dreams won't update the database
// // read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
// app.get('/getDreams', function(request, response) {
//   db.all('SELECT * from Dreams', function(err, rows) {
//     response.send(JSON.stringify(rows));
//   });
// });

// // listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });


