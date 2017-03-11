/**
 * Created by phuoclam on 05/01/2017.
 */

var JapanStudyAboardPost = require('../../../../datasets/japanStudyAboardPost');
var paginatorUtil = require('../../../../controllers/util/paginator');

var clientJapanController = {
    fetch: function (req, res) {
        var select = '_id title created_date is_active content';
        paging = paginatorUtil.index(req, select, null);
        JapanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            return res.json(result);
        });
    }
};
module.exports = clientJapanController;

