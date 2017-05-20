/* Export Functions so they are publicly available to any file that needs it
 * module.exports.xxxx
 * to make a function publicly available to any file that needs to use it
 * export it: module.exports.success failure
 *
 * Private function: 
 * To indicate that a function exists within this file only, prefix it with
 * an underscore: _respond
 */

function _respond(res, next, status, data, http_code) {
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
module.exports.success = function success(res, next, data) {
  _respond(res, next, 'success', data, 200);
}
// if api call fails
module.exports.failure = function failure(res, next, data, http_code) {
  _respond(res, next, 'failure', data, http_code);
}

