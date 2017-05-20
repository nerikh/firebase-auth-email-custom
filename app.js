function respond(res, next, status, data, http_code) {
  var response = {
    'status': status,
    'data': data
  };
  res.setHeader('content-type', 'application/json');
  res.writeHead(http_code);
  res.end(JSON.stringify(response));
  return next();
}
// if api call successful
function success(res, next, data) {
  respond(res, next, 'success', data, 200);
}
// if api call fails
function failure(res, next, data, http_code) {
  respond(res, next, 'failure', data, http_code);
}

var restify = require('restify');
var server = restify.createServer();

var users = {  };
var max_user_id = 0;

server.use(restify.acceptParser(server.acceptable));
// handles parsing individual parameters of code to be posted and requested
server.use(restify.bodyParser());
server.use(restify.queryParser());

// CREATE User
// take request object, etc..
// if a 'post' occurs to the /user url endpoint, then execute this code
server.post("/user", function(req, res, next) {
  // in our http request, the parameters are going to define our new user
  var user = req.params;
  max_user_id++; // increment the max_user_id
  user.id = max_user_id; // id of new user is current max_user_id (incremented)
  /* user array, which consits of all users, the key is "user.id" and 
   * the data is from "user" (var = user) */
  users[user.id] = user;
  success(res, next, user);
});

// READ Users
// if root url is requested (an event), run this callback function in nodejs
// ... 'get' is initiated and completes the function code 
server.get("/", function(req, res, next) {
  success(res, next, users);
});

// READ User
// fetch info about a particular user
server.get("/user/:id", function(req, res, next) {
   success(res, next, users[parseInt(req.params.id)]);
});

// UPDATE User
// if a 'put' to /user/id url
server.put("/user/:id", function(req, res, next) {
  var user = users[parseInt(req.params.id)];
  var updates = req.params;
  for (var field in updates) {
    user[field] = updates[field];
  }
 success(res, next, user); 
});

// DELETE User
server.del("/user/:id", function(req, res, next) {
  delete users[parseInt(req.params.id)];
  success(res, next, []);
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
