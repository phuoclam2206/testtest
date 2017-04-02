/**
 * Created by phuoclam on 05/01/2017.
 */
var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;
var paginator = require("mongoose-paginate");


var Email = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    name: {type: String, default: false},
    email: {type: String, default: false},
    created_date: {type: Number},
}, {collection: 'email'});

Email.plugin(paginator);
module.exports = mongoose.model('Email', Email);