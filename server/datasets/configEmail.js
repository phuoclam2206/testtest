/**
 * Created by phuoclam on 05/01/2017.
 */
var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;
var paginator = require("mongoose-paginate");


var ConfigEmail = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {collection: 'config_email'});

ConfigEmail.plugin(paginator);
module.exports = mongoose.model('config_email', ConfigEmail);