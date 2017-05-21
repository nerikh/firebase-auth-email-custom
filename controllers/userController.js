
// Import the success and failure functions from helperFunctions
// add 'helpers.' everywhere in this file where want to use the helperFunctions 
var helpers = require('../config/helperFunctions.js');

// DB include Users Model to make DB model (collections + documents) available
var UserModel = require('../models/UserModel');

// Functions
module.exports = function(server) {
  // READ Users
  // if root url is requested (an event), run this callback function in nodejs
  // ... 'get' is initiated and completes the function code 
  server.get("/", function(req, res, next) {
    // find{} will find all, it like the "where" clause in SQL
    UserModel.find({}, function (err, users) {
			// docs.forEach 
      helpers.success(res, next, users);
    });
  });

  // READ User
  // fetch info about a particular user
  server.get("/user/:id", function(req, res, next) {
    // Validation: restify-validator
    req.assert('id', 'Id is required and must be numeric').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      // errors[0] will output only the first error (in the array)
      helpers.failure(res, next, errors[0], 400);
    }
    // End Validation
    // Find user: findOne{..} will find a single record, it like the "where" clause in SQL
    UserModel.findOne({ _id: req.params.id }, function (err, user) {
      // Error handling
      if (err) {
        helpers.failure(res, next, 'Something went wrong while fetching the user form the database', 500);
      }
      if (user === null) {
        helpers.failure(res, next, 'The specified user could not be found', 404);
      }
      helpers.success(res, next, user);
    });
    /* For fake db: No longer necessary connecting to Mongo
    if (typeof(users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found in the database', 404);
    }
    helpers.success(res, next, users[parseInt(req.params.id)]);
    */
  });

  // CREATE User
  // take request object, etc..
  // if a 'post' occurs to the /user url endpoint, then execute this code
  server.post("/user", function(req, res, next) {
    // Validation: restify-validator
    req.assert('first_name', 'First name is required').notEmpty();
    req.assert('last_name', 'Last name is required').notEmpty();
    req.assert('email_address', 'Email address is required and must be a valid email').notEmpty().isEmail();
    req.assert('career', 'Carrer must be either a student, teacher, or professor').isIn(['student', 'teacher', 'professor']);
    var errors = req.validationErrors();
    if (errors) {
      // errors will output all errors in the array
      helpers.failure(res, next, errors, 400);
    }
    // End Validation
    // in our http request, the parameters are going to define our new user
    /* Following code no longer needed when using real Database Connection
    var user = req.params;
    max_user_id++; // increment the max_user_id
    user.id = max_user_id; // id of new user is current max_user_id (incremented)
    // user array, which consits of all users, the key is "user.id" and 
    // the data is from "user" (var = user) 
    users[user.id] = user;
    */
    // DB UserModel: instantiate the UserModel
    var user = new UserModel();
    user.first_name = req.params.first_name;
    user.last_name = req.params.last_name;
    user.email_address = req.params.email_address;
    user.career = req.params.career;
    // Mongoose user.save
    user.save(function (err) {
      helpers.failure(res, next, 'Error saving user to database');
    });
    // End Mongoose
    helpers.success(res, next, user);
  });

  // UPDATE User
  // if a 'put' to /user/id url
  server.put("/user/:id", function(req, res, next) {
    // Validation: restify-validator
    req.assert('id', 'Id is required and must be numeric').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      // errors[0] will output only the first error (in the array)
      helpers.failure(res, next, errors[0], 400);
    }
    // DB Find user: findOne{..} will find a single record, it like the "where" clause in SQL
    UserModel.findOne({ _id: req.params.id }, function (err, user) {
      // Error handling
      if (err) {
        helpers.failure(res, next, 'Something went wrong while fetching the user form the database', 500);
      }
      if (user === null) {
        helpers.failure(res, next, 'The specified user could not be found', 404);
      }
      var updates = req.params;
      delete updates.id;
      for (var field in updates) {
        user[field] = updates[field];
      }
      // Mongoose user.save
      user.save(function (err) {
        helpers.failure(res, next, 'Error saving user to database');
      });
      helpers.success(res, next, user); 
    });
    /*
    // End Validation
    if (typeof(users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found in the database', 404);
    }
    var user = users[parseInt(req.params.id)];
    */
    ///////////
  });

  // DELETE User
  server.del("/user/:id", function(req, res, next) {
    // Validation: restify-validator
    req.assert('id', 'Id is required and must be numeric').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      // errors[0] will output only the first error (in the array)
      helpers.failure(res, next, errors[0], 400);
    }
    // DB Find user: findOne{..} will find a single record, it like the "where" clause in SQL
    UserModel.findOne({ _id: req.params.id }, function (err, user) {
      // Error handling
      if (err) {
        helpers.failure(res, next, 'Something went wrong while fetching the user form the database', 500);
      }
      if (user === null) {
        helpers.failure(res, next, 'The specified user could not be found', 404);
      }
      // Mongoose user.remove
      user.remove(function (err) {
        helpers.failure(res, next, 'Error removing user from the database');
      });
      helpers.success(res, next, user); 
    });
    /* no longer needed 
      var updates = req.params;
      delete updates.id;
      for (var field in updates) {
        user[field] = updates[field];
      }
       if (typeof(users[req.params.id]) === 'undefined') {
      helpers.failure(res, next, 'The specified user could not be found in the database', 404);
    }
    delete users[parseInt(req.params.id)];
    helpers.success(res, next, []);
    */
  });
}
