/**
 * Created by phuoclam on 05/01/2017.
 */

var KoreanStudyAboardPost = require('../../../../datasets/koreanStudyAboardPost');
var paginatorUtil = require(__base + 'controllers/util/paginator');
var KoreanModel = require(__base + 'models/asian/korean/korean-model')

var clientKoreanController = {
    fetch: function (req, res) {
        var select = '_id title created_date image sort_content';
        paging = paginatorUtil.index(req, select, null);
        try {
            KoreanModel.fetch(paging).then(function(result) {
                return res.render('client/asian/korean/index.html', {posts: result.docs});
            });
        } catch(err) {
            res.redirect('/');
        }
    },
    fetchDetail: function (req, res, next) {
        
        KoreanStudyAboardPost.findOne({"_id": req.params.id}, function (err, result) {
            if(err) next(err);
            var query = KoreanStudyAboardPost.find({}, {title: 1, image: 1, _id: 1, created_date: 1}).sort({"view": -1}).limit(4);
            query.exec(function(err, mostViews) {
                if (err) next(err);
                var condition =  {};
                if (req.query.tag !== null && req.query.tag != "undefined") {
                    condition = {"tag" : req.query.tag}
                }
                var numRecord = KoreanStudyAboardPost.count();
                var query = KoreanStudyAboardPost.find(condition, {title: 1, image: 1, _id: 1, created_date: 1}).limit(4).skip(numRecord - 4);

                query.exec(function(err, correlatives) {
                    if (err) next(err);
                    return res.render('client/asian/korean/detail.html', {post: result, correlatives: correlatives, mostViews: mostViews});
                });
            });
        });
    },
    fetchMostView: function (req, res, next) {
        var query = KoreanStudyAboardPost.find({}, {title: 1, image: 1, _id: 1, created_date: 1}).sort({"view": -1}).limit(4);
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
        var numRecord = KoreanStudyAboardPost.count();
        var query = KoreanStudyAboardPost.find(condition, {title: 1, image: 1, _id: 1, created_date: 1}).limit(4).skip(numRecord - 4);

        query.exec(function(err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
    fetchByTag: function (req, res) {
        var select = '_id title created_date image sort_content';
        var paging = paginatorUtil.index(req, select, null);
        KoreanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            if (err) next(err);
            return res.json(result);
        });
    },
};
module.exports = clientKoreanController;

