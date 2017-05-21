// connect to database
//var config = require('./config/dbConnection.js');
//var mongoose = require('mongoose');

//mongoose.connect(config.getMongoConnection());
//setupController(server, restify, restifyValidator);
//userController(server);

/* server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
*/
var firebase = require("firebase");


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD3rPxwJ6itkNklg1zoyxrPeoSFgdNDbI0",
    authDomain: "testme-b1756.firebaseapp.com",
    databaseURL: "https://testme-b1756.firebaseio.com",
  };
  firebase.initializeApp(config);
