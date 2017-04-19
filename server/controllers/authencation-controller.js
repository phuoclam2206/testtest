/**
 * Created by phuoclam on 31/12/2016.
 */
var User = require('../datasets/users');
module.exports.signup = function (req, res) {
    var user = new User(req.body);
    user.save();
    res.json(req.body);
};

module.exports.login = function (username, password) {
    return new Promise(function (resolve, reject){
        User.findOne({
            username: username,
            password: password
        }).select('username email').exec(function (err, user) {
            if (err) throw reject(err);
            resolve(user);
        });
    });
};

module.exports.checkLogin = function (req, res, next) {
    if (!req.isAuthenticated())
        res.redirect('/login');
    else
        next();
};

module.exports.logout = function (req, res) {
    req.logOut();
    res.send(200);
};