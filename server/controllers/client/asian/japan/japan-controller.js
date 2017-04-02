/**
 * Created by phuoclam on 05/01/2017.
 */

var JapanStudyAboardPost = require('../../../../datasets/japanStudyAboardPost');
var paginatorUtil = require('../../../../controllers/util/paginator');

var clientJapanController = {
    fetch: function (req, res) {
        var select = '_id title created_date image sort_content';
        paging = paginatorUtil.index(req, select, null);
        JapanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
    fetchDetail: function (req, res, next) {
        JapanStudyAboardPost.update(
            {_id: req.body._id},
            {
                $set: {
                    title: req.body.title,
                    is_active: req.body.isActive,
                    content: req.body.content,
                    sort_content: req.body.sort_content
                }
            },
            {upsert: false},
            function (err, doc) {
                if (err) next(err);
                return res.json(doc);
            });

        JapanStudyAboardPost.findOne({"_id": req.params.id}, function (err, result) {
            if(err) next(err);
            return res.json(result);
        });
    }
};
module.exports = clientJapanController;

