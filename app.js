var restify = require('restify');
var server = restify.createServer();

var users = {  };
var max_user_id = 0;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());

// if root url is requested (an event), run this callback function in nodejs
// ... 'get' is initiated and completes the function code 
server.get("/", function(req, res, next) {
  // tell client that it can expect json to be returned
  res.setHeader('content-type', 'application/json');
  // return the header to the client
  res.writeHead(200);
  // send data back in the response body, a json response string
  res.end(JSON.stringify(users));
  // ensure no further execution takes place after function is executed
  return next();
});

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
  res.setHeader('content-type', 'application/json');
  res.writeHead(200);
  // respond with json string consisting of info related to this user
  res.end(JSON.stringify(user));
  return next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
