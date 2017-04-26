/**
 * Created by phuoclam on 05/01/2017.
 */
var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;
var paginator = require("mongoose-paginate");


var NotifyPost = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    is_active: {type: Boolean, default: false},
    created_date: {type: Number},
    image: {type: String},
    sort_content: {type: String},
    tag: {type: String},
    view: {type: Number}
}, {collection: 'notify_post'});

NotifyPost.plugin(paginator);
module.exports = mongoose.model('NotifyPost', NotifyPost);
