/**
 * Created by phuoclam on 12/03/2017.
 */
module.exports = function () {
    var multer = require('multer');

    var path = 'public/images/';

    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path);
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now());
        }
    });

    return multer({ storage : storage}).single('image');
};