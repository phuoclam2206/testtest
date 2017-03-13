/**
 * Created by phuoclam on 31/12/2016.
 */
var jwt = require('jsonwebtoken');
var secret = 'tovaAdmin';

var User = require('../datasets/users');
var Session = require('../datasets/sessions');
module.exports.signup = function (req, res) {
    var user = new User(req.body);
    user.save();
    res.json(req.body);
};

module.exports.login = function (req, res) {
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }).select('username email password').exec(function (err, user) {

        if (err) throw err;
        if (!user) {
            res.redirect('/login');
        } else {
            var token = jwt.sign({
                username: user.username,
                password: user.password
            }, secret, {
                expiresIn: '24h'
            });
            var session = new Session({
                user_id: user._id,
                token: token
            });
            session.save(function (err) {
                if (err) throw err;
                req.flash('token', token);
                res.redirect('/dashboard');
            });
        }
    })
};

module.exports.checkLogin = function (req, res, next) {
    // var token = req.body.token || req.body.query || req.headers['x-access-token'] || req.flash('token');
    // if (token) {
    //     jwt.verify(token, secret, function (err, decoded) {
    //         if (err) {
    //             res.redirect('/login');
    //         } else {
    //             req.decoded = decoded;
    //             next();
    //         }
    //     })
    // } else {
    //     res.redirect('/login');
    // }
    next();
};

module.exports.logout = function (req, res, next) {

};