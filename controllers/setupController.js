
//  Server + Restify
//  pass server and restify as (parameters) into this file so they can be used...
module.exports = function(server, restify, restifyValidator) {
  server.use(restify.acceptParser(server.acceptable));
  // handles parsing individual parameters of code to be posted and requested
  server.use(restify.bodyParser());
  server.use(restify.queryParser());
  server.use(restifyValidator);

  // API Authorization
  server.use(restify.authorizationParser());
  server.use(function(req, res, next) {
    var apiKeys = {
      // user : password
      'user1': 'akfjrekjrakfj328u04328u'
    };
    if (typeof(req.authorization.basic) === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password !== apiKeys[req.authorization.basic.username] ) {
      var response = {
        'status': 'failure',
        'data': 'You must specify a valid API key'
      };
      res.setHeader('content-type', 'application/json');
      res.writeHead(403); // response code 403 = forbidden 
      res.end(JSON.stringify(response));
      return next();
    }
    return next();
  });
}

