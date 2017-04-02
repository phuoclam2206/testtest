/**
 * Created by phuoclam on 25/03/2017.
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var contactController = require('../../contact-controller');
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'pandagau5@gmail.com',
        pass: 'Thatgood123'
    }
}));

var mailOptions = {
    from: '"Fred Foo 👻" <duhotova@gmail.com>', // sender address
    to: 'phuoclam2206@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};


var clientContact = {
    sendMail: function () {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    },

    saveMail: function (req, res) {
        contactController.createEmail(req, res);
        return res.json({status: 200});
    },

};
module.exports = clientContact;