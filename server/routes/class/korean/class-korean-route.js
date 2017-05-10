// app.get('/api/class/korean', clientClassKoreanController.fetch);
// app.get('/api/class/korean/detail/:id', clientClassKoreanController.fetchDetail);
// app.get('/api/class/korean/fetch_most_view', clientClassKoreanController.fetchMostView);
/**
 * Created by phuoclam on 02/05/2017.
 */
var japan = require('../../../controllers/client/asian/japan/japan-controller');
module.exports = function(app) {

    app.get('/japan', japan.fetch);
    app.get('/japan/detail/:id', japan.fetchDetail);

};
