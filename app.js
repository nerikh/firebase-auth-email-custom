var restify = require('restify');
var server = restify.createServer();
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');

setupController(server, restify);
userController(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
