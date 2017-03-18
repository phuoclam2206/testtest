/**
 * Created by phuoclam on 05/01/2017.
 */
var mongoose = require("bluebird").promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;
var paginator = require("mongoose-paginate");


var AustraliaStudyAboardPost = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    is_active: {type: Boolean, default: false},
    created_date: {type: Number},
    image: {type: String},
    sort_content: {type: String}
}, {collection: 'australia_study_aboard_post'});

AustraliaStudyAboardPost.plugin(paginator);
module.exports = mongoose.model('AustraliaStudyAboardPost', AustraliaStudyAboardPost);