/**
 * Created by phuoclam on 05/01/2017.
 */

var NotifyPost = require("./../../../datasets/notifyPost");
var paginatorUtil = require('./../../../controllers/util/paginator');

var clientNotifyController = {
    fetch: function (req, res) {
        var select = '_id title created_date image sort_content';
        var paging = paginatorUtil.index(req, select, null);
        NotifyPost.paginate(paging.query, paging.option, function (err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
    fetchDetail: function (req, res, next) {
        NotifyPost.findOne({"_id": req.params.id}, function (err, result) {
            if(err) next(err);
            NotifyPost.update(
                {_id: result._id},
                {
                    $set: {
                        view: result.view ?  result.view + 1 : 1
                    }
                },
                {upsert: false},
                function (err, doc) {
                    if (err) next(err);
                    return res.json(result);
                });
        });
    },
    fetchMostView: function (req, res, next) {
        var query = NotifyPost.find({}, {title: 1, image: 1, _id: 1, created_date: 1}).sort({"view": -1}).limit(4);
        query.exec(function(err, result) {
            if (err) next(err);
            return res.json(result);
        });
    }
};
module.exports = clientNotifyController;

