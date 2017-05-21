var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// https://www.npmjs.com/package/mongoose#defining-a-model
var UserSchema = new Schema({
    id    : ObjectId,
    first_name     : String,
    last_name      : String,
    email_address  : String,
    career         : String
});

// Accessing a Model
// https://www.npmjs.com/package/mongoose#accessing-a-model
var UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
