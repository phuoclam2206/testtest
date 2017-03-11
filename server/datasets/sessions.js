/**
 * Created by phuoclam on 16/01/2017.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, lowercase: true, required: true, unique: true},
    token: { type: String, required: true}
});

module.exports = mongoose.model('Session', SessionSchema);