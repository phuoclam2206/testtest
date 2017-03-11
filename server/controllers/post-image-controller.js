/**
 * Created by phuoclam on 11/01/2017.
 */

module.exports = function (app) {
    var multer = require('multer');

    var file_name = Date.now() + '.jpg';
    var path = 'public/images/';
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, file_name)
        }

    });

    var upload = multer({ storage: storage });
    app.post('/api/dashboard/upload', upload.any(), function (req, res) {
        res.json({ "location": path + file_name})
    })
};
