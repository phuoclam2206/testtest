/**
 * Created by phuoclam on 05/01/2017.
 */

var AustraliaStudyAboardPost = require('../../../../datasets/australiaStudyAboardPost');
var paginatorUtil = require('../../../../controllers/util/paginator');

var clientAustraliaController = {
    fetch: function (req, res) {
        var select = '_id title created_date image sort_content';
        var paging = paginatorUtil.index(req, select, null);
        AustraliaStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
    fetchDetail: function (req, res, next) {
        AustraliaStudyAboardPost.findOne({"_id": req.params.id}, function (err, result) {
            if(err) next(err);
            AustraliaStudyAboardPost.update(
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
        var query = AustraliaStudyAboardPost.find({}, {title: 1, image: 1, _id: 1, created_date: 1}).sort({"view": -1}).limit(4);
        query.exec(function(err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
    fetchCorrelative: function (req, res, next) {
        var condition =  {};
        if (req.query.tag !== null && req.query.tag != "undefined") {
            condition = {"tag" : req.query.tag}
        }
        var numRecord = AustraliaStudyAboardPost.count();
        var query = AustraliaStudyAboardPost.find(condition, {title: 1, image: 1, _id: 1, created_date: 1}).limit(4).skip(numRecord - 4);

        query.exec(function(err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
    fetchByTag: function (req, res) {
        var select = '_id title created_date image sort_content';
        var paging = paginatorUtil.index(req, select, null);
        AustraliaStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
};
module.exports = clientAustraliaController;

