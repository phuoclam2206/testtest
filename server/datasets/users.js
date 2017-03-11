/**
 * Created by phuoclam on 31/12/2016.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, lowercase: true, required: true, unique: true},
    password: { type: String, required: true},
    email: { type: String, lowercase: true, required: true, unique: true}
});

module.exports = mongoose.model('User', UserSchema);