/**
 * Created by phuoclam on 05/01/2017.
 */

var KoreanStudyAboardPost = require('../datasets/koreanStudyAboardPost');
var paginatorUtil = require('../controllers/util/paginator');
var fs = require("fs");

var koreanController = {
    create: function (req, res) {
        if (req.files) {
            req.files.forEach(function (file) {
                var filename = "public/images/" + (new Date).valueOf() + "-" + file.originalname;
                fs.rename(file.path, filename, function (err) {
                    if(err) next(err);
                    var koreanStudyAboardPost = new KoreanStudyAboardPost({
                        title: req.body.title,
                        content: req.body.content,
                        is_active: req.body.isActive,
                        created_date: Math.round(new Date().getTime()/1000),
                        image: filename,
                        sort_content: req.body.sort_content
                    });
                    koreanStudyAboardPost.save();
                    res.json(koreanStudyAboardPost);
                })
            })
        }

    },

    fetch: function (req, res) {
        var select = '_id title created_date is_active content',
        paging = paginatorUtil.index(req, select, null);
        KoreanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            return res.json(result);
        });
    },

    delete: function (req, res) {
        KoreanStudyAboardPost.remove({_id: req.params.id}).exec(function (err) {
            if (err) next(err);
            return res.json({status: 200});
        })
    },

    update: function (req, res) {
        var filename = '';
        if (req.files) {
            req.files.forEach(function (file) {
                filename += "public/images/" + (new Date).valueOf() + "-" + file.originalname;
                fs.rename(file.path, filename, function (err) {
                    if(err) next(err);
                    KoreanStudyAboardPost.update(
                        {_id: req.body._id},
                        {
                            $set: {
                                title: req.body.title,
                                is_active: req.body.isActive,
                                content: req.body.content,
                                image: filename,
                                sort_content: req.body.sort_content
                            }
                        },
                        {upsert: true},
                        function (err, doc) {
                            if (err) next(err);
                            return res.json(doc);
                        });
                })
            })
        }
    }
};
module.exports = koreanController;

