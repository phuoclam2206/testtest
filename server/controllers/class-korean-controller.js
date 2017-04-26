/**
 * Created by phuoclam on 05/01/2017.
 */

var ClassKoreanPost = require('../datasets/classKoreanPost');
var paginatorUtil = require('../controllers/util/paginator');
var fs = require("fs");


var classKoreanController = {
    create: function (req, res) {
        if (req.files) {
            req.files.forEach(function (file) {
                var filename = "public/images/" + (new Date).valueOf() + "-" + file.originalname;
                fs.rename(file.path, filename, function (err) {
                    if(err) next(err);
                    var classKoreanPost = new ClassKoreanPost({
                        title: req.body.title,
                        content: req.body.content,
                        is_active: req.body.isActive,
                        created_date: Math.round(new Date().getTime()/1000),
                        image: filename,
                        sort_content: req.body.sort_content,
                        tag: req.body.tag
                    });
                    classKoreanPost.save();
                    res.json(classKoreanPost);
                })
            })
        }

    },

    fetch: function (req, res) {
        var select = '_id title created_date is_active content sort_content tag';
        var paging = paginatorUtil.index(req, select, null);
        ClassKoreanPost.paginate(paging.query, paging.option, function (err, result) {
            return res.json(result);
        });
    },

    delete: function (req, res) {
        ClassKoreanPost.remove({_id: req.params.id}).exec(function (err) {
            if (err) next(err);
            return res.json({status: 200});
        })
    },

    update: function (req, res, next) {
        ClassKoreanPost.update(
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
module.exports = classKoreanController;

