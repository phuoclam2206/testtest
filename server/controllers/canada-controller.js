/**
 * Created by phuoclam on 05/01/2017.
 */

var CanadaStudyAboardPost = require('../datasets/canadaStudyAboardPost');
var paginatorUtil = require('../controllers/util/paginator');
var image = require('../controllers/util/image');
var fs = require("fs");
var sharp = require("sharp");

var canadaController = {
    create: function (req, res) {
        image.resize(req.file, function (err, newPath) {
            if(err) next(err);
            var canadaStudyAboardPost = new CanadaStudyAboardPost({
                title: req.body.title,
                content: req.body.content,
                is_active: req.body.isActive,
                created_date: Math.round(new Date().getTime()/1000),
                image: newPath,
                sort_content: req.body.sort_content,
                tag: req.body.tag
            });
            canadaStudyAboardPost.save();
            res.json(canadaStudyAboardPost);
        });
    },

    fetch: function (req, res) {
        var select = '_id title created_date is_active content sort_content tag';
        paging = paginatorUtil.index(req, select, null);
        CanadaStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            return res.json(result);
        });
    },

    delete: function (req, res) {
        CanadaStudyAboardPost.remove({_id: req.params.id}).exec(function (err) {
            if (err) next(err);
            return res.json({status: 200});
        })
    },

    update: function (req, res, next) {
        CanadaStudyAboardPost.update(
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
module.exports = canadaController;

