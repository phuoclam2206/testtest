/**
 * Created by phuoclam on 05/01/2017.
 */

var GermanyStudyAboardPost = require('../../../../datasets/germanyStudyAboardPost');
var paginatorUtil = require('../../../../controllers/util/paginator');

var clientGermanyController = {
    fetch: function (req, res) {
        var select = '_id title created_date image sort_content';
        paging = paginatorUtil.index(req, select, null);
        GermanyStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
    fetchDetail: function (req, res, next) {
        GermanyStudyAboardPost.findOne({"_id": req.params.id}, function (err, result) {
            if(err) next(err);
            return res.json(result);
        });
    }
};
module.exports = clientGermanyController;

