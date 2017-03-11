/**
 * Created by phuoclam on 05/01/2017.
 */

var JapanStudyAboardPost = require('../datasets/japanStudyAboardPost');
var paginatorUtil = require('../controllers/util/paginator');

var japanController = {
    create: function (req, res) {
        var japanStudyAboardPost = new JapanStudyAboardPost({
            title: req.body.title,
            content: req.body.content,
            is_active: req.body.isActive,
            created_date: Math.round(new Date().getTime()/1000)
        });
        japanStudyAboardPost.save();
        res.json(japanStudyAboardPost);
    },

    fetch: function (req, res) {
        var select = '_id title created_date is_active content';
        paging = paginatorUtil.index(req, select, null);
        JapanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
            return res.json(result);
        });
    },

    delete: function (req, res) {
        JapanStudyAboardPost.remove({_id: req.params.id}).exec(function (err) {
            if (err) throw err;
            return res.json({status: 200});
        })
    },

    update: function (req, res) {
        JapanStudyAboardPost.update(
            {_id: req.body._id},
            {
                $set: {
                    title: req.body.title,
                    is_active: req.body.isActive,
                    content: req.body.content
                }
            },
            {upsert: true},
            function (err, doc) {
                if (err) throw err;
                return res.json(doc);
            });
    }
};
module.exports = japanController;

