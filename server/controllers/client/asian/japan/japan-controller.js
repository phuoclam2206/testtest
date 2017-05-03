/**
 * Created by phuoclam on 05/01/2017.
 */

var JapanStudyAboardPost = require('../../../../datasets/japanStudyAboardPost');
var paginatorUtil = require('../../../../controllers/util/paginator');
var moment = require('moment');

var clientJapanController = {
    fetch: function (req, res) {
        var select = '_id title created_date image sort_content';
        paging = paginatorUtil.index(req, select, null);
        JapanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            if (err) next(err);
            return res.render('client/asian/japan/index.html', {posts: result.docs});
        });
    },
    fetchDetail: function (req, res, next) {
        JapanStudyAboardPost.findOne({"_id": req.params.id}, function (err, result) {
            if(err) next(err);
            JapanStudyAboardPost.update(
                {_id: result._id},
                {
                    $set: {
                        view: result.view ?  result.view + 1 : 1
                    }
                },
                {upsert: false},
                function (err, doc) {
                    if (err) next(err);
                    var query = JapanStudyAboardPost.find({}, {title: 1, image: 1, _id: 1, created_date: 1}).sort({"view": -1}).limit(4);
                    query.exec(function(err, mostViews) {
                        if (err) next(err);
                        var condition =  {};
                        if (req.query.tag !== null && req.query.tag != "undefined") {
                            condition = {"tag" : req.query.tag}
                        }
                        var numRecord = JapanStudyAboardPost.count();
                        var query = JapanStudyAboardPost.find(condition, {title: 1, image: 1, _id: 1, created_date: 1}).limit(4).skip(numRecord - 4);

                        query.exec(function(err, correlatives) {
                            if (err) next(err);
                            return res.render('client/asian/japan/detail.html', {post: result, correlatives: correlatives, mostViews: mostViews});
                        });
                    });
                });
        });
    },
    fetchMostView: function (req, res, next) {
        var query = JapanStudyAboardPost.find({}, {title: 1, image: 1, _id: 1, created_date: 1}).sort({"view": -1}).limit(4);
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
        var numRecord = JapanStudyAboardPost.count();
        var query = JapanStudyAboardPost.find(condition, {title: 1, image: 1, _id: 1, created_date: 1}).limit(4).skip(numRecord - 4);

        query.exec(function(err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
    fetchByTag: function (req, res) {
        var select = '_id title created_date image sort_content';
        var paging = paginatorUtil.index(req, select, null);
        JapanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
};
module.exports = clientJapanController;

