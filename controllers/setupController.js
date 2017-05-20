
//  Server + Restify
//  pass server and restify as (parameters) into this file so they can be used...
module.exports = function(server, restify, restifyValidator) {
  server.use(restify.acceptParser(server.acceptable));
  // handles parsing individual parameters of code to be posted and requested
  server.use(restify.bodyParser());
  server.use(restify.queryParser());
  server.use(restifyValidator);
}

