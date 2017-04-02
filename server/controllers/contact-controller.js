/**
 * Created by phuoclam on 05/01/2017.
 */

var Email = require('../datasets/email');
var ConfigEmail = require('../datasets/configEmail');
var paginatorUtil = require('../controllers/util/paginator');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');



var contactController = {
    createEmail: function (req, res) {
        var email = new Email({
            title: req.body.title,
            content: req.body.content,
            email: req.body.email,
            name: req.body.name,
            created_date: Math.round(new Date().getTime()/1000)
        });
        email.save();
    },

    fetchEmail: function (req, res) {
        var select = '_id title created_date email name';
        paging = paginatorUtil.index(req, select, null);
        Email.paginate(paging.query, paging.option, function (err, result) {
            return res.json(result);
        });
    },

    fetchDetailEmail: function (req, res, next) {
        Email.findOne({"_id": req.params.id}, function (err, result) {
            if(err) next(err);
            return res.json(result);
        });
    },

    deleteEmail: function (req, res) {
        console.log(req.params);
        Email.remove({_id: req.params.id}).exec(function (err) {
            if (err) next(err);
            return res.json({status: 200});
        })
    },

    replyEmail: function (req, res) {
        Email.findOne({"_id": req.params.id}, function (err, result) {
            if(err) next(err);
            var mailOptions = {
                from: '"Du học TOVA 👻" <duhotova@gmail.com>',
                to: result.email,
                subject: req.body.title,
                html: req.body.content
            };

            ConfigEmail.findOne(function (err, result) {
                if(err) next(err);
                var transporter = nodemailer.createTransport(smtpTransport({
                    service: 'gmail',
                    auth: {
                        user: result.email,
                        pass: result.password
                    }
                }));

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);

                });
                return res.json({status: 200});
            });
        });

    },

    fetchConfig: function (req, res) {
        ConfigEmail.findOne(function (err, result) {
            if(err) next(err);
            return res.json(result);
        });
    },

    updateConfig: function (req, res) {
        ConfigEmail.findOne(function (err, result) {
            if(err) next(err);
            ConfigEmail.update(
                {email: result ? result.email : null},
                {
                    $set: {
                        email: req.body.email,
                        password: req.body.password
                    }
                },
                {upsert: true},
                function (err, doc) {
                    if (err) next(err);
                    return res.json(doc);
                });
        });

    }

};
module.exports = contactController;

