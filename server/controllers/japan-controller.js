/**
 * Created by phuoclam on 05/01/2017.
 */

var JapanStudyAboardPost = require('../datasets/japanStudyAboardPost');
var paginatorUtil = require('../controllers/util/paginator');
var image = require('../controllers/util/image');
var fs = require("fs");
var sharp = require("sharp");


var japanController = {
    create: function (req, res, next) {
        image.resize(req.file, function (err, newPath) {
            if(err) next(err);
            var japanStudyAboardPost = new JapanStudyAboardPost({
                title: req.body.title,
                content: req.body.content,
                is_active: req.body.isActive,
                created_date: Math.round(new Date().getTime()/1000),
                image: newPath,
                sort_content: req.body.sort_content,
                tag: req.body.tag
            });
            japanStudyAboardPost.save();
            res.json(japanStudyAboardPost);
        });
    },

    fetch: function (req, res) {
        var select = '_id title created_date is_active content sort_content tag';
        paging = paginatorUtil.index(req, select, null);
        JapanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            return res.json(result);
        });
    },

    delete: function (req, res) {
        JapanStudyAboardPost.remove({_id: req.params.id}).exec(function (err) {
            if (err) next(err);
            return res.json({status: 200});
        })
    },

    update: function (req, res, next) {
        if (req.file) {
            image.resize(req.file, function (err, newPath) {
                if(err) next(err);

                JapanStudyAboardPost.update(
                    {_id: req.body._id},
                    {
                        $set: {
                            title: req.body.title,
                            is_active: req.body.isActive,
                            content: req.body.content,
                            sort_content: req.body.sort_content,
                            tag: req.body.tag,
                            image: newPath
                        }
                    },
                    {upsert: true},
                    function (err, doc) {
                        if (err) next(err);
                        return res.json(doc);
                    });
            });
        } else {
            JapanStudyAboardPost.update(
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
    }
};
module.exports = japanController;

