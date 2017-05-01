/**
 * Created by phuoclam on 12/03/2017.
 */
var multer = require('multer');
var sharp = require('sharp');
var fs = require('fs');
var path = require('path');

var image = {};
var dest = 'public/images/post/';

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, dest);
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

image.multer = multer({ storage : storage}).single('image');
image.resize = function (file, cb) {
    var extension = path.extname(file.originalname);
    var newPath = file.path + Date.now() + extension;
    sharp(file.path).resize(384, 257).toFile(newPath, function(err) {
        if (err) {
            cb(err, newPath)
        }
        fs.unlinkSync(file.path);

        cb(null, newPath);
    });
};

module.exports = image;