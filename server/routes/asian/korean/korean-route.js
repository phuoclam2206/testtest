/**
 * Created by phuoclam on 02/05/2017.
 */
var korean = require(__base + 'controllers/client/asian/korean/korean-controller');
module.exports = function(app) {

    app.get('/korean', korean.fetch);
    app.get('/korean/detail/:id', korean.fetchDetail);

};
