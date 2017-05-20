
// Import the success and failure functions from helperFunctions
// add 'helpers.' everywhere in this file where you want to use the helperFunctions 
var helpers = require('../config/helperFunctions.js');

// Fake database
var users = {  };
var max_user_id = 0;

// Functions
module.exports = function(server) {
  // READ Users
  // if root url is requested (an event), run this callback function in nodejs
  // ... 'get' is initiated and completes the function code 
  server.get("/", function(req, res, next) {
    helpers.success(res, next, users);
  });

  // READ User
  // fetch info about a particular user
  server.get("/user/:id", function(req, res, next) {
    // Error handling
    if (typeof(users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found in the database', 404);
    }
    helpers.success(res, next, users[parseInt(req.params.id)]);
  });

  // CREATE User
  // take request object, etc..
  // if a 'post' occurs to the /user url endpoint, then execute this code
  server.post("/user", function(req, res, next) {
    // in our http request, the parameters are going to define our new user
    var user = req.params;
    max_user_id++; // increment the max_user_id
    user.id = max_user_id; // id of new user is current max_user_id (incremented)
    // user array, which consits of all users, the key is "user.id" and 
    // the data is from "user" (var = user) 
    users[user.id] = user;
    helpers.success(res, next, user);
  });

  // UPDATE User
  // if a 'put' to /user/id url
  server.put("/user/:id", function(req, res, next) {
    if (typeof(users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found in the database', 404);
    }
    var user = users[parseInt(req.params.id)];
    var updates = req.params;
    for (var field in updates) {
      user[field] = updates[field];
    }
    helpers.success(res, next, user); 
  });

  // DELETE User
  server.del("/user/:id", function(req, res, next) {
    if (typeof(users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found in the database', 404);
    }
    delete users[parseInt(req.params.id)];
    helpers.success(res, next, []);
  });
}
