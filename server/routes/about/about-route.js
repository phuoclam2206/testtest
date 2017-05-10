/**
 * Created by phuoclam on 02/05/2017.
 */
var about = require('../../controllers/client/about/about-controller');
module.exports = function(app) {

    app.get('/about', about.index);

};
