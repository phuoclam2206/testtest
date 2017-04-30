/**
 * Created by phuoclam on 05/01/2017.
 */

var NewsPost = require('../datasets/newsPost');
var image = require('../controllers/util/image');
var paginatorUtil = require('../controllers/util/paginator');
var fs = require("fs");
var sharp = require("sharp");

var newsController = {
    create: function (req, res) {
        image.resize(req.file, function (err, newPath) {
            if(err) next(err);
            var newsPost = new NewsPost({
                title: req.body.title,
                content: req.body.content,
                is_active: req.body.isActive,
                created_date: Math.round(new Date().getTime()/1000),
                image: newPath,
                sort_content: req.body.sort_content,
                tag: req.body.tag
            });
            newsPost.save();
            res.json(newsPost);
        });
    },

    fetch: function (req, res) {
        var select = '_id title created_date is_active content sort_content tag';
        var paging = paginatorUtil.index(req, select, null);
        NewsPost.paginate(paging.query, paging.option, function (err, result) {
            return res.json(result);
        });
    },

    delete: function (req, res) {
        NewsPost.remove({_id: req.params.id}).exec(function (err) {
            if (err) next(err);
            return res.json({status: 200});
        })
    },

    update: function (req, res, next) {
        NewsPost.update(
            {_id: req.body._id},
            {
                $set: {
                    title: req.body.title,
                    is_active: req.body.isActive,
                    content: req.body.content,
                    sort_content: req.body.sort_content,
                    tag: req.body.tag
                }
            },
            {upsert: true},
            function (err, doc) {
                if (err) next(err);
                return res.json(doc);
            });
    }
};
module.exports = newsController;

